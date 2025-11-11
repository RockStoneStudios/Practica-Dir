import { getLatestBusinessesFromDb, getUniqueCategoriesAndAddresses } from "@/actions/business";
import { BusinessState } from "@/utils/types/business";
import BusinessCard from "@/components/cards/business-card";
import Pagination from "@/components/nav/pagination";
import CategoryAddressCard from "@/components/cards/category-address-card";
import FilteredListCategorie from "@/components/search/filtered-categorie-list";
import { LayoutList } from "lucide-react";

interface BusinessesPageProps {
  searchParams: { page?: number };
}

export default async function Home({ searchParams }: BusinessesPageProps) {
  const page = searchParams?.page ? parseInt(searchParams.page as unknown as string, 10) : 1;
   const {uniqueCategories,uniqueAddresses} = await getUniqueCategoriesAndAddresses();
    
     const categories = Array.isArray(uniqueCategories) ? uniqueCategories : [];
     const addresses = Array.isArray(uniqueAddresses) ? uniqueAddresses : [];
  const limit = 6;
  const { businesses, totalCount } = await getLatestBusinessesFromDb(page, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-3 text-center">
          Negocios & Categorias
        </h1>
      </div>
      <div className="px-5 mb-8">
        <FilteredListCategorie 
          data={categories} 
          title="Categorias"
          icon={<LayoutList/>}
        />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ml-1">
        {businesses.map((business: BusinessState) => (
          // ✅ Simple y limpio - sin anidación de <a> tags
          <div key={business._id}>
            <BusinessCard business={business} />
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} />
      <CategoryAddressCard />
    </div>
  );
}