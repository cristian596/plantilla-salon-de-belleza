import { Container } from '../components/Container.jsx'
import { Section } from '../components/Section.jsx'
import { Picture } from '../components/Picture.jsx'
import { AvisoMuestra } from '../components/AvisoMuestra.jsx'
import { Reveal, RevealGroup } from '../components/Reveal.jsx'
import { serviceGroups } from '../content/services.js'
import { copy } from '../content/copy.js'

// Escritorio: índice fijo sobre campo nude | línea | carta de tratamientos.
export function Services() {
  return (
    <Section id="servicios" labelledBy="servicios-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-0">
        <div className="lg:col-span-4 lg:mr-12">
          <RevealGroup className="bg-nude p-6 sm:p-8 lg:sticky lg:top-[calc(7rem+env(safe-area-inset-top))]">
            <Reveal as="h2" id="servicios-title" className="max-w-[12ch] text-h2 font-light text-balance lg:text-[clamp(2.25rem,1rem+1.9vw,3rem)]">
              {copy.services.title}
            </Reveal>
            <Reveal as="p" index={1} className="mt-5 text-body text-ink-soft">
              {copy.services.intro}
            </Reveal>
            <Reveal as="nav" index={2} aria-label="Grupos de tratamientos" className="mt-8">
              <ul className="border-t border-ink/25">
                {serviceGroups.map((g) => (
                  <li key={g.id} className="border-b border-ink/25">
                    <a
                      href={`#servicios-${g.id}`}
                      className="flex min-h-12 items-center justify-between text-body underline decoration-transparent underline-offset-6 hover-fine:decoration-ink"
                    >
                      {g.title}
                      <span className="text-small text-ink-soft">{g.treatments.length} tratamientos</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </RevealGroup>
        </div>

        <div className="space-y-20 lg:col-span-8 lg:space-y-28 lg:border-l lg:border-ink/25 lg:pl-12">
          {serviceGroups.map((g, i) => (
            <ServiceGroup key={g.id} group={g} flip={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ServiceGroup({ group, flip }) {
  const titleId = `servicios-${group.id}-title`
  return (
    <RevealGroup as="article" id={`servicios-${group.id}`} aria-labelledby={titleId} className="scroll-mt-8">
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <Reveal className={`md:col-span-5 ${flip ? 'md:order-2' : ''}`}>
          <div className="relative aspect-[3/2] bg-nude md:aspect-[3/4]">
            <Picture
              imagen={group.image}
              mobile={{ media: '(max-width: 767px)' }}
            />
            <AvisoMuestra imagen={group.image} />
          </div>
        </Reveal>
        <div className="md:col-span-7">
          <Reveal as="h3" index={1} id={titleId} className="text-h3">
            {group.title}
          </Reveal>
          <Reveal as="p" index={1} className="mt-2 text-body text-ink-soft">
            {group.intro}
          </Reveal>
          <Reveal as="ul" index={2} className="mt-6">
            {group.treatments.map((t) => (
              <TreatmentRow key={t.id} treatment={t} />
            ))}
          </Reveal>
        </div>
      </div>
    </RevealGroup>
  )
}

function TreatmentRow({ treatment }) {
  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-6 border-t border-ink/25 py-4 last:border-b">
      <div>
        <h4 className="text-[1.25rem] leading-snug">{treatment.name}</h4>
        <p className="mt-1 text-small text-ink-soft">{treatment.description}</p>
      </div>
      <p className="text-right text-small leading-snug whitespace-nowrap tabular-nums">
        <span className="sr-only">Duración: </span>
        {treatment.duration}
        <br />
        <span className="sr-only">Precio: </span>
        {treatment.price}
      </p>
    </li>
  )
}
