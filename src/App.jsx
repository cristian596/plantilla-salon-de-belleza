import { useState } from 'react'
import { Header } from './sections/Header.jsx'
import { Hero } from './sections/Hero.jsx'
import { Services } from './sections/Services.jsx'
import { BeforeAfter } from './sections/BeforeAfter.jsx'
import { Results } from './sections/Results.jsx'
import { Promotions } from './sections/Promotions.jsx'
import { Team } from './sections/Team.jsx'
import { Booking } from './sections/Booking.jsx'
import { Footer } from './sections/Footer.jsx'
import { MobileBookingBar } from './sections/MobileBookingBar.jsx'

export default function App() {
  // Servicio pedido desde Promociones; un objeto nuevo en cada clic para repetir la preselección
  const [request, setRequest] = useState(null)

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-3"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Services />
        <BeforeAfter />
        <Results />
        <Promotions onRequest={(value) => setRequest({ value })} />
        <Team />
        <Booking request={request} />
      </main>
      <Footer />
      <MobileBookingBar />
    </>
  )
}
