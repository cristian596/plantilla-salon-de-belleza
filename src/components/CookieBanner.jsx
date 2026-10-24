import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './Container.jsx'
import { Button } from './Button.jsx'
import { ArrowLink } from './ArrowLink.jsx'
import { copy } from '../content/copy.js'
import { getAnalytics, getUi, setAnalytics, subscribe } from '../lib/consent.js'

const t = copy.cookies

// Los tres botones comparten jerarquía y tamaño: mismo variant, mismo ancho.
const choiceButton = 'w-full'

// Aviso no modal en la parte inferior. Publica su altura en --cookie-banner-h
// para que la barra de reserva móvil suba por encima mientras esté visible.
export function CookieBanner() {
  const ui = useSyncExternalStore(subscribe, getUi)
  if (!ui.open) return null
  return <Banner startOnPanel={ui.panel} />
}

function Banner({ startOnPanel }) {
  const [panel, setPanel] = useState(startOnPanel)
  const rootRef = useRef(null)
  const returnFocusRef = useRef(null)

  // Foco al primer control al mostrarse; al cerrar, vuelve a donde estaba si se abrió desde el pie
  useEffect(() => {
    returnFocusRef.current = document.activeElement
    const root = rootRef.current
    root.querySelector('button')?.focus({ preventScroll: true })
    return () => {
      const el = returnFocusRef.current
      if (el && el !== document.body && document.contains(el)) el.focus({ preventScroll: true })
    }
  }, [])

  // Al pasar al panel, el foco va a su primer interruptor
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    rootRef.current.querySelector('[role="switch"]')?.focus()
  }, [panel])

  useEffect(() => {
    const root = rootRef.current
    const html = document.documentElement
    const publish = () => html.style.setProperty('--cookie-banner-h', `${root.offsetHeight}px`)
    publish()
    if (!('ResizeObserver' in window)) return () => html.style.removeProperty('--cookie-banner-h')
    const observer = new ResizeObserver(publish)
    observer.observe(root)
    return () => {
      observer.disconnect()
      html.style.removeProperty('--cookie-banner-h')
    }
  }, [])

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={t.regionLabel}
      className="fixed inset-x-0 bottom-0 z-40 max-h-[85dvh] overflow-y-auto border-t border-ink/25 bg-cream pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-enter ease-out starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:translate-y-0"
    >
      <Container>
        {panel ? <Panel /> : <Choices onConfigure={() => setPanel(true)} />}
      </Container>
    </div>
  )
}

function Choices({ onConfigure }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
      <div>
        <p className="max-w-[68ch] text-small text-ink">{t.text}</p>
        <ArrowLink as={Link} to="/cookies">
          {t.more}
        </ArrowLink>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 lg:w-[40rem]">
        <Button as="button" type="button" variant="outline" arrow={false} className={choiceButton} onClick={() => setAnalytics(true)}>
          {t.accept}
        </Button>
        <Button as="button" type="button" variant="outline" arrow={false} className={choiceButton} onClick={() => setAnalytics(false)}>
          {t.reject}
        </Button>
        <Button as="button" type="button" variant="outline" arrow={false} className={choiceButton} onClick={onConfigure}>
          {t.configure}
        </Button>
      </div>
    </div>
  )
}

function Panel() {
  const [analytics, setDraft] = useState(getAnalytics() === true)
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
      <ul className="max-w-[68ch] border-t border-ink/25">
        <li className="border-b border-ink/25">
          <Switch id="cookies-tecnicas" title={t.technical.title} description={t.technical.description} checked locked />
        </li>
        <li className="border-b border-ink/25">
          <Switch
            id="cookies-analitica"
            title={t.analytics.title}
            description={t.analytics.description}
            checked={analytics}
            onChange={() => setDraft((v) => !v)}
          />
        </li>
      </ul>
      <Button as="button" type="button" variant="outline" arrow={false} className="w-full lg:w-[13rem]" onClick={() => setAnalytics(analytics)}>
        {t.save}
      </Button>
    </div>
  )
}

// Interruptor accesible: el estado se dice con texto, no solo con color.
function Switch({ id, title, description, checked, locked = false, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={locked || undefined}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
      onClick={locked ? undefined : onChange}
      className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left"
    >
      <span>
        <span id={`${id}-title`} className="block text-small font-medium">
          {title}
        </span>
        <span id={`${id}-desc`} className="block text-small text-ink-soft">
          {description}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-3 text-small">
        <span aria-hidden="true">{checked ? t.on : t.off}</span>
        <span
          aria-hidden="true"
          className={`flex h-7 w-12 items-center border border-ink p-0.5 transition-colors duration-ui ease-out motion-reduce:transition-none ${checked ? 'bg-ink' : 'bg-cream'} ${locked ? 'opacity-60' : ''}`}
        >
          <span
            className={`size-5 transition-[translate] duration-ui ease-out motion-reduce:transition-none ${checked ? 'translate-x-5 bg-cream' : 'translate-x-0 bg-ink'}`}
          />
        </span>
      </span>
    </button>
  )
}
