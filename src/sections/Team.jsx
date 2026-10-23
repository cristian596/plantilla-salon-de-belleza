import { Container } from '../components/Container.jsx'
import { Section } from '../components/Section.jsx'
import { Picture } from '../components/Picture.jsx'
import { PendingNote } from '../components/PendingNote.jsx'
import { Reveal, RevealGroup } from '../components/Reveal.jsx'
import { team, teamIntro } from '../content/team.js'
import { copy } from '../content/copy.js'

// Campo oscuro. Retratos escalonados de distinto tamaño; en móvil alternan izquierda y derecha.
const layout = [
  'lg:col-span-4 lg:mt-32',
  'lg:col-span-5 lg:mt-0',
  'lg:col-span-3 lg:mt-56',
]

export function Team() {
  return (
    <Section
      id="equipo"
      labelledBy="equipo-title"
      band
      className="bg-ink text-cream [&_:focus-visible]:outline-cream"
    >
      <RevealGroup as={Container}>
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-12">
          <Reveal as="h2" id="equipo-title" className="text-h2 font-light text-balance lg:col-span-6">
            {copy.team.title}
          </Reveal>
          <Reveal as="p" index={1} className="text-body text-cream/80 lg:col-span-5 lg:col-start-8 lg:self-end">
            {teamIntro}
          </Reveal>
        </div>

        <ul className="mt-12 flex flex-col gap-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
          {team.map((m, i) => (
            <Reveal
              as="li"
              key={m.name}
              index={2 + i}
              className={`w-[82%] sm:w-[60%] lg:w-auto ${i % 2 ? 'self-end' : 'self-start'} ${layout[i]}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink-soft">
                <Picture id={m.image.id} alt={m.image.alt} ratio={4 / 3} sizes="(min-width: 1024px) 30vw, 80vw" />
                {m.isPlaceholder && <PendingNote overlay>Retrato de demostración</PendingNote>}
              </div>
              <h3 className="mt-4 text-h3">{m.name}</h3>
              <p className="mt-1 text-body">{m.specialty}</p>
              <p className="text-small text-cream/80">{m.training}</p>
            </Reveal>
          ))}
        </ul>
      </RevealGroup>
    </Section>
  )
}
