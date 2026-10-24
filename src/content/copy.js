// Titulares y textos de cada sección. Máximo dos líneas por titular en todos los anchos.

export const copy = {
  services: {
    title: 'Tratamientos y tiempos',
    intro: 'Cada tratamiento con su duración y precio, para que llegues sabiendo qué esperar.',
  },
  compare: {
    title: 'La diferencia, a la vista.',
    intro: 'Desliza la línea para comparar. Elige un caso para ver otro tratamiento.',
    placeholderNote: 'Imagen de muestra, no es un resultado del salón',
  },
  results: {
    title: 'Trabajos de cabina',
  },
  team: {
    title: 'Quién te atiende',
  },
  booking: {
    title: 'Solicita tu cita',
    steps: [
      'Eliges el tratamiento, el día y la hora que prefieres.',
      'Al enviar, se abre WhatsApp con tu solicitud lista.',
      'Te respondemos en [X horas] para confirmar la disponibilidad.',
    ],
    submit: 'Enviar solicitud por WhatsApp',
    privacy: 'Tus datos solo salen de esta página en el mensaje de WhatsApp que tú envías.',
    consent: {
      label:
        'Autorizo el tratamiento de mis datos personales para gestionar mi solicitud de cita, de acuerdo con la política de tratamiento de datos.',
      link: 'Leer la política de tratamiento de datos',
      error: 'Para enviar tu solicitud necesitamos tu autorización',
      // Línea que se añade al mensaje de WhatsApp
      messageLine: 'Autorizo el tratamiento de mis datos: sí.',
    },
  },
  cookies: {
    regionLabel: 'Preferencias de cookies',
    text: 'Usamos cookies técnicas para que el sitio funcione y, solo si lo aceptas, cookies de analítica para entender cómo se usa y mejorarlo.',
    more: 'Más información en la política de cookies',
    accept: 'Aceptar analítica',
    reject: 'Rechazar',
    configure: 'Configurar',
    save: 'Guardar y cerrar',
    technical: {
      title: 'Cookies técnicas',
      description: 'Necesarias para que el sitio funcione. Siempre activas.',
    },
    analytics: {
      title: 'Analítica',
      description: 'Google Analytics, para medir el uso del sitio. Desactivada por defecto.',
    },
    on: 'Activadas',
    off: 'Desactivadas',
    footerButton: 'Configurar cookies',
  },
}
