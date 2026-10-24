import { LegalPage } from '../components/LegalPage.jsx'
import { legal } from '../content/legal.js'

export function TratamientoDatos() {
  return <LegalPage doc={legal.tratamiento} />
}
