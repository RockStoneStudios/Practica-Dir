'use client';

import { BusinessState } from "@/utils/types/business";
import { Clock, Globe, Mail, Phone, MapPin } from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

// Componentes personalizados para los íconos
const NequiIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={`w-full h-full ${className}`}
  >
    <rect width="100" height="100" fill="none" />
    <rect x="-75" y="18" width="100" height="24" rx="2" fill="#ff007a" />
    <text
      x="62%"
      y="67%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="89"
      fontWeight="bold"
      fill="#ffffff"
      fontFamily="sans-serif"
    >
      N
    </text>
  </svg>
);

const BancolombiaIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 120"
    className={`w-full h-full ${className}`}
  >
    <rect width="120" height="120" fill="none" />
    <rect
      x="20"
      y="25"
      width="120"
      height="20"
      rx="4"
      fill="#0033A0"
      transform="rotate(-8 20 25)"
    />
    <rect
      x="20"
      y="58"
      width="305"
      height="20"
      rx="4"
      fill="#FFD100"
      transform="rotate(-6 20 50)"
    />
    <rect
      x="25"
      y="83"
      width="120"
      height="20"
      rx="4"
      fill="#D50032"
      transform="rotate(-4 25 75)"
    />
  </svg>
);

export default function BusinessHighlightCard({
  business,
}: {
  business: BusinessState;
}) {
  const iconsContainerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [pulsingIcon, setPulsingIcon] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Función para crear efecto de partículas
  const createParticleEffect = (element: HTMLElement, color: string) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 22; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = '5px';
      particle.style.height = '5px';
      particle.style.background = color;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '10001';
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.boxShadow = `0 0 6px ${color}`;

      document.body.appendChild(particle);

      const angle = (i / 8) * Math.PI * 2;
      const distance = 22 + Math.random() * 30;
      
      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 0.6 + Math.random() * 0.3,
        ease: "power2.out",
        onComplete: () => {
          if (document.body.contains(particle)) {
            document.body.removeChild(particle);
          }
        }
      });
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${field} copiado al portapapeles`);
  };

  const handleHoursClick = () => {
    if (business.hours) {
      toast.success(`Horario: ${business.hours}`, {
        duration: 4000,
        icon: '🕐',
      });
    }
  };

  const handleCopyClick = (e: React.MouseEvent, text: string, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    handleCopy(text, field);
  };

  const openWhatsApp = (phone: string) => {
    setTimeout(() => {
      window.open(`https://wa.me/57${phone}`, "_blank");
    }, 80);
  };

  const makePhoneCall = (phone: string) => {
    setTimeout(() => {
      window.open(`tel:+57${phone}`, "_self");
    }, 80);
  };

  const openExternalLink = (url: string) => {
    window.open(url, "_blank");
  };

  // Función para abrir Nequi con deep linking
  const openNequiApp = (phoneNumber: string) => {
    handleCopy(phoneNumber, "Número de Nequi");
    
    setTimeout(() => {
      const nequiDeepLink = `nequi://`;
      const startTime = Date.now();
      window.location.href = nequiDeepLink;
      
      setTimeout(() => {
        const elapsed = Date.now() - startTime;
        
        if (elapsed < 2500) {
          const userAgent = navigator.userAgent || navigator.vendor;
          
          if (/android/i.test(userAgent)) {
            window.open('https://play.google.com/store/apps/details?id=com.nequi.MobileApp', '_blank');
            toast.error('Nequi no está instalada. Abriendo Play Store...', {
              duration: 3000,
              icon: '📱'
            });
          } else if (/iPad|iPhone|iPod/.test(userAgent)) {
            window.open('https://apps.apple.com/co/app/nequi-colombia/id1123440641', '_blank');
            toast.error('Nequi no está instalada. Abriendo App Store...', {
              duration: 3000,
              icon: '📱'
            });
          } else {
            toast.success('Número copiado. Abre Nequi en tu dispositivo móvil.', {
              duration: 3000,
              icon: '💜'
            });
          }
        } else {
          toast.success('Abriendo Nequi... 💜', {
            duration: 2000
          });
        }
      }, 2000);
    }, 100);
  };

  // Función para abrir Bancolombia con deep linking
  const openBancolombiaApp = (accountNumber: string) => {
    handleCopy(accountNumber, "Cuenta de Bancolombia");
    
    setTimeout(() => {
      const bancolombiaDeepLink = `bancolombia://`;
      const startTime = Date.now();
      window.location.href = bancolombiaDeepLink;
      
      setTimeout(() => {
        const elapsed = Date.now() - startTime;
        
        if (elapsed < 2500) {
          const userAgent = navigator.userAgent || navigator.vendor;
          
          if (/android/i.test(userAgent)) {
            window.open('https://play.google.com/store/apps/details?id=com.bancolombia.personas', '_blank');
            toast.error('Bancolombia no está instalada. Abriendo Play Store...', {
              duration: 3000,
              icon: '📱'
            });
          } else if (/iPad|iPhone|iPod/.test(userAgent)) {
            window.open('https://apps.apple.com/co/app/bancolombia/id1446899970', '_blank');
            toast.error('Bancolombia no está instalada. Abriendo App Store...', {
              duration: 3000,
              icon: '📱'
            });
          } else {
            toast.success('Número copiado. Abre Bancolombia en tu dispositivo móvil.', {
              duration: 3000,
              icon: '💛'
            });
          }
        } else {
          toast.success('Abriendo Bancolombia... 💛', {
            duration: 2000
          });
        }
      }, 2000);
    }, 100);
  };
