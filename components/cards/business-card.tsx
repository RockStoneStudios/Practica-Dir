// components/cards/business-card.tsx
'use client';

import { useRouter } from "next/navigation";

interface BusinessCardProps {
  business: any;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/business/${business.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-2xl mx-auto h-[300px] flex flex-col cursor-pointer border rounded-lg shadow hover:shadow-lg transition-shadow p-4 bg-white"
    >
      <div className="flex items-center space-x-4 pb-3">
        <div className="w-20 h-20 bg-gray-300 rounded-xl flex items-center justify-center">
          <span className="text-xs text-gray-500">Logo</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold truncate">{business?.name || "Negocio"}</h3>
          <p className="text-sm text-gray-600 truncate">{business?.categories?.[0] || "Categoría"}</p>
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100">Activo</span>
      </div>

      <div className="flex-1 space-y-1 text-sm text-gray-600">
        {business?.description && (
          <p className="line-clamp-2">
            {business.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
          </p>
        )}
        <div>Dirección: {business?.address || "—"}</div>
        <div>Teléfono: {business?.phone || "—"}</div>
        <div>Email: {business?.email || "—"}</div>
        <div>Horario: {business?.hours || "—"}</div>
      </div>
    </div>
  );
};

export default BusinessCard;