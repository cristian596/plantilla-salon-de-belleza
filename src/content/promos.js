// Promociones. Todo son ejemplos: no publicar la sección sin datos reales.
// serviceValue preselecciona el servicio en el formulario ("grupo:tratamiento").

export const featuredPromo = {
  title: 'Ejemplo: promoción de bienvenida',
  benefit: 'Ejemplo: beneficio concreto, como un porcentaje de descuento o un servicio incluido.',
  serviceValue: 'faciales:limpieza-facial-profunda',
  conditions: [
    'Ejemplo: a quién aplica',
    'Ejemplo: si es acumulable con otras ofertas',
    'Ejemplo: forma de pago o reserva previa',
  ],
  validUntil: '[FECHA]',
}

export const otherPromos = [
  {
    title: 'Ejemplo: promoción secundaria 1',
    summary: 'Ejemplo: resumen de la condición principal',
    validUntil: '[FECHA]',
    serviceValue: 'pestanas:lifting-de-pestanas',
  },
  {
    title: 'Ejemplo: promoción secundaria 2',
    summary: 'Ejemplo: resumen de la condición principal',
    validUntil: '[FECHA]',
    serviceValue: 'corporales:masaje-relajante',
  },
]
