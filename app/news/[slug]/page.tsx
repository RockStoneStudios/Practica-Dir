// app/news/[slug]/page.tsx
'use client';

import { Calendar, User, Clock, Share2, TrendingUp, Zap, Award, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimeSincePublication } from "@/components/timer/timer-count";
import newsData from '@/data/news.json';
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  // Buscar la noticia por slug
  const news = newsData.news.find(item => item.slug === params.slug);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const authorTextRef = useRef<HTMLSpanElement>(null);
  const authorContainerRef = useRef<HTMLDivElement>(null);
  
  // Evitar hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efecto de neón letra por letra
  useEffect(() => {
    if (!mounted || !authorTextRef.current || !authorContainerRef.current) return;

    const authorName = news?.author || "";
    const letters = authorName.split('');
    
    // Limpiar el contenido existente
    authorTextRef.current.innerHTML = '';
    
    // Crear un span para cada letra
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.className = 'inline-block transition-all duration-300';
      span.style.opacity = '0.7';
      span.style.filter = 'brightness(1)';
      authorTextRef.current?.appendChild(span);
    });

    // Animación GSAP para el efecto de neón
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    // Efecto de recorrido letra por letra
    letters.forEach((_, index) => {
      tl.to(authorTextRef.current?.children[index] || {}, {
        duration: 0.1,
        opacity: 1,
        scale: 1.2,
        filter: 'brightness(2) drop-shadow(0 0 8px #00ffff)',
        ease: 'power2.out'
      })
      .to(authorTextRef.current?.children[index] || {}, {
        duration: 0.2,
        opacity: 0.7,
        scale: 1,
        filter: 'brightness(1) drop-shadow(0 0 0px transparent)',
        ease: 'power2.in',
        delay: 0.1
      }, `+=0.1`);
    });

    // Efecto de respiración suave para todo el texto
    gsap.to(authorContainerRef.current, {
      duration: 3,
      textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    return () => {
      tl.kill();
    };
  }, [mounted, news?.author]);

  // Si no encuentra la noticia, mostrar 404
  if (!news) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400">Noticia no encontrada</p>
          <Button asChild className="mt-4">
            <a href="/news">Volver a Noticias</a>
          </Button>
        </div>
      </div>
    );
  }

  const publishDate = new Date(news.date);
  const categoryData = newsData.categories.find(cat => cat.name === news.category);

  // Función para copiar URL al portapapeles
  const handleShare = async () => {
    if (!mounted) return;
    
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar: ', err);
      // Fallback para navegadores más antiguos
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Encabezado */}
        <header className="mb-8 border-b pb-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className={`bg-gradient-to-r ${categoryData?.color || 'from-gray-600 to-gray-800'} text-white px-3 py-1 rounded-full font-medium flex items-center gap-2`}>
              <BarChart3 className="w-4 h-4" />
              {news.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <TimeSincePublication publishDate={publishDate} />
            </div>
            <div 
              ref={authorContainerRef}
              className="flex items-center gap-1 text-cyan-500 font-medium transition-all duration-300"
            >
              <User className="w-4 h-4" />
              Por <span ref={authorTextRef} className="font-bold ml-1"></span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {news.readTime}
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {news.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleShare}
              disabled={!mounted}
            >
              <Share2 className="w-4 h-4" />
              {copied ? "¡Copiado!" : "Compartir"}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Ver Análisis
            </Button>
          </div>
        </header>

        {/* Imagen destacada */}
        <div className="aspect-video rounded-lg mb-8 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          {news.image ? (
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 flex items-center justify-center text-white">
              <div className="text-center p-8">
                <BarChart3 className="w-20 h-20 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">{news.category}</h3>
                <p className="text-lg opacity-90">Noticias actualizadas de Sopetrán</p>
              </div>
            </div>
          )}
          
          {news.featured && (
            <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              DESTACADA
            </div>
          )}
          
          {/* Badge de categoría en la imagen */}
          <div className="absolute bottom-4 left-4">
            <span className={`bg-gradient-to-r ${categoryData?.color || 'from-gray-600 to-gray-800'} text-white px-3 py-1 rounded-full font-medium text-sm`}>
              {news.category}
            </span>
          </div>
        </div>

        {/* Contenido */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div 
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </article>

        {/* Noticias relacionadas por categoría */}
        <section className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Más sobre {news.category}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {newsData.news
              .filter(item => item.category === news.category && item.id !== news.id)
              .slice(0, 2)
              .map(relatedNews => (
                <a 
                  key={relatedNews.id} 
                  href={`/news/${relatedNews.slug}`}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer block"
                >
                  <h4 className="font-bold mb-2 text-gray-900 dark:text-white">{relatedNews.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{relatedNews.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {relatedNews.readTime}
                  </div>
                </a>
              ))}
          </div>
        </section>

        {/* Sección "Sígueme" con Facebook */}
        <section className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Sígueme en Facebook
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Mantente al día con más noticias y actualizaciones sobre Sopetrán
            </p>
            <a
              href="https://www.facebook.com/santiago.bustamante.9809"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              <FaFacebook className="w-5 h-5" />
              Seguir en Facebook
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              @santiago.bustamante.9809
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}