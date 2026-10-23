// Datos del salón. Todo lo que va entre [CORCHETES] está pendiente de confirmar.

export const site = {
  name: '[NOMBRE DEL SALÓN]',
  city: '[CIUDAD]',
  // Número de WhatsApp en formato internacional, solo dígitos (ej. 573001234567).
  // Mientras esté vacío, el formulario avisa que no puede enviar la solicitud.
  whatsapp: '',
  phoneDisplay: '[TELÉFONO]',
  phoneHref: '', // ej. tel:+573001234567
  email: '[EMAIL]',
  address: '[DIRECCIÓN]',
  replyTime: '[X horas]',
  hours: [
    { days: 'Lunes a viernes', time: '[HH:MM – HH:MM]' },
    { days: 'Sábado', time: '[HH:MM – HH:MM]' },
    { days: 'Domingo', time: '[Cerrado / horario]' },
  ],
  // Días sin atención (0 = domingo … 6 = sábado). [CONFIRMAR]
  closedWeekdays: [0],
  // Franjas de la lista "Hora preferida". [CONFIRMAR con el horario real]
  timeSlots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  // Redes como enlaces de texto, sin logos de marca. [ENLACES PENDIENTES]
  social: [
    { label: 'Instagram', href: '' },
    { label: 'TikTok', href: '' },
    { label: 'Facebook', href: '' },
  ],
  privacyHref: '', // [ENLACE A POLÍTICA DE PRIVACIDAD PENDIENTE]
}

export const nav = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#antes-despues', label: 'Resultados' },
  { href: '#promociones', label: 'Promociones' },
  { href: '#equipo', label: 'Equipo' },
]

export const hero = {
  title: 'Cuidado que se nota.',
  lead: 'Tratamientos faciales, corporales, de pestañas y cuidado personal en [CIUDAD].',
  cta: 'Solicitar cita',
  secondary: 'Ver tratamientos',
}
