"use client";
import React, { useCallback, useEffect, useState } from 'react'
import throttle from 'lodash/throttle';
import BusinessCard from '@/components/cards/business-card';
import { BusinessState } from '@/utils/types/business';
import Link from 'next/link';
import { CATEGORIES, getCategoryFullInfo } from '@/utils/categories';
import { searchBusinessesWithFilters } from '@/actions/business';

const throttledFetchResults = throttle(
    async (
        query: string,
        category: string,
        subcategory: string,
        setResults: React.Dispatch<React.SetStateAction<BusinessState[]>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setLoading(true);
        try {
            // Usar la función de búsqueda con filtros del backend
            const result = await searchBusinessesWithFilters(
                query,           // query
                category,        // mainCategory
                subcategory,     // subcategory (ya viene en formato "categoria/subcategoria")
                1,              // page
                50              // limit
            );
            
            setResults(result.businesses);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    },
    1000
);

export default function SearchPage({
    searchParams
}: {
    searchParams: { 
        query?: string;
        category?: string;
        subcategory?: string;
    }
}) {
    const [results, setResults] = useState<BusinessState[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
        searchParams.subcategory || ''
    );

    const mainCategory = searchParams.category || '';
    
    // Obtener información de la categoría principal
    const categoryData = CATEGORIES.find(cat => cat.value === mainCategory);
    const subcategories = categoryData?.subcategories || [];

    const fetchResults = useCallback(() => {
        // Construir la categoría completa para el filtro
        const fullCategory = selectedSubcategory 
            ? `${mainCategory}/${selectedSubcategory}` 
            : '';
        
        throttledFetchResults(
            searchParams.query || "", 
            mainCategory,
            fullCategory,
            setResults,
            setLoading
        );
    }, [searchParams.query, mainCategory, selectedSubcategory]);

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    useEffect(() => {
        if (!searchParams.query && !mainCategory) {
            setResults([]);
            setLoading(false);
        }
    }, [searchParams.query, mainCategory]);

    // Resetear subcategoría cuando cambia la categoría
    useEffect(() => {
        setSelectedSubcategory('');
    }, [mainCategory]);

    const handleSubcategoryClick = (subcategoryValue: string) => {
        setSelectedSubcategory(subcategoryValue === selectedSubcategory ? '' : subcategoryValue);
    };

    // Capitalizar primera letra
    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="p-5 max-w-7xl mx-auto">
                {/* Header con información de la categoría */}
                <div className="mb-6">
                    {categoryData ? (
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-5xl">{categoryData.icon}</span>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {categoryData.label}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Explora todos los negocios de esta categoría
                                </p>
                            </div>
                        </div>
                    ) : (
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Resultados de Búsqueda
                        </h1>
                    )}
                    
                    {searchParams.query && (
                        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-2 inline-block">
                            <span className="text-gray-600 dark:text-gray-400">Buscando: </span>
                            <span className="font-semibold text-blue-700 dark:text-blue-400">"{searchParams.query}"</span>
                        </div>
                    )}
                    
                    {selectedSubcategory && (
                        <div className="mt-2 inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-full text-sm">
                            <span>Filtro activo:</span>
                            <span className="font-semibold">
                                {subcategories.find(s => s.value === selectedSubcategory)?.label}
                            </span>
                        </div>
                    )}
                </div>

                {/* Filtros de subcategorías */}
                {subcategories.length > 0 && (
                    <div className="mb-6 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                            <span>🔍</span>
                            <span>Filtrar por tipo</span>
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {subcategories.map((subcategory) => (
                                <button
                                    key={subcategory.value}
                                    onClick={() => handleSubcategoryClick(subcategory.value)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium 
                                        transition-all duration-200 border-2
                                        ${selectedSubcategory === subcategory.value
                                            ? `${categoryData?.bgClass} text-white border-transparent shadow-md scale-105`
                                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm'
                                        }
                                    `}
                                >
                                    <span className="text-lg">{subcategory.icon}</span>
                                    <span>{subcategory.label}</span>
                                </button>
                            ))}
                        </div>
                        {selectedSubcategory && (
                            <button
                                onClick={() => setSelectedSubcategory('')}
                                className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
                            >
                                <span>✕</span>
                                <span>Limpiar filtros</span>
                            </button>
                        )}
                    </div>
                )}

                {/* Loading state */}
                {loading && (
                    <div className="flex flex-col justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-500 mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Cargando resultados...</p>
                    </div>
                )}

                {/* No results */}
                {!loading && results.length === 0 && (searchParams.query || mainCategory) && (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                        <div className="text-8xl mb-6">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            No se encontraron resultados
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Intenta con otros términos de búsqueda o filtros
                        </p>
                        {selectedSubcategory && (
                            <button
                                onClick={() => setSelectedSubcategory('')}
                                className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                            >
                                Limpiar filtros y ver todos
                            </button>
                        )}
                    </div>
                )}

                {/* Results grid */}
                {!loading && results.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                                {results.length} {results.length === 1 ? 'negocio encontrado' : 'negocios encontrados'}
                            </p>
                            {selectedSubcategory && (
                                <button
                                    onClick={() => setSelectedSubcategory('')}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                                >
                                    Ver todos en {categoryData?.label}
                                </button>
                            )}
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((business: BusinessState) => (
                                <Link 
                                    key={business._id} 
                                    href={`/business/${business.slug}`}
                                    className="group"
                                >
                                    <div className="transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl dark:group-hover:shadow-gray-800/50">
                                        <BusinessCard business={business} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}