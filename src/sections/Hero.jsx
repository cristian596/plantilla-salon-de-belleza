import { Container } from '../components/Container.jsx'
import { Button } from '../components/Button.jsx'
import { ArrowLink } from '../components/ArrowLink.jsx'
import { Picture } from '../components/Picture.jsx'
import { AvisoMuestra } from '../components/AvisoMuestra.jsx'
import { Reveal, RevealGroup } from '../components/Reveal.jsx'
import { hero } from '../content/site.js'
import { imagenes } from '../content/imagenes.js'

// Escritorio: texto | línea | retrato. Móvil: retrato recortado arriba y la acción visible sin scroll.
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="pt-[calc(5rem+env(safe-area-inset-top))] pb-half-section lg:flex lg:min-h-svh lg:items-stretch"
    >
      <Container className="grid lg:grid-cols-12">
        <div className="h-[40svh] min-h-64 lg:order-2 lg:col-span-6 lg:h-auto lg:min-h-[32rem] lg:border-l lg:border-ink/25 lg:pb-10 lg:pl-10">
          {/* La imagen del hero es el LCP: no se anima */}
          <div className="relative h-full bg-nude">
            <Picture
              imagen={imagenes.hero}
              mobile={{ media: '(max-width: 1023px)' }}
              priority
              className="object-[50%_30%]"
            />
            <AvisoMuestra imagen={imagenes.hero} />
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
