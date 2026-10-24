import { serviceLabel } from '../content/services.js'
import { copy } from '../content/copy.js'

export function formatDate(isoDate) {
  if (!isoDate) return ''
  const date = new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function buildMessage(values, salonName) {
  const lines = [
    `Hola, ${salonName}. Quiero solicitar una cita.`,
    '',
    `Nombre: ${values.name.trim()}`,
    `Teléfono: ${values.phone.trim()}`,
    `Servicio: ${serviceLabel(values.service)}`,
    `Fecha preferida: ${formatDate(values.date)}`,
    `Hora preferida: ${values.time}`,
  ]
  if (values.comment.trim()) lines.push(`Comentario: ${values.comment.trim()}`)
  lines.push('', copy.booking.consent.messageLine)
  return lines.join('\n')
}

export function buildWhatsAppUrl(number, text) {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}

// Alternativa si el salón prefiere correo (decisión pendiente).
export function buildMailto(email, text) {
  return `mailto:${email}?subject=${encodeURIComponent('Solicitud de cita')}&body=${encodeURIComponent(text)}`
}
