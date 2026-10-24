import { useEffect, useState } from 'react'
import { Button } from '../components/Button.jsx'

// Barra fija solo en móvil. Aparece al salir del hero y se oculta en la sección de reservas.
// Siempre montada: entra y sale con un desplazamiento corto (sin él con reduced motion).
export function MobileBookingBar() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [bookingVisible, setBookingVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const booking = document.getElementById('reservas')
    if (!hero || !booking || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Histéresis: el hero cuenta como visible mientras conserve más de un 10 % en pantalla
          if (entry.target === hero) setHeroVisible(entry.intersectionRatio > 0.1)
          if (entry.target === booking) setBookingVisible(entry.isIntersecting)
        }
      },
      { threshold: [0, 0.1] },
    )
    observer.observe(hero)
    observer.observe(booking)
    return () => observer.disconnect()
  }, [])

  const hidden = heroVisible || bookingVisible

  return (
    <div
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink/25 bg-cream px-[max(1.25rem,env(safe-area-inset-left),env(safe-area-inset-right))] pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[translate,visibility] duration-ui ease-out motion-reduce:translate-y-0 motion-reduce:transition-none md:hidden ${hidden ? 'invisible translate-y-full' : 'visible translate-y-0'}`}
    >
      <Button href="#reservas" className="w-full">
        Solicitar cita
      </Button>
    </div>
  )
}
