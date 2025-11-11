// components/search/filtered-categorie-list.tsx
"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { getCategoryInfo, getAllCategories } from "@/helper/Categories";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, Search, Sparkles } from "lucide-react";

interface FilteredListProps {
  icon?: ReactNode;
  title?: string;
  data: string[];
  showAll?: boolean;
}

export default function FilteredListCategorie({ 
  icon: Icon, 
  title, 
  data, 
  showAll = false 
}: FilteredListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Usar las categorías principales del sistema
  const mainCategories = getAllCategories();
  
  // Filtrar basado en la búsqueda
  const filteredData = mainCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasMoreItems = filteredData.length > 3;

  const handleViewAll = () => {
    router.push('/categories');
  };

  const handleCategoryClick = (categoryId: string) => {
    // Navegar a la página de búsqueda con la categoría seleccionada
    router.push(`/search?category=${encodeURIComponent(categoryId)}`);
  };

  const formatCategoryName = (name: string) => {
    if (name.includes(' & ')) {
      const parts = name.split(' & ');
      return (
        <span className="flex flex-col leading-[1.1]">
          <span>{parts[0]}</span>
          <span className="text-[9px] opacity-70">& {parts[1]}</span>
        </span>
      );
    }
    return name;
  };

  const displayDataMobile = filteredData.slice(0, 3);
  const displayDataDesktop = filteredData.slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Header Premium */}
      <div className="flex flex-col gap-4">
        {title && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {Icon && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">{Icon}</span>
                </div>
              )}
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {title}
              </h2>
            </div>
            
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200/50 dark:border-blue-800/50">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                {filteredData.length}
              </span>
            </div>
          </div>
        )}

        {/* Buscador Premium */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            <Input
              type="search"
              placeholder="Buscar categoría..."
              className="w-full pl-11 pr-4 h-12 text-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:ring-blue-400/50 dark:focus:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Estado vacío elegante */}
      {filteredData.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-lg">
            <Search className="w-9 h-9 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            No encontramos esa categoría
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Intenta con otro término
          </p>
        </div>
      )}

      {/* MOBILE: Grid Premium */}
      {filteredData.length > 0 && (
        <div className="w-full sm:hidden">
          <div className="grid grid-cols-4 gap-4">
            {displayDataMobile.map((category, index) => {
              const isImageIcon = category?.icon?.startsWith('/');

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col items-center gap-2.5 group focus:outline-none"
                >
                  {/* Contenedor con gradiente y brillo */}
                  <div className="relative">
                    {/* Brillo de fondo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-[20px] blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-110" />
                    
                    {/* Ícono principal */}
                    <div className={`
                      relative w-[72px] h-[72px] rounded-[20px] flex items-center justify-center
                      shadow-lg group-hover:shadow-2xl
                      transform group-hover:scale-105 group-active:scale-95
                      transition-all duration-300 ease-out
                      ${category?.color || 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800'}
                      border border-white/20 dark:border-gray-600/20
                    `}>
                      {/* Overlay con gradiente sutil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-[20px]" />
                      
                      {isImageIcon ? (
                        <Image
                          src={category!.icon}
                          alt={category!.name}
                          width={36}
                          height={36}
                          className="object-contain relative z-10 filter drop-shadow-md"
                        />
                      ) : (
                        <span className="text-3xl relative z-10 filter drop-shadow-md">
                          {category?.icon || "📁"}
                        </span>
                      )}
                      
                      {/* Indicador de click */}
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 border-2 border-blue-500">
                        <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Nombre de categoría */}
                  <span className="text-[10.5px] font-bold text-gray-800 dark:text-gray-200 text-center leading-tight max-w-[85px] break-words group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {formatCategoryName(category?.name || category.id)}
                  </span>
                </button>
              );
            })}

            {/* Botón "Ver más" premium para móvil */}
            {hasMoreItems && (
              <button
                onClick={handleViewAll}
                className="flex flex-col items-center gap-2.5 group focus:outline-none"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-[20px] blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-110" />
                  
                  <div className="relative w-[72px] h-[72px] rounded-[20px] flex items-center justify-center shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 group-active:scale-95 transition-all duration-300 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 border-2 border-dashed border-blue-300 dark:border-blue-700">
                    <Sparkles className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <span className="text-[10.5px] font-bold text-blue-600 dark:text-blue-400 text-center leading-tight">
                  Ver más
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* DESKTOP: Grid Premium */}
      {filteredData.length > 0 && (
        <div className="hidden sm:block w-full">
          <div className="grid grid-cols-5 gap-6">
            {displayDataDesktop.map((category, index) => {
              const isImageIcon = category?.icon?.startsWith('/');

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col items-center gap-3 group focus:outline-none"
                >
                  <div className="relative">
                    {/* Brillo de fondo animado */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-[24px] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-110" />
                    
                    {/* Ícono principal */}
                    <div className={`
                      relative w-24 h-24 rounded-[24px] flex items-center justify-center
                      shadow-xl group-hover:shadow-2xl
                      transform group-hover:scale-110 group-hover:-translate-y-2 group-active:scale-95
                      transition-all duration-300 ease-out
                      ${category?.color || 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800'}
                      border border-white/20 dark:border-gray-600/20
                    `}>
                      {/* Overlay decorativo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-[24px]" />
                      
                      {isImageIcon ? (
                        <Image
                          src={category!.icon}
                          alt={category!.name}
                          width={48}
                          height={48}
                          className="object-contain relative z-10 filter drop-shadow-lg"
                        />
                      ) : (
                        <span className="text-4xl relative z-10 filter drop-shadow-lg">
                          {category?.icon || "📁"}
                        </span>
                      )}
                      
                      {/* Indicador interactivo */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 border-2 border-blue-500">
                        <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Nombre con mejor tipografía */}
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200 text-center leading-tight max-w-28 break-words group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {formatCategoryName(category?.name || category.id)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Botón "Ver todas" premium para desktop */}
          {filteredData.length > 5 && (
            <div className="flex justify-center pt-8">
              <Button
                onClick={handleViewAll}
                className="group relative overflow-hidden px-8 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {/* Efecto de brillo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <span className="relative flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5" />
                  Ver todas las categorías
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}