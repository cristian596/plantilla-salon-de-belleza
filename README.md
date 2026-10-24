# Plantilla de landing para salón de belleza

Landing de una sola página para un salón de belleza. Incluye: **cabecera fija**, **portada** (hero), **servicios** (tratamientos con duración y precio), **comparador antes/después**, **resultados** (galería de trabajos), **promociones**, **equipo**, **reservas** con formulario que abre WhatsApp, **pie de página** y tres páginas legales (**privacidad**, **tratamiento de datos** y **cookies**) con un **banner de cookies** para Google Analytics.

Está hecha con React, Vite y Tailwind CSS v4. No necesita base de datos ni servidor: al compilarla se obtiene una carpeta de archivos estáticos (`dist`) que se publica en Cloudflare Pages (ver sección 13).

**Todo el contenido es de ejemplo.** El nombre del salón aparece como `[NOMBRE DEL SALÓN]` y los datos pendientes van entre `[CORCHETES]` hasta que los cambies (ver sección 6). Las fotos son de muestra y llevan un aviso visible (ver sección 8). Antes de publicar, lee la **[guía de cumplimiento](GUIA-CUMPLIMIENTO.md)**.

---

## 1. Requisitos

- **Node.js 20.19 o superior** (o 22.12 o superior). Es el mínimo que pide Vite 8, que usa este proyecto. Verifica tu versión con `node -v`.
- **npm** (viene con Node.js).

## 2. Instalación y prueba local

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
npm run dev
```

La web queda disponible en **http://localhost:5173/** (si ese puerto está ocupado, Vite mostrará otro en la terminal). Los cambios que guardes se ven al instante. Para detenerlo: `Ctrl + C`.

## 3. Comandos

Estos son todos los comandos que existen en `package.json`:

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor local de desarrollo. |
| `npm run build` | Compila la web para publicar. El resultado queda en la carpeta `dist`. |
| `npm run preview` | Muestra el contenido de `dist` tal como se vería publicado (por defecto en http://localhost:4173/). Ejecuta antes `npm run build`. |

> La plantilla no trae un comando de revisión automática de pendientes. La revisión antes de publicar es manual (sección 12).

## 4. Mapa de archivos

| Qué quieres cambiar | Dónde está |
| --- | --- |
| Nombre, ciudad, WhatsApp, teléfono, correo, dirección, horario, redes, franjas de cita, días cerrados, ID de Analytics, aviso de imágenes de muestra | `src/content/site.js` |
| Menú de navegación | `nav`, en `src/content/site.js` |
| Titular y botones de la portada | `hero`, en `src/content/site.js` |
| Titulares y textos de cada sección, textos del formulario y del banner de cookies | `src/content/copy.js` |
| Tratamientos, duraciones y precios | `src/content/services.js` |
| Casos del comparador antes/después | `src/content/cases.js` |
| Galería de trabajos (sección Resultados) | `src/content/gallery.js` |
| Promociones | `src/content/promos.js` |
| Equipo | `src/content/team.js` |
| Todas las imágenes (ruta, texto alternativo, aviso de muestra) | `src/content/imagenes.js` |
| Archivos de las fotos | `public/images/muestra/` |
| Datos del responsable y textos legales (privacidad, tratamiento de datos, cookies) | `src/content/legal.js` |
| Colores, tipografía, tamaños, espaciado y duraciones | `src/styles/tailwind.css` (bloque `@theme`) |
| Constantes de movimiento en JavaScript | `src/lib/motion.js` |
| Validación del formulario | `src/lib/validation.js` |
| Mensaje de WhatsApp | `src/lib/whatsapp.js` |
| Consentimiento de cookies y Google Analytics | `src/lib/consent.js`, `src/lib/analytics.js`, `src/components/CookieBanner.jsx` |
| Rutas de la web | `src/App.jsx` |
| Título y descripción para Google, color de la barra del móvil, imágenes precargadas | `index.html` |
| Ícono de la pestaña | `public/favicon.svg` |
| Guía legal para el comprador | `GUIA-CUMPLIMIENTO.md` |
| Guía de despliegue en Cloudflare Pages | `DESPLIEGUE-CLOUDFLARE.md` |

---

## 5. Qué hace cada sección

Todas las secciones están en `src/sections/` y se arman en `src/pages/Home.jsx`, en este orden:

| Sección | Archivo | Ancla del menú |
| --- | --- | --- |
| Cabecera fija | `Header.jsx` | — |
| Portada | `Hero.jsx` | `#inicio` |
| Servicios | `Services.jsx` | `#servicios` |
| Comparador antes/después | `BeforeAfter.jsx` y `CompareSlider.jsx` | `#antes-despues` |
| Resultados (galería) | `Results.jsx` | — |
| Promociones | `Promotions.jsx` | `#promociones` |
| Equipo | `Team.jsx` | `#equipo` |
| Reservas | `Booking.jsx` y `BookingForm.jsx` | `#reservas` |
| Barra de reserva en móvil | `MobileBookingBar.jsx` | — |
| Pie de página | `Footer.jsx` | — |

