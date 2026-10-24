// Tratamientos por grupo. Nombres genéricos de ejemplo; las fotos vienen de src/content/imagenes.js.
// Duración y precio son ejemplos hasta tener los datos reales.
import { imagenes } from './imagenes.js'

const t = (name, description) => ({
  id: name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
  name,
  description,
  duration: 'XX min',
  price: '$ XX.XXX',
})

export const serviceGroups = [
  {
    id: 'faciales',
    title: 'Faciales',
    intro: 'Para limpiar, hidratar y renovar la piel del rostro.',
    image: imagenes['servicios-faciales'],
    treatments: [
      t('Limpieza facial profunda', 'Limpieza, exfoliación y extracción suave para piel congestionada.'),
      t('Hidratación intensiva', 'Mascarilla y masaje facial para piel seca o apagada.'),
      t('Peeling suave', 'Renovación superficial para mejorar textura y tono.'),
      t('Ejemplo: facial de firma', 'Ejemplo: descripción del tratamiento propio del salón.'),
    ],
  },
  {
    id: 'corporales',
    title: 'Corporales',
    intro: 'Masajes y tratamientos para soltar tensión y cuidar la piel del cuerpo.',
    image: imagenes['servicios-corporales'],
    treatments: [
      t('Masaje relajante', 'Masaje de cuerpo completo para soltar tensión.'),
      t('Drenaje linfático manual', 'Técnica suave y rítmica para la sensación de piernas cansadas.'),
      t('Exfoliación corporal', 'Renueva la piel del cuerpo y la deja lista para hidratar.'),
      t('Ejemplo: tratamiento corporal', 'Ejemplo: descripción del tratamiento.'),
    ],
  },
  {
    id: 'pestanas',
    title: 'Pestañas y cejas',
    intro: 'Mirada definida, desde un efecto natural hasta más volumen.',
    image: imagenes['servicios-pestanas'],
    treatments: [
      t('Extensiones clásicas', 'Una extensión por pestaña para un efecto natural.'),
      t('Extensiones de volumen', 'Varias extensiones por pestaña para más densidad.'),
      t('Lifting de pestañas', 'Curva tus pestañas naturales sin extensiones.'),
      t('Laminado de cejas', 'Ordena y fija la forma de tus cejas.'),
    ],
  },
  {
    id: 'cuidado-personal',
    title: 'Cuidado personal',
    intro: 'Manos, pies y depilación, con el mismo cuidado que en cabina.',
    image: imagenes['servicios-cuidado-personal'],
    treatments: [
      t('Manicura', 'Limado, cutículas y esmaltado.'),
      t('Pedicura', 'Cuidado de pies, durezas y esmaltado.'),
      t('Depilación con cera', 'Por zonas; te indicamos el tiempo en tu cita.'),
      t('Ejemplo: otro servicio', 'Ejemplo: descripción del servicio.'),
    ],
  },
]

// Valor del <select> del formulario: "grupo:tratamiento"
export const serviceValue = (group, treatment) => `${group.id}:${treatment.id}`

export function serviceLabel(value) {
  for (const g of serviceGroups) {
    for (const tr of g.treatments) {
      if (serviceValue(g, tr) === value) return `${tr.name} (${g.title})`
    }
  }
  return value
}
