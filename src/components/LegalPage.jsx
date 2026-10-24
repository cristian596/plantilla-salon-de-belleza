import { Link } from 'react-router-dom'
import { Container } from './Container.jsx'
import { ArrowLink } from './ArrowLink.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { openPreferences } from '../lib/consent.js'
import { site } from '../content/site.js'

// Plantilla de las páginas legales. El contenido sale de src/content/legal.js.
export function LegalPage({ doc }) {
  useDocumentMeta(`${doc.title} · ${site.name}`, doc.description)

  return (
    <main
      id="contenido"
      tabIndex={-1}
      className="pt-[calc(5rem+env(safe-area-inset-top))] pb-section focus:outline-none"
    >
      <Container className="pt-8">
        <ArrowLink as={Link} to="/" back>
          Volver al inicio
        </ArrowLink>

        <article className="mt-6 max-w-[68ch]">
          <h1 className="text-h2 font-light text-balance">{doc.title}</h1>
          <p className="mt-4 text-body">Última actualización: {doc.updated}</p>
          {doc.intro && <p className="mt-8 text-body">{doc.intro}</p>}

          {doc.sections.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="text-h3 font-normal">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.content.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </article>
      </Container>
    </main>
  )
}

function Block({ block }) {
  if (typeof block === 'string') return <p className="text-body">{block}</p>
  if (block.list) {
    return (
      <ul className="list-disc space-y-2 pl-6 text-body">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  if (block.records) {
    const { labels, items } = block.records
    return (
      <ul className="border-t border-ink/25">
        {items.map((item) => (
          <li key={item[0]} className="border-b border-ink/25 py-4">
            <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-[7rem_1fr]">
              {labels.map((label, i) => (
                <div key={label} className="contents">
                  <dt className="text-small text-ink-soft">{label}</dt>
                  <dd className="text-body break-words">{item[i]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    )
  }
  if (block.link) {
    return (
      <ArrowLink as={Link} to={block.link.to}>
        {block.link.label}
      </ArrowLink>
    )
  }
  if (block.cookieSettings) {
    return (
      <button
        type="button"
        onClick={() => openPreferences()}
        className="min-h-12 text-small underline decoration-ink/40 underline-offset-6 hover-fine:decoration-ink"
      >
        {block.cookieSettings}
      </button>
    )
  }
  return null
}
