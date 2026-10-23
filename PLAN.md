# PLAN — Landing page para [NOMBRE DEL SALÓN]

> **Qué pasa al aprobar este plan:** solo copio este contenido a `PLAN.md` en la raíz de `C:\Users\Mi PC\Desktop\plantilla-salon-belleza` y me detengo. No escribo código de la landing hasta una segunda aprobación explícita. Nunca hago commits ni push (además, la carpeta todavía no es un repositorio git).

## Contexto

La carpeta del proyecto está vacía. Hay que crear desde cero una landing en React + Vite + Tailwind para un centro de tratamientos faciales, corporales, pestañas y cuidado personal. La acción principal es **solicitar una cita**. Las referencias (estilo "Lumière") marcan el tono: fondo crema dominante, tinta casi negra, serif editorial grande, botones rectos sin sombra, fotografía cálida grande y bloques oscuros como contrapunto.

**Lectura de las referencias (proporciones, no solo colores):**
- ~65 % fondo crema cálido; ~20 % fotografía a sangre o en bloques grandes; ~10 % campos oscuros (sección de equipo, "Confidence…"); el resto, tinta para texto.
- Acciones: botón rectangular sólido oscuro o con contorno; enlaces con flecha. Sin sombras, sin radios grandes.
- Serif display de alto contraste para titulares, sans pequeña para texto (aquí la reemplazamos por una sola familia con eje óptico y cuerpo de 16–18px, más legible que lo que muestran las referencias).
- Lo que **no** copiamos: la fila de cuatro tarjetas idénticas de servicios, las cifras ("10+ años", "5K+ clientes") y el testimonio, porque no tenemos datos reales.

**Público sugerido [CONFIRMAR]:** mujeres y hombres de 28 a 55 años, profesionales urbanos con poco tiempo, que buscan tratamientos no invasivos con resultados visibles y quieren saber duración y precio antes de pedir cita. Llegan sobre todo desde Instagram en el móvil.

---

## 1. Dirección elegida y por qué

| | A. "Paleta de piel" | **B. "La línea del después"** (elegida) | C. "Carta por tiempo" |
|---|---|---|---|
| Idea | La paleta nude recorre los tonos de piel; cada sección es un campo de color distinto. | Una línea vertical fina separa el antes del después. Es el tirador del comparador y se repite como estructura de toda la página. | Los tratamientos se presentan como una carta de restaurante, ordenados por minutos: "reserva tiempo para ti". |
| Pertenencia al salón | Media: la usa cualquier marca de cosmética. | Alta: sale de la función que distingue a esta web (mostrar resultados) y de su promesa (diferencia visible). | Media-alta, pero depende de duraciones que aún no tenemos. |
| Relación con la cita | Débil. | Fuerte: ves la diferencia y pides la cita. | Fuerte en servicios, débil en el resto. |
| Riesgo | Muchos campos de color rompen la proporción crema dominante y acaba pareciendo un muestrario. | Que la línea se use como decoración. Se controla con una regla: solo divide contenido real. | Hero sin imagen fuerte; queda frío para estética. |

**Por qué B:** convierte la funcionalidad especial (el comparador) en el sistema visual completo. La misma línea de 1px divide el texto de la imagen en el hero, el índice de la lista en servicios, las condiciones de la oferta en promociones y la explicación del formulario en reservas. Es una sola idea y se ve en todas las secciones sin añadir adornos. De C tomamos la presentación de servicios en filas tipo carta (nombre · descripción · duración · precio).

## 2. Idea central en una frase

**"En [NOMBRE DEL SALÓN] cada tratamiento se mide por una línea: la que separa cómo llegas de cómo te vas."**

*(Hay que validarla con la historia real del salón; si tiene un rasgo propio, como un tratamiento de firma o un origen, se ajusta la frase sin perder la línea como estructura.)*

---

## 3. Tokens de diseño

**Tailwind v4** (`@tailwindcss/vite`). En v4 la configuración vive en el bloque `@theme` del CSS de entrada, así que el **único archivo CSS** es `src/styles/tailwind.css`, con: `@import "tailwindcss"`, `@theme` (tokens), una `@custom-variant` para hover y `@layer base` con los ajustes globales de móvil. Ningún componente tiene CSS propio. *(Si prefieres Tailwind v3 con `tailwind.config.js`, los tokens son los mismos; se puede decidir más adelante.)*

