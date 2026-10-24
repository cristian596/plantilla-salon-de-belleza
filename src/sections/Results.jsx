import { Container } from '../components/Container.jsx'
import { Section } from '../components/Section.jsx'
import { Picture } from '../components/Picture.jsx'
import { AvisoMuestra } from '../components/AvisoMuestra.jsx'
import { Reveal, RevealGroup } from '../components/Reveal.jsx'
import { gallery, galleryIntro } from '../content/gallery.js'
import { copy } from '../content/copy.js'

// Mosaico asimétrico: una imagen grande 4:5 y una grilla 2×2 de 3:4.
export function Results() {
  const [feature, ...rest] = gallery
  return (
    <Section id="resultados" labelledBy="resultados-title">
      <RevealGroup as={Container}>
        <div className="grid gap-5 border-b border-ink/25 pb-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal as="h2" id="resultados-title" className="text-h2 font-light text-balance lg:col-span-6">
            {copy.results.title}
          </Reveal>
          <Reveal as="p" index={1} className="text-body text-ink-soft lg:col-span-5 lg:col-start-8">
            {galleryIntro}
          </Reveal>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-8 lg:mt-12 lg:grid-cols-12 lg:gap-x-12">
          <Reveal index={2} className="lg:col-span-6">
            <GalleryItem item={feature} aspect="aspect-[4/5]" />
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:col-span-6">
            {rest.map((item, i) => (
              <Reveal key={item.imagen.id} index={3 + i}>
                <GalleryItem item={item} aspect="aspect-[3/4]" />
              </Reveal>
            ))}
          </div>
        </div>
      </RevealGroup>
    </Section>
  )
}

function GalleryItem({ item, aspect }) {
  return (
    <figure>
      <div className={`relative ${aspect} overflow-hidden bg-nude`}>
        <Picture imagen={item.imagen} />
        <AvisoMuestra imagen={item.imagen} />
      </div>
      <figcaption className="mt-3 text-small text-ink-soft">{item.caption}</figcaption>
    </figure>
  )
}
