// app/page.tsx
import { getLatestBusinessesFromDb, getUniqueCategoriesAndAddresses } from "@/actions/business";
import { BusinessState } from "@/utils/types/business";
import BusinessCard from "@/components/cards/business-card";
import Pagination from "@/components/nav/pagination";
import CategoryAddressCard from "@/components/cards/category-address-card";
import FilteredListCategorie from "@/components/search/filtered-categorie-list";
import { LayoutList } from "lucide-react";

interface BusinessesPageProps {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: BusinessesPageProps) {
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));
  const limit = 6;

  // Server-side data fetching
  const [{ businesses, totalCount }, { uniqueCategories, uniqueAddresses }] = await Promise.all([
    getLatestBusinessesFromDb(page, limit),
    getUniqueCategoriesAndAddresses(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-5">
        <h1 className="text-3xl font-bold text-center mb-6">Directorio Sopetrán</h1>
      </div>

      {/* Categorías (Client Component) */}
      <div className="px-5 mb-8">
        <FilteredListCategorie
          data={Array.isArray(uniqueCategories) ? uniqueCategories : []}
          title="Categorías"
         
        />
      </div>

      {/* Grid de negocios */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {businesses.map((business: BusinessState) => (
          <div key={business._id} className="flex">
            <BusinessCard business={business} />
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-10 flex justify-center">
        <Pagination page={page} totalPages={totalPages} />
      </div>

      {/* Footer Card */}
      <div className="mt-12 px-5">
        <CategoryAddressCard />
      </div>
    </div>
  );
}