Las piezas pequeñas que se reutilizan (botones, contenedor, animación de entrada, imagen, aviso de muestra, banner de cookies, página legal) están en `src/components/`.

---

## 6. Cómo cambiar la marca

Los datos del salón están en **`src/content/site.js`**. Cambia el valor entre comillas y guarda. Lo que aparece entre `[CORCHETES]` es lo que debes reemplazar.

| Campo | Qué es | Dónde se ve |
| --- | --- | --- |
| `name` | Nombre del salón. | Cabecera, pie de página, mensaje de WhatsApp y títulos de las páginas legales. |
| `city` | Ciudad. | Texto de apoyo de la portada (`hero.lead` usa `[CIUDAD]` escrito a mano; cámbialo también ahí). |
| `whatsapp` | Número en formato internacional, **solo dígitos** (57 + número). | Destino del formulario de reservas. **Mientras esté vacío, el formulario avisa que no puede enviar la solicitud.** |
| `phoneDisplay` | Teléfono tal como se muestra. | Pie de página. |
| `phoneHref` | Enlace de llamada, por ejemplo `tel:+573001234567`. | Convierte el teléfono del pie de página en enlace. Vacío = solo texto. |
| `email` | Correo de contacto. | Pie de página. Es enlace solo si contiene `@`. |
| `address` | Dirección. | Pie de página. |
| `replyTime` | Tiempo de respuesta (por ejemplo "2 horas"). | Dato de apoyo del salón. El texto visible de los pasos de reserva está en `copy.js` (`booking.steps`) y también tiene `[X horas]`; cámbialo ahí. |
| `hours` | Lista de horarios (`days` y `time`). | Pie de página. |
| `closedWeekdays` | Días sin atención: `0` = domingo … `6` = sábado. | El formulario rechaza esas fechas. |
| `timeSlots` | Franjas de la lista "Hora preferida". | Formulario de reservas. |
| `social` | Redes como enlaces de texto (`label` y `href`). | Pie de página. Si `href` está vacío, se ve el nombre con "[enlace pendiente]". |
| `analyticsId` | ID de Google Analytics 4 (`G-XXXXXXXXXX`). | Ver sección 11. Vacío = sin analítica. |
| `mostrarAvisosMuestra` | `true` muestra el aviso "Imagen de muestra" sobre las fotos que lo tengan; `false` lo oculta en todo el sitio. | Todas las fotos de muestra. Ver sección 8. |

**Ejemplo, antes y después** (datos ficticios):

```js
// Antes
name: '[NOMBRE DEL SALÓN]',
city: '[CIUDAD]',
whatsapp: '',
phoneDisplay: '[TELÉFONO]',
phoneHref: '',
address: '[DIRECCIÓN]',
closedWeekdays: [0],

// Después
name: 'Estudio Aura',
city: 'Medellín',
whatsapp: '573001234567',
phoneDisplay: '+57 300 123 4567',
phoneHref: 'tel:+573001234567',
address: 'Calle 10 # 35-20, local 4',
closedWeekdays: [0, 1], // cierra domingo y lunes
```

Con eso, el pie de página mostrará "Estudio Aura", y el formulario enviará las solicitudes al WhatsApp `573001234567` y no aceptará fechas de domingo ni de lunes.

Además de `site.js`, cambia estos lugares, que **no** leen ese archivo:

