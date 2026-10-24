import { site } from '../content/site.js'
import { copy } from '../content/copy.js'

export const fieldOrder = ['name', 'phone', 'service', 'date', 'time', 'comment', 'consent']

export function todayISO() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const rules = {
  name: (v) => (v.trim().length < 2 ? 'Escribe tu nombre (al menos 2 letras).' : ''),
  phone: (v) => {
    if (!v.trim()) return 'Escribe un teléfono para poder confirmarte la cita.'
    if (/[^\d\s+()-]/.test(v)) return 'Usa solo números, espacios, + o guiones.'
    const digits = v.replace(/\D/g, '').length
    if (digits < 7) return 'Escribe un teléfono de al menos 7 dígitos.'
    if (digits > 15) return 'El teléfono tiene demasiados dígitos (máximo 15).'
    return ''
  },
  service: (v) => (v ? '' : 'Elige el servicio que quieres reservar.'),
  date: (v) => {
    if (!v) return 'Elige una fecha preferida.'
    if (v < todayISO()) return 'Elige una fecha de hoy en adelante.'
    const weekday = new Date(`${v}T00:00:00`).getDay()
    if (site.closedWeekdays.includes(weekday)) return 'Ese día el salón está cerrado. Elige otro día.'
    return ''
  },
  time: (v) => (v ? '' : 'Elige una hora preferida.'),
  comment: (v) => (v.length > 500 ? 'El comentario puede tener hasta 500 caracteres.' : ''),
  consent: (v) => (v === true ? '' : copy.booking.consent.error),
}

export function validateField(name, values) {
  return rules[name](values[name])
}

export function validate(values) {
  const errors = {}
  for (const name of fieldOrder) {
    const message = validateField(name, values)
    if (message) errors[name] = message
  }
  return errors
}