### Color (con su papel y proporción)
| Token | Hex | Papel | Proporción |
|---|---|---|---|
| `cream` | `#F7F1EA` | Fondo dominante | ~60 % |
| `nude` | `#E8D8CA` | Campo de color: servicios (bloque índice) y reservas (columna explicativa) | ~12 % |
| `blush` | `#F1DDD7` | Campo rosado suave: solo promociones | ~6 % |
| `ink` | `#2B221E` | Texto principal, línea de 1px, campo oscuro (equipo) | ~12 % incl. sección oscura |
| `ink-soft` | `#6A5850` | Texto secundario (≥ 4.5:1 sobre cream y nude, **se verifica en el paso 2**) | — |
| `rose` | `#8B4A47` | Acento **solo para acciones**: botón principal, foco, enlace activo | ~2 % |
| `rose-press` | `#743C39` | Estado presionado/hover del acento (cambio instantáneo, sin transición) | — |

Contraste previsto: ink/cream ≈ 14:1 · blanco/rose ≈ 7:1 · rose/cream ≈ 6:1 · ink-soft/nude ≈ 4.7:1 (en el límite: si no llega a AA se oscurece a `#5E4D46`). Sin modo oscuro, así que hay **un solo** `theme-color` (`#F7F1EA`).

### Tipografía (una familia)
- **Newsreader Variable** (eje óptico 6–72), servida desde el propio sitio con `@fontsource-variable/newsreader` (sin Google Fonts: menos CLS y una petición menos). Fallback: `Georgia, serif`.
- `--text-display`: `clamp(2.75rem, 1.5rem + 4.8vw, 6rem)`, interlineado 1.02, opsz 72, peso 400.
- `--text-h2`: `clamp(2.25rem, 1.5rem + 2.8vw, 4rem)`, interlineado 1.05.
- `--text-h3`: `1.75rem`, interlineado 1.2.
- `--text-body`: `1.125rem` (18px), interlineado 1.6. **Mínimo absoluto 16px** (`1rem`) en etiquetas, ayudas, inputs y pie.
- **Máximo dos líneas** por titular: `text-balance` + `max-w-[14ch]`/`[18ch]` según la sección, y textos cortos (≤ 6 palabras). Se comprueba en 390, 768 y 1440.

### Espaciado y layout
- `--container-page: 80rem`; gutter lateral **igual a ambos lados**: `--spacing-gutter: clamp(1.25rem, 4vw, 4rem)`, sumando `env(safe-area-inset-left/right)`.
- Espacio entre secciones: `--spacing-section: clamp(5rem, 2rem + 9vw, 12rem)`, que da ≈160px a 1440 (rango 120–240 ✔) y ≈80px a 390.
- Grilla de 12 columnas en escritorio, 6 en tablet y 1 en móvil con composiciones propias.
- Radios: 0 en botones e imágenes; `rounded-full` solo en el tirador del comparador. **Sin sombras.**

### Movimiento
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (único easing).
- `--duration-press: 120ms` · `--duration-ui: 200ms` · `--duration-enter: 300ms` · escalonado: `70ms` (constante JS).

### Variantes y base
- `@custom-variant hover-fine`: `@media (hover: hover) and (pointer: fine) { &:hover }`. **Todo** hover usa esta variante.
- Base: `-webkit-tap-highlight-color: transparent`, `overscroll-behavior: none` en html/body, `touch-action: manipulation` en `a, button, select, label`, `user-select: none` solo en `button` y en el comparador, y `:focus-visible` con un contorno `rose` de 2px separado 3px.

---

## 4. Estructura de carpetas y árbol de componentes

