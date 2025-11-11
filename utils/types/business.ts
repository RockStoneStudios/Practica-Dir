export interface BusinessState {
  _id: string;
  userEmail: string;
  name: string;
  category: string[]; // 👈 Ahora almacena "comidas/restaurante", "bebidas/cafe", etc.
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  hours: string;
  logo: string;
  slug: string;
  nequi: string;
  bancolombia: string;
  published?: boolean;
  verified?: boolean; // 👈 Nuevo campo del schema
  featured?: boolean; // 👈 Nuevo campo del schema
  views?: number;     // 👈 Nuevo campo del schema
  rating?: number;    // 👈 Nuevo campo del schema
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// ===== INTERFACES ADICIONALES PARA MEJOR TIPADO =====

// Tipo para las categorías válidas (basado en tu VALID_CATEGORIES)
export type ValidCategory = 
  | 'comidas/restaurante'
  | 'comidas/rapida'
  | 'comidas/saludable'
  | 'comidas/tipica'
  | 'comidas/internacional'
  | 'comidas/postres'
  | 'comidas/panaderia'
  | 'bebidas/cafe'
  | 'bebidas/bar'
  | 'bebidas/cerveceria'
  | 'bebidas/jugueria'
  | 'bebidas/cocteleria'
  | 'bebidas/heladeria'
  | 'compras/supermercado'
  | 'compras/tienda'
  | 'compras/boutique'
  | 'compras/zapateria'
  | 'compras/ferreteria'
  | 'compras/libreria'
  | 'compras/floristeria'
  | 'servicios/peluqueria'
  | 'servicios/lavanderia'
  | 'servicios/reparaciones'
  | 'servicios/limpieza'
  | 'servicios/fotografia'
  | 'servicios/eventos'
  | 'salud/farmacia'
  | 'salud/clinica'
  | 'salud/consultorio'
  | 'salud/optica'
  | 'salud/laboratorio'
  | 'salud/veterinaria'
  | 'entretenimiento/bar'
  | 'entretenimiento/discoteca'
  | 'entretenimiento/casino'
  | 'entretenimiento/billares'
  | 'entretenimiento/karaoke'
  | 'entretenimiento/teatro'
  | 'hospedaje/hotel'
  | 'hospedaje/hostal'
  | 'hospedaje/cabana'
  | 'hospedaje/apartamento'
  | 'hospedaje/finca'
  | 'transporte/taxi'
  | 'transporte/mototaxi'
  | 'transporte/bus'
  | 'transporte/remolque'
  | 'transporte/mensajeria'
  | 'basicos/policia'
  | 'basicos/bomberos'
  | 'basicos/hospital'
  | 'basicos/alcaldia'
  | 'basicos/notaria'
  | 'basicos/banco'
  | 'tecnologia/reparacion-celular'
  | 'tecnologia/computadores'
  | 'tecnologia/accesorios'
  | 'tecnologia/software'
  | 'tecnologia/internet'
  | 'educacion/colegio'
  | 'educacion/academia'
  | 'educacion/cursos'
  | 'educacion/tutorias'
  | 'educacion/idiomas'
  | 'educacion/musica'
  | 'deportes/gimnasio'
  | 'deportes/cancha'
  | 'deportes/piscina'
  | 'deportes/tienda-deportes'
  | 'deportes/entrenador';

