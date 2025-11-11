"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, ArrowRight, Eye, Store } from "lucide-react";
import Link from "next/link";
import newsData from '@/data/news.json';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

// Componente para letras neón con GSAP
// Versión alternativa más simple
function NeonText({ text }: { text: string }) {
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada
      gsap.fromTo(lettersRef.current,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }
      );

      // Animación de pulso con fromTo alternativo
      lettersRef.current.forEach((letter, index) => {
        gsap.fromTo(letter,
          {
            textShadow: "0 0 5px #00f, 0 0 10px #00f, 0 0 15px #00f"
          },
          {
            textShadow: "0 0 10px #00f, 0 0 20px #00f, 0 0 30px #00f",
            duration: 1,
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.5,
            delay: index * 0.1,
            ease: "sine.inOut"
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el);
    }
  };

  return (
    <div className="flex space-x-0.5">
      {text.split('').map((letter, index) => (
        <span
          key={index}
          ref={addToRefs}
          className="text-sm font-mono font-bold text-blue-400 dark:text-cyan-300"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
}

// Componente para animación de tarjetas con GSAP
function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: delay,
          ease: "power3.out"
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return <div ref={cardRef}>{children}</div>;
}

export default function NewsPage() {
  const featuredNews = newsData.news.filter(news => news.featured).slice(0, 3);
  const categories = newsData.categories;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título principal
      gsap.fromTo(".main-title",
        {
          opacity: 0,
          y: -50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Animación de las estadísticas
      gsap.fromTo(".stats-card",
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.5,
          ease: "back.out(1.2)"
        }
      );

      // Animación de hover para todas las tarjetas
      gsap.utils.toArray(".news-card").forEach((card: any) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="main-title text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Noticias de Sopetrán
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Mantente al día con lo último que ocurre en nuestro municipio: eventos culturales, 
            desarrollos locales, comercio, turismo y comunidad.
          </p>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="stats-card">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$45.504M</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Presupuesto Municipal 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="stats-card">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                    <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">3.472</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Récord de Visitas Simultáneas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="stats-card">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-full">
                    <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">+12%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Crecimiento Comercio Digital</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Categorías de Noticias */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Explorar por Categoría
            </h2>
            <Button variant="outline" asChild>
              <Link href="/news/all">
                Ver todas las noticias <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const categoryNews = newsData.news.filter(news => news.category === category.name);
              const latestNews = categoryNews[0];
              
              return (
                <AnimatedCard key={category.id} delay={index * 0.1}>
                  <Link href={`/news/category/${category.id}`}>
                    <Card className="news-card h-full cursor-pointer transform transition-all duration-300 border-2">
                      <CardHeader className={`bg-gradient-to-r ${category.color} p-6`}>
                        <CardTitle className="text-white text-xl flex items-center justify-between">
                          {category.name}
                          <span className="text-white/80 text-sm bg-white/20 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        {latestNews && (
                          <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                              {latestNews.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {latestNews.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <NeonText text={latestNews.author} />
                              <span>{latestNews.readTime}</span>
                            </div>
                          </div>
                        )}
                        <Button variant="ghost" size="sm" className="w-full mt-4">
                          Ver categoría <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedCard>
              );
            })}
          </div>
        </section>

        {/* Noticias Destacadas */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">
            Noticias Destacadas
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredNews.map((news, index) => (
              <AnimatedCard key={news.id} delay={index * 0.15}>
                <Link href={`/news/${news.slug}`}>
                  <Card className="news-card h-full cursor-pointer transform transition-all duration-300 border">
                    <CardContent className="p-0">
                      {/* Imagen desde el JSON */}
                      <div className="aspect-video relative bg-gray-200 dark:bg-gray-700">
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${categories.find(c => c.name === news.category)?.color || 'from-gray-600 to-gray-800'} text-white`}>
                            {news.category}
                          </span>
                          <span className="text-xs text-gray-500">{news.readTime}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                          {news.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <NeonText text={`Por ${news.author}`} />
                          <span>{new Date(news.date).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <AnimatedCard delay={0.8}>
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2">¿Te gusta estar informado?</h3>
              <p className="text-blue-100 mb-4">
                Descubre todas las noticias que tenemos para ti en Sopetrán
              </p>
              <Button asChild variant="secondary" size="lg">
                <Link href="/news/all">
                  Explorar Todas las Noticias <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </div>
  );
}