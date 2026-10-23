import { useRef, useState } from 'react'
import { Container } from '../components/Container.jsx'
import { Section } from '../components/Section.jsx'
import { Reveal, RevealGroup } from '../components/Reveal.jsx'
import { CompareSlider } from './CompareSlider.jsx'
import { cases } from '../content/cases.js'
import { copy } from '../content/copy.js'

// Escritorio: comparador ancho a la izquierda, texto y selector a la derecha.
// Móvil: título → comparador → selector → ficha.
export function BeforeAfter() {
  const [activeId, setActiveId] = useState(cases[0].id)
  const nudgedRef = useRef(false)
  const active = cases.find((c) => c.id === activeId)

  return (
    <Section id="antes-despues" labelledBy="antes-despues-title">
      <RevealGroup as={Container} className="grid gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
        <Reveal className="lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-end">
          <h2 id="antes-despues-title" className="max-w-[12ch] text-h2 font-light text-balance">
            {copy.compare.title}
          </h2>
          <p className="mt-5 text-body text-ink-soft">{copy.compare.intro}</p>
        </Reveal>

        <Reveal index={1} className="lg:col-span-8 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          {/* key: al cambiar de caso se monta de nuevo y entra con un fundido de opacidad */}
          <div
            key={active.id}
            className="transition-opacity duration-200 ease-out starting:opacity-0 motion-reduce:transition-none"
          >
            <CompareSlider
              item={active}
              nudge={!nudgedRef.current}
              onInteract={() => (nudgedRef.current = true)}
            />
          </div>
        </Reveal>

        <Reveal index={2} className="lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:self-start">
          <div role="group" aria-label="Elegir caso" className="flex flex-wrap gap-x-6 border-b border-ink/25">
            {cases.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={c.id === activeId}
                onClick={() => {
                  nudgedRef.current = true
                  setActiveId(c.id)
                }}
                className={`-mb-px min-h-12 border-b-2 text-body ${
                  c.id === activeId
                    ? 'border-rose text-ink'
                    : 'border-transparent text-ink-soft hover-fine:text-ink'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-small">
            <dt className="text-ink-soft">Tratamiento</dt>
            <dd>{active.treatment}</dd>
            <dt className="text-ink-soft">Sesiones</dt>
            <dd>{active.sessions}</dd>
            <dt className="text-ink-soft">Nota</dt>
            <dd>{active.note}</dd>
          </dl>
        </Reveal>
      </RevealGroup>
    </Section>
  )
}
