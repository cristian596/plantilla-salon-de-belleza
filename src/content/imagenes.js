// Manifiesto único de imágenes. Todos los componentes leen de aquí; no hay IDs ni URLs de fotos en otro sitio.
//
// Cada entrada:
//   id        slot descriptivo (hero, servicios-faciales, antes-caso-1, equipo-1…)
//   src       ruta de la imagen (carpeta public/) o URL remota
//   alt       texto alternativo (descríbela de verdad al sustituirla)
//   ratio     alto / ancho del recorte (4:5 → 1.25, 3:4 → 4 / 3, 5:4 → 0.8, 4:3 → 0.75)
//   recorte   cómo se recortó la foto de muestra
//   fuente    origen y licencia
//   muestra   true = foto de muestra; muestra el aviso "Imagen de muestra" (ver mostrarAvisosMuestra en site.js)
//   movil     (opcional) { src, ratio }: recorte propio para pantallas chicas
//
// Para sustituir una foto: reemplaza el archivo, o cambia src, y pon muestra: false en esa entrada.
// Si cambias la del hero, actualiza también los <link rel="preload"> de index.html.

const unsplash = (id) => `Unsplash, licencia de Unsplash, ID photo-${id}`
const rostros = 'Centrado en rostros y zonas de más detalle (crop=faces,entropy)'
const dir = '/images/muestra'

export const listaImagenes = [
  {
    id: 'hero',
    src: `${dir}/hero.webp`,
    alt: 'Mujer con las manos junto al rostro y la piel luminosa, sobre fondo beige',
    ratio: 1.25,
    recorte: `${rostros}. En el hero: 4:5 en escritorio, 5:4 en móvil, foco vertical al 30 %`,
    fuente: unsplash('1637722881530-97871cfab220'),
    muestra: true,
    movil: { src: `${dir}/hero-movil.webp`, ratio: 0.8 },
  },
  {
    id: 'servicios-faciales',
    src: `${dir}/servicios-faciales.webp`,
    alt: 'Esteticista aplicando una mascarilla con pincel a una clienta en cabina',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1570172619644-dfd03ed5d881'),
    muestra: true,
    movil: { src: `${dir}/servicios-faciales-movil.webp`, ratio: 2 / 3 },
  },
  {
    id: 'servicios-corporales',
    src: `${dir}/servicios-corporales.webp`,
    alt: 'Clienta recostada en camilla con piedras calientes sobre la espalda',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1696841212541-449ca29397cc'),
    muestra: true,
    movil: { src: `${dir}/servicios-corporales-movil.webp`, ratio: 2 / 3 },
  },
  {
    id: 'servicios-pestanas',
    src: `${dir}/servicios-pestanas.webp`,
    alt: 'Profesional aplicando extensiones de pestañas con pinzas a una clienta',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1589710751893-f9a6770ad71b'),
    muestra: true,
    movil: { src: `${dir}/servicios-pestanas-movil.webp`, ratio: 2 / 3 },
  },
  {
    id: 'servicios-cuidado-personal',
    src: `${dir}/servicios-cuidado-personal.webp`,
    alt: 'Manicurista limando las uñas de una clienta en el salón',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1632345031435-8727f6897d53'),
    muestra: true,
    movil: { src: `${dir}/servicios-cuidado-personal-movil.webp`, ratio: 2 / 3 },
  },
  {
    id: 'galeria-1',
    src: `${dir}/galeria-1.webp`,
    alt: 'Clienta recibiendo un masaje facial con luz cálida',
    ratio: 1.25,
    recorte: rostros,
    fuente: unsplash('1643684391140-c5056cfd3436'),
    muestra: true,
  },
  {
    id: 'galeria-2',
    src: `${dir}/galeria-2.webp`,
    alt: 'Primer plano de un ojo con pestañas largas y curvadas',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1639629509821-c54cdd984227'),
    muestra: true,
  },
  {
    id: 'galeria-3',
    src: `${dir}/galeria-3.webp`,
    alt: 'Mano con manicura rosa sobre tela blanca',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1612887390768-fb02affea7a6'),
    muestra: true,
  },
  {
    id: 'galeria-4',
    src: `${dir}/galeria-4.webp`,
    alt: 'Espalda con piedras calientes alineadas durante un masaje',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1600334089648-b0d9d3028eb2'),
    muestra: true,
  },
  {
    id: 'galeria-5',
    src: `${dir}/galeria-5.webp`,
    alt: 'Retrato de mujer con piel luminosa y pecas sobre fondo beige',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1713207524097-596f3c17afc3'),
    muestra: true,
  },
  {
    id: 'antes-caso-1',
    src: `${dir}/antes-caso-1.webp`,
    alt: 'Demostración, antes: rostro con espuma limpiadora durante un tratamiento facial',
    ratio: 0.75,
    recorte: rostros,
    fuente: unsplash('1761718209708-9ab9ba1c7252'),
    muestra: true,
  },
  {
    id: 'despues-caso-1',
    src: `${dir}/despues-caso-1.webp`,
    alt: 'Demostración, después: clienta relajada en cabina al terminar el tratamiento facial',
    ratio: 0.75,
    recorte: rostros,
    fuente: unsplash('1761718210089-ba3bb5ccb54f'),
    muestra: true,
  },
  {
    id: 'antes-caso-2',
    src: `${dir}/antes-caso-2.webp`,
    alt: 'Demostración, antes: clienta recostada mientras preparan sus pestañas',
    ratio: 0.75,
    recorte: rostros,
    fuente: unsplash('1674049406467-824ea37c7184'),
    muestra: true,
  },
  {
    id: 'despues-caso-2',
    src: `${dir}/despues-caso-2.webp`,
    alt: 'Demostración, después: profesional terminando el diseño de cejas y pestañas',
    ratio: 0.75,
    recorte: rostros,
    fuente: unsplash('1674049406179-d7bf2c263e71'),
    muestra: true,
  },
  {
    id: 'antes-caso-3',
    src: `${dir}/antes-caso-3.webp`,
    alt: 'Demostración, antes: manos apoyadas sobre una tela blanca',
    ratio: 0.75,
    recorte: rostros,
    fuente: unsplash('1610992015732-2449b76344bc'),
    muestra: true,
  },
  {
    id: 'despues-caso-3',
    src: `${dir}/despues-caso-3.webp`,
    alt: 'Demostración, después: mano con esmalte rosa claro sobre una tela blanca',
    ratio: 0.75,
    recorte: rostros,
    fuente: unsplash('1610992015762-45dca7fa3a85'),
    muestra: true,
  },
  {
    id: 'equipo-1',
    src: `${dir}/equipo-1.webp`,
    alt: 'Retrato de demostración de una profesional sonriente con blusa negra',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1745434159123-5b99b94206ca'),
    muestra: true,
  },
  {
    id: 'equipo-2',
    src: `${dir}/equipo-2.webp`,
    alt: 'Retrato de demostración de una profesional de pie junto a una camilla de tratamiento',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1687293233752-ec42de2050db'),
    muestra: true,
  },
  {
    id: 'equipo-3',
    src: `${dir}/equipo-3.webp`,
    alt: 'Retrato de demostración de una profesional con el pelo recogido y blusa blanca',
    ratio: 4 / 3,
    recorte: rostros,
    fuente: unsplash('1791232776234-083dddacf26a'),
    muestra: true,
  },
]

export const imagenes = Object.fromEntries(listaImagenes.map((i) => [i.id, i]))
