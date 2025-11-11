// app/categories/page.tsx
import Link from "next/link";
import { CATEGORIES } from "@/utils/categories";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Todas las Categorías
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
            Explora negocios organizados por categoría y subcategoría
          </p>
        </div>

        {/* Grid de Categorías */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {CATEGORIES.map((category) => (
            <div 
              key={category.value} 
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
            >
              {/* Header de Categoría Principal */}
              <Link 
                href={`/search?category=${category.value}`} 
                className="group block mb-4 sm:mb-6"
              >
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-700/50 hover:from-gray-100 dark:hover:from-gray-700 transition-all">
                  <div className="text-4xl sm:text-5xl lg:text-6xl group-hover:scale-110 transition-transform flex-shrink-0">
                    {category.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {category.label}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {category.subcategories.length} subcategorías disponibles
                    </p>
                  </div>
                  <div className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Grid de Subcategorías - Completamente Responsivo */}
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.fullValue}
                    href={`/search?category=${category.value}&subcategory=${subcategory.value}`}
                    className="group"
                  >
                    <div className="flex flex-col items-center justify-center p-2 sm:p-3 lg:p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md h-full">
                      <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                        {subcategory.icon}
                      </div>
                      <h3 className="text-xs font-medium text-gray-900 dark:text-white text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                        {subcategory.label}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer con estadísticas */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 sm:px-8 py-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {CATEGORIES.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Categorías
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-blue-200 dark:bg-blue-800"></div>
            <div className="block sm:hidden w-16 h-px bg-blue-200 dark:bg-blue-800"></div>
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {CATEGORIES.reduce((acc, cat) => acc + cat.subcategories.length, 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Subcategorías
              </div>
            </div>
          </div>
        </div>

        {/* Botón de regreso */}
        <div className="text-center mt-6 sm:mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium text-sm sm:text-base"
          >
            <span>←</span>
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}