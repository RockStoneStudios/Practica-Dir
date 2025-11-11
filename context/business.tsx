'use client';
import { BusinessState } from "@/utils/types/business";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { 
  saveBusinessToDb,
  getUserBusinessFromDb,
  getBusinessFromDb,
  updateBusinessInDb,
  togglePublishInDb,
  deleteBusinessFromDb,
  getUniquePublishedCategories,
  getBusinessesByMainCategory,
  getBusinessesBySubcategory,
  getCategoriesWithCounts,
  searchBusinessesWithFilters
} from "@/actions/business";
import toast from "react-hot-toast";
import { useRouter, usePathname, useParams } from "next/navigation";
import { handleLogoAction } from "@/actions/cloudinary";
import { aiGenerateBusinessDescription } from '@/actions/ai';

const initialState: BusinessState = {
  _id: "",
  userEmail: "",
  name: "",
  category: [], // ✅ Array vacío por defecto
  description: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  instagram: "",
  facebook: "",
  hours: "",
  logo: "",
  slug: "",
  nequi: "",
  bancolombia: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
};

interface BusinessContextType {
  business: BusinessState;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessState>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  businesses: BusinessState[];
  setBusinesses: React.Dispatch<React.SetStateAction<BusinessState[]>>;
  initialState: BusinessState;
  logoUploading: boolean;
  isDashboardPage: boolean;
  generateBusinessDescription: () => void;
  generateDescriptionLoading: boolean;
  updateBusiness: () => void;
  isEditPage: boolean;
  openDescriptionModal: boolean;
  setOpenDescriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
  togglePublished: () => void;
  deleteBusiness: () => void;
  uniqueCategories: string[];
  fetchUniquePublishedCategories: () => Promise<void>;
  
  // PROPIEDADES PARA FILTROS
  selectedMainCategory: string;
  selectedSubcategory: string;
  filteredBusinesses: BusinessState[];
  categoriesWithCounts: { fullCategory: string, count: number }[];
  
  // FUNCIONES DE FILTRADO
  fetchBusinessesByMainCategory: (mainCategory: string, page?: number) => Promise<void>;
  fetchBusinessesBySubcategory: (fullCategory: string, page?: number) => Promise<void>;
  searchWithFilters: (query?: string, mainCategory?: string, subcategory?: string, page?: number) => Promise<void>;
  fetchCategoriesWithCounts: () => Promise<void>;
  resetFilters: () => void;
  setSelectedMainCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSubcategory: React.Dispatch<React.SetStateAction<string>>;
  
