import { useEffect, useRef, useState } from 'react'

// Se activa una sola vez. Si no hay IntersectionObserver, muestra el contenido de inmediato.
export function useReveal({ immediate = false, threshold = 0.15 } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (immediate) {
      // setTimeout y no requestAnimationFrame: rAF no corre en pestañas en segundo plano
      const timer = setTimeout(() => setShown(true), 30)
      return () => clearTimeout(timer)
    }
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [immediate, threshold])

  return [ref, shown]
}
