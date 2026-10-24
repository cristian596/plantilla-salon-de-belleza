import { LegalPage } from '../components/LegalPage.jsx'
import { legal } from '../content/legal.js'

export function Cookies() {
  return <LegalPage doc={legal.cookies} />
}
