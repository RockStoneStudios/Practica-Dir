'use client';
import { useBusiness } from '@/context/business';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BusinessState } from '@/utils/types/business';
import PreviewCard from '@/components/nav/business/preview/preview-card';
import { Loader2Icon, Send, Brain, X, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CATEGORIES, getSubcategories } from '@/utils/categories';

interface InputField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  accept?: string;
}

const inputFields: InputField[] = [
  {
    name: "name",
    label: "Business name",
    type: "text",
    required: true,
  },
  {
    name: "address",
    label: "Direccion",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: "Celular",
    type: "tel",
    required: true,
  },
  {
    name: "email",
    label: "Correo",
    type: "email",
  },
  {
    name: "facebook",
    label: "Facebook",
    type: "url",
    required: false
  },
  {
    name: "instagram",
    label: "Instagram",
    type: "url",
    required: false
  },
  {
    name: "nequi",
    label: "Nequi",
    type: "text",
    required: false
  },
  {
    name: "bancolombia",
    label: "Bancolombia",
    type: "text",
    required: false
  },
  {
    name: "website",
    label: "Website URL",
    type: "url",
  },
  {
    name: "hours",
    label: "Abierto (e.j Lun-Sab 8am - 5pm)",
    type: "text",
  },
  {
    name: "logo",
    label: "Logo Negocio",
    type: "file",
    accept: "image/*",
  },
]

function BusinessForm() {
  const {
    business,
    handleChange,
    handleSubmit,
    loading,
    logoUploading,
    generateBusinessDescription,
    generateDescriptionLoading,
    updateBusiness,
    isEditPage,
    addCategoryToBusiness,
    removeCategoryFromBusiness,
    getBusinessCategories
  } = useBusiness();

  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // ✅ Obtener categorías como array
  const currentCategories = getBusinessCategories();

  // ✅ Agregar categoría cuando se selecciona una subcategoría
  const handleAddCategory = () => {
    if (selectedMainCategory && selectedSubcategory) {
      const fullCategory = `${selectedMainCategory}/${selectedSubcategory}`;
      addCategoryToBusiness(fullCategory);
      
      // Resetear selectores para permitir agregar otra categoría
      setSelectedMainCategory('');
      setSelectedSubcategory('');
    }
  };

  // ✅ Cargar selecciones si ya existe una categoría en el business (para edición)
  useEffect(() => {
    if (currentCategories.length > 0 && !selectedMainCategory) {
      // Tomar la primera categoría para pre-seleccionar (solo en edición)
      const firstCategory = currentCategories[0];
      if (firstCategory && typeof firstCategory === 'string' && firstCategory.includes('/')) {
        const [main, sub] = firstCategory.split('/');
        setSelectedMainCategory(main);
        setSelectedSubcategory(sub);
      }
    }
  }, [currentCategories, selectedMainCategory]);

  const handleMainCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mainCategory = e.target.value;
    setSelectedMainCategory(mainCategory);
    setSelectedSubcategory(''); // Resetear subcategoría al cambiar categoría principal
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
  };

  return (
    <div className='flex flex-col lg:flex-row h-screen'>
      <div className='flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center overflow-y-auto min-h-[354px]'>
        <PreviewCard business={business} />
      </div>
      
      <div className='flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex lg:items-start overflow-y-auto'>
        <h1 className="text-2xl font-bold mb-6">Inscribe tu negocio y llega a miles de usuarios</h1>

        {/* ✅ SECCIÓN DE CATEGORÍAS MÚLTIPLES */}
        <div className="w-full mb-6">
          <label className="text-xs font-medium mb-2 block">Categorías del Negocio</label>
          
          {/* Selectores para agregar categorías */}
          <div className="space-y-3 mb-4">
            <div>
              <select
                value={selectedMainCategory}
                onChange={handleMainCategoryChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una categoría</option>
                {CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedMainCategory && (
              <div className="flex gap-2">
                <select
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona un tipo</option>
                  {getSubcategories(selectedMainCategory).map((subcategory) => (
                    <option key={subcategory.value} value={subcategory.value}>
                      {subcategory.icon} {subcategory.label}
                    </option>
                  ))}
                </select>
                
                <Button
                  onClick={handleAddCategory}
                  disabled={!selectedSubcategory}
                  className="px-4"
                >
                  <Plus size={16} />
                </Button>
              </div>
            )}
          </div>

          {/* Lista de categorías agregadas */}
          {currentCategories.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Categorías seleccionadas:</p>
              {currentCategories.map((category, index) => {
                // ✅ Verificar que category sea string antes de usar split
                if (typeof category !== 'string') return null;
                
                const [main, sub] = category.split('/');
                const categoryInfo = CATEGORIES.find(cat => cat.value === main);
                const subcategoryInfo = categoryInfo?.subcategories.find(subCat => subCat.value === sub);
                
                return (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span>{subcategoryInfo?.icon || categoryInfo?.icon}</span>
                      <span className="text-sm">
                        {subcategoryInfo?.label || category}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCategoryFromBusiness(category)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          {currentCategories.length === 0 && (
            <div className="p-4 text-center text-gray-500 border-2 border-dashed rounded-lg">
              <p>Agrega al menos una categoría para tu negocio</p>
            </div>
          )}
        </div>

        {/* Resto de campos del formulario */}
        {inputFields.map((item, index) => (
          <div key={index} className='my-1 w-full'>
            <label htmlFor={item.name} className='text-xs'>{item.label}</label>
            <Input
              name={item.name}
              type={item.type}
              required={item.required}
              onChange={handleChange}
              value={item.name === "logo" ? "" : ((business[item.name as keyof BusinessState] || "") as string | number)}
              accept={item.accept}
            />
            {logoUploading && item.name === "logo" && (
              <div className='absolute inset-0 flex items-center justify-center bg-opacity-45 bg-white'>
                <Loader2Icon className='animate-spin' size={32} />
              </div>
            )}
          </div>
        ))}

        <div className='flex justify-between items-center w-full'>
          <Button
            variant="destructive"
            onClick={generateBusinessDescription}
            type='button'
            className='my-5'
            disabled={
              !business?.name ||
              currentCategories.length === 0 || // ✅ Validar que tenga categorías
              generateDescriptionLoading
            }
          >
            {generateDescriptionLoading ? <Loader2Icon className='animate-spin mr-2' /> : <Brain className='mr-2' />} Generar Descripcion
          </Button>
          
          <Button
            onClick={isEditPage ? updateBusiness : handleSubmit}
            type='submit'
            className='my-5'
            disabled={
              !business?.name || 
              currentCategories.length === 0 || // ✅ Validar que tenga categorías
              !business?.address || 
              !business.phone || 
              loading || 
              generateDescriptionLoading
            }
          >
            {loading ? <Loader2Icon className='animate-spin mr-2' /> : <Send className='mr-2' />} Enviar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BusinessForm;