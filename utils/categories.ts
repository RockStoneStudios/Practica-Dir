// ===== ARCHIVO: utils/categories.ts =====
// Sistema completo basado en tu tabla

export interface Subcategory {
  value: string;
  label: string;
  icon: string;
  fullValue: string;
}

export interface Category {
  value: string;
  label: string;
  icon: string;
  color: string;
  bgClass: string;
  subcategories: Subcategory[];
}

export const CATEGORIES: Category[] = [
  {
    value: 'comidas',
    label: 'Comidas',
    icon: '🍽️',
    color: 'Naranja',
    bgClass: 'bg-orange-500',
    subcategories: [
      { value: 'restaurante', label: 'Restaurante', icon: '🍴', fullValue: 'comidas/restaurante' },
      { value: 'rapida', label: 'Rápida', icon: '🍔', fullValue: 'comidas/rapida' },
      { value: 'saludable', label: 'Saludable', icon: '🥗', fullValue: 'comidas/saludable' },
      { value: 'internacional', label: 'Internacional', icon: '🌍', fullValue: 'comidas/internacional' },
      { value: 'tipica', label: 'Típica', icon: '🫔', fullValue: 'comidas/tipica' },
      { value: 'postres', label: 'Postres', icon: '🍰', fullValue: 'comidas/postres' },
      { value: 'panaderia', label: 'Panadería', icon: '🥖', fullValue: 'comidas/panaderia' },
    ]
  },
  {
    value: 'bebidas',
    label: 'Bebidas',
    icon: '☕',
    color: 'Ámbar',
    bgClass: 'bg-amber-600',
    subcategories: [
      { value: 'cafe', label: 'Café', icon: '☕', fullValue: 'bebidas/cafe' },
      { value: 'bar', label: 'Bar', icon: '🍺', fullValue: 'bebidas/bar' },
      { value: 'cerveceria', label: 'Cervecería', icon: '🍻', fullValue: 'bebidas/cerveceria' },
      { value: 'jugueria', label: 'Jugería', icon: '🧃', fullValue: 'bebidas/jugueria' },
      { value: 'cocteleria', label: 'Coctelería', icon: '🍹', fullValue: 'bebidas/cocteleria' },
      { value: 'heladeria', label: 'Heladería', icon: '🍦', fullValue: 'bebidas/heladeria' },
    ]
  },
  {
    value: 'compras',
    label: 'Compras',
    icon: '🛒',
    color: 'Azul',
    bgClass: 'bg-blue-500',
    subcategories: [
      { value: 'supermercado', label: 'Supermercado', icon: '🏪', fullValue: 'compras/supermercado' },
      { value: 'tienda', label: 'Tienda', icon: '🏬', fullValue: 'compras/tienda' },
      { value: 'boutique', label: 'Boutique', icon: '👗', fullValue: 'compras/boutique' },
      { value: 'zapateria', label: 'Zapatería', icon: '👟', fullValue: 'compras/zapateria' },
      { value: 'ferreteria', label: 'Ferretería', icon: '🔧', fullValue: 'compras/ferreteria' },
      { value: 'libreria', label: 'Librería', icon: '📚', fullValue: 'compras/libreria' },
      { value: 'floristeria', label: 'Floristería', icon: '💐', fullValue: 'compras/floristeria' },
    ]
  },
  {
    value: 'servicios',
    label: 'Servicios',
    icon: '🔧',
    color: 'Púrpura',
    bgClass: 'bg-purple-500',
    subcategories: [
      { value: 'peluqueria', label: 'Peluquería', icon: '💇', fullValue: 'servicios/peluqueria' },
      { value: 'lavanderia', label: 'Lavandería', icon: '🧺', fullValue: 'servicios/lavanderia' },
      { value: 'reparaciones', label: 'Reparaciones', icon: '🔨', fullValue: 'servicios/reparaciones' },
      { value: 'limpieza', label: 'Limpieza', icon: '🧹', fullValue: 'servicios/limpieza' },
      { value: 'fotografia', label: 'Fotografía', icon: '📸', fullValue: 'servicios/fotografia' },
      { value: 'eventos', label: 'Eventos', icon: '🎉', fullValue: 'servicios/eventos' },
    ]
  },
  {
    value: 'salud',
    label: 'Salud',
    icon: '⚕️',
    color: 'Verde',
    bgClass: 'bg-green-500',
    subcategories: [
      { value: 'farmacia', label: 'Farmacia', icon: '💊', fullValue: 'salud/farmacia' },
      { value: 'clinica', label: 'Clínica', icon: '🏥', fullValue: 'salud/clinica' },
      { value: 'consultorio', label: 'Consultorio', icon: '🩺', fullValue: 'salud/consultorio' },
      { value: 'optica', label: 'Óptica', icon: '👓', fullValue: 'salud/optica' },
      { value: 'laboratorio', label: 'Laboratorio', icon: '🔬', fullValue: 'salud/laboratorio' },
      { value: 'veterinaria', label: 'Veterinaria', icon: '🐾', fullValue: 'salud/veterinaria' },
    ]
  },
  {
    value: 'entretenimiento',
    label: 'Entretenimiento',
    icon: '🎭',
    color: 'Rosa',
    bgClass: 'bg-pink-500',
    subcategories: [
      { value: 'bar', label: 'Bar', icon: '🍺', fullValue: 'entretenimiento/bar' },
      { value: 'discoteca', label: 'Discoteca', icon: '💃', fullValue: 'entretenimiento/discoteca' },
      { value: 'casino', label: 'Casino', icon: '🎰', fullValue: 'entretenimiento/casino' },
      { value: 'billares', label: 'Billares', icon: '🎱', fullValue: 'entretenimiento/billares' },
      { value: 'karaoke', label: 'Karaoke', icon: '🎤', fullValue: 'entretenimiento/karaoke' },
      { value: 'teatro', label: 'Teatro', icon: '🎭', fullValue: 'entretenimiento/teatro' },
    ]
  },
  {
    value: 'hospedaje',
    label: 'Hospedaje',
    icon: '🏨',
    color: 'Índigo',
    bgClass: 'bg-indigo-500',
    subcategories: [
      { value: 'hotel', label: 'Hotel', icon: '🏨', fullValue: 'hospedaje/hotel' },
      { value: 'hostal', label: 'Hostal', icon: '🛏️', fullValue: 'hospedaje/hostal' },
      { value: 'cabana', label: 'Cabaña', icon: '🏡', fullValue: 'hospedaje/cabana' },
      { value: 'apartamento', label: 'Apartamento', icon: '🏢', fullValue: 'hospedaje/apartamento' },
      { value: 'finca', label: 'Finca', icon: '🌳', fullValue: 'hospedaje/finca' },
    ]
  },
  {
    value: 'transporte',
    label: 'Transporte',
    icon: '🚕',
    color: 'Amarillo',
    bgClass: 'bg-yellow-500',
    subcategories: [
      { value: 'taxi', label: 'Taxi', icon: '🚕', fullValue: 'transporte/taxi' },
      { value: 'mototaxi', label: 'Mototaxi', icon: '🏍️', fullValue: 'transporte/mototaxi' },
      { value: 'bus', label: 'Bus', icon: '🚌', fullValue: 'transporte/bus' },
      { value: 'remolque', label: 'Remolque', icon: '🚛', fullValue: 'transporte/remolque' },
      { value: 'mensajeria', label: 'Mensajería', icon: '📦', fullValue: 'transporte/mensajeria' },
    ]
  },
  {
    value: 'basicos',
    label: 'Básicos',
    icon: '🆘',
    color: 'Rojo',
    bgClass: 'bg-red-500',
    subcategories: [
      { value: 'policia', label: 'Policía', icon: '👮', fullValue: 'basicos/policia' },
      { value: 'bomberos', label: 'Bomberos', icon: '🚒', fullValue: 'basicos/bomberos' },
      { value: 'hospital', label: 'Hospital', icon: '🏥', fullValue: 'basicos/hospital' },
      { value: 'alcaldia', label: 'Alcaldía', icon: '🏛️', fullValue: 'basicos/alcaldia' },
      { value: 'notaria', label: 'Notaría', icon: '📜', fullValue: 'basicos/notaria' },
      { value: 'banco', label: 'Banco', icon: '🏦', fullValue: 'basicos/banco' },
    ]
  },
  {
    value: 'tecnologia',
    label: 'Tecnología',
    icon: '💻',
    color: 'Cian',
    bgClass: 'bg-cyan-500',
    subcategories: [
      { value: 'reparacion-celular', label: 'Reparación Celular', icon: '📱', fullValue: 'tecnologia/reparacion-celular' },
      { value: 'computadores', label: 'Computadores', icon: '💻', fullValue: 'tecnologia/computadores' },
      { value: 'accesorios', label: 'Accesorios', icon: '🎧', fullValue: 'tecnologia/accesorios' },
      { value: 'software', label: 'Software', icon: '💿', fullValue: 'tecnologia/software' },
      { value: 'internet', label: 'Internet', icon: '📡', fullValue: 'tecnologia/internet' },
    ]
  },
  {
    value: 'educacion',
    label: 'Educación',
    icon: '📚',
    color: 'Teal',
    bgClass: 'bg-teal-500',
    subcategories: [
      { value: 'colegio', label: 'Colegio', icon: '🏫', fullValue: 'educacion/colegio' },
      { value: 'academia', label: 'Academia', icon: '🎓', fullValue: 'educacion/academia' },
      { value: 'cursos', label: 'Cursos', icon: '📖', fullValue: 'educacion/cursos' },
      { value: 'tutorias', label: 'Tutorías', icon: '👨‍🏫', fullValue: 'educacion/tutorias' },
      { value: 'idiomas', label: 'Idiomas', icon: '🗣️', fullValue: 'educacion/idiomas' },
      { value: 'musica', label: 'Música', icon: '🎵', fullValue: 'educacion/musica' },
    ]
  },
  {
    value: 'deportes',
    label: 'Deportes',
    icon: '⚽',
    color: 'Lima',
    bgClass: 'bg-lime-500',
    subcategories: [
      { value: 'gimnasio', label: 'Gimnasio', icon: '💪', fullValue: 'deportes/gimnasio' },
      { value: 'cancha', label: 'Cancha', icon: '⚽', fullValue: 'deportes/cancha' },
      { value: 'piscina', label: 'Piscina', icon: '🏊', fullValue: 'deportes/piscina' },
      { value: 'tienda-deportes', label: 'Tienda Deportes', icon: '🏃', fullValue: 'deportes/tienda-deportes' },
      { value: 'entrenador', label: 'Entrenador', icon: '🏋️', fullValue: 'deportes/entrenador' },
    ]
  },
];

