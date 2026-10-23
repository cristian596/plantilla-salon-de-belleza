// Aviso visible mientras un contenido es placeholder. Desaparece al poner isPlaceholder: false.
export function PendingNote({ overlay = false, children = 'Imagen de demostración, pendiente de foto real.' }) {
  if (overlay) {
    return (
      <p className="absolute inset-x-0 bottom-0 bg-cream/90 px-3 py-2 text-small leading-snug text-ink">
        {children}
      </p>
    )
  }
  return <p className="text-small text-ink-soft">{children}</p>
}
