import { LegalPage } from '../components/LegalPage.jsx'
import { legal } from '../content/legal.js'

export function Privacidad() {
  return <LegalPage doc={legal.privacidad} />
}
