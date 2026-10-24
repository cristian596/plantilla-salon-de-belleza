// Textos legales. Todo lo que va entre [CORCHETES] está pendiente de confirmar.
// Estos textos son una base de trabajo: deben ser revisados por un abogado antes de publicarse.
//
// Formato de cada documento: { title, description, updated, intro?, sections }.
// Cada sección: { heading, content: [...] }, donde cada elemento de content es:
//   'texto'                                   → párrafo
//   { list: ['a', 'b'] }                      → lista
//   { records: { labels: [...], items: [[...]] } } → ficha por elemento (cookies)
//   { link: { to, label } }                   → enlace interno
//   { cookieSettings: 'texto' }               → botón que abre las preferencias de cookies

export const responsable = {
  razonSocial: '[RAZÓN SOCIAL]',
  nit: '[NIT]',
  direccion: '[DIRECCIÓN]',
  correo: '[CORREO]',
  telefono: '[TELÉFONO]',
  correoPqr: '[CORREO DE PQR]',
  hosting: '[PROVEEDOR DE HOSTING]',
}

const r = responsable
const updated = '[FECHA DE ÚLTIMA ACTUALIZACIÓN]'
const responsableList = {
  list: [
    `Razón social: ${r.razonSocial}`,
    `NIT: ${r.nit}`,
    `Dirección: ${r.direccion}`,
    `Correo electrónico: ${r.correo}`,
    `Teléfono: ${r.telefono}`,
  ],
}

