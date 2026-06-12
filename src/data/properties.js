export function img(id) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
}

export const PROPERTIES = [
  { slug: 'casa-fisherton-moderna', title: 'Casa moderna con pileta', loc: 'Fisherton, Rosario', zona: 'Rosario', op: 'Venta', type: 'Casa', price: 'USD 285.000', priceNum: 285000, currency: 'USD', beds: 4, baths: 3, area: '320 m²', status: 'oportunidad', aptoCredito: false, address: 'Av. Eva Perón 8800', img: img('1568605114967-8130f3a36994'), desc: 'Excelente casa moderna en Fisherton sobre lote parquizado, con pileta, amplios ventanales y terminaciones de primera. Ideal para familia que busca confort y luz natural en uno de los barrios más buscados de Rosario.' },
  { slug: 'departamento-puerto-norte', title: 'Departamento a estrenar', loc: 'Puerto Norte, Rosario', zona: 'Rosario', op: 'Venta', type: 'Departamento', price: 'USD 168.000', priceNum: 168000, currency: 'USD', beds: 2, baths: 2, area: '78 m²', status: 'nuevo', aptoCredito: true, address: 'Bv. Oroño 100', img: img('1600607687939-ce8a6c25118c'), desc: 'Departamento a estrenar en Puerto Norte con vista abierta, amenities de categoría y cochera cubierta. Apto crédito, listo para mudarse.' },
  { slug: 'duplex-canada-gomez', title: 'Dúplex con jardín y cochera', loc: 'Cañada de Gómez', zona: 'Cañada de Gómez', op: 'Venta', type: 'Casa', price: 'USD 132.000', priceNum: 132000, currency: 'USD', beds: 3, baths: 2, area: '140 m²', status: 'reservado', aptoCredito: true, address: 'Calle San Martín 1450', img: img('1570129477492-45c003edd2be'), desc: 'Dúplex en zona residencial de Cañada de Gómez, con jardín al fondo, parrillero y cochera para dos autos. Muy buena distribución en dos plantas.' },
  { slug: 'casa-centro-reciclada', title: 'Casa céntrica reciclada', loc: 'Cañada de Gómez', zona: 'Cañada de Gómez', op: 'Venta', type: 'Casa', price: 'USD 95.000', priceNum: 95000, currency: 'USD', beds: 3, baths: 1, area: '160 m²', status: 'vendido', aptoCredito: true, address: 'Calle Belgrano 760', img: img('1564013799919-ab600027ffc6'), desc: 'Casa antigua totalmente reciclada en pleno centro, conservando detalles originales con confort actual. A pasos de comercios y servicios.' },
  { slug: 'lote-barrio-cerrado', title: 'Lote en barrio cerrado', loc: 'Las Parejas', zona: 'Las Parejas', op: 'Venta', type: 'Terreno', price: 'USD 48.000', priceNum: 48000, currency: 'USD', beds: 0, baths: 0, area: '600 m²', status: 'oportunidad', aptoCredito: false, address: 'Barrio Los Robles, lote 24', img: img('1416879595882-3373a0480b5b'), desc: 'Lote de 600 m² en barrio cerrado con seguridad, espacios verdes y todos los servicios. Excelente oportunidad para construir tu casa.' },
  { slug: 'campo-agricola-carcarana', title: 'Campo agrícola — 12 ha', loc: 'Carcarañá', zona: 'Carcarañá', op: 'Venta', type: 'Campo', price: 'USD 480.000', priceNum: 480000, currency: 'USD', beds: 0, baths: 0, area: '12 ha', status: 'nuevo', aptoCredito: false, address: 'Ruta 9, km 372', img: img('1500382017468-9049fed747ef'), desc: 'Campo agrícola de 12 hectáreas con excelente aptitud y acceso pavimentado. Ideal para inversión o explotación propia.' },
  { slug: 'galpon-armstrong', title: 'Galpón industrial', loc: 'Armstrong', zona: 'Armstrong', op: 'Venta', type: 'Galpón', price: 'USD 210.000', priceNum: 210000, currency: 'USD', beds: 0, baths: 0, area: '800 m²', status: '', aptoCredito: false, address: 'Parque Industrial Armstrong', img: img('1518780664697-55e3ad937233'), desc: 'Galpón de 800 m² cubiertos en parque industrial, con oficina interna, energía trifásica y amplia playa de maniobras para camiones.' },
  { slug: 'local-centro-rosario', title: 'Local comercial a la calle', loc: 'Centro, Rosario', zona: 'Rosario', op: 'Alquiler', type: 'Local', price: 'ARS 850.000 /mes', priceNum: 850000, currency: 'ARS', beds: 0, baths: 1, area: '95 m²', status: '', aptoCredito: false, address: 'Córdoba 1200', img: img('1600607687939-ce8a6c25118c'), desc: 'Local comercial sobre peatonal, con gran vidriera y excelente circulación. Apto gastronómico o comercial.' },
  { slug: 'depto-alquiler-canada', title: 'Departamento 2 ambientes', loc: 'Cañada de Gómez', zona: 'Cañada de Gómez', op: 'Alquiler', type: 'Departamento', price: 'ARS 480.000 /mes', priceNum: 480000, currency: 'ARS', beds: 2, baths: 1, area: '60 m²', status: '', aptoCredito: false, address: 'Calle Rivadavia 540', img: img('1493809842364-78817add7ffb'), desc: 'Departamento de 2 ambientes en planta alta, luminoso y en excelente estado. A metros de la plaza principal.' },
  { slug: 'casa-las-parejas', title: 'Casa familiar con quincho', loc: 'Las Parejas', zona: 'Las Parejas', op: 'Venta', type: 'Casa', price: 'USD 158.000', priceNum: 158000, currency: 'USD', beds: 3, baths: 2, area: '180 m²', status: '', aptoCredito: true, address: 'Calle 9 de Julio 320', img: img('1512917774080-9991f1c4c750'), desc: 'Casa familiar en barrio tranquilo, con quincho con parrilla, patio amplio y cochera. Lista para habitar.' },
  { slug: 'casa-quinta-canada', title: 'Casa quinta con parque', loc: 'Cañada de Gómez', zona: 'Cañada de Gómez', op: 'Venta', type: 'Casa', price: 'USD 320.000', priceNum: 320000, currency: 'USD', beds: 4, baths: 3, area: '450 m²', status: 'oportunidad', aptoCredito: false, address: 'Camino a Carrizales s/n', img: img('1568605114967-8130f3a36994'), desc: 'Casa quinta sobre terreno de gran parque con árboles añosos, pileta y galería. Ideal para descanso o vivienda permanente a minutos del centro.' },
  { slug: 'terreno-villa-carlos-paz', title: 'Terreno con vista a las sierras', loc: 'Villa Carlos Paz', zona: 'Villa Carlos Paz', op: 'Venta', type: 'Terreno', price: 'USD 65.000', priceNum: 65000, currency: 'USD', beds: 0, baths: 0, area: '800 m²', status: 'nuevo', aptoCredito: false, address: 'Barrio Las Cumbres', img: img('1416879595882-3373a0480b5b'), desc: 'Terreno en altura con vista panorámica a las sierras, en zona de gran desarrollo. Servicios disponibles.' },
];

