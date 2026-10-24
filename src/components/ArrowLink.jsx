import { Arrow } from './Arrow.jsx'

// as: permite usar un enlace de react-router (as={Link} to="/ruta"). back: flecha antes del texto.
export function ArrowLink({ as: Tag = 'a', back = false, className = '', children, ...rest }) {
  return (
    <Tag
      className={`group inline-flex min-h-12 items-center gap-3 text-small underline decoration-ink/40 underline-offset-6 hover-fine:decoration-ink ${className}`}
      {...rest}
    >
      {back && <Arrow className="rotate-180" />}
      {children}
      {!back && <Arrow />}
    </Tag>
  )
}
