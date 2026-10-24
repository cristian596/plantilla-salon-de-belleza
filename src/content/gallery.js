// Galería de trabajos. Las fotos vienen de src/content/imagenes.js y son de muestra:
// al sustituirlas por trabajos reales, pon muestra: false en cada entrada.
import { imagenes } from './imagenes.js'

export const galleryIntro = 'Trabajos hechos en cabina por nuestro equipo.'

export const gallery = [
  { imagen: imagenes['galeria-1'], caption: 'Masaje facial · Ejemplo' },
  { imagen: imagenes['galeria-2'], caption: 'Extensiones de volumen · Ejemplo' },
  { imagen: imagenes['galeria-3'], caption: 'Manicura · Ejemplo' },
  { imagen: imagenes['galeria-4'], caption: 'Masaje con piedras · Ejemplo' },
  { imagen: imagenes['galeria-5'], caption: 'Hidratación intensiva · Ejemplo' },
]
