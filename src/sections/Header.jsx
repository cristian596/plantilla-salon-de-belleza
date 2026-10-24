import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container.jsx'
import { Button } from '../components/Button.jsx'
import { nav, site } from '../content/site.js'

// Fijo arriba en todos los tamaños. Sin animación: es un control de uso constante.
export function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const sheetRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const sheet = sheetRef.current
    const focusables = () => [...sheet.querySelectorAll('a, button')]
    focusables()[0]?.focus()
    document.documentElement.style.overflow = 'hidden'

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const items = focusables()
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-cream pt-[env(safe-area-inset-top)]">
      <Container className="flex h-20 items-center justify-between gap-6">
        <a href="#inicio" className="text-[1.375rem] leading-none tracking-[0.01em]">
          {site.name}
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-small">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="underline decoration-transparent underline-offset-6 hover-fine:decoration-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="#reservas">Solicitar cita</Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-3 min-h-12 px-3 text-small underline underline-offset-6 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen(true)}
        >
          Menú
        </button>
      </Container>

      {open && (
        <div
          id="menu-movil"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-50 flex flex-col bg-cream pt-[env(safe-area-inset-top)] pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <Container className="flex h-20 items-center justify-between">
            <span className="text-[1.375rem] leading-none">{site.name}</span>
            <button
              type="button"
              className="-mr-3 min-h-12 px-3 text-small underline underline-offset-6"
              onClick={() => {
                setOpen(false)
                toggleRef.current?.focus()
              }}
            >
              Cerrar
            </button>
          </Container>
          <Container as="nav" aria-label="Menú móvil" className="flex flex-1 flex-col justify-between">
            <ul className="border-t border-ink/25">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-ink/25">
                  <a href={item.href} className="block py-4 text-h3" onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href="#reservas" className="w-full" onClick={() => setOpen(false)}>
              Solicitar cita
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
