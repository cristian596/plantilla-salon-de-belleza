import { useEffect, useState } from 'react'
import { Button } from '../components/Button.jsx'

// Barra fija solo en móvil. Aparece al salir del hero y se oculta en la sección de reservas.
// Sin animación: es un control de uso constante.
export function MobileBookingBar() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [bookingVisible, setBookingVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const booking = document.getElementById('reservas')
    if (!hero || !booking || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting)
        if (entry.target === booking) setBookingVisible(entry.isIntersecting)
      }
    })
    observer.observe(hero)
    observer.observe(booking)
    return () => observer.disconnect()
  }, [])

  if (heroVisible || bookingVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/25 bg-cream px-[max(1.25rem,env(safe-area-inset-left),env(safe-area-inset-right))] pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <Button href="#reservas" className="w-full">
        Solicitar cita
      </Button>
    </div>
  )
}
