// Genera un collage para LinkedIn (1200 × 627, escala 2) a partir de la demo publicada.
// Uso: npm run linkedin -- https://<URL-DE-LA-DEMO>.pages.dev
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import puppeteer from 'puppeteer-core'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DEMO_POR_DEFECTO = 'https://salon-de-belleza-demo.pages.dev'
const url = (process.argv[2] || DEMO_POR_DEFECTO).replace(/\/+$/, '')

const salida = path.join(raiz, 'capturas', 'linkedin')
const piezas = path.join(salida, 'piezas')
const temporal = path.join(os.tmpdir(), 'collage-linkedin')
const pngFinal = path.join(salida, 'collage-linkedin.png')
// Copia adicional pedida por el usuario (se omite si la carpeta no existe).
const copiaEscritorio = path.join(os.homedir(), 'Desktop', 'collage', 'salon-de-belleza')

const pausa = (ms) => new Promise((r) => setTimeout(r, ms))
const esPendiente = (t) => !t || /\[[^\]]+\]/.test(t)

// --- Chrome / Edge en Windows ---
function buscarNavegador() {
  const bases = [process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.LOCALAPPDATA].filter(Boolean)
  const rel = [
    ['Google', 'Chrome', 'Application', 'chrome.exe'],
    ['Microsoft', 'Edge', 'Application', 'msedge.exe'],
  ]
  for (const r of rel) for (const b of bases) {
    const p = path.join(b, ...r)
    if (fs.existsSync(p)) return p
  }
  throw new Error('No se encontró Chrome ni Edge en las rutas habituales de Windows.')
}

// --- Datos de la plantilla (solo lectura) ---
const { site, hero } = await import(pathToFileURL(path.join(raiz, 'src/content/site.js')).href)
const css = fs.readFileSync(path.join(raiz, 'src/styles/tailwind.css'), 'utf8')
const token = (n) => css.match(new RegExp(`--${n}:\\s*([^;]+);`))?.[1].trim()
const colores = { cream: token('color-cream'), ink: token('color-ink'), rose: token('color-rose') }
const fuente = token('font-serif')
if (!colores.cream || !colores.ink || !colores.rose || !fuente) throw new Error('No pude leer los tokens de tailwind.css')

const nombre = esPendiente(site.name) ? null : site.name
const apoyo = esPendiente(hero.title) ? null : hero.title
const avisos = []
if (!nombre) avisos.push('site.name está pendiente: se omite el nombre del salón en el titular.')
if (!apoyo) avisos.push('hero.title está pendiente: se omite la línea de apoyo.')

fs.mkdirSync(piezas, { recursive: true })
fs.mkdirSync(temporal, { recursive: true })

const browser = await puppeteer.launch({ executablePath: buscarNavegador(), headless: true })

async function abrir(viewport, movil) {
  const page = await browser.newPage()
  await page.setViewport({ ...viewport, isMobile: movil, hasTouch: movil })
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('cookie-consent-v1', '{"analytics":false}')
  })
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  await pausa(3000) // animaciones de entrada
  await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })
  return page
}

// Desplaza a la sección y comprueba que su título quede visible bajo el header fijo.
async function irA(page, sec, titulo) {
  await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), sec)
  await pausa(1500)
  const r = await page.evaluate((t) => {
    const h = document.querySelector(t).getBoundingClientRect()
    const hd = document.querySelector('header')?.getBoundingClientRect()
    return { top: h.top, bottom: h.bottom, header: hd ? hd.bottom : 0, alto: innerHeight }
  }, titulo)
  const ok = r.top >= r.header && r.bottom <= r.alto
  if (!ok) throw new Error(`El título ${titulo} no queda visible: ${JSON.stringify(r)}`)
}

const shot = async (page, nombreArchivo) => {
  const p = path.join(piezas, nombreArchivo)
  await page.screenshot({ path: p })
  return p
}

const escritorio = await abrir({ width: 1440, height: 900, deviceScaleFactor: 1 }, false)
const heroEsc = await shot(escritorio, 'hero-escritorio-1440x900.png')
await irA(escritorio, '#servicios', '#servicios-title')
await shot(escritorio, 'servicios-escritorio-1440x900.png')
await escritorio.close()

const movil = await abrir({ width: 390, height: 844, deviceScaleFactor: 2 }, true)
const heroMov = await shot(movil, 'hero-movil-390x844@2x.png')
await irA(movil, '#reservas', '#reservas-title')
const reservasMov = await shot(movil, 'reservas-movil-390x844@2x.png')
await movil.close()

// --- Composición ---
const b64 = (f) => `data:image/png;base64,${fs.readFileSync(f).toString('base64')}`
const fontUrl = pathToFileURL(path.join(raiz, 'node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2')).href
const titular = [nombre && `<div class="n">${nombre}</div>`, apoyo && `<div class="a">${apoyo}</div>`].filter(Boolean).join('')

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Newsreader Variable";src:url("${fontUrl}") format("woff2");font-weight:200 800}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:627px;position:relative;overflow:hidden;background:${colores.cream};color:${colores.ink};font-family:${fuente}}
.t{position:absolute;left:40px;top:30px;width:760px}
.n{font-size:20px;letter-spacing:.04em;color:${colores.rose};font-weight:500;line-height:1.2}
.a{font-size:50px;font-weight:300;line-height:1.05;letter-spacing:-.02em}
.esc{position:absolute;left:40px;top:${nombre ? 128 : 112}px;width:760px;height:475px;border-radius:18px;overflow:hidden;border:1px solid ${colores.ink}33;box-shadow:0 18px 40px ${colores.ink}33}
.esc img{width:100%;height:100%;display:block;object-fit:cover;object-position:top}
.tel{position:absolute;width:184px;height:404px;padding:7px;border-radius:30px;background:${colores.ink};box-shadow:0 18px 36px ${colores.ink}4d}
.tel img{width:100%;height:100%;display:block;border-radius:24px;object-fit:cover;object-position:top}
.t1{left:828px;top:44px}.t2{left:974px;top:178px}
</style></head><body>
<div class="t">${titular}</div>
<div class="esc"><img src="${b64(heroEsc)}"></div>
<div class="tel t1"><img src="${b64(heroMov)}"></div>
<div class="tel t2"><img src="${b64(reservasMov)}"></div>
</body></html>`

const htmlPath = path.join(temporal, 'collage.html')
fs.writeFileSync(htmlPath, html)

const pag = await browser.newPage()
await pag.setViewport({ width: 1200, height: 627, deviceScaleFactor: 2 })
await pag.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' })
await pag.evaluate(() => document.fonts.ready)
await pag.screenshot({ path: pngFinal })
await browser.close()

if (fs.existsSync(copiaEscritorio)) fs.copyFileSync(pngFinal, path.join(copiaEscritorio, 'collage-linkedin.png'))

console.log('Collage:', pngFinal)
console.log('HTML temporal:', htmlPath)
avisos.forEach((a) => console.warn('AVISO:', a))