// ===== Funciones Helper =====

export const getCategoryInfo = (categoryValue: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.value === categoryValue);
};

export const getSubcategoryInfo = (fullValue: string): Subcategory | undefined => {
  for (const category of CATEGORIES) {
    const sub = category.subcategories.find(s => s.fullValue === fullValue);
    if (sub) return sub;
  }
  return undefined;
};

export const getCategoryFullInfo = (categoryString: string) => {
  const [mainCat, subCat] = categoryString.split('/');
  const categoryInfo = getCategoryInfo(mainCat);
  const subcategoryInfo = categoryInfo?.subcategories.find(s => s.value === subCat);
  
  return {
    category: mainCat,
    subcategory: subCat,
    categoryInfo,
    subcategoryInfo,
    fullLabel: subcategoryInfo 
      ? `${categoryInfo?.label} - ${subcategoryInfo.label}` 
      : categoryInfo?.label || '',
    icon: subcategoryInfo?.icon || categoryInfo?.icon || '📁',
    color: categoryInfo?.color || 'Gris',
    bgClass: categoryInfo?.bgClass || 'bg-gray-500'
  };
};

export const getSubcategories = (categoryValue: string): Subcategory[] => {
  const category = getCategoryInfo(categoryValue);
  return category?.subcategories || [];
};