- `src/content/site.js`, `hero.lead`: el texto de la portada trae `[CIUDAD]` escrito a mano.
- `src/content/copy.js`, `booking.steps`: el tercer paso trae `[X horas]` escrito a mano.
- `src/content/legal.js`, objeto `responsable`: razón social, NIT, dirección, correo, teléfono, correo de PQR y proveedor de hosting. Es un bloque aparte de `site.js`, así que los datos del salón hay que escribirlos en ambos (ver sección 15).
- `index.html`: `<title>` y `description` (lo que se ve en Google).
- `public/favicon.svg`: el ícono de la pestaña.

---

## 7. Cómo cambiar cada sección

### 7.1 Cabecera y menú

`Header.jsx`. Las opciones del menú salen de `nav` en `site.js` (`href` es el ancla de la sección y `label` el texto). La cabecera queda fija al desplazarse.

### 7.2 Portada (hero)

`Hero.jsx`. Titular, texto de apoyo y los dos botones salen de `hero` en `site.js` (`title`, `lead`, `cta`, `secondary`). La foto es la entrada `hero` de `imagenes.js`: se recorta **4:5 en escritorio** y **5:4 en móvil**. Si cambias esa foto, actualiza también las dos líneas `preload` de `index.html` (ver sección 8).

### 7.3 Servicios

`Services.jsx`. El titular y la introducción salen de `copy.services`. Los tratamientos están en `src/content/services.js`, en la lista `serviceGroups`. Cada grupo (Faciales, Corporales, Pestañas, Cuidado personal) tiene `id`, `title`, `intro`, `image` y una lista `treatments`. Cada tratamiento se escribe con `t('Nombre', 'Descripción')`, y la duración y el precio de ejemplo (`XX min` y `$ XX.XXX`) están dentro de la función `t` al inicio del archivo: cámbialos por los reales (o amplía `t` para recibirlos por tratamiento).

El `id` de cada tratamiento se genera solo desde el nombre (minúsculas, sin tildes, con guiones). Las promociones lo usan para preseleccionar el servicio en el formulario.

### 7.4 Comparador antes/después

`BeforeAfter.jsx` y `CompareSlider.jsx`. Titular y texto: `copy.compare`. Los casos están en `src/content/cases.js`; cada uno tiene `label`, `treatment`, `sessions`, `note`, `before` y `after` (las dos fotos de `imagenes.js`). El visitante desliza la línea o usa el teclado, y puede cambiar de caso.

**Importante:** las fotos de muestra son de la misma sesión y **no son resultados del salón**. Ver sección 8.4 antes de usar fotos reales.

### 7.5 Resultados (galería)

`Results.jsx`. Titular: `copy.results.title`. La introducción y las fotos con su leyenda están en `src/content/gallery.js` (`galleryIntro` y `gallery`). Para agregar una foto, copia un bloque `{ imagen, caption }`.

### 7.6 Promociones

`Promotions.jsx`. Datos en `src/content/promos.js`: una promoción destacada (`featuredPromo`) y una lista de secundarias (`otherPromos`). `serviceValue` tiene el formato `grupo:tratamiento` (por ejemplo `faciales:limpieza-facial-profunda`) y, al pulsar el botón de la promoción, deja ese servicio elegido en el formulario. Todo es de ejemplo: **no publiques la sección sin datos reales** o quítala de `Home.jsx` (y la opción "Promociones" de `nav`).

### 7.7 Equipo

`Team.jsx`. Titular: `copy.team.title`. La frase de introducción y las personas (`name`, `specialty`, `training`, `imagen`) están en `src/content/team.js`.

### 7.8 Reservas y formulario

`Booking.jsx` (texto y pasos, de `copy.booking`) y `BookingForm.jsx` (el formulario).

- **Campos:** nombre, teléfono, servicio (agrupado por categoría, de `serviceGroups`), fecha preferida, hora preferida, comentario (opcional, hasta 500 caracteres) y casilla de autorización.
- **Horarios y días:** las horas salen de `timeSlots` y los días sin atención de `closedWeekdays`, ambos en `site.js`.
- **Validación:** `src/lib/validation.js` (nombre de al menos 2 letras, teléfono de 7 a 15 dígitos, fecha de hoy en adelante y no en un día cerrado, hora obligatoria, comentario de hasta 500 caracteres). Los mensajes de error están en ese archivo.
- **Mensaje de WhatsApp:** `src/lib/whatsapp.js`, función `buildMessage`. Incluye nombre, teléfono, servicio, fecha, hora, comentario y la línea de autorización. Al enviar, se abre WhatsApp con el mensaje ya escrito, dirigido al número `whatsapp` de `site.js`.
- **Casilla de autorización:** viene **sin marcar** y es obligatoria. Su texto, el enlace a la política y el mensaje de error están en `copy.booking.consent`. No la marques por defecto.
- **Barra móvil:** `MobileBookingBar.jsx` muestra un acceso rápido a las reservas en pantallas chicas cuando la portada ya no se ve y el formulario aún no.

