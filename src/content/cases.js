// Pares antes/después. Las fotos de muestra (src/content/imagenes.js) son de la misma sesión,
// NO resultados del salón. Reemplazar por pares reales (misma persona, mismo encuadre,
// con consentimiento firmado) y poner muestra: false en cada entrada.
import { imagenes } from './imagenes.js'

export const cases = [
  {
    id: 'facial',
    label: 'Facial',
    treatment: 'Limpieza facial profunda',
    sessions: 'Ejemplo: 3 sesiones',
    note: 'Ejemplo: nota breve del profesional sobre el caso.',
    before: imagenes['antes-caso-1'],
    after: imagenes['despues-caso-1'],
  },
  {
    id: 'pestanas',
    label: 'Pestañas',
    treatment: 'Lifting de pestañas',
    sessions: 'Ejemplo: 1 sesión',
    note: 'Ejemplo: nota breve del profesional sobre el caso.',
    before: imagenes['antes-caso-2'],
    after: imagenes['despues-caso-2'],
  },
  {
    id: 'manos',
    label: 'Manos',
    treatment: 'Manicura',
    sessions: 'Ejemplo: 1 sesión',
    note: 'Ejemplo: nota breve del profesional sobre el caso.',
    before: imagenes['antes-caso-3'],
    after: imagenes['despues-caso-3'],
  },
]
