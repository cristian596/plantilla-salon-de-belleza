import { site } from '../content/site.js'
import { PendingNote } from './PendingNote.jsx'

// Aviso "Imagen de muestra" sobre la parte baja de una foto. El contenedor debe ser relative.
// Se oculta al poner muestra: false en la entrada de imagenes.js, o mostrarAvisosMuestra: false en site.js.
// Con varias imágenes (antes/después) basta con que una sea de muestra.
export function AvisoMuestra({ imagen, children = 'Imagen de muestra' }) {
  const lista = Array.isArray(imagen) ? imagen : [imagen]
  if (!site.mostrarAvisosMuestra || !lista.some((i) => i.muestra)) return null
  return <PendingNote overlay>{children}</PendingNote>
}
