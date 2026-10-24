// Elección de cookies. Se guarda en localStorage; si el navegador lo bloquea,
// la elección vive solo en memoria y el aviso vuelve a salir en la próxima visita.

export const CONSENT_KEY = 'cookie-consent-v1'

function readStored() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return typeof parsed?.analytics === 'boolean' ? parsed.analytics : null
  } catch {
    return null
  }
}

// analytics: true (aceptada), false (rechazada) o null (sin elegir)
let analytics = readStored()
// El aviso está visible mientras no haya elección, o cuando se reabre desde el pie
let ui = { open: analytics === null, panel: false }
const listeners = new Set()

function emit() {
  for (const l of listeners) l()
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getAnalytics = () => analytics
export const getUi = () => ui

export function setAnalytics(value) {
  analytics = value
  ui = { open: false, panel: false }
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: value }))
  } catch {
    // Almacenamiento bloqueado: la web sigue funcionando
  }
  emit()
}

export function openPreferences({ panel = true } = {}) {
  ui = { open: true, panel }
  emit()
}