### 7.9 Pie de página y páginas legales

`Footer.jsx` muestra contacto, horario, redes, enlaces legales y el botón "Configurar cookies". Las rutas que existen son `/privacidad`, `/tratamiento-de-datos` y `/cookies`, definidas en `src/App.jsx`; el texto de las tres está en `src/content/legal.js`. **Son borradores: deben ser revisados por un abogado antes de publicar** (ver [GUIA-CUMPLIMIENTO.md](GUIA-CUMPLIMIENTO.md)).

---

## 8. Imágenes de muestra

**Todas las fotos de la plantilla son de muestra** (de Unsplash, con la licencia de Unsplash). Están en `public/images/muestra/` y todas están registradas en un único archivo: `src/content/imagenes.js`. El comprador debe **reemplazarlas por fotos de su salón** (con derechos de uso y, si hay personas, con su autorización). Si contrata la personalización, se cambian por fotos del salón.

### 8.1 Tabla de imágenes

Todas las fotos están en WebP. El sitio declara un ancho de 1080 px para el cálculo del espacio; sube fotos **al menos de ese ancho** (la de la portada, de 1600 px o más). Las filas con versión móvil usan un archivo aparte con el mismo nombre más `-movil`.

| Slot (`id`) | Dónde se ve | Proporción (ancho:alto) | Tamaño recomendado | Archivo sugerido | Fuente y licencia |
| --- | --- | --- | --- | --- | --- |
| `hero` | Portada. Escritorio 4:5 y móvil 5:4 | 4:5 vertical (móvil: 5:4 horizontal) | 1600 × 2000 px (móvil: 1600 × 1280 px) | `hero.webp` y `hero-movil.webp` | Unsplash, licencia de Unsplash, ID `photo-1637722881530-97871cfab220` |
| `servicios-faciales` | Servicios, grupo Faciales | 3:4 vertical (móvil: 3:2 horizontal) | 1080 × 1440 px (móvil: 1620 × 1080 px) | `servicios-faciales.webp` y `servicios-faciales-movil.webp` | Unsplash, `photo-1570172619644-dfd03ed5d881` |
| `servicios-corporales` | Servicios, grupo Corporales | 3:4 vertical (móvil: 3:2 horizontal) | 1080 × 1440 px (móvil: 1620 × 1080 px) | `servicios-corporales.webp` y `servicios-corporales-movil.webp` | Unsplash, `photo-1696841212541-449ca29397cc` |
| `servicios-pestanas` | Servicios, grupo Pestañas | 3:4 vertical (móvil: 3:2 horizontal) | 1080 × 1440 px (móvil: 1620 × 1080 px) | `servicios-pestanas.webp` y `servicios-pestanas-movil.webp` | Unsplash, `photo-1589710751893-f9a6770ad71b` |
| `servicios-cuidado-personal` | Servicios, grupo Cuidado personal | 3:4 vertical (móvil: 3:2 horizontal) | 1080 × 1440 px (móvil: 1620 × 1080 px) | `servicios-cuidado-personal.webp` y `servicios-cuidado-personal-movil.webp` | Unsplash, `photo-1632345031435-8727f6897d53` |
| `galeria-1` | Resultados (galería) | 4:5 vertical | 1080 × 1350 px | `galeria-1.webp` | Unsplash, `photo-1643684391140-c5056cfd3436` |
| `galeria-2` | Resultados (galería) | 3:4 vertical | 1080 × 1440 px | `galeria-2.webp` | Unsplash, `photo-1639629509821-c54cdd984227` |
| `galeria-3` | Resultados (galería) | 3:4 vertical | 1080 × 1440 px | `galeria-3.webp` | Unsplash, `photo-1612887390768-fb02affea7a6` |
| `galeria-4` | Resultados (galería) | 3:4 vertical | 1080 × 1440 px | `galeria-4.webp` | Unsplash, `photo-1600334089648-b0d9d3028eb2` |
| `galeria-5` | Resultados (galería) | 3:4 vertical | 1080 × 1440 px | `galeria-5.webp` | Unsplash, `photo-1713207524097-596f3c17afc3` |
| `antes-caso-1` | Comparador, caso Facial (antes) | 4:3 horizontal | 1440 × 1080 px | `antes-caso-1.webp` | Unsplash, `photo-1761718209708-9ab9ba1c7252` |
| `despues-caso-1` | Comparador, caso Facial (después) | 4:3 horizontal | 1440 × 1080 px | `despues-caso-1.webp` | Unsplash, `photo-1761718210089-ba3bb5ccb54f` |
| `antes-caso-2` | Comparador, caso Pestañas (antes) | 4:3 horizontal | 1440 × 1080 px | `antes-caso-2.webp` | Unsplash, `photo-1674049406467-824ea37c7184` |
| `despues-caso-2` | Comparador, caso Pestañas (después) | 4:3 horizontal | 1440 × 1080 px | `despues-caso-2.webp` | Unsplash, `photo-1674049406179-d7bf2c263e71` |
| `antes-caso-3` | Comparador, caso Manos (antes) | 4:3 horizontal | 1440 × 1080 px | `antes-caso-3.webp` | Unsplash, `photo-1610992015732-2449b76344bc` |
| `despues-caso-3` | Comparador, caso Manos (después) | 4:3 horizontal | 1440 × 1080 px | `despues-caso-3.webp` | Unsplash, `photo-1610992015762-45dca7fa3a85` |
| `equipo-1` | Equipo, persona 1 | 3:4 vertical | 1080 × 1440 px | `equipo-1.webp` | Unsplash, `photo-1745434159123-5b99b94206ca` |
| `equipo-2` | Equipo, persona 2 | 3:4 vertical | 1080 × 1440 px | `equipo-2.webp` | Unsplash, `photo-1687293233752-ec42de2050db` |
| `equipo-3` | Equipo, persona 3 | 3:4 vertical | 1080 × 1440 px | `equipo-3.webp` | Unsplash, `photo-1791232776234-083dddacf26a` |

