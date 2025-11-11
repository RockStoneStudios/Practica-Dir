// lib/categories.ts - ORGANIZANDO TUS CATEGORÍAS EN GRUPOS

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: Category[];
}

// ===== TUS CATEGORÍAS EXISTENTES (EXACTAMENTE IGUAL) =====
export const categories: Category[] = [
  {
    id: "basicos",
    name: "Basicos",
    icon: "/categories/basico.png",
    color: "bg-slate-50 text-slate-700 border-slate-200"
  },
  {
    id: "comidas-rapidas",
    name: "Comidas Rapidas",
    icon: "/categories/rapida.png",
    color: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    id: "supermercado-domicilios",
    name: "Supermercado & Domicilios",
    icon: "/categories/supermercado.png",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "restaurante",
    name: "Restaurante",
    icon: "/categories/restaurante.png",
    color: "bg-red-50 text-red-700 border-red-200"
  },
  {
    id: "banco",
    name: "Banco",
    icon: "/categories/banco.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "tamales",
    name: "Tamales",
    icon: "/categories/tamal.png",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    id: "constructora",
    name: "Constructoras",
    icon: "/categories/constructora.png",
    color: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    id: "helados",
    name: "Helados",
    icon: "/categories/helado.png",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200"
  },
  {
    id: "licoreras",
    name: "Licoreras",
    icon: "/categories/licor.png",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "tienda",
    name: "Tienda",
    icon: "/categories/tienda.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "odontologia",
    name: "Odontologia",
    icon: "/categories/dentista.png",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200"
  },
  {
    id: "mototaxistas",
    name: "Mototaxista",
    icon: "/categories/tuktuk.png",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    id: "domicilios-encomiendas",
    name: "Domicilios & Encomiendas",
    icon: "/categories/domiciliario.png",
    color: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: "sex-shop tatoos",
    name: "Sexshop & Tatoos",
    icon: "/categories/sex.png",
    color: "bg-pink-50 text-pink-700 border-pink-200"
  },
  {
    id: "trasteos-transporte-de-carga",
    name: "Trasteos & Transporte de Carga",
    icon: "/categories/trasteo.png",
    color: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "inmobiliarias",
    name: "Inmobiliarias",
    icon: "/categories/inmobiliaria.png",
    color: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "agroinsumos",
    name: "Agroinsumos",
    icon: "/categories/agroinsumos.png",
    color: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "barberia",
    name: "Barberia",
    icon: "/categories/barberia.png",
    color: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "celulares & computadores",
    name: "Celulares & Computadores",
    icon: "/categories/celulares&reparacion.png",
    color: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "joyerias",
    name: "Joyerias",
    icon: "/categories/joyeria.png",
    color: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "religion",
    name: "Religion",
    icon: "/categories/religion.png",
    color: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "domiciliarios",
    name: "Domicilios",
    icon: "/categories/domiciliario.png",
    color: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: "crossfitgym",
    name: "CrossfitGym",
    icon: "/categories/fitness.png",
    color: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: "transporte",
    name: "Transporte",
    icon: "/categories/transporte.png",
    color: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: "servicios",
    name: "Servicios",
    icon: "/categories/servicio.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "diseño , arte y resina",
    name: "Diseño",
    icon: "/categories/diseño.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "restaurante-bar",
    name: "Restaurante & Bar",
    icon: "/categories/R&B.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "floristeria",
    name: "Floristeria",
    icon: "/categories/floristeria.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "fisioterapia",
    name: "Fisioterapia",
    icon: "/categories/fisioterapia.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "discoteca & bar",
    name: "Discoteca & Bar",
    icon: "/categories/D&B.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "taller mecanico & repuestos",
    name: "Taller Mecanico & Repuestos",
    icon: "/categories/taller-mecanico.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "restaurante-rapida",
    name: "Restaurante & Comida Rapida",
    icon: "/categories/restaurante&rapida.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
];

// ===== CATEGORÍAS PRINCIPALES (LAS QUE SE MUESTRAN EN BÚSQUEDA) =====
export const mainCategories: Category[] = [
  {
    id: "comidas",
    name: "Comidas",
    icon: "/categories/restaurante&rapida.png",
    color: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    id: "compras",
    name: "Compras",
    icon: "/categories/tienda.png",
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "servicios",
    name: "Servicios",
    icon: "/categories/servicio.png",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "salud",
    name: "Salud",
    icon: "/categories/dentista.png",
    color: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: "transporte",
    name: "Transporte",
    icon: "/categories/transporte.png",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    id: "entretenimiento",
    name: "Entretenimiento",
    icon: "/categories/D&B.png",
    color: "bg-pink-50 text-pink-700 border-pink-200"
  },
  {
    id: "basicos",
    name: "Básicos",
    icon: "/categories/basico.png",
    color: "bg-slate-50 text-slate-700 border-slate-200"
  }
];

// ===== GRUPOS CON SUBCATEGORÍAS =====
export const categoryGroups: CategoryGroup[] = [
  {
    id: "comidas",
    name: "Comidas",
    icon: "/categories/restaurante&rapida.png",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    subcategories: [
      categories.find(c => c.id === "restaurante")!,
      categories.find(c => c.id === "comidas-rapidas")!,
      categories.find(c => c.id === "restaurante-rapida")!,
      categories.find(c => c.id === "restaurante-bar")!,
      categories.find(c => c.id === "tamales")!,
      categories.find(c => c.id === "helados")!,
      categories.find(c => c.id === "licoreras")!,
    ].filter(Boolean)
  },
  {
    id: "compras",
    name: "Compras",
    icon: "/categories/tienda.png",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    subcategories: [
      categories.find(c => c.id === "supermercado-domicilios")!,
      categories.find(c => c.id === "tienda")!,
      categories.find(c => c.id === "joyerias")!,
      categories.find(c => c.id === "floristeria")!,
      categories.find(c => c.id === "agroinsumos")!,
    ].filter(Boolean)
  },
  {
    id: "servicios",
    name: "Servicios",
    icon: "/categories/servicio.png",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    subcategories: [
      categories.find(c => c.id === "servicios")!,
      categories.find(c => c.id === "constructora")!,
      categories.find(c => c.id === "inmobiliarias")!,
      categories.find(c => c.id === "diseño , arte y resina")!,
      categories.find(c => c.id === "taller mecanico & repuestos")!,
      categories.find(c => c.id === "celulares & computadores")!,
    ].filter(Boolean)
  },
  {
    id: "salud",
    name: "Salud",
    icon: "/categories/dentista.png",
    color: "bg-green-50 text-green-700 border-green-200",
    subcategories: [
      categories.find(c => c.id === "odontologia")!,
      categories.find(c => c.id === "fisioterapia")!,
      categories.find(c => c.id === "barberia")!,
      categories.find(c => c.id === "crossfitgym")!,
    ].filter(Boolean)
  },
  {
    id: "transporte",
    name: "Transporte",
    icon: "/categories/transporte.png",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    subcategories: [
      categories.find(c => c.id === "transporte")!,
      categories.find(c => c.id === "mototaxistas")!,
      categories.find(c => c.id === "domiciliarios")!,
      categories.find(c => c.id === "domicilios-encomiendas")!,
      categories.find(c => c.id === "trasteos-transporte-de-carga")!,
    ].filter(Boolean)
  },
  {
    id: "entretenimiento",
    name: "Entretenimiento",
    icon: "/categories/D&B.png",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    subcategories: [
      categories.find(c => c.id === "discoteca & bar")!,
      categories.find(c => c.id === "sex-shop tatoos")!,
    ].filter(Boolean)
  },
  {
    id: "basicos",
    name: "Básicos",
    icon: "/categories/basico.png",
    color: "bg-slate-50 text-slate-700 border-slate-200",
    subcategories: [
      categories.find(c => c.id === "basicos")!,
      categories.find(c => c.id === "banco")!,
      categories.find(c => c.id === "religion")!,
    ].filter(Boolean)
  }
];

// ===== FUNCIONES =====
export const getCategoryInfo = (categoryId: string): Category => {
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s*&\s*/g, 'y')
      .replace(/,/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const normalizedId = normalize(categoryId);

  // Buscar en todas las categorías
  let category = categories.find(cat => normalize(cat.id) === normalizedId) ||
                categories.find(cat => normalize(cat.name) === normalizedId);

  // Si no encuentra, buscar en categorías principales
  if (!category) {
    category = mainCategories.find(cat => normalize(cat.id) === normalizedId) ||
               mainCategories.find(cat => normalize(cat.name) === normalizedId);
  }

  return category || {
    id: categoryId,
    name: categoryId,
    icon: "/categories/tienda.png",
    color: "bg-gray-50 text-gray-700 border-gray-200"
  };
};

// Para búsqueda: mostrar solo categorías principales
export const getAllCategories = (): Category[] => mainCategories;

// Para obtener subcategorías de una categoría principal
export const getSubcategories = (mainCategoryId: string): Category[] => {
  const group = categoryGroups.find(g => g.id === mainCategoryId);
  return group?.subcategories || [];
};

export const getCategoryGroups = (): CategoryGroup[] => categoryGroups;

export const searchCategories = (searchTerm: string): Category[] => {
  const normalizedSearch = searchTerm.toLowerCase();
  
  // Buscar en categorías principales
  const mainResults = mainCategories.filter(
    cat => cat.name.toLowerCase().includes(normalizedSearch)
  );
  
  // Buscar en subcategorías
  const subResults = categoryGroups.flatMap(group => 
    group.subcategories.filter(sub => 
      sub.name.toLowerCase().includes(normalizedSearch)
    )
  );
  
  return [...mainResults, ...subResults];
};

// Para el modelo Mongoose - todas las categorías válidas (subcategorías)
export const getAllValidCategories = (): string[] => {
  return categories.map(cat => cat.id);
};