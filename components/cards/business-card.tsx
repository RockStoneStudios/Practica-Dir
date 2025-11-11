'use client';
import { BusinessState } from "@/utils/types/business";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import Image from "next/image";
import { useBusiness } from "@/context/business";
import DescriptionModal from "@/components/modals/description-modal";
import { isBusinessOpen } from "@/helper/Helper";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const BusinessCard = ({ business }: { business: BusinessState }) => {
  const open = business?.hours ? isBusinessOpen(business.hours) : false;
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  const {
    openDescriptionModal,
    setOpenDescriptionModal,
    isEditPage,
    loading,
    isDashboardPage,
    togglePublished,
  } = useBusiness();

  // Efectos de hover simples sin GSAP
  useEffect(() => {
    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    const instagram = document.querySelector('.instagram-icon');
    const facebook = document.querySelector('.facebook-icon');

    if (instagram) {
      instagram.addEventListener('mouseenter', handleHover);
      instagram.addEventListener('mouseleave', handleUnhover);
    }

    if (facebook) {
      facebook.addEventListener('mouseenter', handleHover);
      facebook.addEventListener('mouseleave', handleUnhover);
    }

    return () => {
      if (instagram) {
        instagram.removeEventListener('mouseenter', handleHover);
        instagram.removeEventListener('mouseleave', handleUnhover);
      }
      if (facebook) {
        facebook.removeEventListener('mouseenter', handleHover);
        facebook.removeEventListener('mouseleave', handleUnhover);
      }
    };
  }, []);

  // Función para manejar el click en la card
  const handleCardClick = () => {
    router.push(`/business/${business.slug}`);
  };

  // Función para limpiar HTML y extraer solo texto
  const cleanDescription = (html: string) => {
    if (!html) return '';
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 100);
  };

  // Función para acortar URLs largas
  const shortenUrl = (url: string) => {
    if (!url) return '';
    const cleanUrl = url.replace(/^https?:\/\//, '');
    if (cleanUrl.length > 30) {
      return cleanUrl.substring(0, 30) + '...';
    }
    return cleanUrl;
  };

  // Función para evitar que el click en enlaces propague al contenedor
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card 
      className="w-full max-w-2xl mx-auto h-[340px] flex flex-col cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
      onClick={handleCardClick}
    >
      {/* Header más grande y prominente */}
      <CardHeader className="flex flex-row items-center space-x-4 pb-3 flex-shrink-0">
        <div className="rounded-xl overflow-hidden">
          {business?.logo ? (
            <Image
              src={business?.logo}
              alt={business?.name}
              width={75}
              height={75}
              className="rounded-xl object-contain"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-xl">
              <span className="text-gray-500 text-sm">No logo</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-xl font-bold line-clamp-1">
            {business?.name || "Nombre Negocio"}
          </CardTitle>
          <p className="text-base text-muted-foreground line-clamp-1">
            {business?.category?.[0] || "Categoria"} {/* Cambié category por categories[0] */}
          </p>
        </div>
        <span
          className={`font-bold text-sm px-2 py-1 rounded ${
            open ? "text-green-600" : "text-red-600"
          }`}
        >
          {open ? "Abierto" : "Cerrado"}
        </span>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-0 px-6 pb-4">
        {/* Descripción compacta */}
        {business?.description && (
          <div className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">
            {cleanDescription(business.description)}
          </div>
        )}

        {/* Información de contacto - UNA SOLA COLUMNA */}
        <div className="space-y-2 flex-1">
          <InfoItem icon={MapPin} text={business?.address || "Dirección"} />
          <InfoItem icon={Phone} text={business?.phone || "Teléfono"} />
          <InfoItem icon={Mail} text={business?.email || "Email"} />
          
          {business?.website ? (
            <div className="flex items-center text-sm" onClick={handleLinkClick}>
              <Globe className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline line-clamp-1 text-sm"
                title={business.website}
              >
                {shortenUrl(business.website)}
              </a>
            </div>
          ) : (
            <InfoItem icon={Globe} text="Website" />
          )}

          <InfoItem icon={Clock} text={business?.hours || "Horario"} />
        </div>

        {/* Redes sociales con efectos CSS nativos */}
        <div className="flex justify-end space-x-4 pt-3 mt-auto border-t" onClick={handleLinkClick}>
          {business?.instagram && (
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`instagram-icon text-pink-600 text-lg transition-all duration-300 ${
                isHovering ? 'scale-110 filter drop-shadow(0 0 8px #E1306C) brightness(1.3)' : 'scale-100'
              }`}
            >
              <IoLogoInstagram />
            </a>
          )}
          {business?.facebook && (
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`facebook-icon text-blue-600 text-lg transition-all duration-300 ${
                isHovering ? 'scale-110 filter drop-shadow(0 0 8px #1877F2) brightness(1.3)' : 'scale-100'
              }`}
            >
              <FaFacebookSquare />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

function InfoItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-start text-sm">
      <Icon className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
      <span className="line-clamp-2 text-sm leading-tight">{text}</span>
    </div>
  );
}

export default BusinessCard;