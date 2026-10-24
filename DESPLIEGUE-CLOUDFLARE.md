# Guía de despliegue con Cloudflare Pages

Esta guía te lleva, paso a paso, a publicar la página de tu salón en internet con Cloudflare Pages (plan gratuito). No necesitas saber programar. Si en algún paso el botón se llama distinto en tu pantalla, busca el que haga la misma acción: Cloudflare cambia los nombres de vez en cuando. Donde no estamos seguros del nombre exacto, lo indicamos con "verifica el nombre en el panel".

---

## 1. Qué vas a necesitar

- Una cuenta de **GitHub** (gratis, en github.com). Solo la necesitas para la Opción A.
- Una cuenta de **Cloudflare** (gratis, en cloudflare.com).
- El **dominio comprado** (por ejemplo `minsalon.com`) y acceso al panel de donde lo compraste.
- **Node.js 20.19 o superior** (o 22.12 o superior) en tu computador, solo si vas a generar la página tú mismo (Opción B). Es la versión mínima que exige Vite, la herramienta con la que se compila este proyecto. Para saber qué versión tienes, abre una terminal y escribe `node -v`.

Con la **Opción A** (GitHub) Cloudflare compila por ti, así que **no necesitas instalar Node** para publicar.

---

## 2. Opción A (recomendada): conectar el repositorio de GitHub

Con esta opción, cada vez que subas un cambio a GitHub, Cloudflare publica la página solo.

