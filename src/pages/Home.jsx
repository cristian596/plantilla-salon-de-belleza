import { useState } from 'react'
import { Hero } from '../sections/Hero.jsx'
import { Services } from '../sections/Services.jsx'
import { BeforeAfter } from '../sections/BeforeAfter.jsx'
import { Results } from '../sections/Results.jsx'
import { Promotions } from '../sections/Promotions.jsx'
import { Team } from '../sections/Team.jsx'
import { Booking } from '../sections/Booking.jsx'
import { MobileBookingBar } from '../sections/MobileBookingBar.jsx'

export function Home() {
  // Servicio pedido desde Promociones; un objeto nuevo en cada clic para repetir la preselección
  const [request, setRequest] = useState(null)

  return (
    <>
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Services />
        <BeforeAfter />
        <Results />
        <Promotions onRequest={(value) => setRequest({ value })} />
        <Team />
        <Booking request={request} />
      </main>
      <MobileBookingBar />
    </>
  )
}
