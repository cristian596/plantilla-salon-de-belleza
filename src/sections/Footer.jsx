import { Container } from '../components/Container.jsx'
import { site } from '../content/site.js'

// Redes como enlaces de texto, sin logos de marca.
export function Footer() {
  const linkClass = 'underline decoration-ink/40 underline-offset-6 hover-fine:decoration-ink'
  return (
    <footer className="border-t border-ink/25 pt-half-section pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <Container>
        <p className="text-h2 font-light">{site.name}</p>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <h2 className="text-small text-ink-soft">Contacto</h2>
            <address className="mt-3 space-y-1 text-body not-italic">
              <p>{site.address}</p>
              <p>
                {site.phoneHref ? (
                  <a href={site.phoneHref} className={linkClass}>
                    {site.phoneDisplay}
                  </a>
                ) : (
                  site.phoneDisplay
                )}
              </p>
              <p>
                {site.email.includes('@') ? (
                  <a href={`mailto:${site.email}`} className={linkClass}>
                    {site.email}
                  </a>
                ) : (
                  site.email
                )}
              </p>
            </address>
          </div>

          <div>
            <h2 className="text-small text-ink-soft">Horario</h2>
            <dl className="mt-3 space-y-1 text-body">
              {site.hours.map((h) => (
                <div key={h.days} className="flex flex-wrap gap-x-3">
                  <dt>{h.days}</dt>
                  <dd className="text-ink-soft">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-small text-ink-soft">Redes</h2>
            <ul className="mt-3 space-y-1 text-body">
              {site.social.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ) : (
                    <span>
                      {s.label} <span className="text-ink-soft">[enlace pendiente]</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-ink/25 pt-6 text-small text-ink-soft">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          {site.privacyHref ? (
            <a href={site.privacyHref} className={linkClass}>
              Política de privacidad
            </a>
          ) : (
            <p>Política de privacidad [pendiente]</p>
          )}
        </div>
      </Container>
    </footer>
  )
}
