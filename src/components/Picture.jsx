// Imagen con un único tratamiento de color para todas las fotos. Lee una entrada de src/content/imagenes.js.
// Lazy por defecto; priority solo para la imagen del hero (LCP).
// mobile = { media }: usa el recorte propio (imagen.movil) en pantallas chicas,
// así no se descarga una foto vertical que luego se muestra recortada en horizontal.
export function Picture({ imagen, mobile, priority = false, className = '' }) {
  const img = (
    <img
      src={imagen.src}
      alt={imagen.alt}
      width={1080}
      height={Math.round(1080 * imagen.ratio)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      draggable="false"
      className={`block h-full w-full object-cover saturate-[.9] sepia-[.06] ${className}`}
    />
  )
  if (!mobile || !imagen.movil) return img
  return (
    <picture className="contents">
      <source media={mobile.media} srcSet={imagen.movil.src} />
      {img}
    </picture>
  )
}
