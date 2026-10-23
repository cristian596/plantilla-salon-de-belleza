// Pares antes/después. Ahora son fotos de Unsplash de la misma sesión,
// NO resultados del salón: isPlaceholder muestra el aviso en pantalla.
// Reemplazar por pares reales (misma persona, mismo encuadre, con consentimiento firmado).

export const cases = [
  {
    id: 'facial',
    label: 'Facial',
    treatment: 'Limpieza facial profunda',
    sessions: '[N sesiones]',
    note: '[Nota breve del profesional sobre el caso]',
    before: {
      id: '1761718209708-9ab9ba1c7252',
      alt: 'Demostración, antes: rostro con espuma limpiadora durante un tratamiento facial',
    },
    after: {
      id: '1761718210089-ba3bb5ccb54f',
      alt: 'Demostración, después: clienta relajada en cabina al terminar el tratamiento facial',
    },
    isPlaceholder: true,
  },
  {
    id: 'pestanas',
    label: 'Pestañas',
    treatment: 'Lifting de pestañas',
    sessions: '[N sesiones]',
    note: '[Nota breve del profesional sobre el caso]',
    before: {
      id: '1674049406467-824ea37c7184',
      alt: 'Demostración, antes: clienta recostada mientras preparan sus pestañas',
    },
    after: {
      id: '1674049406179-d7bf2c263e71',
      alt: 'Demostración, después: profesional terminando el diseño de cejas y pestañas',
    },
    isPlaceholder: true,
  },
  {
    id: 'manos',
    label: 'Manos',
    treatment: 'Manicura',
    sessions: '[N sesiones]',
    note: '[Nota breve del profesional sobre el caso]',
    before: {
      id: '1610992015732-2449b76344bc',
      alt: 'Demostración, antes: manos apoyadas sobre una tela blanca',
    },
    after: {
      id: '1610992015762-45dca7fa3a85',
      alt: 'Demostración, después: mano con esmalte rosa claro sobre una tela blanca',
    },
    isPlaceholder: true,
  },
]