const isBasicosCategory = business?.category?.some((cat: string) => 
  cat.toLowerCase().startsWith('basicos/')
);

  // 🎯 Mapeo de íconos con ícono dinámico según categoría
  const iconConfig = [
    { 
      type: 'phone', 
      color: 'green',
      particleColor: '#25D366',
      icon: isBasicosCategory ? Phone : IoLogoWhatsapp,
      data: business.phone,
      action: (e: React.MouseEvent) => {
        if (business.phone) {
          handleCopyClick(e, business.phone, "Teléfono");
          
          if (isBasicosCategory) {
            makePhoneCall(business.phone);
          } else {
            openWhatsApp(business.phone);
          }
        }
      }
    },
    { 
      type: 'address', 
      color: 'cyan',
      particleColor: '#06B6D4',
      icon: MapPin,
      data: business.address,
      action: (e: React.MouseEvent) => {
        if (business.address) {
          handleCopyClick(e, business.address, "Dirección");
          openExternalLink(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`
          );
        }
      }
    },
    { 
      type: 'hours', 
      color: 'yellow',
      particleColor: '#EAB308',
      icon: Clock,
      data: business.hours,
      action: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleHoursClick();
      }
    },
    { 
      type: 'email', 
      color: 'red',
      particleColor: '#EF4444',
      icon: Mail,
      data: business.email,
      action: (e: React.MouseEvent) => {
        if (business.email) {
          handleCopyClick(e, business.email, "Email");
          openExternalLink(`mailto:${business.email}`);
        }
      }
    },
    { 
      type: 'website', 
      color: 'blue',
      particleColor: '#3B82F6',
      icon: Globe,
      data: business.website,
      action: (e: React.MouseEvent) => {
        if (business.website) {
          handleCopyClick(e, business.website, "Sitio web");
          const websiteUrl = business.website.startsWith('http') 
            ? business.website 
            : `https://${business.website}`;
          openExternalLink(websiteUrl);
        }
      }
    },
    { 
      type: 'nequi', 
      color: 'purple',
      particleColor: '#A855F7',
      icon: NequiIcon,
      data: business.nequi,
      action: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (business.nequi) {
          openNequiApp(business.nequi);
        }
      }
    },
    { 
      type: 'bancolombia', 
      color: 'white',
      particleColor: '#FFD700',
      icon: BancolombiaIcon,
      data: business.bancolombia,
      action: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (business.bancolombia) {
          openBancolombiaApp(business.bancolombia);
        }
      }
    },
  ];

  const getPredefinedStyles = (index: number, colorType: string) => {
    const isPulsing = pulsingIcon === index;
    
    const baseStyles = {
      green: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-green-600 dark:border-green-500/80 bg-green-500/40 dark:bg-green-500/30 dark:shadow-[0_0_20px_#00FF66] shadow-[0_0_8px_#00FF66] scale-125' 
            : 'border-green-500 dark:border-green-500/40 bg-green-500/20 dark:bg-green-500/10 dark:shadow-[0_0_8px_#00FF66] shadow-[0_0_4px_#00FF66]'
        } hover:shadow-[0_0_12px_#00FF66] dark:hover:shadow-[0_0_25px_#00FF66] hover:scale-110 hover:border-green-600 dark:hover:border-green-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-green-500 dark:text-green-200 hover:text-green-600 dark:hover:text-green-300' 
            : 'text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300'
        } hover:bg-green-500/30 dark:hover:bg-green-500/20`
      },
      cyan: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-cyan-600 dark:border-cyan-500/80 bg-cyan-500/40 dark:bg-cyan-500/30 dark:shadow-[0_0_20px_#00FFFF] shadow-[0_0_8px_#00FFFF] scale-125' 
            : 'border-cyan-500 dark:border-cyan-500/40 bg-cyan-500/20 dark:bg-cyan-500/10 dark:shadow-[0_0_8px_#00FFFF] shadow-[0_0_4px_#00FFFF]'
        } hover:shadow-[0_0_12px_#00FFFF] dark:hover:shadow-[0_0_25px_#00FFFF] hover:scale-110 hover:border-cyan-600 dark:hover:border-cyan-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-cyan-500 dark:text-cyan-200 hover:text-cyan-600 dark:hover:text-cyan-300' 
            : 'text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300'
        } hover:bg-cyan-500/30 dark:hover:bg-cyan-500/20`
      },
      yellow: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
          isPulsing
            ? 'border-yellow-500 dark:border-yellow-400/80 bg-yellow-100 dark:bg-yellow-900/40 shadow-[0_0_20px_#FACC15] scale-125'
            : 'border-yellow-400 dark:border-yellow-500/50 bg-yellow-50 dark:bg-yellow-900/30 shadow-[0_0_8px_#FACC15]'
        } hover:shadow-[0_0_12px_#FACC15] dark:hover:shadow-[0_0_25px_#FACC15] hover:scale-110 hover:border-yellow-500 dark:hover:border-yellow-400/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing
            ? 'text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300'
            : 'text-yellow-500 dark:text-yellow-300 hover:text-yellow-600 dark:hover:text-yellow-200'
        } hover:bg-yellow-100 dark:hover:bg-yellow-200/20`
      },
      white: {
  container: `border rounded-full backdrop-blur-md transition-all duration-300 ${
    isPulsing
      ? 'border-yellow-400 dark:border-yellow-500/80 bg-yellow-100 dark:bg-yellow-900/40 shadow-[0_0_20px_#FACC15] scale-125'  // 👈 Mantiene amarillo en pulso
      : 'border-white/60 dark:border-white/50 bg-white/40 dark:bg-white/60 shadow-[0_0_8px_#FFFFFF,0_0_16px_#FFFFFF40]'  // 👈 Blanco en estado normal
  } hover:shadow-[0_0_15px_#FFFFFF,0_0_25px_#FFFFFF60] dark:hover:shadow-[0_0_20px_#FFFFFF,0_0_35px_#FFFFFF80] hover:scale-110 hover:border-white dark:hover:border-white/70`,  // 👈 Blanco en hover
  button: `rounded-full w-10 h-10 bg-transparent ${
    isPulsing
      ? 'text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300'  // 👈 Amarillo en pulso
      : 'text-white/90 dark:text-white hover:text-white dark:hover:text-white'  // 👈 Blanco en estado normal y hover
  } hover:bg-white/20 dark:hover:bg-white/30`
},
      red: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-red-600 dark:border-red-500/80 bg-red-500/40 dark:bg-red-500/30 dark:shadow-[0_0_20px_#FF4444] shadow-[0_0_8px_#FF4444] scale-125' 
            : 'border-red-500 dark:border-red-500/40 bg-red-500/20 dark:bg-red-500/10 dark:shadow-[0_0_8px_#FF4444] shadow-[0_0_4px_#FF4444]'
        } hover:shadow-[0_0_12px_#FF4444] dark:hover:shadow-[0_0_25px_#FF4444] hover:scale-110 hover:border-red-600 dark:hover:border-red-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-red-500 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300' 
            : 'text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300'
        } hover:bg-red-500/30 dark:hover:bg-red-500/20`
      },
      blue: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-blue-600 dark:border-blue-500/80 bg-blue-500/40 dark:bg-blue-500/30 dark:shadow-[0_0_20px_#4444FF] shadow-[0_0_8px_#4444FF] scale-125' 
            : 'border-blue-500 dark:border-blue-500/40 bg-blue-500/20 dark:bg-blue-500/10 dark:shadow-[0_0_8px_#4444FF] shadow-[0_0_4px_#4444FF]'
        } hover:shadow-[0_0_12px_#4444FF] dark:hover:shadow-[0_0_25px_#4444FF] hover:scale-110 hover:border-blue-600 dark:hover:border-blue-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-blue-500 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300' 
            : 'text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300'
        } hover:bg-blue-500/30 dark:hover:bg-blue-500/20`
      },
      purple: {
        container: `border rounded-full backdrop-blur-md transition-all duration-300 bg-gray-800/20 dark:bg-transparent ${
          isPulsing 
            ? 'border-purple-600 dark:border-purple-500/80 bg-purple-500/40 dark:bg-purple-500/30 dark:shadow-[0_0_20px_#A855F7] shadow-[0_0_8px_#A855F7] scale-125' 
            : 'border-purple-500 dark:border-purple-500/40 bg-purple-500/20 dark:bg-purple-500/10 dark:shadow-[0_0_8px_#A855F7] shadow-[0_0_4px_#A855F7]'
        } hover:shadow-[0_0_12px_#A855F7] dark:hover:shadow-[0_0_25px_#A855F7] hover:scale-110 hover:border-purple-600 dark:hover:border-purple-500/60`,
        button: `rounded-full w-10 h-10 bg-transparent ${
          isPulsing 
            ? 'text-purple-500 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-300' 
            : 'text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300'
        } hover:bg-purple-500/30 dark:hover:bg-purple-500/20`
      }
    };

    return baseStyles[colorType as keyof typeof baseStyles] || baseStyles.green;
  };

  useLayoutEffect(() => {
    setIsMounted(true);
    
    if (!iconsContainerRef.current) return;
    
    const ctx = gsap.context(() => {
      const visibleIcons = iconsRef.current.filter(icon => icon !== null);
      
      if (visibleIcons.length > 0) {
        gsap.from(visibleIcons, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.3
        });

        gsap.to(visibleIcons, {
          y: -8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;

    const iconsCount = iconsRef.current.filter(icon => icon !== null).length;
    if (iconsCount === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * iconsCount);
      setPulsingIcon(randomIndex);

      const pulsingIcon = iconsRef.current[randomIndex];
      if (pulsingIcon) {
        gsap.to(pulsingIcon, {
          scale: 1.2,
          duration: 0.4,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });

        // 🔥 AGREGAR PARTÍCULAS DURANTE EL PULSO ALEATORIO
        const config = iconConfig[randomIndex];
        if (config && config.particleColor) {
          createParticleEffect(pulsingIcon, config.particleColor);
        }
      }

      setTimeout(() => {
        setPulsingIcon(null);
      }, 800);

    }, 4000);

    return () => clearInterval(interval);
  }, [isMounted]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    iconsRef.current[index] = el;
  };

  const visibleIcons = iconConfig.filter(icon => icon.data && icon.data.trim() !== '');

  if (!isMounted) {
    return (
      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] flex flex-col gap-2">
        {visibleIcons.map((icon, index) => (
          <div key={icon.type} className="border rounded-full bg-gray-500/10 backdrop-blur-md w-10 h-10 animate-pulse" />
        ))}
      </div>
    );
  }

  if (visibleIcons.length === 0) {
    return null;
  }

  return (
    <div 
      className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] flex flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      {visibleIcons.map((icon, index) => {
        const IconComponent = icon.icon;
        const styles = getPredefinedStyles(index, icon.color);
        
        const getTitle = () => {
          if (icon.type === 'phone') {
            return isBasicosCategory 
              ? `Llamar: ${business.phone}`
              : `WhatsApp: ${business.phone}`;
          }
          return icon.type === 'address' ? `Ver ubicación en Google Maps: ${business.address}` :
                 icon.type === 'hours' ? `Horario: ${business.hours}` :
                 icon.type === 'email' ? `Enviar email: ${business.email}` :
                 icon.type === 'website' ? `Visitar sitio web: ${business.website}` :
                 icon.type === 'nequi' ? `Abrir Nequi: ${business.nequi}` :
                 `Abrir Bancolombia: ${business.bancolombia}`;
        };

        return (
          <div 
            key={icon.type}
            ref={el => addToRefs(el, index)}
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="ghost"
              className={styles.button}
              onClick={icon.action}
              title={getTitle()}
              type="button"
            >
              {/* 📱 ICONO DE WHATSAPP MÁS GRANDE */}
              {icon.type === 'phone' && !isBasicosCategory ? (
                <IconComponent className="size-5" /> // 👈 Tamaño más grande para WhatsApp
              ) : (
                <IconComponent className="size-4" />
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
}