import { Container } from '../components/Container.jsx'
import { Section } from '../components/Section.jsx'
import { Reveal, RevealGroup } from '../components/Reveal.jsx'
import { BookingForm } from './BookingForm.jsx'
import { site } from '../content/site.js'
import { copy } from '../content/copy.js'

// Campo nude con cómo funciona | línea | formulario sobre crema.
export function Booking({ request }) {
  return (
    <Section id="reservas" labelledBy="reservas-title">
      <RevealGroup as={Container} className="grid gap-10 lg:grid-cols-12 lg:gap-0">
        <Reveal className="bg-nude p-6 sm:p-8 lg:col-span-5 lg:mr-12 lg:self-start lg:p-12">
          <h2 id="reservas-title" className="text-h2 font-light text-balance">
            {copy.booking.title}
          </h2>
          <ul className="mt-8 border-t border-ink/25">
            {copy.booking.steps.map((step) => (
              <li key={step} className="border-b border-ink/25 py-4 text-body">
                {step}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 text-[1.375rem]">Horario</h3>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-small">
            {site.hours.map((h) => (
              <div key={h.days} className="contents">
                <dt className="text-ink-soft">{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal index={1} className="lg:col-span-7 lg:border-l lg:border-ink/25 lg:pl-12">
          <BookingForm request={request} />
        </Reveal>
      </RevealGroup>
    </Section>
  )
}
