import { srcSet, unsplashSrc } from '../lib/images.js'

// Imagen responsive con un único tratamiento de color para todas las fotos.
// Lazy por defecto; priority solo para la imagen del hero (LCP).
// mobile = { ratio, media, sizes }: recorte propio para pantallas chicas,
// así no se descarga una foto vertical que luego se muestra recortada en horizontal.
export function Picture({ id, alt, ratio, sizes = '100vw', mobile, priority = false, className = '' }) {
  const img = (
    <img
      src={unsplashSrc(id, 1080, ratio)}
      srcSet={srcSet(id, ratio)}
      sizes={sizes}
      alt={alt}
      width={1080}
      height={Math.round(1080 * ratio)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      draggable="false"
      className={`block h-full w-full object-cover saturate-[.9] sepia-[.06] ${className}`}
    />
  )
  if (!mobile) return img
  return (
    <picture className="contents">
      <source media={mobile.media} srcSet={srcSet(id, mobile.ratio)} sizes={mobile.sizes} />
      {img}
    </picture>
  )
}