1. Sube el proyecto a un repositorio de tu cuenta de GitHub.
2. Entra a [dash.cloudflare.com](https://dash.cloudflare.com) e inicia sesión.
3. En el menú de la izquierda busca **Workers & Pages** (verifica el nombre en el panel, porque Cloudflare lo reorganiza con frecuencia).
4. Pulsa **Create application** (crear aplicación) y elige la pestaña **Pages**. Luego elige **Connect to Git** (conectar con Git).
5. Cloudflare te pedirá autorizar el acceso a GitHub. Acepta y elige tu repositorio.
6. En la configuración de compilación escribe:
   - **Framework preset** (preajuste de framework): déjalo en *None* o elige *Vite* si aparece.
   - **Build command** (comando de compilación): `npm run build`
   - **Build output directory** (carpeta de salida): `dist`
7. Pulsa **Save and Deploy** (guardar y desplegar).
8. Espera unos minutos. Al terminar, Cloudflare te da una dirección de prueba parecida a `nombre.pages.dev`.

Si el primer intento falla, ve a la sección 8 (errores comunes) antes de volver a intentar.

---

## 3. Opción B: subir la carpeta `dist` directamente, sin GitHub

Úsala si no quieres usar GitHub.

1. En tu computador, abre una terminal dentro de la carpeta del proyecto y ejecuta:
   ```bash
   npm install
   npm run build
   ```
   Esto crea la carpeta `dist` con la página lista para publicar.
2. (Opcional) Para ver cómo quedó antes de subirla, ejecuta `npm run preview` y abre la dirección que aparece en la terminal.
3. En el panel de Cloudflare ve a **Workers & Pages**, pulsa **Create application**, elige la pestaña **Pages** y busca la opción de **subir archivos directamente** (el nombre suele ser *Upload assets*; verifica el nombre en el panel).
4. Escribe un nombre para el proyecto y pulsa para crearlo.
5. Arrastra la carpeta **`dist`** completa (o elige subirla desde tu computador) y pulsa **Deploy site** (verifica el nombre en el panel).

> **Importante:** con esta opción, cada cambio exige generar `dist` de nuevo y subirlo otra vez. Nada se actualiza solo.

---

## 4. Variables de entorno

Esta página no usa ninguna clave ni valor secreto. **No necesitas agregar ninguna variable.**

La única excepción: si el despliegue falla porque la versión de Node es muy antigua, fija la versión así:

1. En el panel de Cloudflare, abre tu proyecto de Pages.
2. Entra a **Settings** (configuración) y busca **Variables and Secrets** o **Environment variables** (verifica el nombre en el panel).
3. Agrega una variable nueva:
   - **Nombre:** `NODE_VERSION`
   - **Valor:** `22`
4. Guarda y vuelve a desplegar (en **Deployments**, el despliegue fallido tiene una opción para reintentar; verifica el nombre en el panel).

---

## 5. Dominio propio

1. Abre tu proyecto en Cloudflare Pages y entra a la pestaña **Custom domains** (dominios personalizados).
2. Pulsa **Set up a custom domain** (configurar un dominio personalizado; verifica el nombre en el panel) y escribe tu dominio, por ejemplo `minsalon.com`.
3. Sigue uno de estos dos caminos:
   - **Si tu dominio ya está en Cloudflare** (lo compraste allí o ya lo agregaste como sitio): Cloudflare crea los registros DNS **solo**. Confirma lo que te propone y espera.
   - **Si tu dominio está en otro registrador** (GoDaddy, Namecheap, etc.): Cloudflare te mostrará qué registro DNS debes crear. Normalmente es un registro **CNAME** que apunta a tu dirección `nombre.pages.dev`. **Usa exactamente lo que muestre el panel en ese momento**, no valores de otros tutoriales. Entra al panel DNS de tu registrador, crea ese registro y vuelve a Cloudflare a verificar. Si Cloudflare te pide cambiar los *nameservers* (servidores de nombres), sigue las instrucciones que te dé.
4. Cloudflare activa el certificado HTTPS (el candado) automáticamente cuando el dominio queda conectado.

---

## 6. Verificación

Cuando el despliegue termine, comprueba:

1. **La página principal** abre en tu dirección (`https://minsalon.com`) y se ve completa.
2. **Escribe directamente** en la barra del navegador cada página legal y comprueba que carga (no debe aparecer un error 404):
   - `https://minsalon.com/privacidad`
   - `https://minsalon.com/tratamiento-de-datos`
   - `https://minsalon.com/cookies`
3. **Prueba la página desde un celular:**
   - El menú.
   - La sección de servicios.
   - El comparador de antes y después (arrastrando la línea).
   - El formulario de cita (con la casilla de autorización marcada).
   - El botón de WhatsApp.
4. **Cookies y Google Analytics:** abre la página en una ventana de incógnito y confirma que aparece el banner de cookies. Mientras no pulses aceptar, no debe cargarse Google Analytics (en las herramientas del navegador, pestaña *Network* o *Red*, no debe aparecer ninguna petición a `googletagmanager.com`). Si todavía no configuraste el ID de Google Analytics, no se cargará nunca; es lo esperado.

---

## 7. Actualizaciones

Cuando cambies cualquier dato o contenido del sitio:

- **Con GitHub (Opción A):** guarda tus cambios, haz *commit* y *push* desde tu equipo. Cloudflare detecta el cambio y publica la nueva versión solo, en unos minutos.
- **Sin GitHub (Opción B):** ejecuta `npm run build` para generar `dist` de nuevo y súbelo otra vez desde el panel de Cloudflare Pages (en tu proyecto, pestaña **Deployments**, busca la opción para crear un nuevo despliegue; verifica el nombre en el panel).

Si la nueva versión se ve mal, en **Deployments** puedes volver a una versión anterior que funcionaba (busca la opción de restaurar o hacer *rollback* en ese despliegue; verifica el nombre del botón en el panel).

---

## 8. Errores comunes

| Problema | Qué pasa y cómo resolverlo |
| --- | --- |
| **El build falla por la versión de Node.** | Fija la versión con `NODE_VERSION` (sección 4). Vite necesita Node 20.19 o superior (o 22.12 o superior). |
| **El build falla por otra razón.** | Abre el registro del despliegue en **Deployments** y lee el mensaje de error: normalmente indica el archivo y la línea donde está el problema. Corrígelo y vuelve a desplegar. |
| **Las páginas legales dan 404 al abrirlas directamente.** | Revisa que el archivo `public/_redirects` exista y contenga la línea `/* /index.html 200`. Si lo modificaste o lo borraste, restáuralo y publica de nuevo. |
| **El dominio no carga.** | Espera: la propagación del DNS puede tardar desde unos minutos hasta 24 horas. Si pasa ese tiempo, revisa que el registro DNS sea exactamente el que muestra el panel de Cloudflare Pages en **Custom domains**. |
| **Cambié algo y no se ve.** | Con la Opción B debes generar y subir `dist` otra vez. Con la Opción A, revisa en **Deployments** que el último despliegue haya terminado bien. Recarga sin caché con `Ctrl + F5` (en Mac, `Cmd + Shift + R`). |

---

## 9. Dónde se configura el dominio dentro del proyecto

En esta plantilla **no hay ningún lugar donde escribir la dirección del sitio**: no existe una etiqueta `canonical` en `index.html` ni un campo de dominio en `src/content/site.js`, y no hay `sitemap.xml`. Por eso no tienes que cambiar nada en el proyecto cuando conectas tu dominio; basta con la configuración de Cloudflare (sección 5).

---

## 10. Antes de publicar

Marca cada punto antes de enseñar la página a tus clientes:

- [ ] **Datos del salón completos** en `src/content/site.js`: nombre, ciudad, WhatsApp, teléfono, correo, dirección, horarios y redes. No debe quedar ningún texto entre `[CORCHETES]` visible en la página.
- [ ] **Imágenes de muestra reemplazadas** por fotos reales, o rotuladas como "Imagen de muestra". Cuando ya no quede ninguna de muestra, pon `mostrarAvisosMuestra` en `false` en `src/content/site.js`.
- [ ] **Páginas legales revisadas por un abogado** (privacidad, tratamiento de datos y cookies). Más detalles en [GUIA-CUMPLIMIENTO.md](GUIA-CUMPLIMIENTO.md).
- [ ] **Formulario probado**: envía una solicitud de prueba y confirma que llega por WhatsApp al número correcto.
- [ ] **Google Analytics configurado o pendiente**: si lo vas a usar, escribe tu ID (`G-XXXXXXXXXX`) en el campo `analyticsId` de `src/content/site.js`; si no, déjalo vacío y no se cargará nada de Google.
- [ ] **Prueba en un celular real**, no solo en el computador (sección 6).
