import { useEffect, useSyncExternalStore } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './sections/Header.jsx'
import { Footer } from './sections/Footer.jsx'
import { CookieBanner } from './components/CookieBanner.jsx'
import { Home } from './pages/Home.jsx'
import { Privacidad } from './pages/Privacidad.jsx'
import { TratamientoDatos } from './pages/TratamientoDatos.jsx'
import { Cookies } from './pages/Cookies.jsx'
import { getAnalytics, subscribe } from './lib/consent.js'
import { trackPageView } from './lib/analytics.js'

// Al cambiar de ruta: sube al inicio, o al ancla si la URL trae hash. Y registra la página vista.
function RouteEffects() {
  const { pathname, hash } = useLocation()
  const analytics = useSyncExternalStore(subscribe, getAnalytics)

  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  useEffect(() => {
    if (analytics === true) trackPageView(pathname)
  }, [pathname, analytics])

  return null
}

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-3"
      >
        Saltar al contenido
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/tratamiento-de-datos" element={<TratamientoDatos />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <CookieBanner />
      <RouteEffects />
    </>
  )
}
