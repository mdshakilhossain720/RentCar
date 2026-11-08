/**
 * Form validation shared by the client forms and the API route handlers,
 * so the same rules run in the browser and on the server.
 */

export type FieldErrors<T> = Partial<Record<keyof T, string>>

export type ContactInput = {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Bangladeshi mobile numbers: 01XXXXXXXXX, optionally prefixed with +88 / 88.
const BD_PHONE_RE = /^(?:\+?88)?01[3-9]\d{8}$/

export const normalizePhone = (value: string) => value.replace(/[\s()-]/g, "")
export const isValidPhone = (value: string) =>
  BD_PHONE_RE.test(normalizePhone(value))
export const isValidEmail = (value: string) => EMAIL_RE.test(value.trim())

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
export function todayISO(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

export function addDaysISO(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return todayISO(d)
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")

export function validateContact(raw: Partial<Record<keyof ContactInput, unknown>>) {
  const data: ContactInput = {
    name: str(raw.name),
    phone: str(raw.phone),
    email: str(raw.email),
    subject: str(raw.subject),
    message: str(raw.message),
  }
  const errors: FieldErrors<ContactInput> = {}

  if (data.name.length < 2) errors.name = "Please enter your full name."
  if (!data.phone) errors.phone = "Phone number is required."
  else if (!isValidPhone(data.phone))
    errors.phone = "Enter a valid Bangladeshi mobile number (01XXXXXXXXX)."
  if (!data.email) errors.email = "Email is required."
  else if (!isValidEmail(data.email)) errors.email = "Enter a valid email address."
  if (data.subject.length < 3) errors.subject = "Please add a subject."
  if (data.message.length < 10)
    errors.message = "Please write a message of at least 10 characters."
  else if (data.message.length > 2000)
    errors.message = "Message must be under 2000 characters."

  return { data, errors, valid: Object.keys(errors).length === 0 }
}

