// Business Model - CORREGIDO
import mongoose from "mongoose";

// ✅ Todas las categorías válidas
const VALID_CATEGORIES = [
  // Comidas
  'comidas/restaurante',
  'comidas/rapida',
  'comidas/saludable',
  'comidas/internacional',
  'comidas/tipica',
  'comidas/postres',
  'comidas/panaderia',
  // Bebidas
  'bebidas/cafe',
  'bebidas/bar',
  'bebidas/cerveceria',
  'bebidas/jugueria',
  'bebidas/cocteleria',
  'bebidas/heladeria',
  // Compras
  'compras/supermercado',
  'compras/tienda',
  'compras/boutique',
  'compras/zapateria',
  'compras/ferreteria',
  'compras/libreria',
  'compras/floristeria',
  // Servicios
  'servicios/peluqueria',
  'servicios/lavanderia',
  'servicios/reparaciones',
  'servicios/limpieza',
  'servicios/fotografia',
  'servicios/eventos',
  // Salud
  'salud/farmacia',
  'salud/clinica',
  'salud/consultorio',
  'salud/optica',
  'salud/laboratorio',
  'salud/veterinaria',
  // Entretenimiento
  'entretenimiento/bar',
  'entretenimiento/discoteca',
  'entretenimiento/casino',
  'entretenimiento/billares',
  'entretenimiento/karaoke',
  'entretenimiento/teatro',
  // Hospedaje
  'hospedaje/hotel',
  'hospedaje/hostal',
  'hospedaje/cabana',
  'hospedaje/apartamento',
  'hospedaje/finca',
  // Transporte
  'transporte/taxi',
  'transporte/mototaxi',
  'transporte/bus',
  'transporte/remolque',
  'transporte/mensajeria',
  // Básicos
  'basicos/policia',
  'basicos/bomberos',
  'basicos/hospital',
  'basicos/alcaldia',
  'basicos/notaria',
  'basicos/banco',
  // Tecnología
  'tecnologia/reparacion-celular',
  'tecnologia/computadores',
  'tecnologia/accesorios',
  'tecnologia/software',
  'tecnologia/internet',
  // Educación
  'educacion/colegio',
  'educacion/academia',
  'educacion/cursos',
  'educacion/tutorias',
  'educacion/idiomas',
  'educacion/musica',
  // Deportes
  'deportes/gimnasio',
  'deportes/cancha',
  'deportes/piscina',
  'deportes/tienda-deportes',
  'deportes/entrenador',
] as const;

const BusinessSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  
  // ✅ ARRAY de categorías validadas - ELIMINADO index: true
  categories: { 
    type: [String], // Array de strings
    required: true,
    validate: {
      validator: function(arr: string[]) {
        // Al menos una categoría
        if (arr.length === 0) return false;
        // Todas las categorías deben ser válidas
        return arr.every(cat => VALID_CATEGORIES.includes(cat as any));
      },
      message: 'Categoría inválida o array vacío'
    }
    // ❌ ELIMINADO: index: true - causa duplicado con schema.index()
  },
  
  description: String,
  address: String,
  phone: String,
  email: String,
  website: String,
  hours: String,
  logo: String,
  facebook: { type: String, required: false },
  instagram: { type: String, required: false },
  nequi: { type: String, required: false },
  bancolombia: { type: String, required: false },
  slug: { type: String, required: true, lowercase: true, unique: true },
  published: { type: Boolean, default: true },
  
  // Campos adicionales
  verified: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
}, {
  timestamps: true
});

// ✅ Índices optimizados para arrays - SOLO UNA VEZ
BusinessSchema.index({ categories: 1 }); // Índice básico para arrays
BusinessSchema.index({ categories: 1, featured: -1, views: -1 }); // Índice compuesto
BusinessSchema.index({ categories: "text", name: "text", address: "text" }); // Índice de texto

// ✅ Método helper para obtener categoría principal (primera del array)
BusinessSchema.methods.getPrimaryCategory = function() {
  if (this.categories && this.categories.length > 0) {
    const [main, sub] = this.categories[0].split('/');
    return { main, sub, full: this.categories[0] };
  }
  return { main: '', sub: '', full: '' };
};

// ✅ Método helper para obtener todas las categorías principales únicas
BusinessSchema.methods.getMainCategories = function() {
  const mainCats = this.categories.map((cat: string) => cat.split('/')[0]);
  return Array.from(new Set(mainCats)); // Remover duplicados
};

// ✅ Método estático para buscar por cualquier categoría principal
BusinessSchema.statics.findByMainCategory = function(mainCategory: string) {
  const regex = new RegExp(`^${mainCategory}/`);
  return this.find({ categories: regex, published: true });
};

const Business = mongoose.models.Business || mongoose.model("Business", BusinessSchema);

export default Business;