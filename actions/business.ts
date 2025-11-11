'use server';

import db from '@/utils/db';
import Business from '@/models/business';
import { currentUser } from '@clerk/nextjs/server';
import { BusinessState } from '@/utils/types/business';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

const checkOwnerShip = async (businessId: string) => {
  try {
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const isAdmin = user?.privateMetadata?.role === "admin";

    if (!userEmail) throw new Error("User not found");
    const business = await Business.findById(businessId);
    if (!business) throw new Error("Negocio no encontrado");
    if (isAdmin || business.userEmail === userEmail) return true;
  } catch (error: any) {
    throw new Error(error);
  }
}

// ✅ Guardar con array de categorías
export const saveBusinessToDb = async (data: BusinessState) => {
  try {
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const { _id, ...rest } = data;
    
    // ✅ Asegurar que categories sea un array
    let categories = Array.isArray(rest.category) 
      ? rest.category 
      : [rest.category].filter(Boolean);
    
    // Si el array está vacío, lanzar error
    if (categories.length === 0) {
      throw new Error("Debe seleccionar al menos una categoría");
    }
    
    const slug = slugify(`${categories[0]}-${rest.name}-${rest.address}-${nanoid(6)}`);
    
    const business = await Business.create({
      ...rest,
      categories, // ✅ Array de categorías
      slug,
      userEmail
    });
    
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserBusinessFromDb = async () => {
  try {
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const business = await Business.find({ userEmail }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getBusinessFromDb = async (_id: string) => {
  try {
    await db();
    const business = await Business.findById(_id);
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
}

// ✅ Actualizar con array de categorías
export const updateBusinessInDb = async (data: BusinessState) => {
  try {
    await db();
    const { _id, ...rest } = data;
    await checkOwnerShip(_id);
    
    // ✅ Asegurar que categories sea un array
    let categories = Array.isArray(rest.category) 
      ? rest.category 
      : [rest.category].filter(Boolean);
    
    if (categories.length === 0) {
      throw new Error("Debe seleccionar al menos una categoría");
    }
    
    const business = await Business.findByIdAndUpdate(_id, {
      ...rest,
      categories // ✅ Array de categorías
    }, {
      new: true,
    });
    
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
}

export const togglePublishInDb = async (_id: string) => {
  try {
    await db();
    await checkOwnerShip(_id);
    const business = await Business.findById(_id);
    if (!business) throw new Error("Business not found");
    business.published = !business.published;
    await business.save();
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getLatestBusinessesFromDb = async (page: number, limit: number) => {
  try {
    await db();
    const [businesses, totalCount] = await Promise.all([
      Business.find({ published: true })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Business.countDocuments({ published: true })
    ]);
    return { businesses: JSON.parse(JSON.stringify(businesses)), totalCount }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getBusinessBySlugFromDb = async (slug: string) => {
  try {
    await db();
    const business = await Business.findOne({ slug });
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
}

// ✅ Buscar en array de categorías
export const searchBusinessesFromDb = async (query: string) => {
  try {
    const regexQuery = new RegExp(query, "i");
    const businesses = await Business.find({
      $or: [
        { name: regexQuery },
        { categories: regexQuery }, // ✅ Busca dentro del array
        { address: regexQuery }
      ],
      published: true,
    });
    return JSON.parse(JSON.stringify(businesses));
  } catch (error: any) {
    throw new Error(error)
  }
}

// ✅ Obtener categorías únicas (descomponer arrays)
export const getUniqueCategoriesAndAddresses = async () => {
  try {
    await db();
    const result = await Business.aggregate([
      {
        $unwind: "$categories" // Descomponer el array
      },
      {
        $group: {
          _id: null,
          uniqueCategories: { $addToSet: { $toLower: "$categories" } },
          uniqueAddresses: { $addToSet: { $toLower: "$address" } },
        },
      },
      {
        $project: {
          _id: 0,
          uniqueCategories: 1,
          uniqueAddresses: 1,
        },
      },
    ]);
    
    if (result.length > 0) {
      return {
        uniqueCategories: result[0].uniqueCategories,
        uniqueAddresses: result[0].uniqueAddresses,
      }
    } else {
      return { uniqueCategories: [], uniqueAddresses: [] }
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getAllBusinessesFromDb = async (page: number, limit: number) => {
  try {
    await db();
    const [businesses, totalCount] = await Promise.all([
      Business.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Business.countDocuments()
    ]);
    return { businesses: JSON.parse(JSON.stringify(businesses)), totalCount }
  } catch (error: any) {
    throw new Error(error);
  }
}

export const deleteBusinessFromDb = async (_id: string) => {
  try {
    await db();
    await checkOwnerShip(_id);
    const business = await Business.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(business));
  } catch (error: any) {
    throw new Error(error);
  }
}

// ✅ Categorías únicas publicadas
export const getUniquePublishedCategories = async () => {
  try {
    await db();
    const result = await Business.aggregate([
      { $match: { published: true } },
      { $unwind: "$categories" },
      {
        $group: {
          _id: null,
          uniqueCategories: { $addToSet: { $toLower: "$categories" } },
        },
      },
      {
        $project: {
          _id: 0,
          uniqueCategories: 1,
        },
      },
    ]);

    if (result.length > 0) {
      return { uniqueCategories: result[0].uniqueCategories };
    } else {
      return { uniqueCategories: [] };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Obtiene negocios por categoría principal (ej: "comidas")
 * Busca en el array de categories
 */
export const getBusinessesByMainCategory = async (mainCategory: string, page: number = 1, limit: number = 12) => {
  try {
    await db();
    const regex = new RegExp(`^${mainCategory}/`, 'i');
    
    const [businesses, totalCount] = await Promise.all([
      Business.find({
        categories: regex, // ✅ Busca en array
        published: true
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Business.countDocuments({
        categories: regex,
        published: true
      })
    ]);
    
    return {
      businesses: JSON.parse(JSON.stringify(businesses)),
      totalCount
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Obtiene negocios por categoría específica (ej: "comidas/restaurante")
 */
export const getBusinessesBySubcategory = async (fullCategory: string, page: number = 1, limit: number = 12) => {
  try {
    await db();
    
    const [businesses, totalCount] = await Promise.all([
      Business.find({
        categories: fullCategory, // ✅ Busca en array
        published: true
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Business.countDocuments({
        categories: fullCategory,
        published: true
      })
    ]);
    
    return {
      businesses: JSON.parse(JSON.stringify(businesses)),
      totalCount
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Obtiene estadísticas de categorías
 */
export const getCategoriesWithCounts = async () => {
  try {
    await db();
    
    const result = await Business.aggregate([
      { $match: { published: true } },
      { $unwind: "$categories" },
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          fullCategory: "$_id",
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    return JSON.parse(JSON.stringify(result));
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Búsqueda avanzada con filtros
 */
export const searchBusinessesWithFilters = async (
  query: string = '',
  mainCategory: string = '',
  subcategory: string = '',
  page: number = 1,
  limit: number = 12
) => {
  try {
    await db();
    
    const filters: any = { published: true };
    
    if (mainCategory && !subcategory) {
      filters.categories = new RegExp(`^${mainCategory}/`, 'i');
    }
    
    if (subcategory) {
      filters.categories = subcategory;
    }
    
    if (query) {
      const regexQuery = new RegExp(query, "i");
      filters.$or = [
        { name: regexQuery },
        { categories: regexQuery },
        { address: regexQuery },
        { description: regexQuery }
      ];
    }
    
    const [businesses, totalCount] = await Promise.all([
      Business.find(filters)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Business.countDocuments(filters)
    ]);
    
    return {
      businesses: JSON.parse(JSON.stringify(businesses)),
      totalCount
    };
  } catch (error: any) {
    throw new Error(error);
  }
};


// ===== ARCHIVO 3: Ejemplos de uso =====
