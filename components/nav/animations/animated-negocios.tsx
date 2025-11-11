// 📁 ARCHIVO: components/nav/animated-negocios-link.tsx
"use client";

import React, { useRef, useEffect } from 'react';
import { MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import Link from 'next/link';
import { Handshake } from 'lucide-react';
import { gsap } from 'gsap';

export default function AnimatedNegociosLink() {
  const containerRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLSpanElement>(null);

  // Palabra "NEGOCIOS" dividida en letras
  const word = "NEGOCIOS";
  
  // Función para asignar las referencias correctamente
  const setLetterRef = (index: number) => (el: HTMLSpanElement | null) => {
    lettersRef.current[index] = el;
  };
  
  useEffect(() => {
    // Animación inicial de entrada
    const tl = gsap.timeline({ delay: 0.3 });
    
    if (containerRef.current && iconRef.current && textContainerRef.current) {
      tl.fromTo(
        iconRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.5)" }
      ).fromTo(
        lettersRef.current,
        { 
          opacity: 0, 
          y: 15,
          textShadow: "0 0 0px #10ff30"
        },
        { 
          opacity: 1, 
          y: 0,
          textShadow: "0 0 0px #10ff30",
          duration: 0.6,
          ease: "back.out(1.5)",
          stagger: 0.08
        },
        "-=0.3"
      );
    }

    // Animación de recorrido neón (se activa periódicamente)
    const neonAnimation = gsap.timeline({ repeat: -1, repeatDelay: 2.57 });
    
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        neonAnimation
          .to(letter, {
            textShadow: `
              0 0 20px #10ff30,
              0 0 40px #10ff30,
              0 0 60px #00ff00,
              0 0 80px #00ff00
            `,
            color: "#10ff30",
            scale: 1.1,
            duration: 0.1,
            ease: "power2.out"
          })
          .to(letter, {
            textShadow: "0 0 0px #10ff30",
            color: "#065f46",
            scale: 1,
            duration: 0.3,
            ease: "power2.in"
          }, "+=0.08");
      }
    });

    // Hover animations - Efecto neón completo al hover
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      // Pausar animación automática
      neonAnimation.pause();

      // Icono efecto neón brillante
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1.3,
          rotate: 16,
          color: "#10ff30",
          filter: "drop-shadow(0 0 15px #10ff30)",
          duration: 0.3,
          ease: "back.out(2)"
        });
      }

      // Activar efecto neón en TODAS las letras simultáneamente
      lettersRef.current.forEach((letter) => {
        if (letter) {
          gsap.to(letter, {
            textShadow: `
              0 0 25px #10ff30,
              0 0 50px #10ff30,
              0 0 75px #00ff00,
              0 0 100px #00ff00
            `,
            color: "#10ff30",
            scale: 1.08,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });

      // Glow background intenso
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.8,
          scale: 1.2,
          backgroundColor: "#10ff30",
          duration: 0.4,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      // Reanudar animación automática
      neonAnimation.restart();

      // Restaurar icono
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1,
          rotate: 0,
          color: "#065f46",
          filter: "none",
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Apagar efecto neón de todas las letras
      lettersRef.current.forEach((letter, index) => {
        if (letter) {
          gsap.to(letter, {
            delay: index * 0.02,
            textShadow: "0 0 0px #10ff30",
            color: "#065f46",
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });

      // Apagar glow
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          scale: 1,
          duration: 0.3
        });
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      neonAnimation.kill();
    };
  }, []);

  return (
    <MenubarMenu>
      <MenubarTrigger 
        ref={containerRef}
        className='text-base font-normal relative group cursor-pointer overflow-visible bg-transparent'
      >
        <Link href="/businesses" className='relative'>
          <span className='flex items-center gap-2 relative z-10'>
            {/* Glow effect intenso */}
            <div 
              ref={glowRef}
              className="absolute inset-0 bg-green-400/40 rounded-lg blur-xl opacity-0 transition-all"
              style={{ zIndex: -1 }}
            />

            {/* Icono animado */}
            <Handshake 
              ref={iconRef}
              size={16} 
              className='transition-all duration-200'
              style={{ color: '#065f46' }}
            />

            {/* Texto animado - CADA LETRA INDIVIDUAL */}
            <span 
              ref={textContainerRef}
              className="flex items-center font-medium"
              style={{ 
                fontSize: '14px', 
                fontWeight: '500',
                letterSpacing: '0.02em'
              }}
            >
              {word.split('').map((letter, index) => (
                <span
                  key={index}
                  ref={setLetterRef(index)}
                  className="inline-block transition-all duration-150"
                  style={{ 
                    color: '#065f46',
                    textShadow: '0 0 0px #10ff30',
                    transform: 'scale(1)'
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </span>
        </Link>

        {/* Línea inferior neón */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 via-#10ff30 to-green-400 group-hover:w-full transition-all duration-400 ease-out shadow-lg shadow-green-400/60"></div>
      </MenubarTrigger>
    </MenubarMenu>
  );
}