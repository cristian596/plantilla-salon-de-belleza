import { site } from '../content/site.js'
import { getAnalytics, subscribe } from './consent.js'

// Google Analytics con Consent Mode v2. Sin analyticsId o sin consentimiento no se carga ningún script de Google.

const SCRIPT_ID = 'ga-script'
let configured = false
let lastPath = null

function gtag() {
  // gtag exige el objeto arguments, no un array
  window.dataLayer.push(arguments)
}

function setup() {
  if (configured) return
  window.dataLayer = window.dataLayer || []
  // Todo en denegado antes de cargar nada; luego se concede solo la analítica
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('js', new Date())
  // page_view se envía a mano en cada cambio de ruta
  gtag('config', site.analyticsId, { anonymize_ip: true, send_page_view: false })
  configured = true
}

function loadScript() {
  if (document.getElementById(SCRIPT_ID)) return
  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(site.analyticsId)}`
  document.head.appendChild(script)
}

// Borra las cookies _ga de este dominio al retirar el consentimiento
function clearGaCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((n) => n === '_ga' || n.startsWith('_ga_'))
  const host = location.hostname
  const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  }
}

function apply() {
  if (!site.analyticsId) return
  if (getAnalytics() === true) {
    window[`ga-disable-${site.analyticsId}`] = false
    setup()
    gtag('consent', 'update', { analytics_storage: 'granted' })
    loadScript()
  } else if (configured) {
    gtag('consent', 'update', { analytics_storage: 'denied' })
    window[`ga-disable-${site.analyticsId}`] = true
    clearGaCookies()
    lastPath = null
  }
}

// Llamar una vez al arrancar: aplica la elección guardada y reacciona a los cambios sin recargar.
export function startAnalytics() {
  apply()
  subscribe(apply)
}

// Solo la ruta, sin parámetros ni hash, y ningún dato del formulario.
export function trackPageView(path) {
  if (!site.analyticsId || getAnalytics() !== true || !configured || path === lastPath) return
  lastPath = path
  gtag('event', 'page_view', {
    page_path: path,
    page_location: `${location.origin}${path}`,
    page_title: document.title,
  })
}
