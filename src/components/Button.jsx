import { Arrow } from './Arrow.jsx'

const variants = {
  primary: 'bg-rose text-cream hover-fine:bg-rose-press active:bg-rose-press',
  outline: 'border border-ink text-ink hover-fine:bg-ink hover-fine:text-cream',
  outlineOnDark: 'border border-cream text-cream hover-fine:bg-cream hover-fine:text-ink',
}

// Solo se anima la escala al presionar; los cambios de color son instantáneos.
export function Button({
  as: Tag = 'a',
  variant = 'primary',
  arrow = true,
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={`group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-small font-medium tracking-[0.01em] transition-[scale] duration-press ease-out active:scale-97 motion-reduce:active:scale-100 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {arrow && <Arrow />}
    </Tag>
  )
}
