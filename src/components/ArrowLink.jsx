import { Arrow } from './Arrow.jsx'

export function ArrowLink({ className = '', children, ...rest }) {
  return (
    <a
      className={`group inline-flex min-h-12 items-center gap-3 text-small underline decoration-ink/40 underline-offset-6 hover-fine:decoration-ink ${className}`}
      {...rest}
    >
      {children}
      <Arrow />
    </a>
  )
}
