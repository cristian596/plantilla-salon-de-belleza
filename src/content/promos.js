// Promociones. Todo es marcador: no publicar la sección sin datos reales.
// serviceValue preselecciona el servicio en el formulario ("grupo:tratamiento").

export const featuredPromo = {
  title: '[Nombre de la promoción]',
  benefit: '[Beneficio concreto: por ejemplo, porcentaje de descuento o servicio incluido.]',
  serviceValue: 'faciales:limpieza-facial-profunda',
  conditions: [
    '[Condición 1: a quién aplica]',
    '[Condición 2: si es acumulable con otras ofertas]',
    '[Condición 3: forma de pago o reserva previa]',
  ],
  validUntil: '[FECHA]',
}

export const otherPromos = [
  {
    title: '[Promoción secundaria 1]',
    summary: '[Resumen de la condición principal]',
    validUntil: '[FECHA]',
    serviceValue: 'pestanas:lifting-de-pestanas',
  },
  {
    title: '[Promoción secundaria 2]',
    summary: '[Resumen de la condición principal]',
    validUntil: '[FECHA]',
    serviceValue: 'corporales:masaje-relajante',
  },
]