Cómo leer la proporción: se escribe ancho:alto. En `imagenes.js` el campo `ratio` es **alto ÷ ancho**: `1.25` es 4:5 vertical, `4 / 3` es 3:4 vertical, `0.75` es 4:3 horizontal y `0.8` es 5:4 horizontal. Si tu foto tiene otra proporción, ajusta `ratio` para que el recorte salga bien. Las medidas de arriba son una guía: usa la proporción que figure en `ratio` de cada entrada.

### 8.2 Cómo reemplazar una imagen

1. Prepara la foto en **WebP** con la proporción y el tamaño de la tabla.
2. Cópiala a `public/images/` (puedes crear una carpeta nueva, por ejemplo `public/images/salon/`) con un nombre sin espacios, tildes ni mayúsculas.
3. Opción A: **sobrescribe el archivo** con el mismo nombre dentro de `public/images/muestra/`. Opción B: en `src/content/imagenes.js`, cambia `src` de esa entrada por la ruta nueva, que empieza con `/` y **no** incluye `public` (por ejemplo `/images/salon/hero.webp`).
4. Escribe un `alt` nuevo que **describa lo que se ve** en la foto (para lectores de pantalla y Google).
5. Pon `muestra: false` en esa entrada (ver 8.3).
6. Si la imagen tiene versión móvil (`movil`), cámbiala también.
7. Si cambiaste la del hero, actualiza las dos líneas `<link rel="preload">` de `index.html` para que apunten a las rutas nuevas (`hero` y `hero-movil`).

### 8.3 Cómo quitar el aviso "Imagen de muestra"

- **Por imagen:** en `imagenes.js`, pon `muestra: false` en la entrada. En el comparador el aviso desaparece cuando **las dos** fotos (antes y después) tienen `muestra: false`.
- **Para todo el sitio:** en `site.js`, pon `mostrarAvisosMuestra: false`. Hazlo solo cuando hayas sustituido todas las fotos.

### 8.4 Antes y después