export const legal = {
  privacidad: {
    title: 'Política de privacidad',
    description:
      'Cómo tratamos tus datos personales cuando solicitas una cita en nuestro sitio: qué datos, para qué, tus derechos y cómo ejercerlos.',
    updated,
    intro:
      'Esta política explica cómo se tratan los datos personales que nos das al usar este sitio, de acuerdo con la Ley 1581 de 2012 de Colombia y sus decretos reglamentarios.',
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        content: ['El responsable de tus datos personales es:', responsableList],
      },
      {
        heading: '2. Datos que se recogen',
        content: [
          'Al enviar el formulario de cita se recogen estos datos:',
          {
            list: [
              'Nombre',
              'Teléfono',
              'Servicio solicitado',
              'Fecha y hora preferidas',
              'Comentario (opcional)',
            ],
          },
          'Además, si lo autorizas, se recogen datos de navegación mediante cookies de analítica, como se explica en la política de cookies.',
          'No pedimos datos sensibles. Te pedimos que no los incluyas en el comentario.',
        ],
      },
      {
        heading: '3. Finalidades',
        content: [
          'Usamos tus datos únicamente para:',
          {
            list: [
              'Gestionar tu solicitud de cita y contactarte para confirmarla.',
              'Responder las consultas que nos hagas.',
              'Solo si lo autorizas: medir cómo se usa el sitio (analítica) para mejorarlo.',
            ],
          },
          'No usamos tus datos para enviarte publicidad ni los vendemos.',
        ],
      },
      {
        heading: '4. Base legal',
        content: [
          'Tratamos tus datos con tu autorización previa, expresa e informada, conforme a la Ley 1581 de 2012. La das marcando la casilla del formulario de citas y, para la analítica, aceptándola en el aviso de cookies.',
          'La autorización es voluntaria. Puedes revocarla en cualquier momento.',
        ],
      },
      {
        heading: '5. Derechos del titular',
        content: [
          'Como titular de los datos tienes derecho a:',
          {
            list: [
              'Conocer los datos que tenemos sobre ti.',
              'Actualizarlos y rectificarlos.',
              'Solicitar la supresión de tus datos.',
              'Revocar la autorización que diste.',
              'Acceder de forma gratuita a tus datos personales.',
              'Pedir prueba de la autorización y ser informado del uso que se les ha dado.',
            ],
          },
          `Para ejercer estos derechos escribe a ${r.correoPqr}.`,
        ],
      },
      {
        heading: '6. Consultas y reclamos',
        content: [
          'Consultas: las respondemos en un máximo de 10 días hábiles desde su recibo. Si no es posible, te avisamos el motivo y la nueva fecha, que no superará 5 días hábiles adicionales.',
          'Reclamos (corrección, actualización, supresión o revocatoria): envía un escrito a ' +
            r.correoPqr +
            ' con tu identificación, la descripción de los hechos y cómo quieres ser contactado.',
          {
            list: [
              'Si el reclamo está incompleto, te lo indicaremos dentro de los 5 días siguientes para que lo completes. Si pasan 2 meses sin que lo completes, entendemos que desististe.',
              'Lo resolvemos en un máximo de 15 días hábiles. Si no es posible, te informamos el motivo y la nueva fecha, que no superará 8 días hábiles adicionales.',
              'Si no somos competentes para resolverlo, lo trasladamos a quien corresponda en un máximo de 2 días hábiles y te avisamos.',
            ],
          },
        ],
      },
      {
        heading: '7. Terceros',
        content: [
          'Tus datos pueden pasar por estos terceros:',
          {
            list: [
              'WhatsApp (Meta Platforms): al enviar el formulario se abre WhatsApp con un mensaje que contiene los datos del formulario. Los datos salen de este sitio en el mensaje que tú envías, y WhatsApp los trata según sus propias condiciones.',
              'Google Analytics (Google LLC): solo si aceptas la analítica. Mide el uso del sitio sin recibir tu nombre, teléfono ni el contenido del formulario. Google puede procesar datos fuera de Colombia.',
              `Proveedor de hosting (${r.hosting}): aloja el sitio y puede registrar datos técnicos de conexión, como la dirección IP, por motivos de seguridad y funcionamiento.`,
            ],
          },
        ],
      },
      {
        heading: '8. Medidas de seguridad',
        content: [
          'Aplicamos medidas técnicas, humanas y administrativas razonables para proteger tus datos contra pérdida, acceso no autorizado o uso indebido. Este sitio no guarda en sus propios servidores los datos del formulario. Ninguna medida es infalible, por lo que no podemos garantizar una seguridad absoluta.',
        ],
      },
      {
        heading: '9. Vigencia',
        content: [
          'Conservamos tus datos mientras sean necesarios para gestionar tu solicitud y atender posibles reclamos, o hasta que pidas su supresión.',
          'Esta política rige desde la fecha de última actualización indicada arriba. Si la cambiamos, publicaremos la nueva versión en esta página.',
        ],
      },
      {
        heading: '10. Autoridad de control',
        content: [
          'La autoridad de protección de datos en Colombia es la Superintendencia de Industria y Comercio (SIC). Antes de acudir a ella debes haber presentado tu consulta o reclamo ante el responsable.',
        ],
      },
    ],
  },

  tratamiento: {
    title: 'Tratamiento de datos personales',
    description:
      'Autorización para el tratamiento de tus datos personales al solicitar una cita: qué datos, para qué, quién es el responsable y cuáles son tus derechos.',
    updated,
    intro:
      'Este es el resumen de la autorización que das al marcar la casilla del formulario de citas. El detalle completo está en la política de privacidad.',
    sections: [
      {
        heading: 'Responsable',
        content: [responsableList],
      },
      {
        heading: 'Qué datos tratamos',
        content: [
          'Tu nombre, teléfono, el servicio solicitado, la fecha y hora preferidas y, si lo escribes, el comentario.',
        ],
      },
      {
        heading: 'Para qué',
        content: [
          'Para gestionar tu solicitud de cita y contactarte para confirmarla. No los usamos para publicidad ni los vendemos.',
        ],
      },
      {
        heading: 'Cómo salen tus datos',
        content: [
          'Al enviar el formulario se abre WhatsApp con un mensaje que contiene estos datos. Los datos salen de este sitio solo en el mensaje que tú envías.',
        ],
      },
      {
        heading: 'Tu autorización es voluntaria y revocable',
        content: [
          'No estás obligado a darla, pero sin ella no podemos gestionar tu solicitud por este formulario. Puedes revocarla o pedir la supresión de tus datos cuando quieras.',
        ],
      },
      {
        heading: 'Tus derechos',
        content: [
          {
            list: [
              'Conocer, actualizar y rectificar tus datos.',
              'Solicitar su supresión y revocar la autorización.',
              'Acceder gratis a tus datos.',
            ],
          },
          `Escribe a ${r.correoPqr} para ejercerlos.`,
        ],
      },
      {
        heading: 'Más información',
        content: [{ link: { to: '/privacidad', label: 'Leer la política de privacidad completa' } }],
      },
    ],
  },

  cookies: {
    title: 'Política de cookies',
    description:
      'Qué cookies y almacenamiento usa este sitio, para qué sirven, cuánto duran y cómo cambiar tu elección o borrarlas desde el navegador.',
    updated,
    intro:
      'Aquí te explicamos qué cookies usa este sitio y cómo controlarlas. Las de analítica solo se activan si las aceptas.',
    sections: [
      {
        heading: '1. Qué son las cookies',
        content: [
          'Las cookies son pequeños archivos que un sitio guarda en tu navegador para recordar información, como tus preferencias o cómo usas el sitio.',
        ],
      },
      {
        heading: '2. Qué usa este sitio',
        content: [
          'Cookies técnicas: este sitio no instala cookies técnicas propias. Sí guarda en el almacenamiento local de tu navegador un dato con tu elección sobre las cookies, para no volver a preguntarte.',
          `Cookies de analítica: si las aceptas, se usa Google Analytics (Google LLC) para medir cómo se usa el sitio. Antes de que aceptes, no se carga ningún script de Google ni se guarda ninguna cookie de analítica. No enviamos tu nombre, teléfono ni el contenido del formulario.`,
          `El proveedor de hosting (${r.hosting}) no instala cookies en este sitio. [CONFIRMAR con el proveedor de hosting]`,
        ],
      },
      {
        heading: '3. Listado',
        content: [
          {
            records: {
              labels: ['Nombre', 'Proveedor', 'Finalidad', 'Duración'],
              items: [
                [
                  'cookie-consent-v1 (almacenamiento local, no es una cookie)',
                  'Este sitio',
                  'Recordar tu elección sobre las cookies. Es técnico y necesario.',
                  'Hasta que la borres o cambies tu elección',
                ],
                [
                  '_ga',
                  'Google LLC',
                  'Distinguir a los usuarios para la analítica. Solo con tu consentimiento.',
                  '2 años',
                ],
                [
                  '_ga_ seguido del identificador de medición',
                  'Google LLC',
                  'Mantener el estado de la sesión en la analítica. Solo con tu consentimiento.',
                  '2 años',
                ],
              ],
            },
          },
        ],
      },
      {
        heading: '4. Cómo cambiar tu elección',
        content: [
          'Puedes aceptar o retirar la analítica en cualquier momento con el botón «Configurar cookies» del pie de página, o con este:',
          { cookieSettings: 'Configurar cookies' },
          'El cambio se aplica al instante, sin recargar la página.',
        ],
      },
      {
        heading: '5. Cómo borrar las cookies desde el navegador',
        content: [
          'Puedes bloquear o borrar las cookies desde los ajustes de tu navegador:',
          {
            list: [
              'Chrome: Configuración > Privacidad y seguridad > Cookies y otros datos de sitios.',
              'Firefox: Ajustes > Privacidad y seguridad > Cookies y datos del sitio.',
              'Safari: Ajustes > Privacidad > Administrar datos de sitios web.',
              'Edge: Configuración > Cookies y permisos del sitio > Administrar y eliminar cookies.',
            ],
          },
          'Si borras los datos del sitio, te volveremos a preguntar por tu elección.',
        ],
      },
      {
        heading: '6. Más información',
        content: [{ link: { to: '/privacidad', label: 'Leer la política de privacidad' } }],
      },
    ],
  },
}