```
index.html                  meta viewport/theme-color, preload de la imagen del hero, lang="es"
vite.config.js              react() + tailwindcss()
src/
  main.jsx  App.jsx         App solo compone las secciones en orden
  styles/tailwind.css       único CSS: @import, @theme, @custom-variant, @layer base
  content/                  TODO el texto y los datos editables (los marcadores viven aquí)
    site.js                 nombre, teléfono, WhatsApp, email, dirección, horario, redes
    services.js             4 grupos → tratamientos {nombre, descripción, duración, precio}
    cases.js                pares antes/después {caso, tratamiento, sesiones, before, after, alt, isPlaceholder}
    gallery.js  promos.js  team.js
  lib/
    images.js               unsplashSrc(id, w), srcSet(id, widths), tamaños por recorte
    whatsapp.js             buildMessage(form), buildWhatsAppUrl(number, text), buildMailto()
    validation.js           reglas por campo → mensaje en español
  hooks/
    useReveal.js            IntersectionObserver, una sola vez, con fallback si no existe
    useReducedMotion.js     matchMedia('(prefers-reduced-motion: reduce)')
  components/
    Container.jsx  Section.jsx (id, aria-labelledby, padding de sección)
    Button.jsx (primario rose / contorno ink; :active scale-97)
    ArrowLink.jsx  Picture.jsx (img responsive, lazy por defecto, prop priority)
    Rule.jsx (la línea de 1px de la idea central)
    Reveal.jsx (envoltorio con escalonado)
    PendingNote.jsx (marcador visible "Dato pendiente: …", solo mientras isPlaceholder)
  sections/
    Header.jsx  Hero.jsx
    Services.jsx → ServiceGroup.jsx → TreatmentRow.jsx
    BeforeAfter.jsx → CompareSlider.jsx
    Results.jsx  Promotions.jsx  Team.jsx
    Booking.jsx → BookingForm.jsx → Field.jsx
    Footer.jsx  MobileBookingBar.jsx
```
Responsabilidades: **las secciones no contienen texto fijo**, todo sale de `content/`. Así los marcadores se reemplazan en un solo lugar y `PendingNote` puede listarlos. Lenguaje: JavaScript (JSX), sin TypeScript, para mantenerlo simple.

---

## 5. Plan por sección

Cada sección tiene una composición distinta a la anterior. La línea de 1px (`Rule`) aparece donde divide contenido real.

**Header** (sin animación, no fijo en escritorio). Wordmark `[NOMBRE DEL SALÓN]` en texto, enlaces Servicios · Resultados · Promociones · Equipo, y botón "Solicitar cita". En móvil: wordmark + botón "Menú" que abre una hoja a pantalla completa, sin animación.

