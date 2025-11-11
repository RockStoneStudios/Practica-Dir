// app/news/all/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import newsData from '@/data/news.json';

export default function AllNewsPage() {
  const allNews = newsData.news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver a categorías
          </Link>
          
          <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6 rounded-lg">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">
              Todas las Noticias
            </h1>
            <p className="text-gray-300 text-lg">
              {allNews.length} noticias publicadas
            </p>
          </div>
        </div>

        {/* Lista Completa de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.map((news) => {
            const category = newsData.categories.find(cat => cat.name === news.category);
            
            return (
              <Link key={news.id} href={`/news/${news.slug}`}>
                <Card className="h-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative">
                      <div className="text-center p-4">
                        <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Imagen</span>
                      </div>
                      {news.featured && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                          DESTACADA
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${category?.color || 'from-gray-600 to-gray-800'} text-white`}>
                          {news.category}
                        </span>
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
            );
          })} {/* ← AQUÍ FALTABA ESTE PARÉNTESIS DE CIERRE */}
        </div>
      </div>
    </div>
  );
}