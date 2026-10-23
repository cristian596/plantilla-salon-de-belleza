// Tratamientos por grupo. Nombres genéricos descriptivos [CONFIRMAR],
// duración y precio como marcadores hasta tener los datos reales.

const t = (name, description) => ({
  id: name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
  name,
  description,
  duration: '[XX min]',
  price: '[$ —]',
})

export const serviceGroups = [
  {
    id: 'faciales',
    title: 'Faciales',
    intro: 'Para limpiar, hidratar y renovar la piel del rostro.',
    image: {
      id: '1570172619644-dfd03ed5d881',
      alt: 'Esteticista aplicando una mascarilla con pincel a una clienta en cabina',
    },
    treatments: [
      t('Limpieza facial profunda', 'Limpieza, exfoliación y extracción suave para piel congestionada.'),
      t('Hidratación intensiva', 'Mascarilla y masaje facial para piel seca o apagada.'),
      t('Peeling suave', 'Renovación superficial para mejorar textura y tono.'),
      t('[Facial de firma]', '[Descripción del tratamiento propio del salón].'),
    ],
  },
  {
    id: 'corporales',
    title: 'Corporales',
    intro: 'Masajes y tratamientos para soltar tensión y cuidar la piel del cuerpo.',
    image: {
      id: '1696841212541-449ca29397cc',
      alt: 'Clienta recostada en camilla con piedras calientes sobre la espalda',
    },
    treatments: [
      t('Masaje relajante', 'Masaje de cuerpo completo para soltar tensión.'),
      t('Drenaje linfático manual', 'Técnica suave y rítmica para la sensación de piernas cansadas.'),
      t('Exfoliación corporal', 'Renueva la piel del cuerpo y la deja lista para hidratar.'),
      t('[Tratamiento corporal]', '[Descripción del tratamiento].'),
    ],
  },
  {
    id: 'pestanas',
    title: 'Pestañas y cejas',
    intro: 'Mirada definida, desde un efecto natural hasta más volumen.',
    image: {
      id: '1589710751893-f9a6770ad71b',
      alt: 'Profesional aplicando extensiones de pestañas con pinzas a una clienta',
    },
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
    image: {
      id: '1632345031435-8727f6897d53',
      alt: 'Manicurista limando las uñas de una clienta en el salón',
    },
    treatments: [
      t('Manicura', 'Limado, cutículas y esmaltado.'),
      t('Pedicura', 'Cuidado de pies, durezas y esmaltado.'),
      t('Depilación con cera', 'Por zonas; te indicamos el tiempo en tu cita.'),
      t('[Otro servicio]', '[Descripción del servicio].'),
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
