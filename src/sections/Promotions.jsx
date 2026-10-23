import { Container } from '../components/Container.jsx'
import { Section } from '../components/Section.jsx'
import { Button } from '../components/Button.jsx'
import { ArrowLink } from '../components/ArrowLink.jsx'
import { Reveal, RevealGroup } from '../components/Reveal.jsx'
import { featuredPromo, otherPromos } from '../content/promos.js'

// Banda rosada, solo tipografía: oferta | línea | condiciones y vigencia.
export function Promotions({ onRequest }) {
  return (
    <Section id="promociones" labelledBy="promociones-title" band className="bg-blush">
      <RevealGroup as={Container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-7 lg:pr-12">
            <Reveal as="h2" id="promociones-title" className="max-w-[14ch] text-h2 font-light text-balance">
              {featuredPromo.title}
            </Reveal>
            <Reveal as="p" index={1} className="mt-6 max-w-[36ch] text-lead">
              {featuredPromo.benefit}
            </Reveal>
            <Reveal index={2} className="mt-8">
              <Button href="#reservas" onClick={() => onRequest(featuredPromo.serviceValue)}>
                Pedir esta promoción
              </Button>
            </Reveal>
          </div>

          <Reveal index={3} className="border-t border-ink/25 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <h3 className="text-h3">Condiciones</h3>
            <ul className="mt-4 space-y-3 text-body">
              {featuredPromo.conditions.map((c) => (
                <li key={c} className="border-t border-ink/25 pt-3">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-body">
              Válido hasta <strong className="font-semibold">{featuredPromo.validUntil}</strong>
            </p>
          </Reveal>
        </div>

        <Reveal as="ul" index={4} className="mt-16 border-t border-ink/25 lg:mt-24">
          {otherPromos.map((p) => (
            <li key={p.title} className="grid gap-2 border-b border-ink/25 py-6 md:grid-cols-12 md:items-center md:gap-6">
              <h3 className="text-[1.375rem] leading-snug md:col-span-4">{p.title}</h3>
              <p className="text-small text-ink-soft md:col-span-4">{p.summary}</p>
              <p className="text-small md:col-span-2">Hasta {p.validUntil}</p>
              <ArrowLink href="#reservas" onClick={() => onRequest(p.serviceValue)} className="md:col-span-2 md:justify-self-end">
                Pedir
              </ArrowLink>
            </li>
          ))}
        </Reveal>
      </RevealGroup>
    </Section>
  )
}
