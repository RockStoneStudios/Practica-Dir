'use client';
import { useRouter } from "next/navigation";

const BusinessCard = ({ business }: { business: any }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/business/${business.slug}`);
  };

  return (
    <div 
      className="w-full max-w-2xl mx-auto h-[300px] flex flex-col cursor-pointer border rounded-lg shadow hover:shadow-lg transition-shadow p-4 bg-white"
      onClick={handleCardClick}
    >
      {/* Header simple */}
      <div className="flex flex-row items-center space-x-4 pb-3 flex-shrink-0">
        <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-xl">
          <span className="text-gray-500 text-sm">Logo</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold line-clamp-1">
            {business?.name || "Nombre Negocio"}
          </h3>
          <p className="text-base text-gray-600 line-clamp-1">
            {business?.categories?.[0] || "Categoria"}
          </p>
        </div>
        <span className="font-bold text-sm px-2 py-1 rounded bg-gray-100">
          Estado
        </span>
      </div>

      {/* Información básica */}
      <div className="flex flex-col flex-1 space-y-2">
        {business?.description && (
          <div className="text-sm text-gray-600 line-clamp-2 flex-1">
            {business.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
          </div>
        )}
        
        <div className="space-y-1 text-sm">
          <div>📍 {business?.address || "Dirección"}</div>
          <div>📞 {business?.phone || "Teléfono"}</div>
          <div>✉️ {business?.email || "Email"}</div>
          <div>🕒 {business?.hours || "Horario"}</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;