El comparador de la plantilla es **ilustrativo**: usa fotos de una misma sesión que no son resultados reales del salón, y por eso lleva el aviso "Imagen de muestra, no es un resultado del salón" (`copy.compare.placeholderNote`). **No muestres resultados que no sean de clientes reales con autorización escrita.** Si usas casos reales: misma persona, mismo encuadre, y consentimiento firmado por la clienta (ver [GUIA-CUMPLIMIENTO.md](GUIA-CUMPLIMIENTO.md)). Si no tienes casos reales, quita la sección (ver `Home.jsx`) en lugar de dejarla con fotos de muestra.

---

## 9. Colores

Los colores están en el bloque `@theme` de `src/styles/tailwind.css`. La paleta es cerrada: un fondo crema, tinta oscura y un solo acento, usado solo para acciones.

| Token | Valor actual | Papel |
| --- | --- | --- |
| `cream` | `#f7f1ea` | Fondo dominante de la página. |
| `nude` | `#e8d8ca` | Campos y superficies suaves. |
| `blush` | `#f1ddd7` | Superficies de apoyo (tarjetas, bloques destacados). |
| `ink` | `#2b221e` | Texto principal y líneas. |
| `ink-soft` | `#6a5850` | Texto secundario. |
| `rose` | `#8b4a47` | Acento: botones principales, enlaces de acción y anillo de foco del teclado. |
| `rose-press` | `#743c39` | El acento al pulsar un botón. |

**Contraste.** Tras cambiar colores, revisa que el texto siga siendo legible, sobre todo:

- `ink` sobre `cream`, `nude` y `blush` (texto principal).
- `ink-soft` sobre `cream`, `nude` y `blush` (texto secundario; es el más fácil de dejar demasiado claro).
- `cream` sobre `rose` y sobre `rose-press` (texto de los botones).
- `rose` sobre `cream` (enlaces y anillo de foco).

Usa un verificador de contraste (por ejemplo, el de WebAIM) y apunta a una relación de al menos **4,5 : 1** para texto normal.

**Colores escritos a mano** (no leen los tokens; cámbialos tú si cambias la paleta):

- `index.html`: `<meta name="theme-color" content="#F7F1EA" />` (color de la barra del navegador en el móvil; es el crema, porque el sitio no tiene modo oscuro).
- `public/favicon.svg`: usa `#F7F1EA` (fondo), `#2B221E` y `#8B4A47`.

## 10. Tipografía, movimiento y accesibilidad

### Tipografía

La web usa una sola familia: **Newsreader** (serif con eje óptico), instalada con el paquete `@fontsource-variable/newsreader` y cargada en `src/main.jsx` (`@fontsource-variable/newsreader/opsz.css`). No depende de Google Fonts en línea. Se asigna en `src/styles/tailwind.css` con `--font-serif: "Newsreader Variable", Georgia, serif`, y el `body` la usa.

**Para cambiarla:**

