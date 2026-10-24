import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button.jsx'
import { serviceGroups, serviceValue } from '../content/services.js'
import { site } from '../content/site.js'
import { copy } from '../content/copy.js'
import { fieldOrder, todayISO, validate, validateField } from '../lib/validation.js'
import { buildMessage, buildWhatsAppUrl } from '../lib/whatsapp.js'

const empty = { name: '', phone: '', service: '', date: '', time: '', comment: '' }

const control =
  'mt-2 block min-h-12 w-full rounded-none border border-ink/60 bg-cream px-4 text-base text-ink placeholder:text-ink-soft focus-visible:border-ink aria-invalid:border-2 aria-invalid:border-rose-press'

export function BookingForm({ request }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState(null)
  const formRef = useRef(null)

  // Preselección desde Promociones
  useEffect(() => {
    if (request) setValues((v) => ({ ...v, service: request.value }))
  }, [request])

  function update(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (attempted && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, { ...values, [name]: value }) }))
    }
  }

  // Después del primer intento, valida cada campo al salir de él
  function onBlur(e) {
    if (!attempted) return
    const { name } = e.target
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values) }))
  }

  function onSubmit(e) {
    e.preventDefault()
    setAttempted(true)
    const found = validate(values)
    setErrors(found)
    const first = fieldOrder.find((f) => found[f])
    if (first) {
      setStatus(null)
      formRef.current.elements[first].focus()
      return
    }
    if (!site.whatsapp) {
      setStatus({
        ok: false,
        text: 'El número de WhatsApp del salón aún no está configurado, así que la solicitud no se envió. Mientras tanto, escríbenos a los datos de contacto del pie de página.',
      })
      return
    }
    window.open(buildWhatsAppUrl(site.whatsapp, buildMessage(values, site.name)), '_blank', 'noopener')
    setStatus({
      ok: true,
      text: 'Se abrió WhatsApp con tu solicitud. Envía el mensaje desde allí. Tu cita no está confirmada hasta que te respondamos.',
    })
  }

  const fieldProps = (name) => ({
    id: `cita-${name}`,
    name,
    value: values[name],
    onChange: update,
    onBlur,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `cita-${name}-error` : undefined,
  })

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-label="Solicitud de cita">
      <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
        <Field name="name" label="Nombre" error={errors.name}>
          <input {...fieldProps('name')} type="text" autoComplete="name" className={control} />
        </Field>

        <Field name="phone" label="Teléfono" error={errors.phone}>
          <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" className={control} />
        </Field>

        <Field name="service" label="Servicio" error={errors.service} wide>
          <SelectWrap>
            <select {...fieldProps('service')} className={`${control} appearance-none pr-12`}>
              <option value="">Elige un servicio</option>
              {serviceGroups.map((g) => (
                <optgroup key={g.id} label={g.title}>
                  {g.treatments.map((t) => (
                    <option key={t.id} value={serviceValue(g, t)}>
                      {t.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </SelectWrap>
        </Field>

        <Field name="date" label="Fecha preferida" error={errors.date}>
          <input {...fieldProps('date')} type="date" min={todayISO()} className={control} />
        </Field>

        <Field name="time" label="Hora preferida" error={errors.time}>
          <SelectWrap>
            <select {...fieldProps('time')} className={`${control} appearance-none pr-12`}>
              <option value="">Elige una hora</option>
              {site.timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </SelectWrap>
        </Field>

        <Field
          name="comment"
          label="Comentario"
          optional
          error={errors.comment}
          hint={`${values.comment.length}/500 caracteres`}
          wide
        >
          <textarea {...fieldProps('comment')} rows={4} maxLength={500} className={`${control} py-3`} />
        </Field>
      </div>

      <div className="mt-8">
        <Button as="button" type="submit" className="w-full sm:w-auto">
          {copy.booking.submit}
        </Button>
        <p className="mt-4 max-w-[52ch] text-small text-ink-soft">{copy.booking.privacy}</p>
        <div aria-live="polite" className="mt-4">
          {status && (
            <p
              className={`border-l-2 pl-4 text-body ${status.ok ? 'border-ink' : 'border-rose-press'} transition-opacity duration-feedback ease-out starting:opacity-0 motion-reduce:transition-none`}
            >
              {status.text}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

function Field({ name, label, optional, error, hint, wide, children }) {
  const id = `cita-${name}`
  return (
    <div className={wide ? 'md:col-span-2' : ''}>
      <label htmlFor={id} className="block text-small">
        {label}
        {optional && <span className="text-ink-soft"> (opcional)</span>}
      </label>
      {children}
      {hint && <p className="mt-2 text-small text-ink-soft">{hint}</p>}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-small text-rose-press transition-opacity duration-feedback ease-out starting:opacity-0 motion-reduce:transition-none"
        >
          {error}
        </p>
      )}
    </div>
  )
}

function SelectWrap({ children }) {
  return (
    <div className="relative">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-4 bottom-4 size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    </div>
  )
}
