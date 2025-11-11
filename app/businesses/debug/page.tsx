// app/businesses/debug/page.tsx
import { getLatestBusinessesFromDb, getUniqueCategoriesAndAddresses } from "@/actions/business";

export default async function DebugPage() {
  try {
    console.log('=== DEBUG BUSINESSES PAGE ===');
    
    // Test 1: Categorías y direcciones
    console.log('Testing getUniqueCategoriesAndAddresses...');
    const categoriesResult = await getUniqueCategoriesAndAddresses();
    console.log('Categories result:', categoriesResult);
    
    // Test 2: Negocios
    console.log('Testing getLatestBusinessesFromDb...');
    const businessesResult = await getLatestBusinessesFromDb(1, 6);
    console.log('Businesses result:', businessesResult);
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Debug - Todo OK</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Categorías</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(categoriesResult, null, 2)}
            </pre>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Negocios</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(businessesResult, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
    
  } catch (error) {
    console.error('=== DEBUG ERROR ===', error);
    
    // Manejo seguro del error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Debug - ERROR</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Mensaje de error:</h2>
            <pre className="bg-red-100 p-4 rounded overflow-auto">
              {errorMessage}
            </pre>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Stack trace:</h2>
            <pre className="bg-red-100 p-4 rounded overflow-auto">
              {errorStack}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}