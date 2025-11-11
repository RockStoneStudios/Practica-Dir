// app/news/category/[categoryId]/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import newsData from '@/data/news.json';

interface PageProps {
  params: {
    categoryId: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = newsData.categories.find(cat => cat.id === params.categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400">Categoría no encontrada</p>
        </div>
      </div>
    );
  }

  const categoryNews = newsData.news.filter(news => news.category === category.name);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header de Categoría */}
        <div className="mb-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver a noticias
          </Link>
          
          <div className={`bg-gradient-to-r ${category.color} text-white p-6 rounded-lg`}>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">
              {category.name}
            </h1>
            <p className="text-blue-100 text-lg">
              {category.count} noticia{category.count !== 1 ? 's' : ''} en esta categoría
            </p>
          </div>
        </div>

        {/* Lista de Noticias de la Categoría */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryNews.map((news) => (
            <Link key={news.id} href={`/news/${news.slug}`}>
              <Card className="h-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Imagen</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {news.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {news.author}
                      </span>
                      <span>
                        {new Date(news.date).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mensaje si no hay noticias */}
        {categoryNews.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No hay noticias en esta categoría
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pronto tendremos contenido para {category.name}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}