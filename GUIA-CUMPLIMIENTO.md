# Guía de cumplimiento para publicar tu landing de salón de belleza en Colombia

## Qué es esta guía

Es una **orientación general** para que sepas qué debes revisar antes de publicar la landing. **No es asesoría legal** y no reemplaza el concepto de un abogado. Los textos legales de la plantilla (política de privacidad, tratamiento de datos y política de cookies) son **borradores**: **hazlos revisar por un abogado colombiano** antes de publicar, y vuelve a revisarlos cada vez que cambie tu operación.

Tú, como comprador, eres quien publica el sitio y quien responde ante tus clientes y ante las autoridades por lo que dice y por los datos que recoge.

> Pendiente: la plantilla todavía no incluye un archivo `LICENSE.md`. Cuando exista, la licencia deberá decir quién responde por el contenido publicado y cuál es el soporte del proveedor. Mientras tanto, confirma esos puntos por escrito con quien te vendió la plantilla.

Dónde se cambia cada cosa:

| Qué | Archivo |
| --- | --- |
| Datos del salón (nombre, WhatsApp, teléfono, correo, dirección, horario, Analytics) | `src/content/site.js` |
| Datos del responsable y textos legales | `src/content/legal.js` |
| Textos del formulario y del banner de cookies | `src/content/copy.js` |
| Imágenes | `src/content/imagenes.js` |
| Promociones | `src/content/promos.js` |
| Casos antes/después | `src/content/cases.js` |

Todo lo que aparece entre [CORCHETES] en esos archivos está pendiente de completar.

---

## 1. Protección de datos personales: Ley 1581 de 2012 y Decreto 1377 de 2013

Estas normas regulan cómo se recogen y usan los datos personales (nombre, teléfono, lo que la persona escribe en el formulario). La autoridad que vigila su cumplimiento es la **Superintendencia de Industria y Comercio (SIC)**. El Decreto 1377 de 2013 hoy está compilado en el Decreto 1074 de 2015. **Pide a tu abogado que confirme las citas y versiones vigentes.**

**Responsable del tratamiento.** Es quien decide para qué y cómo se usan los datos. En esta landing, el responsable eres **tú (el salón)**, no el proveedor de la plantilla. Por eso tu razón social, NIT, dirección, correo y teléfono deben estar completos en el objeto `responsable` de `src/content/legal.js`; esos datos se muestran en las páginas legales.

**Autorización previa, expresa e informada.** Antes de recoger un dato, la persona debe saber quién lo recoge, para qué lo usará y cuáles son sus derechos, y debe aceptarlo de forma clara. Por eso el formulario de reservas (`src/sections/BookingForm.jsx`):

- pide nombre, teléfono, servicio, fecha preferida, hora preferida y un comentario opcional;
- tiene una **casilla de autorización que viene sin marcar** (el valor inicial es `consent: false`);
- **no deja enviar** la solicitud si la casilla no está marcada, y muestra el error «Para enviar tu solicitud necesitamos tu autorización»;
- enlaza, justo debajo de la casilla, la página `/tratamiento-de-datos` (el resumen de la autorización, que a su vez enlaza la política de privacidad completa);
- añade al mensaje de WhatsApp la línea «Autorizo el tratamiento de mis datos: sí.», que sirve como constancia de que la persona dio su autorización.

No quites ni precargues la casilla. La constancia en el mensaje no indica la versión de la política: guarda tú un registro de la fecha en que cambias los textos legales.

**Política de tratamiento de datos.** Es el documento donde explicas qué datos recoges, para qué, por cuánto tiempo, a quién los compartes y cómo ejerce la persona sus derechos. La plantilla trae estos borradores:

| Página | Ruta | Estado |
| --- | --- | --- |
| Política de privacidad (documento completo) | `/privacidad` | Existe, con datos pendientes |
| Tratamiento de datos (resumen de la autorización) | `/tratamiento-de-datos` | Existe, con datos pendientes |
| Política de cookies | `/cookies` | Existe, con datos pendientes |