export const STATS = [
  { value: '+250', label: 'Propiedades activas' },
  { value: '6', label: 'Localidades' },
  { value: '2601', label: 'Matrícula COCIR' },
  { value: '100%', label: 'Tasaciones sin cargo' },
];

export const ZONAS = [
  { name: 'Cañada de Gómez', count: '48 propiedades', img: img('1564013799919-ab600027ffc6') },
  { name: 'Rosario', count: '63 propiedades', img: img('1518780664697-55e3ad937233') },
  { name: 'Las Parejas', count: '21 propiedades', img: img('1570129477492-45c003edd2be') },
  { name: 'Armstrong', count: '17 propiedades', img: img('1512917774080-9991f1c4c750') },
  { name: 'Carcarañá', count: '14 propiedades', img: img('1500382017468-9049fed747ef') },
  { name: 'Villa Carlos Paz', count: '9 propiedades', img: img('1600607687939-ce8a6c25118c') },
];

export const TYPES = ['Casa', 'Departamento', 'Terreno', 'Campo', 'Galpón', 'Local'];
export const ZONA_NAMES = ['Cañada de Gómez', 'Rosario', 'Las Parejas', 'Armstrong', 'Carcarañá', 'Villa Carlos Paz'];

export const FEATURES_BY_TYPE = {
  Casa: ['Cochera para 2 autos', 'Patio con parrilla', 'Cocina integrada', 'Lavadero independiente', 'Aire acondicionado', 'Pileta'],
  Departamento: ['Balcón aterrazado', 'Cochera cubierta', 'Seguridad 24 hs', 'Cocina equipada', 'Ascensor', 'Bajas expensas'],
  Terreno: ['Apto construcción', 'Servicios en el frente', 'Escritura al día', 'Mensura aprobada'],
  Campo: ['Apto agrícola', 'Acceso pavimentado', 'Molino y aguada', 'Alambrado perimetral', 'Galpón de chapa'],
  'Galpón': ['Portón para camión', 'Oficina interna', 'Energía trifásica', 'Playa de maniobras'],
  Local: ['Vidriera a la calle', 'Baño completo', 'Apto gastronómico', 'Excelente ubicación'],
};

export const STATUS_MAP = {
  oportunidad: { label: 'Oportunidad', bg: 'linear-gradient(135deg,#FF4438,#C81E14)', color: '#fff' },
  nuevo: { label: 'Nuevo ingreso', bg: '#0E9F6E', color: '#fff' },
  reservado: { label: 'Reservado', bg: '#F59E0B', color: '#3A2A00' },
  vendido: { label: 'Vendido', bg: 'rgba(40,46,58,.92)', color: '#E6E8EE' },
};

export const GALLERY_INTERIORS = [
  img('1493809842364-78817add7ffb'),
  img('1600607687939-ce8a6c25118c'),
  img('1512917774080-9991f1c4c750'),
  img('1564013799919-ab600027ffc6'),
];