  // ✅ FUNCIONES PARA MÚLTIPLES CATEGORÍAS
  addCategoryToBusiness: (category: string) => void;
  removeCategoryFromBusiness: (category: string) => void;
  getBusinessCategories: () => string[];
  hasCategory: (category: string) => boolean;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [business, setBusiness] = useState<BusinessState>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [businesses, setBusinesses] = useState<BusinessState[]>([]);
  const [logoUploading, setLogoUploading] = useState<boolean>(false);
  const [generateDescriptionLoading, setGenerateDescriptionLoading] = useState<boolean>(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState<boolean>(false);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  
  // ESTADOS PARA FILTROS
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessState[]>([]);
  const [categoriesWithCounts, setCategoriesWithCounts] = useState<{ fullCategory: string, count: number }[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const { _id } = useParams();

  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const isDashboardPage = pathname === "/dashboard";
  const isEditPage = pathname.includes("/edit");

  useEffect(() => {
    const savedBusiness = localStorage.getItem("business");
    if (savedBusiness) {
      const parsed = JSON.parse(savedBusiness);
      // ✅ Asegurar que category siempre sea array
      if (!Array.isArray(parsed.category)) {
        parsed.category = parsed.category ? [parsed.category] : [];
      }
      setBusiness(parsed);
    }
  }, []);

  useEffect(() => {
    if (isDashboardPage) {
      getUserBusinesses();
    }
  }, [isDashboardPage]);

  useEffect(() => {
    if (_id) {
      getBusiness();
    }
  }, [_id]);

  useEffect(() => {
    fetchCategoriesWithCounts();
  }, []);

  // ✅ Obtener categorías del negocio como array
  const getBusinessCategories = (): string[] => {
    if (!business.category) return [];
    
    // Si es array, devolverlo directamente
    if (Array.isArray(business.category)) {
      return business.category;
    }
    
    // Si es string, convertirlo a array
    return [business.category].filter(Boolean);
  };

  // ✅ Verificar si el negocio tiene una categoría
  const hasCategory = (category: string): boolean => {
    const currentCategories = getBusinessCategories();
    return currentCategories.includes(category);
  };

  // ✅ Agregar categoría al negocio
  const addCategoryToBusiness = (category: string) => {
    if (!category) {
      toast.error("⚠️ Categoría inválida");
      return;
    }
    
    const currentCategories = getBusinessCategories();
    
    // Evitar duplicados
    if (currentCategories.includes(category)) {
      toast.error("⚠️ Esta categoría ya está agregada");
      return;
    }
    
    const updatedCategories = [...currentCategories, category];
    
    setBusiness(prev => {
      const updated = { 
        ...prev, 
        category: updatedCategories 
      };
      localStorage.setItem("business", JSON.stringify(updated));
      return updated;
    });
    
    toast.success(`✅ Categoría agregada`);
  };

  // ✅ Remover categoría del negocio
  const removeCategoryFromBusiness = (category: string) => {
    const currentCategories = getBusinessCategories();
    
    // Validar que al menos quede una categoría
    if (currentCategories.length <= 1) {
      toast.error("⚠️ Debe tener al menos una categoría");
      return;
    }
    
    const updatedCategories = currentCategories.filter(cat => cat !== category);
    
    setBusiness(prev => {
      const updated = { 
        ...prev, 
        category: updatedCategories 
      };
      localStorage.setItem("business", JSON.stringify(updated));
      return updated;
    });
    
    toast.success(`🗑️ Categoría removida`);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "logo" && files && files[0]) {
      await handleLogo(files, name);
    } else {
      setBusiness((prevBusiness: BusinessState) => {
        const updatedBusiness = { ...prevBusiness, [name]: value };
        localStorage.setItem("business", JSON.stringify(updatedBusiness));
        return updatedBusiness;
      });
    }
  };

  const handleLogo = async (files: FileList, name: string) => {
    const file = files[0];
    setLogoUploading(true);
    const reader = new FileReader();
    return new Promise<void>((resolve, reject) => {
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        try {
          const imageUrl = await handleLogoAction(base64Image);
          if (imageUrl) {
            setBusiness((prevBusiness) => {
              const updatedBusiness = { ...prevBusiness, [name]: imageUrl };
              localStorage.setItem("business", JSON.stringify(updatedBusiness));
              return updatedBusiness;
            });
            resolve();
          } else {
            toast.error("❌ Failed to upload logo");
          }
        } catch (err: any) {
          console.log(err);
          toast.error("❌ Failed to upload logo");
        } finally {
          setLogoUploading(false);
        }
      };
      reader.onerror = (error) => {
        toast.error("❌ Failed to upload logo");
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  // ✅ Guardar negocio con validación de categorías
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    
    try {
      setLoading(true);
      
      // ✅ Validar que tenga al menos una categoría
      const categories = getBusinessCategories();
      if (categories.length === 0) {
        toast.error("⚠️ Debe seleccionar al menos una categoría");
        return;
      }
      
      // ✅ Preparar negocio con array de categorías
      const businessToSave = {
        ...business,
        category: categories
      };
      
      const savedBusiness = await saveBusinessToDb(businessToSave);
      setBusiness(savedBusiness);
      localStorage.removeItem("business");
      toast.success("🎉 Negocio guardado correctamente");
      router.push(`/dashboard/business/edit/${savedBusiness._id}`);
    } catch (error: any) {
      console.log(error);
      toast.error(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getUserBusinesses = async () => {
    setLoading(true);
    try {
      const businesses = await getUserBusinessFromDb();
      setBusinesses(businesses);
    } catch (error: any) {
      console.log(error);
      toast.error("❌ No se logró cargar los negocios");
    } finally {
      setLoading(false);
    }
  };

  const getBusiness = async () => {
    try {
      const business = await getBusinessFromDb(_id.toString());
      // ✅ Asegurar que category sea array
      if (!Array.isArray(business.category)) {
        business.category = business.category ? [business.category] : [];
      }
      setBusiness(business);
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const generateBusinessDescription = async () => {
    setGenerateDescriptionLoading(true);
    const { createdAt, updatedAt, __v, ...businessForAi } = business;
    business.description = "";

    try {
      const description = await aiGenerateBusinessDescription(businessForAi);
      setBusiness((prevBusiness: BusinessState) => {
        const updatedBusiness = { ...prevBusiness, description };
        localStorage.setItem("business", JSON.stringify(updatedBusiness));
        return updatedBusiness;
      });
      toast.success("🎉 Descripción generada con IA!");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to generate business description");
    } finally {
      setGenerateDescriptionLoading(false);
    }
  };

  // ✅ Actualizar negocio con validación de categorías
  const updateBusiness = async () => {
    setLoading(true);
    try {
      // ✅ Validar que tenga al menos una categoría
      const categories = getBusinessCategories();
      if (categories.length === 0) {
        toast.error("⚠️ Debe tener al menos una categoría");
        return;
      }
      
      // ✅ Preparar negocio con array de categorías
      const businessToUpdate = {
        ...business,
        category: categories
      };
      
      const updatedBusiness = await updateBusinessInDb(businessToUpdate);
      setBusiness(updatedBusiness);
      localStorage.removeItem("business");
      toast.success("🎉 Negocio actualizado con éxito");
    } catch (error: any) {
      console.error(error);
      toast.error(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async () => {
    setLoading(true);
    try {
      const updatedBusiness = await togglePublishInDb(_id.toString());
      setBusiness((prevBusiness) => ({
        ...prevBusiness,
        published: updatedBusiness.published
      }));
      if (updatedBusiness.published) {
        toast.success("🎉 Negocio publicado");
      } else {
        toast.success("🎉 Negocio no publicado");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to toggle published");
    } finally {
      setLoading(false);
    }
  };

  const deleteBusiness = async () => {
    setLoading(true);
    try {
      await deleteBusinessFromDb(_id.toString());
      toast.success("🎉 Negocio eliminado");
      router.push("/dashboard/admin");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete business");
    } finally {
      setLoading(false);
    }
  };

  const fetchUniquePublishedCategories = async () => {
    try {
      const result = await getUniquePublishedCategories();
      setUniqueCategories(result.uniqueCategories);
    } catch (error: any) {
      console.error(error);
      toast.error("❌ Error al obtener categorías únicas");
    }
  };

  // FUNCIONES DE FILTRADO

  const fetchBusinessesByMainCategory = async (mainCategory: string, page: number = 1) => {
    setLoading(true);
    try {
      const result = await getBusinessesByMainCategory(mainCategory, page, 12);
      setFilteredBusinesses(result.businesses);
      setSelectedMainCategory(mainCategory);
    } catch (error) {
      toast.error("❌ Error al cargar negocios por categoría");
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessesBySubcategory = async (fullCategory: string, page: number = 1) => {
    setLoading(true);
    try {
      const result = await getBusinessesBySubcategory(fullCategory, page, 12);
      setFilteredBusinesses(result.businesses);
      setSelectedSubcategory(fullCategory);
    } catch (error) {
      toast.error("❌ Error al cargar negocios por subcategoría");
    } finally {
      setLoading(false);
    }
  };

  const searchWithFilters = async (
    query: string = '',
    mainCategory: string = '',
    subcategory: string = '',
    page: number = 1
  ) => {
    setLoading(true);
    try {
      const result = await searchBusinessesWithFilters(query, mainCategory, subcategory, page, 12);
      setFilteredBusinesses(result.businesses);
    } catch (error) {
      toast.error("❌ Error en búsqueda filtrada");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesWithCounts = async () => {
    try {
      const result = await getCategoriesWithCounts();
      setCategoriesWithCounts(result);
    } catch (error) {
      console.error("Error al cargar estadísticas de categorías");
    }
  };

  const resetFilters = () => {
    setSelectedMainCategory('');
    setSelectedSubcategory('');
    setFilteredBusinesses([]);
  };

  return (
    <BusinessContext.Provider value={{
      business,
      setBusiness,
      loading,
      setLoading,
      handleChange,
      handleSubmit,
      businesses,
      setBusinesses,
      initialState,
      logoUploading,
      generateBusinessDescription,
      generateDescriptionLoading,
      updateBusiness,
      isEditPage,
      openDescriptionModal,
      setOpenDescriptionModal,
      isDashboardPage,
      togglePublished,
      deleteBusiness,
      fetchUniquePublishedCategories,
      uniqueCategories,
      
      // PROPIEDADES DE FILTRADO
      selectedMainCategory,
      selectedSubcategory,
      filteredBusinesses,
      categoriesWithCounts,
      
      // FUNCIONES DE FILTRADO
      fetchBusinessesByMainCategory,
      fetchBusinessesBySubcategory,
      searchWithFilters,
      fetchCategoriesWithCounts,
      resetFilters,
      setSelectedMainCategory,
      setSelectedSubcategory,
      
      // ✅ FUNCIONES PARA MÚLTIPLES CATEGORÍAS
      addCategoryToBusiness,
      removeCategoryFromBusiness,
      getBusinessCategories,
      hasCategory
    }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
};