Los tres textos están en `src/content/legal.js`. Debes completarlos con tu realidad: los datos del responsable, el correo para solicitudes (`correoPqr`), el proveedor de hosting (`hosting`) y la fecha de última actualización (`updated`). Revisa que la lista de terceros incluya a todos los que de verdad tratan datos: el hosting, WhatsApp (Meta), Google Analytics (solo si la persona acepta la analítica) y tu correo, si lo usas para atender solicitudes.

**Derechos del titular.** La persona dueña de los datos puede:

- conocer, actualizar y rectificar sus datos;
- pedir prueba de la autorización que dio;
- ser informada del uso que se les ha dado;
- presentar quejas ante la SIC;
- revocar la autorización o pedir la supresión de sus datos (cuando no haya un deber legal o contractual de conservarlos);
- acceder de forma gratuita a sus datos.

**Plazos para responder** (días hábiles, según la ley; confírmalos con tu abogado):

| Solicitud | Plazo | Prórroga |
| --- | --- | --- |
| **Consulta** (ver qué datos tienes de la persona) | 10 días hábiles | Si no es posible, hasta 5 días hábiles adicionales, informando antes del vencimiento. |
| **Reclamo** (corregir, actualizar, suprimir o revocar) | 15 días hábiles | Si no se puede responder en 15 días, hasta 8 días hábiles adicionales, informando la causa. |

Si el reclamo llega incompleto, se le pide a la persona que lo complete dentro de los 5 días siguientes; si pasan 2 meses sin respuesta, se entiende que desistió. Mientras resuelves un reclamo, la ley exige marcar el dato con la leyenda "reclamo en trámite".

**Registro Nacional de Bases de Datos (RNBD).** El registro es obligatorio solo para personas jurídicas con activos totales superiores a 100.000 UVT. Estar exento no te libera de cumplir la Ley 1581: la autorización previa, la política de tratamiento y la atención de derechos siguen siendo obligatorias.

**Cookies y Google Analytics.** La plantilla trae Google Analytics 4 **apagado**. Se activa solo cuando pones tu ID de medición (empieza con `G-`) en `analyticsId`, dentro de `src/content/site.js`. Mientras ese campo esté vacío, no se carga ningún script de Google. Cuando lo completas:

- aparece un **banner de cookies** (`src/components/CookieBanner.jsx`) con tres botones: «Aceptar analítica», «Rechazar» y «Configurar». «Configurar» abre un panel con dos interruptores: cookies técnicas (siempre activas) y analítica (desactivada por defecto);
- el script de Google **no está en `index.html`**: se carga solo después de que la persona acepta la analítica. Si rechaza, no se carga nada y no se crean cookies de Google;
- la elección se guarda en el navegador de la persona (`localStorage`, clave `cookie-consent-v1`). Si el navegador bloquea el almacenamiento, el banner vuelve a salir en la próxima visita;
- la persona puede cambiar su elección en cualquier momento con el botón «Configurar cookies» del pie de página. Si retira la analítica, la plantilla desactiva el envío de datos y borra las cookies `_ga` del dominio;
- la plantilla usa el modo de consentimiento de Google (Consent Mode v2) con todo en «denegado» por defecto, y solo envía la ruta de la página vista, sin datos del formulario;
- la política de cookies (`/cookies`) lista las cookies `_ga` y `_ga_*` y la clave `cookie-consent-v1`.

