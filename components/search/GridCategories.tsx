"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Grid3x3, LayoutGrid, ArrowLeft, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Category {
  name: string;
  icon: string;
}

interface GridCategoriesProps {
  categories: Category[];
}

const GridCategories: React.FC<GridCategoriesProps> = ({ categories }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "comfortable">("grid");

  const handleClick = (name: string) => {
    router.push(`/search?query=${encodeURIComponent(name)}`);
  };

  const handleBack = () => {
    router.back();
  };

  // Filtrar categorías
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatear nombre si tiene "&"
  const formatCategoryName = (name: string) => {
    if (name.includes(' & ')) {
      const parts = name.split(' & ');
      return (
        <span className="flex flex-col leading-[1.1]">
          <span>{parts[0]}</span>
          <span className="text-[10px] opacity-70">& {parts[1]}</span>
        </span>
      );
    }
    return name;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header Premium */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-950/90 border-b border-gray-200/50 dark:border-gray-800/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            {/* Fila superior */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Botón de regreso */}
                <button
                  onClick={handleBack}
                  className="group flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700/50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Título */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Grid3x3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      Todas las Categorías
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      Explora nuestro directorio completo
                    </p>
                  </div>
                </div>
              </div>

              {/* Contador */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-cyan-500/10 border border-blue-200 dark:border-blue-500/30 shadow-lg dark:shadow-blue-500/10">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span className="text-sm font-bold text-blue-700 dark:text-cyan-300">
                  {filteredCategories.length}
                </span>
              </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors duration-200" />
                  <Input
                    type="search"
                    placeholder="Buscar en categorías..."
                    className="w-full pl-12 pr-4 h-12 text-sm bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-cyan-500/50 focus:border-blue-500 dark:focus:border-cyan-500 transition-all duration-200 shadow-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Toggle de vista */}
              <div className="hidden sm:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700/50">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-500 dark:to-cyan-500 shadow-lg text-white font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                  <span className="text-sm">Compacto</span>
                </button>
                <button
                  onClick={() => setViewMode("comfortable")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    viewMode === "comfortable"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-500 dark:to-cyan-500 shadow-lg text-white font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-sm">Cómodo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Estado vacío */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center shadow-2xl border border-gray-200 dark:border-gray-700/50">
              <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No encontramos esa categoría
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Intenta con otro término de búsqueda
            </p>
          </div>
        )}

        {/* Grid - Vista Compacta */}
        {filteredCategories.length > 0 && viewMode === "grid" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5">
            {filteredCategories.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleClick(cat.name)}
                className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gradient-to-br dark:hover:from-gray-800/80 dark:hover:to-gray-900/80 border border-gray-200 dark:border-gray-800/50 hover:border-blue-300 dark:hover:border-cyan-500/30 shadow-lg hover:shadow-xl dark:hover:shadow-cyan-500/20 dark:hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-cyan-500/50 backdrop-blur-sm"
              >
                {/* Brillo de fondo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 dark:from-cyan-500/0 dark:via-blue-500/0 dark:to-cyan-500/0 dark:group-hover:from-cyan-500/10 dark:group-hover:via-blue-500/5 dark:group-hover:to-cyan-500/10 rounded-2xl transition-all duration-500" />
                
                {/* Contenedor de ícono */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-cyan-400/30 dark:to-blue-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-110" />
                  
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center shadow-xl group-hover:shadow-2xl dark:group-hover:shadow-cyan-500/20 transition-shadow duration-300 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-black/20 dark:to-transparent rounded-2xl" />
                    <Image
                      src={cat.icon}
                      alt={cat.name}
                      width={48}
                      height={48}
                      className="object-contain drop-shadow-lg dark:drop-shadow-2xl relative z-10 dark:brightness-110"
                    />
                  </div>
                </div>

                {/* Nombre */}
                <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 text-center leading-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors duration-200 relative z-10">
                  {formatCategoryName(cat.name)}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Grid - Vista Cómoda */}
        {filteredCategories.length > 0 && viewMode === "comfortable" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
            {filteredCategories.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleClick(cat.name)}
                className="group relative flex flex-col items-center gap-4 p-6 rounded-3xl bg-gray-900/50 hover:bg-gradient-to-br hover:from-gray-800/80 hover:to-gray-900/80 border border-gray-800/50 hover:border-cyan-500/30 shadow-xl hover:shadow-cyan-500/20 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 backdrop-blur-sm"
              >
                {/* Brillo de fondo */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/5 group-hover:to-cyan-500/10 rounded-3xl transition-all duration-500" />
                
                {/* Contenedor de ícono */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-110" />
                  
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-2xl group-hover:shadow-cyan-500/20 transition-shadow duration-300 border border-gray-700/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
                    <Image
                      src={cat.icon}
                      alt={cat.name}
                      width={64}
                      height={64}
                      className="object-contain drop-shadow-2xl relative z-10 brightness-110"
                    />
                  </div>
                </div>

                {/* Nombre */}
                <p className="text-sm sm:text-base font-bold text-gray-200 text-center leading-tight group-hover:text-cyan-300 transition-colors duration-200 relative z-10">
                  {formatCategoryName(cat.name)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GridCategories;