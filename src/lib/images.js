const BASE = 'https://images.unsplash.com/photo-'

export const WIDTHS = [480, 768, 1080, 1600]

// ratio = alto / ancho (4:5 → 1.25, 3:2 → 0.667)
export function unsplashSrc(id, width, ratio) {
  const h = ratio ? `&h=${Math.round(width * ratio)}` : ''
  return `${BASE}${id}?auto=format&fit=crop&crop=faces,entropy&q=70&w=${width}${h}`
}

export function srcSet(id, ratio, widths = WIDTHS) {
  return widths.map((w) => `${unsplashSrc(id, w, ratio)} ${w}w`).join(', ')
}