La propiedad de Google Analytics debe ser **de tu empresa** (créala en [analytics.google.com](https://analytics.google.com) con una cuenta de la empresa), no del proveedor de la plantilla: tú eres el responsable de esos datos. **No cargues Analytics por otra vía** (por ejemplo, pegando el script en `index.html` o usando otra herramienta), porque eso se saltaría el consentimiento. Pide a tu abogado que revise los textos de cookies y la **transferencia internacional de datos**, porque Google puede procesar datos fuera de Colombia. Verifica también con tu proveedor de hosting si instala cookies propias; el borrador de `/cookies` tiene ese punto marcado como [CONFIRMAR].

**Fotos de clientes y del equipo (derecho a la imagen).** La imagen de una persona es un dato personal. Para publicar fotos de **clientes** (antes/después, galería) o del **equipo**, necesitas una **autorización escrita y específica** de cada persona, que ella pueda revocar. Si alguien retira su autorización, debes quitar su foto del sitio. **No publiques fotos de clientes sin esa autorización.**

Modelo breve (un abogado debe revisarlo y ajustarlo antes de usarlo):

> **Autorización para uso de imagen**
>
> Yo, [NOMBRE COMPLETO], identificado(a) con [TIPO Y NÚMERO DE DOCUMENTO], autorizo a [RAZÓN SOCIAL], NIT [NIT], para que publique fotografías de [mi rostro / la zona tratada] tomadas el [FECHA], únicamente en [SITIO WEB / REDES SOCIALES: indicar cuáles] y con la finalidad de [mostrar resultados de tratamientos del salón].
>
> Entiendo que esta autorización es voluntaria, que no recibo pago por ella, que vale por [PLAZO] y que puedo revocarla en cualquier momento escribiendo a [CORREO]; en ese caso, [RAZÓN SOCIAL] retirará las fotos de los canales que controla en un plazo de [X días hábiles]. He leído la política de tratamiento de datos del salón.
>
> Firma: __________  Fecha: __________

Guarda cada autorización firmada junto con la foto a la que corresponde.

---

## 2. Consumidores y publicidad: Ley 1480 de 2011 (Estatuto del Consumidor)

- **Información veraz y suficiente.** Todo lo que muestres debe corresponder a la realidad: precios, duraciones, promociones, resultados y fotos. Los precios y duraciones de `src/content/services.js` hoy son marcadores (`$ XX.XXX`, `XX min`). Si algún precio es "desde", indica claramente qué incluye y qué puede aumentarlo.
- **Antes y después.** Solo muestra resultados reales del salón, con autorización escrita del cliente (ver sección 1). Los casos de `src/content/cases.js` son de muestra: las fotos no son resultados del salón. Si publicas ilustraciones, rotúlalas. **No prometas resultados garantizados**: cada piel y cada cuerpo responde distinto.
- **Imágenes de muestra.** Todas las entradas de `src/content/imagenes.js` están marcadas con `muestra: true` y son de ejemplo; el sitio les pone el aviso «Imagen de muestra» mientras `mostrarAvisosMuestra` sea `true` en `site.js`. Reemplázalas por fotos reales o déjalas rotuladas. El campo `fuente` de cada imagen indica su origen y licencia (hoy, Unsplash con su licencia propia): **revisa la licencia de cada imagen de terceros antes de publicar** y no la quites del aviso hasta haberlas sustituido.
- **Promociones.** Las de `src/content/promos.js` son ejemplos. Si anuncias descuentos u ofertas, indica a quién aplican, condiciones, vigencia (`validUntil`) y restricciones, y cúmplelas. No publiques la sección con textos de ejemplo.
- **Garantías o políticas de satisfacción.** La plantilla no trae ninguna. Si ofreces alguna, que sea real y cumplible. La ley también establece una garantía legal que no puedes desconocer; consulta con tu abogado cómo se combina con tus garantías comerciales.
- **Identificación del proveedor.** El sitio debe mostrar quién ofrece los servicios. El pie de página muestra hoy el nombre del salón, la dirección, el teléfono, el correo, el horario y las redes, pero **no la razón social ni el NIT**; esos datos solo salen en las páginas legales. Pide a quien mantiene la plantilla que los agregue al pie, o confirma con tu abogado que es suficiente. Completa también los canales de contacto reales en `site.js`.

---

## 3. Servicios de estética: requisitos sanitarios y de productos

Algunos tratamientos (por ejemplo, los que usan equipos, ciertos productos o procedimientos invasivos) pueden tener requisitos de la autoridad de salud local o nacional. Antes de anunciar un tratamiento, **verifica con tu abogado o con la secretaría de salud de tu ciudad** qué permisos, condiciones del local, formación del personal y reglas sobre productos aplican a tu salón y a cada servicio. Esta guía no cita normas sanitarias concretas porque no se han verificado para este proyecto.

---

## 4. Dónde llegan las solicitudes y quién responde por ellas

La landing **no tiene servidor ni base de datos**. Cada solicitud del formulario se envía como un mensaje de **WhatsApp al número que pusiste en `whatsapp`** (`src/content/site.js`, solo dígitos con indicativo, por ejemplo `573001234567`). Mientras ese campo esté vacío, el formulario avisa que no puede enviar la solicitud. Eso significa que:

- el mensaje incluye nombre, teléfono, servicio, fecha y hora preferidas, el comentario (si lo hay) y la línea de autorización;
- la persona debe pulsar «enviar» en WhatsApp; el sitio solo deja el mensaje listo;
- los datos quedan en **el WhatsApp del salón** (te recomendamos WhatsApp Business en un teléfono de la empresa);
- **tú eres el responsable** de esos datos desde que llegan: de custodiarlos, usarlos solo para lo que la persona autorizó y atender sus solicitudes;
- la cita **no queda confirmada** hasta que el salón responda; responde dentro del tiempo que prometes en la web (`replyTime` en `site.js` y el texto de `copy.booking.steps`).

Si más adelante conectas otro servicio de envío (por ejemplo, un correo), ese servicio también recibirá datos y debe aparecer en tu política de privacidad.

---

## 5. Qué hacer si llega una solicitud de derechos o un reclamo

1. **Registra** la fecha de recibo y el canal (WhatsApp, correo). Esa fecha inicia el conteo del plazo.
2. **Verifica la identidad** de quien pide (que sea el titular de los datos o su representante).
3. **Clasifica** la solicitud: consulta, o reclamo (corrección, actualización, supresión o revocatoria).
4. **Responde dentro del plazo** (10 días hábiles para consultas, 15 para reclamos; las prórrogas se informan antes de que venza el plazo y con el motivo).
5. **Ejecuta lo pedido**: entrega la información, corrige o elimina los datos en tus chats, hojas de cálculo, agenda y cualquier otro lugar donde estén, y deja constancia por escrito de lo que hiciste.
6. **Conserva el registro** de la solicitud y de tu respuesta.
7. Si no sabes cómo responder, o la persona amenaza con acudir a la SIC, **consulta a tu abogado** antes de contestar.

Las páginas legales indican como canal para estas solicitudes el correo `correoPqr` de `src/content/legal.js`. Hoy es un marcador ([CORREO DE PQR]): complétalo con un correo que revises con frecuencia. El correo `email` de `site.js` es el de contacto general que se muestra en el pie.

---

## 6. Lista de verificación antes de publicar

- [ ] `src/content/site.js` completo: nombre, ciudad, WhatsApp, teléfono, correo, dirección, horario, franjas de hora y redes.
- [ ] `responsable` en `src/content/legal.js` completo: razón social, NIT, dirección, correo, teléfono, correo de solicitudes y hosting.
- [ ] Razón social y NIT visibles en el pie de página (hoy solo salen en las páginas legales; ver sección 2).
- [ ] Política de privacidad, tratamiento de datos y política de cookies completadas, revisadas por un abogado, y con la fecha de última actualización (`updated`) al día.
- [ ] Casilla de autorización activa, sin marcar por defecto, probada con el formulario real.
- [ ] Imágenes de muestra reemplazadas o rotuladas; `fuente` y licencia de cada imagen de terceros revisadas.
- [ ] Antes/después solo con autorización escrita de los clientes.
- [ ] Fotos del equipo con autorización escrita de cada persona, y nombres, especialidades y formación reales.
- [ ] Precios y duraciones reales en los servicios; si hay precios "desde", dicen qué incluyen.
- [ ] Promociones con condiciones y vigencia reales, o la sección sin publicar.
- [ ] Requisitos sanitarios de los tratamientos verificados (sección 3).
- [ ] Google Analytics: si lo usas, con el ID de **tu** propiedad GA4 en `analyticsId` y el banner probado (aceptar carga Analytics; rechazar no carga nada). Si no lo usas, déjalo vacío: no se instala ninguna cookie de analítica.
- [ ] Formulario probado con un envío real a tu WhatsApp.
- [ ] Prueba en un móvil real (formulario, banner de cookies y enlaces legales).
- [ ] `LICENSE.md` incluido por el proveedor y revisado (hoy no existe).