**1. Hero** (`min-h-[100svh]`). Escritorio: 5 columnas de texto sobre cream | línea vertical | 7 columnas con una foto retrato 4:5 grande dentro del contenedor (márgenes simétricos). `h1` en dos líneas, por ejemplo **"Cuidado que se nota. Resultados que se ven."** [CONFIRMAR copy], una línea de apoyo que nombra los 4 servicios y la ciudad [CIUDAD], el botón primario "Solicitar cita" (ancla a #reservas) y el enlace "Ver tratamientos". Móvil (composición propia): foto 4:5 recortada a ~48svh arriba, debajo el h1 + CTA; **el CTA debe verse sin scroll en 390×700**. Foto: placeholder de Unsplash (retrato cálido, fondo neutro) → **[FOTO REAL: retrato en cabina del salón]**.

**2. Servicios** (`#servicios`). Escritorio: columna izquierda de 4 columnas, `sticky`, sobre campo `nude`, con el `h2` "Tratamientos y tiempos" y un índice de los 4 grupos (enlaces de ancla) | línea | columna derecha de 8 columnas con los 4 grupos uno tras otro. Cada grupo: título h3, una foto 3:2 y **filas tipo carta** con nombre, descripción breve (1 línea), duración `[XX min]` y precio `[$ —]`, separadas por líneas de 1px. Móvil: grupos apilados, foto y luego filas, sin sticky. Contenido propuesto (**todo [CONFIRMAR]**, nombres genéricos descriptivos):
- Faciales: Limpieza facial profunda · Hidratación intensiva · Peeling suave · [Facial de firma].
- Corporales: Masaje relajante · Drenaje linfático manual · Exfoliación corporal · [Tratamiento corporal].
- Pestañas y cejas: Extensiones clásicas · Extensiones de volumen · Lifting de pestañas · Laminado de cejas.
- Cuidado personal: Manicura · Pedicura · Depilación con cera · [Otro].

**3. Comparador antes/después** (`#antes-despues`). Escritorio: comparador ancho de 8 columnas (16:10) + columna de 4 con `h2` "La diferencia, a la vista", el selector de caso (3 botones de texto con subrayado en el activo, sin píldoras) y la ficha del caso: tratamiento, número de sesiones `[N]` y nota del profesional `[TEXTO]`. Móvil: título → comparador 4:5 a todo el ancho del contenedor → selector → ficha. Ver el apartado 6.

**4. Resultados** (`#resultados`). Mosaico asimétrico: una imagen grande 4:5 (6 columnas) + 4 imágenes 3:4 en una grilla 2×2 (6 columnas), cada una con un pie de 16px que dice el tratamiento. Móvil: la grande arriba y luego la grilla 2×2. Sin lightbox. **Todas son [FOTO REAL PENDIENTE]**: mientras `isPlaceholder` esté activo, cada imagen muestra un `PendingNote` visible. No publicar como "trabajos reales" fotos de stock.

**5. Promociones** (`#promociones`). Banda a todo el ancho en `blush`, solo tipografía y sin fotos: una promo destacada grande a la izquierda (título h2, beneficio, botón "Pedir esta promoción", que preselecciona el servicio en el formulario) | línea | a la derecha, condiciones en lista y **vigencia "Válido hasta [FECHA]"**. Debajo, 1–2 promos secundarias en filas. Todo **[PROMO / CONDICIONES / VIGENCIA PENDIENTES]**.

**6. Profesionales** (`#equipo`). Campo oscuro `ink` con texto cream. `h2` "Quién te atiende" + 3 retratos 3:4 en disposición escalonada (alturas desplazadas y el central más grande), no una fila idéntica. Cada uno: [NOMBRE], [ESPECIALIDAD], [FORMACIÓN/CERTIFICACIÓN]. Fotos **[RETRATOS REALES PENDIENTES]**, con placeholders de Unsplash marcados. Móvil: un retrato por fila, alternando a izquierda y derecha.

**7. Reservas** (`#reservas`). Split: columna izquierda `nude` con `h2` "Solicita tu cita", tres frases sobre cómo funciona ("Te respondemos por WhatsApp en [X horas] para confirmar") y horario breve | línea | formulario sobre cream. Ver el apartado 6.

**8. Pie** (cream, línea superior de 1px). Wordmark grande, y tres bloques: Contacto ([DIRECCIÓN], [TELÉFONO], [EMAIL]), Horario ([DÍAS/HORAS]) y Redes como **enlaces de texto** (Instagram, TikTok, Facebook; sin logos de marca). Debajo, aviso legal/privacidad [ENLACE PENDIENTE] y año.

**MobileBookingBar** (solo `< md`): barra fija inferior con "Solicitar cita". Aparece cuando el hero sale de pantalla y se oculta en `#reservas`, sin animación. Padding `env(safe-area-inset-bottom)`.

---

## 6. Funcionalidades especiales

### Comparador (`CompareSlider.jsx`)
- **Estructura solo con transform:** "después" como imagen base; "antes" dentro de un contenedor `absolute inset-0 overflow-hidden` desplazado con `translateX(p−100%)` y su imagen contra-desplazada con `translateX(100−p%)`. Nada de `width`/`left`/`clip-path` animados.
- **Tirador:** línea de 1px + perilla circular de 44px. El elemento con `role="slider"` es la perilla, dentro de una zona de agarre de 48px de ancho con **`touch-action: none` solo ahí**. El resto de la imagen conserva `touch-action: pan-y`, así que el scroll vertical funciona.
- **Puntero:** `pointerdown` en la zona del tirador → `setPointerCapture`; `pointermove` calcula `p` con `getBoundingClientRect` y actualiza con `requestAnimationFrame`. Con mouse, un clic en la imagen salta a esa posición. Sin transición durante el arrastre.
- **Teclado:** ← → ±5 %, Shift+flecha o PageUp/PageDown ±10 %, Home/End 0/100 %.
- **ARIA:** `aria-label="Comparar antes y después: [tratamiento]"`, `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow`, `aria-valuetext="45 % antes, 55 % después"`, `aria-orientation="horizontal"`. Etiquetas "Antes"/"Después" visibles a 16px.
- **Imágenes:** cada par con la misma proporción y el mismo `object-position`; `alt` descriptivo para cada imagen ("Antes: piel con rojeces en mejilla…"). `loading="lazy"` y `decoding="async"`; los casos no activos no se montan hasta que se eligen.
- **Reduced motion:** sin el empujón de firma, sin fundido al cambiar de caso y sin transición en los pasos de teclado.
- **Riesgo honesto:** Unsplash no tiene pares reales de la misma persona. Los placeholders llevan el aviso visible "Imagen de demostración, no es un resultado del salón" hasta tener fotos reales con consentimiento.

### Formulario de citas (`BookingForm.jsx`)
- Campos (todos con `<label>` visible, `text-base` = 16px y altura ≥ 48px):
  - Nombre: `autocomplete="name"`, obligatorio, mínimo 2 caracteres.
  - Teléfono: `type="tel" inputmode="tel" autocomplete="tel"`, obligatorio, entre 7 y 15 dígitos (se aceptan espacios, + y guiones).
  - Servicio: `<select>` con `<optgroup>` por grupo, generado desde `services.js`, obligatorio. Se puede preseleccionar desde Promociones o desde una fila de servicios.
  - Fecha preferida: `type="date"`, `min` = hoy, obligatoria; se avisa si cae en un día cerrado según `site.js`.
  - Hora preferida: `<select>` de franjas según el horario [PENDIENTE], obligatoria.
  - Comentario: `<textarea>` opcional, `maxLength=500`, con contador.
- **Validación accesible:** `noValidate`. Se valida al enviar y, después del primer intento, al salir de cada campo. Cada error va en `<p id="campo-error">` justo debajo del campo, con `aria-invalid` y `aria-describedby`. El foco va al primer campo inválido. Los mensajes dicen qué hacer, por ejemplo: "Escribe un teléfono de al menos 7 dígitos".
- **Envío, decisión PENDIENTE (propuesta: WhatsApp).** Al enviar sin errores se construye el texto con `buildMessage` y se abre `https://wa.me/[NÚMERO]?text=…` (con `encodeURIComponent`) en una pestaña nueva. Botón honesto: **"Enviar solicitud por WhatsApp"**. Después, un mensaje en `aria-live="polite"`: "Se abrió WhatsApp con tu solicitud. Tu cita no está confirmada hasta que te respondamos." Alternativa: `mailto:` con el mismo texto. **El formulario no simula ningún envío a un servidor.**
- Nota de privacidad bajo el botón: los datos salen del navegador solo hacia WhatsApp; texto de privacidad [PENDIENTE].

---

## 7. Plan de movimiento

| Elemento | Propiedad | Valores | Duración | Curva | Disparador |
|---|---|---|---|---|---|
| Entrada de sección (título, texto, bloques) | opacity, transform | 0→1, translateY 24px→0 | 300ms, escalonado 70ms | ease-out token | Una vez al entrar (IO, umbral 0.15) |
| Hero: h1, línea de apoyo, CTA | opacity, transform | 0→1, translateY 16px→0 | 300ms, escalonado 70ms | ease-out | Al cargar |
| Imagen del hero | — | **sin animación** (es el LCP) | — | — | — |
| Botones: presionar | transform | scale 1→0.97 | 120ms | ease-out | `:active` |
| Flecha de enlaces y botones: hover | transform | translateX 0→4px | 200ms | ease-out | `hover-fine` |
| Cambio de color en hover | — | cambio instantáneo, sin transición | — | — | `hover-fine` |
| Comparador: pasos de teclado | transform | a la nueva posición | 150ms | ease-out | Tecla |
| Comparador: arrastre | transform | sigue al puntero | 0 | — | Puntero |
| Comparador: cambio de caso | opacity | 0→1 | 200ms | ease-out | Clic en el selector |
| **Movimiento de firma:** empujón del comparador | transform (tirador + capa) | 50 %→42 %→50 % | 2 × 280ms | ease-out | Una sola vez al entrar en pantalla, solo si no hubo interacción |
| Mensaje de error del formulario | opacity | 0→1 | 150ms | ease-out | Al aparecer |
| Header, menú móvil, barra móvil | — | **sin animación** (uso constante) | — | — | — |

**El movimiento de firma** es el empujón del comparador: enseña que la línea se mueve y resume la idea central en un solo gesto. **Reduced motion:** `motion-reduce:` deja todo en opacity 1 y translate 0 desde el inicio (contenido siempre visible), quita escalas, el empujón y el fundido. **Sin JS o sin IntersectionObserver:** el contenido se muestra (el estado oculto solo se aplica cuando el hook confirma que puede revelarlo). Nunca `scale(0)` ni `ease-in`.

---

## 8. Checklists

### Móvil
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">`
- [ ] `<meta name="theme-color" content="#F7F1EA">` (uno solo, porque no hay modo oscuro)
- [ ] `-webkit-tap-highlight-color: transparent` global
- [ ] Hero con `min-h-[100svh]`, sin `100vh` en ninguna parte
- [ ] Inputs, select y textarea a 16px o más
- [ ] `touch-action: manipulation` en botones y enlaces; `none` solo en el tirador
- [ ] `user-select: none` solo en controles
- [ ] `overscroll-behavior: none` en html/body
- [ ] `env(safe-area-inset-*)` en la barra móvil, el header y el gutter lateral
- [ ] Composiciones móviles propias (hero, servicios, comparador, equipo, reservas) verificadas en 390
- [ ] Objetivos táctiles ≥ 44×44px

### Accesibilidad
- [ ] Un solo `h1` en la primera pantalla; jerarquía h2/h3 sin saltos; cada `<section>` con `aria-labelledby`
- [ ] Enlace "Saltar al contenido"; landmarks `header`, `main`, `footer` y `nav` con `aria-label`
- [ ] Contraste AA medido (no estimado) en cada combinación: texto sobre cream, nude, blush e ink
- [ ] `:focus-visible` visible en todo control, también dentro del campo oscuro
- [ ] Comparador operable con teclado y anunciado por lector de pantalla (NVDA y VoiceOver)
- [ ] Formulario: etiquetas visibles, errores asociados, foco al primer error, `aria-live` en el resultado
- [ ] `alt` descriptivo en todas las imágenes de contenido; las decorativas con `alt=""`
- [ ] Menú móvil: botón con `aria-expanded`, foco atrapado y cierre con Esc
- [ ] `lang="es"`; nada depende solo del color

### Rendimiento
- [ ] Imágenes de Unsplash con `auto=format` (AVIF/WebP), `srcset` en 480/768/1080/1600 y `sizes` correcto
- [ ] Hero: `fetchpriority="high"`, sin `lazy` y precargado en `index.html`; el resto con `loading="lazy"`
- [ ] `width`/`height` o `aspect-ratio` en cada imagen (CLS ≈ 0)
- [ ] Fuente servida desde el sitio con `font-display: swap`; solo la variable latina
- [ ] Lighthouse móvil ≥ 90 en rendimiento y accesibilidad

---

## 9. Riesgos y decisiones pendientes

| # | Decisión / riesgo | Propuesta mientras tanto |
|---|---|---|
| 1 | **Destino del formulario** (WhatsApp, mailto o backend futuro) | WhatsApp con mensaje precargado; necesito el **número** |
| 2 | **Nombre del salón**, ciudad, dirección, teléfono, email, redes y horario | Marcadores `[…]` en `site.js` |
| 3 | **Fotos reales**: hero, servicios, pares antes/después (con consentimiento firmado), galería y retratos del equipo | Unsplash marcado como placeholder; antes/después y galería con aviso visible |
| 4 | **Tratamientos, descripciones, duraciones y precios** | Nombres genéricos [CONFIRMAR], `[XX min]`, `[$ —]` |
| 5 | **Promociones**: oferta, condiciones y vigencia | Marcadores; la sección no se publica sin datos reales |
| 6 | **Equipo**: nombres, especialidades y formación | Marcadores |
| 7 | **Público objetivo** | El sugerido arriba |
| 8 | Copy del h1 y de la idea central | Propuesta en el apartado 5, a validar |
| 9 | Tailwind v4 (CSS `@theme`) frente a v3 (`tailwind.config.js`) | v4 |
| 10 | Riesgo: publicar stock como "resultados reales" sería engañoso | `isPlaceholder` muestra el aviso; checklist previo a publicar |
| 11 | Riesgo: los datos del formulario viajan en la URL de wa.me | Aceptable (el usuario envía su propio mensaje); se menciona en la nota de privacidad |
| 12 | Riesgo: titulares en 3 líneas a 768px | Verificación explícita en cada paso; textos cortos |
| 13 | Política de privacidad / aviso legal | Enlace pendiente |
| 14 | Las fotos de Unsplash se cargan desde sus servidores | Aceptable; en producción, mejor fotos propias optimizadas en `/public` |

---

## 10. Pasos de implementación (cada uno se verifica en **1440, 768 y 390 px** en el navegador integrado; sin commits)

1. **Escribir `PLAN.md`** en la raíz con este contenido y **detenerme** a esperar la aprobación para implementar.
2. **Andamiaje:** `npm create vite@latest . -- --template react`, `npm i -D tailwindcss @tailwindcss/vite`, `npm i @fontsource-variable/newsreader`; configurar `vite.config.js`. *Verificar:* `npm run dev` arranca sin errores y Tailwind aplica una clase de prueba.
3. **Tokens y base:** `tailwind.css` (@theme, `hover-fine`, base móvil) y `index.html` (meta, `lang`, preload). *Verificar:* página de prueba con muestras de color y tipografía; contraste medido con DevTools en cada par; sin scroll horizontal en 390.
4. **Contenido y utilidades:** `content/*`, `lib/images.js`, `lib/whatsapp.js`, `lib/validation.js`. *Verificar:* `buildWhatsAppUrl` genera un enlace correcto con tildes y saltos de línea; ningún dato inventado fuera de los marcadores.
5. **Primitivas** (Container, Section, Button, ArrowLink, Picture, Rule, PendingNote). *Verificar:* foco visible, `:active` 0.97 y gutter igual a izquierda y derecha en los 3 anchos.
6. **Header + Hero + menú móvil.** *Verificar:* h1 en ≤ 2 líneas y CTA visible sin scroll en 1440×900, 768×1024 y 390×700; LCP sin animación; menú con teclado y Esc.
7. **Servicios.** *Verificar:* los 4 grupos completos con nombre, descripción, duración y precio; sticky solo en escritorio; ningún contenido recortado.
8. **Comparador.** *Verificar:* arrastre con mouse, táctil (emulación móvil) y teclado; el scroll vertical funciona tocando la imagen fuera del tirador; ARIA anunciado; misma proporción en ambas imágenes; empujón una sola vez y desactivado con reduced motion.
9. **Resultados, Promociones, Equipo.** *Verificar:* cada composición distinta de la anterior; avisos de placeholder visibles; espacio entre secciones 120–240px en 1440; ningún bloque vacío de más de media pantalla.
10. **Reservas.** *Verificar:* errores junto al campo y foco al primero; inputs a 16px; teclado telefónico en móvil; WhatsApp se abre con el mensaje correcto; preselección desde Promociones; el mensaje no promete confirmación.
11. **Pie + MobileBookingBar.** *Verificar:* safe-area aplicado; la barra no tapa el formulario; redes como texto.
12. **Movimiento** (`useReveal`, `Reveal`). *Verificar:* solo se animan transform y opacity (DevTools → Animations), duraciones y curva según la tabla, se ejecuta una vez, con reduced motion el contenido es visible y sin desplazamiento, y nada se queda oculto si falla el IntersectionObserver.
13. **QA final:** checklists del apartado 8, Lighthouse móvil ≥ 90 (rendimiento y accesibilidad), `npm run build` sin errores y lista final de marcadores pendientes. **Sin commits ni push**: los cambios quedan en la carpeta para que los commitees tú.
