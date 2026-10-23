// Las secciones sobre crema usan media separación arriba y abajo: entre dos secciones
// suman --spacing-section. Las bandas de color (band) llevan la separación completa dentro.
export function Section({ id, labelledBy, band = false, className = '', children }) {
  const spacing = band ? 'py-section' : 'py-half-section'
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-4 ${spacing} ${className}`}>
      {children}
    </section>
  )
}
