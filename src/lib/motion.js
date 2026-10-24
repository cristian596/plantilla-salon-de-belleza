// Constantes de movimiento para JS. Deben coincidir con los tokens de src/styles/tailwind.css
// (--duration-press, --duration-ui, --duration-enter, --duration-feedback).
export const STAGGER_MS = 70 // escalonado entre Reveal hermanos
export const REVEAL_DELAY_MS = 30 // espera antes del primer Reveal inmediato (hero)
export const CASE_FADE_MS = 200 // = --duration-ui: fundido del caso saliente del comparador
export const NUDGE_MS = 280 // cada tramo del empujón de firma
export const DRAG_STEP_MS = 150 // = --duration-feedback: paso de teclado o clic del comparador
export const REVEAL_SETTLE_MS = 400 // espera tras entrar el comparador, antes del empujón
