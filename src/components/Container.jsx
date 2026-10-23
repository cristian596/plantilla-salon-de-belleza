// Contenedor con márgenes laterales iguales en ambos lados (incluye safe-area).
export function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-page px-[max(var(--spacing-gutter),env(safe-area-inset-left),env(safe-area-inset-right))] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