export const getAllValidCategories = (): string[] => {
  return CATEGORIES.flatMap(cat => 
    cat.subcategories.map(sub => sub.fullValue)
  );
};

// ===== Mapeo para Migración =====
export const MIGRATION_MAP: Record<string, string> = {
  // Comidas
  'restaurante': 'comidas/restaurante',
  'rapida': 'comidas/rapida',
  'comida rapida': 'comidas/rapida',
  'saludable': 'comidas/saludable',
  'alimentacion saludable': 'comidas/saludable',
  'internacional': 'comidas/internacional',
  'tipica': 'comidas/tipica',
  'comida tipica': 'comidas/tipica',
  'postres': 'comidas/postres',
  'panaderia': 'comidas/panaderia',
  
  // Bebidas
  'cafe': 'bebidas/cafe',
  'cafeteria': 'bebidas/cafe',
  'bar': 'bebidas/bar',
  'cerveceria': 'bebidas/cerveceria',
  'jugueria': 'bebidas/jugueria',
  'cocteleria': 'bebidas/cocteleria',
  'heladeria': 'bebidas/heladeria',
  
  // Compras
  'supermercado': 'compras/supermercado',
  'tienda': 'compras/tienda',
  'boutique': 'compras/boutique',
  'zapateria': 'compras/zapateria',
  'ferreteria': 'compras/ferreteria',
  'libreria': 'compras/libreria',
  'floristeria': 'compras/floristeria',
  
  // Servicios
  'peluqueria': 'servicios/peluqueria',
  'lavanderia': 'servicios/lavanderia',
  'reparaciones': 'servicios/reparaciones',
  'limpieza': 'servicios/limpieza',
  'fotografia': 'servicios/fotografia',
  'eventos': 'servicios/eventos',
  
  // Salud
  'farmacia': 'salud/farmacia',
  'clinica': 'salud/clinica',
  'consultorio': 'salud/consultorio',
  'optica': 'salud/optica',
  'laboratorio': 'salud/laboratorio',
  'veterinaria': 'salud/veterinaria',
  
  // Entretenimiento
  'discoteca': 'entretenimiento/discoteca',
  'casino': 'entretenimiento/casino',
  'billares': 'entretenimiento/billares',
  'karaoke': 'entretenimiento/karaoke',
  'teatro': 'entretenimiento/teatro',
  
  // Hospedaje
  'hotel': 'hospedaje/hotel',
  'hostal': 'hospedaje/hostal',
  'cabana': 'hospedaje/cabana',
  'apartamento': 'hospedaje/apartamento',
  'finca': 'hospedaje/finca',
  
  // Transporte
  'taxi': 'transporte/taxi',
  'mototaxi': 'transporte/mototaxi',
  'bus': 'transporte/bus',
  'remolque': 'transporte/remolque',
  'mensajeria': 'transporte/mensajeria',
  
  // Básicos
  'policia': 'basicos/policia',
  'bomberos': 'basicos/bomberos',
  'hospital': 'basicos/hospital',
  'alcaldia': 'basicos/alcaldia',
  'notaria': 'basicos/notaria',
  'banco': 'basicos/banco',
  
  // Tecnología
  'reparacion celular': 'tecnologia/reparacion-celular',
  'computadores': 'tecnologia/computadores',
  'accesorios': 'tecnologia/accesorios',
  'software': 'tecnologia/software',
  'internet': 'tecnologia/internet',
  
  // Educación
  'colegio': 'educacion/colegio',
  'academia': 'educacion/academia',
  'cursos': 'educacion/cursos',
  'tutorias': 'educacion/tutorias',
  'idiomas': 'educacion/idiomas',
  'musica': 'educacion/musica',
  
  // Deportes
  'gimnasio': 'deportes/gimnasio',
  'cancha': 'deportes/cancha',
  'piscina': 'deportes/piscina',
  'tienda deportes': 'deportes/tienda-deportes',
  'entrenador': 'deportes/entrenador',
};