import { useEffect, useRef, useState } from 'react'
import { Picture } from '../components/Picture.jsx'
import { PendingNote } from '../components/PendingNote.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { copy } from '../content/copy.js'

const clamp = (n) => Math.min(100, Math.max(0, n))
const KEY_STEP = 5
const BIG_STEP = 10
const NUDGE_MS = 280

// Comparador antes/después. Todo se mueve con transform:
// la capa "antes" se desplaza y su imagen se contra-desplaza, así recorta sin animar width ni clip-path.
export function CompareSlider({ item, nudge = false, onInteract }) {
  const [pos, setPos] = useState(50)
  const [transitionMs, setTransitionMs] = useState(0)
  const boxRef = useRef(null)
  const frameRef = useRef(0)
  const draggingRef = useRef(false)
  const interactedRef = useRef(false)
  const reduced = useReducedMotion()

  // Movimiento de firma: un empujón 50 → 42 → 50 la primera vez que entra en pantalla.
  useEffect(() => {
    const el = boxRef.current
    if (!nudge || reduced || !el || !('IntersectionObserver' in window)) return
    const timers = []
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        if (interactedRef.current) return
        setTransitionMs(NUDGE_MS)
        setPos(42)
        timers.push(setTimeout(() => !interactedRef.current && setPos(50), NUDGE_MS))
        timers.push(setTimeout(() => !interactedRef.current && setTransitionMs(0), NUDGE_MS * 2))
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [nudge, reduced])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  function markInteracted() {
    if (!interactedRef.current) {
      interactedRef.current = true
      onInteract?.()
    }
  }

  function moveTo(clientX) {
    const rect = boxRef.current.getBoundingClientRect()
    const next = clamp(((clientX - rect.left) / rect.width) * 100)
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => setPos(next))
  }

  function onHandlePointerDown(e) {
    e.preventDefault()
    e.stopPropagation()
    markInteracted()
    setTransitionMs(0)
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    e.currentTarget.querySelector('[role="slider"]')?.focus({ preventScroll: true })
    moveTo(e.clientX)
  }

  function onHandlePointerMove(e) {
    if (draggingRef.current) moveTo(e.clientX)
  }

  function onHandlePointerUp() {
    draggingRef.current = false
  }

  // Con mouse, un clic en la imagen salta a esa posición. En táctil la imagen sigue haciendo scroll.
  function onBoxPointerDown(e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    markInteracted()
    setTransitionMs(reduced ? 0 : 150)
    moveTo(e.clientX)
  }

  function onKeyDown(e) {
    const step = e.shiftKey ? BIG_STEP : KEY_STEP
    const moves = {
      ArrowLeft: (p) => p - step,
      ArrowDown: (p) => p - step,
      ArrowRight: (p) => p + step,
      ArrowUp: (p) => p + step,
      PageDown: (p) => p - BIG_STEP,
      PageUp: (p) => p + BIG_STEP,
      Home: () => 0,
      End: () => 100,
    }
    if (!(e.key in moves)) return
    e.preventDefault()
    markInteracted()
    setTransitionMs(reduced ? 0 : 150)
    setPos((p) => clamp(moves[e.key](p)))
  }

  const rounded = Math.round(pos)
  const transition = transitionMs ? `transform ${transitionMs}ms var(--ease-out)` : 'none'

  return (
    <div
      ref={boxRef}
      onPointerDown={onBoxPointerDown}
      className="relative aspect-[4/5] touch-pan-y overflow-hidden bg-nude select-none md:aspect-[16/10]"
    >
      <Picture id={item.after.id} alt={item.after.alt} ratio={0.75} sizes="(min-width: 1024px) 60vw, 100vw" />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `translateX(${pos - 100}%)`, transition }}
      >
        <div className="absolute inset-0" style={{ transform: `translateX(${100 - pos}%)`, transition }}>
          <Picture id={item.before.id} alt={item.before.alt} ratio={0.75} sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
      </div>

      <span aria-hidden="true" className="absolute top-3 left-3 bg-cream/90 px-3 py-1 text-small">
        Antes
      </span>
      <span aria-hidden="true" className="absolute top-3 right-3 bg-cream/90 px-3 py-1 text-small">
        Después
      </span>

      {/* Tirador: solo esta franja tiene touch-action: none */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ transform: `translateX(${pos - 50}%)`, transition }}
      >
        <div
          className="pointer-events-auto absolute inset-y-0 left-1/2 w-12 -translate-x-1/2 cursor-ew-resize touch-none"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
        >
          <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cream" />
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Comparar antes y después: ${item.treatment}`}
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={rounded}
            aria-valuetext={`${rounded} % antes, ${100 - rounded} % después`}
            onKeyDown={onKeyDown}
            className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 bg-cream text-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 6l-4 4 4 4M13 6l4 4-4 4" />
            </svg>
          </div>
        </div>
      </div>

      {item.isPlaceholder && <PendingNote overlay>{copy.compare.placeholderNote}</PendingNote>}
    </div>
  )
}
