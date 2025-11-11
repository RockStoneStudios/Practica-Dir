'use client';

import { BusinessState } from "@/utils/types/business";
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { DescriptionCard } from "./description-card";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function SingleBusinessPage({ business }: { business: BusinessState }) {
  const hoursRef = useRef<HTMLParagraphElement>(null);
  const instagramRef = useRef<HTMLAnchorElement>(null);
  const facebookRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    if (!hoursRef.current || !business?.hours) return;

    const ctx = gsap.context(() => {
      // Animación de entrada
      gsap.fromTo(hoursRef.current,
        {
          scale: 0.8,
          opacity: 0,
          x: 20
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3
        }
      );

      // Animación de respiración continua - AUMENTAR y DISMINUIR tamaño
      gsap.to(hoursRef.current, {
        scale: 1.05, // Aumenta a 105%
        duration: 2,  // 2 segundos para aumentar
        repeat: -1,   // Repetir infinitamente
        yoyo: true,   // Ir y volver (aumentar y disminuir)
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert();
  }, [business?.hours]);

  useEffect(() => {
    // Animación para el texto "Síguenos"
    gsap.to("#sigueme-text", {
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Función para crear efecto de neón aleatorio
    const createRandomNeonEffect = (element: HTMLElement | null, color: string) => {
      if (!element) return;

      const timeline = gsap.timeline({ repeat: -1, repeatDelay: Math.random() * 3 + 2 });
      
      // Estados aleatorios para el efecto de neón
      const effects = [
        { scale: 1.1, filter: `drop-shadow(0 0 5px ${color}) brightness(1.3)` },
        { scale: 1.15, filter: `drop-shadow(0 0 8px ${color}) brightness(1.5)` },
        { scale: 1.2, filter: `drop-shadow(0 0 12px ${color}) brightness(1.8)` },
        { scale: 1.1, filter: `drop-shadow(0 0 6px ${color}) brightness(1.4)` }
      ];

      // Agregar animaciones aleatorias
      effects.forEach((effect, index) => {
        timeline.to(element, {
          ...effect,
          duration: 0.8 + Math.random() * 0.7,
          ease: "sine.inOut",
          delay: index === 0 ? 0 : Math.random() * 1
        });
      });

      return timeline;
    };

    // Aplicar efectos a los iconos
    const instagramTimeline = createRandomNeonEffect(
      instagramRef.current, 
      '#E1306C' // Color rosa de Instagram
    );
    
    const facebookTimeline = createRandomNeonEffect(
      facebookRef.current, 
      '#1877F2' // Color azul de Facebook
    );

    // Cleanup function
    return () => {
      instagramTimeline?.kill();
      facebookTimeline?.kill();
    };
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0">
      {/* Header SOLO con logo, título, categoría y horario */}
      <CardHeader className="flex flex-col lg:flex-row items-start gap-6 pb-6 px-6 pt-6">
        {/* Logo */}
        <div className="w-60 lg:w-64 h-25 lg:h-30 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 border">
          {business?.logo ? (
            <Image
              src={business.logo}
              alt={business.name || "Logo del negocio"}
              width={286}
              height={200}
              className=" object-contain"
              priority={true}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Logo</span>
            </div>
          )}
        </div>

        {/* SOLO título, categoría y horario */}
        <div className="flex-1 min-w-0 w-full space-y-4">
          {/* Nombre y categoría */}
          <div>
            <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-200 line-clamp-2">
              {business?.name || "Nombre de Negocio"}
            </CardTitle>
            <p className="text-lg text-blue-600 font-semibold mt-2">
              {business?.category || "Categoria"}
            </p>
          </div>
          
          {/* Horario con animación GSAP */}
          {business?.hours && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600 dark:text-white-600" />
              <p
                ref={hoursRef}
                className="text-sm text-gray-700 dark:text-gray-300 font-semibold inline-block" // inline-block para que la animación funcione mejor
              >
                {business.hours}
              </p>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 space-y-6">
        {/* Descripción */}
        <DescriptionCard description={business?.description} />

        {/* Redes sociales */}
        {(business?.instagram || business?.facebook) && (
          <div className="flex flex-col items-center pt-4 border-t">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" id="sigueme-text">
              Síguenos
            </span>
            
            <div className="flex space-x-4">
              {business?.instagram && (
                <a
                  ref={instagramRef}
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 text-xl transition-all duration-350"
                  style={{
                    filter: 'brightness(1)'
                  }}
                >
                  <IoLogoInstagram />
                </a>
              )}
              {business?.facebook && (
                <a
                  ref={facebookRef}
                  href={business.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-xl transition-all duration-200"
                  style={{
                    filter: 'brightness(1)'
                  }}
                >
                  <FaFacebookSquare />
                </a>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}