import { createContext, useContext } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { STAGGER_MS } from '../lib/motion.js'

const RevealContext = createContext(true)

// Observa el grupo una vez; los Reveal hijos entran escalonados.
export function RevealGroup({ as: Tag = 'div', immediate = false, className = '', children, ...rest }) {
  const [ref, shown] = useReveal({ immediate })
  return (
    <RevealContext.Provider value={shown}>
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    </RevealContext.Provider>
  )
}

// Fade + desplazamiento (24px, o 16px con small). Con reduced motion, siempre visible y quieto.
export function Reveal({ as: Tag = 'div', index = 0, small = false, className = '', style, children, ...rest }) {
  const shown = useContext(RevealContext)
  const hidden = small ? 'opacity-0 translate-y-4' : 'opacity-0 translate-y-6'
  return (
    <Tag
      className={`transition-[opacity,translate] duration-enter ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : hidden} ${className}`}
      style={{ transitionDelay: shown ? `${index * STAGGER_MS}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
