import { Container } from '../components/Container.jsx'
import { Button } from '../components/Button.jsx'
import { ArrowLink } from '../components/ArrowLink.jsx'
import { Picture } from '../components/Picture.jsx'
import { Reveal, RevealGroup } from '../components/Reveal.jsx'
import { hero } from '../content/site.js'
import { heroImage } from '../content/images.js'

// Escritorio: texto | línea | retrato. Móvil: retrato recortado arriba y la acción visible sin scroll.
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="pb-half-section lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-stretch"
    >
      <Container className="grid lg:grid-cols-12">
        <div className="h-[40svh] min-h-64 lg:order-2 lg:col-span-6 lg:h-auto lg:min-h-[32rem] lg:border-l lg:border-ink/25 lg:pb-10 lg:pl-10">
          {/* La imagen del hero es el LCP: no se anima */}
          <div className="h-full bg-nude">
            <Picture
              id={heroImage.id}
              alt={heroImage.alt}
              ratio={1.25}
              sizes="45vw"
              mobile={{ ratio: 0.8, media: '(max-width: 1023px)', sizes: 'calc(100vw - 2.5rem)' }}
              priority
              className="object-[50%_30%]"
            />
          </div>
        </div>

        <RevealGroup immediate className="pt-6 lg:order-1 lg:col-span-6 lg:flex lg:flex-col lg:justify-end lg:pt-0 lg:pr-12 lg:pb-10">
          <Reveal as="h1" small id="hero-title" className="max-w-[11ch] text-display font-light text-balance">
            {hero.title}
          </Reveal>
          <Reveal as="p" small index={1} className="mt-4 max-w-[34ch] text-body text-ink-soft lg:mt-8 lg:text-lead">
            {hero.lead}
          </Reveal>
          <Reveal small index={2} className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 lg:mt-10">
            <Button href="#reservas">{hero.cta}</Button>
            <ArrowLink href="#servicios">{hero.secondary}</ArrowLink>
          </Reveal>
        </RevealGroup>
      </Container>
    </section>
  )
}
