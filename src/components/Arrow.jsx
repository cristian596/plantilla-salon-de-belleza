// Flecha de enlaces y botones. Se desplaza 4px solo con hover de puntero fino.
export function Arrow({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-4 shrink-0 transition-[translate] duration-ui ease-out group-hover-fine:not-motion-reduce:translate-x-1 motion-reduce:transition-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  )
}