1. Instala otra fuente de [Fontsource](https://fontsource.org), por ejemplo `npm install @fontsource-variable/nombre-de-la-fuente`.
2. En `src/main.jsx`, reemplaza el `import '@fontsource-variable/newsreader/opsz.css'` por el de la nueva fuente.
3. En `tailwind.css`, cambia el nombre en `--font-serif`.
4. Los tamaños (`--text-display`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body`, `--text-small`) también están en `@theme`; revisa que los titulares sigan cabiendo en dos líneas en móvil.

### Movimiento

Los tiempos están en tokens de `tailwind.css`:

| Token | Valor | Uso |
| --- | --- | --- |
| `--duration-press` | 120 ms | Respuesta al pulsar. |
| `--duration-feedback` | 150 ms | Retroalimentación breve. |
| `--duration-ui` | 200 ms | Cambios de interfaz. |
| `--duration-enter` | 300 ms | Entrada de elementos. |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Una sola curva para entradas y salidas. |

Las animaciones hechas en JavaScript leen `src/lib/motion.js`: `STAGGER_MS` (70), `REVEAL_DELAY_MS` (30), `CASE_FADE_MS` (200), `NUDGE_MS` (280), `DRAG_STEP_MS` (150) y `REVEAL_SETTLE_MS` (400). Varias deben coincidir con los tokens: `CASE_FADE_MS` con `--duration-ui` y `DRAG_STEP_MS` con `--duration-feedback`. **Si cambias un token, cambia también su constante.**

### Accesibilidad

El movimiento se **desactiva automáticamente** cuando el visitante tiene activada la opción de reducir movimiento en su sistema (el desplazamiento suave y las animaciones de entrada se apagan; el hook está en `src/hooks/useReducedMotion.js`). Además, la web trae un enlace "Saltar al contenido", anillo de foco visible, controles de al menos 48 px y el comparador se maneja con teclado.

---

## 11. Cookies y Google Analytics

La plantilla trae Google Analytics 4 **apagado**. Para activarlo:

1. Crea una propiedad en [Google Analytics](https://analytics.google.com) con una cuenta **de la empresa compradora** (no del proveedor) y copia el ID de medición, que empieza con `G-`.
2. Pégalo en `analyticsId` de `src/content/site.js`.
3. Vuelve a compilar y publicar.

Cómo funciona:

- **Sin `analyticsId` no se carga ningún script de Google.** Con ID, el script solo se carga si el visitante pulsa **"Aceptar analítica"** en el banner. "Rechazar" no carga nada, y si había aceptado antes y cambia de opinión, se borran las cookies `_ga`.
- La elección se guarda en `localStorage` con la clave **`cookie-consent-v1`** (el valor guardado es `{"analytics":true}` o `{"analytics":false}`). Si el navegador bloquea `localStorage`, el banner vuelve a salir en cada visita y el sitio sigue funcionando.
- Se usa Consent Mode v2: todo queda "denegado" por defecto y solo se concede la analítica al aceptar. Se envía una página vista por cada cambio de ruta, solo con la ruta (sin parámetros y sin datos del formulario).
- El pie de página tiene el botón **"Configurar cookies"** para reabrir las preferencias.
- Los textos del banner están en `copy.cookies` (`src/content/copy.js`); la política de cookies, en `legal.js`.

Para probarlo en local: pon un ID, ejecuta `npm run dev`, acepta en el banner y verifica en la pestaña *Network* del navegador la petición a `googletagmanager.com`. Para ver el banner otra vez, borra `cookie-consent-v1` en *Application → Local Storage*.

Para lo legal (cookies, tratamiento de datos, quién responde), lee la **[guía de cumplimiento](GUIA-CUMPLIMIENTO.md)**.

---

## 12. Antes de publicar

Lee la **[guía de cumplimiento](GUIA-CUMPLIMIENTO.md)** y marca cada punto:

- [ ] `site.js` completo: nombre, ciudad, WhatsApp, teléfono, correo, dirección, horario, redes, días cerrados y franjas.
- [ ] Textos con `[CORCHETES]` reemplazados en `site.js`, `copy.js` (`[X horas]`), `hero.lead` y `legal.js` (busca `[` en esos archivos).
- [ ] Tratamientos, duraciones y precios **reales** (hoy son `XX min` y `$ XX.XXX`).
- [ ] Promociones con datos reales, o sección quitada.
- [ ] Equipo con nombres y fotos reales, o sección quitada.
- [ ] Imágenes reales (con `muestra: false`) o, mientras tanto, con el aviso "Imagen de muestra" visible.
- [ ] Antes/después solo con casos reales y autorización escrita, o sección quitada.
- [ ] Formulario probado: enviar una solicitud de prueba y confirmar que WhatsApp se abre con el mensaje correcto y que llega al número del salón.
- [ ] Casilla de autorización activa y sin marcar por defecto.
- [ ] Páginas legales (`/privacidad`, `/tratamiento-de-datos`, `/cookies`) completadas y **revisadas por un abogado**; enlaces del pie de página funcionando.
- [ ] Google Analytics configurado con una propiedad de la empresa, o `analyticsId` vacío a propósito.
- [ ] Título y descripción de `index.html` con el nombre real del salón; `favicon.svg` reemplazado.
- [ ] Prueba en **móvil real**: menú, comparador, formulario, barra de reserva y banner de cookies.
- [ ] `npm run build` termina sin errores.

## 13. Cómo publicar

Esta web es estática: `npm run build` genera la carpeta **`dist`**, que es la que se publica. Los pasos para el comprador, escritos para una persona no técnica, están en **[DESPLIEGUE-CLOUDFLARE.md](DESPLIEGUE-CLOUDFLARE.md)**. El proyecto incluye `public/_redirects`, que envía cualquier ruta a `index.html` para que `/privacidad` y las demás páginas abran bien al entrar directamente.

---

## 14. Cómo gestionar las solicitudes

**Dónde llegan.** Cada solicitud del formulario llega como un mensaje de WhatsApp al número de `whatsapp` en `src/content/site.js`. Instala la app gratuita **WhatsApp Business** en el teléfono del salón y registra ese número: así recibes los mensajes con perfil de empresa, etiquetas y respuestas rápidas.

**Etiquetas recomendadas:** Nueva, Confirmada, Reprogramada, Cancelada, Atendida. Para crearlas: en WhatsApp Business ve a *Más opciones (⋮) → Herramientas de empresa → Etiquetas → Etiqueta nueva*. Para asignarlas, mantén presionado un chat y toca el ícono de etiqueta.

**Respuestas rápidas recomendadas:** confirmar cita, pedir fotos (por ejemplo, para valorar un tratamiento) y enviar lista de precios. Para crearlas: *Más opciones (⋮) → Herramientas de empresa → Respuestas rápidas → Añadir*. Escribe el mensaje y un atajo (por ejemplo `/cita`); en cualquier chat, escribe `/` para usarlo.

**Qué no hace la web.** La landing **no guarda solicitudes**: cada mensaje sale del navegador del visitante directo a WhatsApp, sin pasar por un servidor ni una base de datos. La cita no queda confirmada hasta que el salón responde. Si necesitas un registro, usa tu propia hoja de cálculo o agenda.

---

## 15. Pendientes y soporte

Cosas que **no existen todavía** o que quedaron por resolver:

- **`LICENSE.md`:** no existe. Hasta que se agregue, la licencia, el soporte del proveedor y la jurisdicción no están definidos; acuérdalos por escrito con quien te vendió la plantilla.
- **Revisión legal:** los textos de `legal.js` son borradores y necesitan un abogado. Quedan campos `[ENTRE CORCHETES]` (razón social, NIT, dirección, correo, correo de PQR, proveedor de hosting y fecha de actualización).
- **Datos duplicados:** los datos del salón están en `site.js` y los del responsable legal en `legal.js` (`responsable`); hay que mantenerlos iguales a mano.
- **Textos con datos escritos a mano:** `[CIUDAD]` en `hero.lead` y `[X horas]` en `copy.booking.steps` no se leen de `site.js`.
- **Duración y precio por tratamiento:** hoy son un mismo valor de ejemplo para todos (`XX min`, `$ XX.XXX`), definido en la función `t` de `services.js`.
- **SEO y redes sociales:** `index.html` solo trae título, descripción e íconos. No hay imagen para compartir (`og:image`), etiquetas `og:*`, `canonical`, datos estructurados ni `sitemap.xml`; `robots.txt` permite todo. Pendiente si quieres mejor presencia en Google y al compartir el enlace.
- **Dominio:** no se configura en el código; se conecta en Cloudflare Pages (ver `DESPLIEGUE-CLOUDFLARE.md`).
- **Imágenes:** no hay script que genere versiones en varios tamaños (AVIF); las fotos se publican como WebP tal cual. Optimízalas antes de subirlas.
- **Comentario viejo:** `src/lib/motion.js` menciona un `PLAN.md` que ya no está en el proyecto.
- **Pruebas:** la plantilla no incluye pruebas automáticas.

**Soporte.** Las condiciones de soporte y mantenimiento no están definidas en el proyecto (ver el pendiente de `LICENSE.md`).

**Si algo se rompe:**

1. **`npm run build` da error.** Lee el mensaje: casi siempre indica el archivo y la línea. Los errores más comunes son una comilla o llave sin cerrar en un archivo que editaste, o una coma que falta entre elementos de una lista.
2. **Algún cambio no aparece.** Detén `npm run dev` con `Ctrl + C`, vuelve a ejecutarlo y recarga con `Ctrl + F5`.
3. **Un comando no funciona.** Verifica `node -v` (mínimo 20.19) y que estás dentro de la carpeta del proyecto.
4. **La web publicada se ve mal después de un cambio.** Vuelve a un despliegue anterior desde el panel de Cloudflare Pages.
