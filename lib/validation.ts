/**
 * Form validation shared by the client forms and the API route handlers,
 * so the same rules run in the browser and on the server.
 */

export type FieldErrors<T> = Partial<Record<keyof T, string>>

export const rentalTypes = [
  "Daily",
  "Weekly",
  "Monthly",
  "With Driver",
  "Airport Transfer",
  "Outside Dhaka",
  "Corporate",
] as const

export type BookingInput = {
  vehicle: string
  name: string
  phone: string
  email: string
  pickupLocation: string
  destination: string
  pickupDate: string
  pickupTime: string
  returnDate: string
  rentalType: string
  driverRequired: "Yes" | "No" | ""
  message: string
}

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

export function daysBetween(fromISO: string, toISO: string) {
  const from = new Date(`${fromISO}T00:00:00`).getTime()
  const to = new Date(`${toISO}T00:00:00`).getTime()
  return Math.round((to - from) / 86_400_000)
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")

export function validateBooking(
  raw: Partial<Record<keyof BookingInput, unknown>>,
  today = todayISO()
) {
  const data: BookingInput = {
    vehicle: str(raw.vehicle),
    name: str(raw.name),
    phone: str(raw.phone),
    email: str(raw.email),
    pickupLocation: str(raw.pickupLocation),
    destination: str(raw.destination),
    pickupDate: str(raw.pickupDate),
    pickupTime: str(raw.pickupTime),
    returnDate: str(raw.returnDate),
    rentalType: str(raw.rentalType),
    driverRequired: (["Yes", "No"].includes(str(raw.driverRequired))
      ? str(raw.driverRequired)
      : "") as BookingInput["driverRequired"],
    message: str(raw.message),
  }
  const errors: FieldErrors<BookingInput> = {}

  if (data.name.length < 2) errors.name = "Please enter your full name."
  else if (data.name.length > 80) errors.name = "Name is too long."

  if (!data.phone) errors.phone = "Phone number is required."
  else if (!isValidPhone(data.phone))
    errors.phone = "Enter a valid Bangladeshi mobile number (01XXXXXXXXX)."

  if (data.email && !isValidEmail(data.email))
    errors.email = "Enter a valid email address."

  if (!data.pickupLocation) errors.pickupLocation = "Pickup location is required."
  if (!data.destination) errors.destination = "Destination is required."

  if (!data.pickupDate) errors.pickupDate = "Choose a pickup date."
  else if (data.pickupDate < today)
    errors.pickupDate = "Pickup date can't be in the past."

  if (!data.returnDate) errors.returnDate = "Choose a return date."
  else if (data.pickupDate && data.returnDate < data.pickupDate)
    errors.returnDate = "Return date must be on or after the pickup date."

  if (!rentalTypes.includes(data.rentalType as (typeof rentalTypes)[number]))
    errors.rentalType = "Select a rental type."

  if (!data.driverRequired) errors.driverRequired = "Let us know if you need a driver."

  if (data.message.length > 1000)
    errors.message = "Message must be under 1000 characters."

  return { data, errors, valid: Object.keys(errors).length === 0 }
}

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

/** Formats a booking as a WhatsApp-ready message. */
export function bookingToMessage(b: BookingInput, reference?: string) {
  const lines = [
    "Hello! I'd like to book a car.",
    reference ? `Reference: ${reference}` : null,
    b.vehicle ? `Vehicle: ${b.vehicle}` : null,
    `Rental type: ${b.rentalType}`,
    `Driver required: ${b.driverRequired}`,
    `Pickup: ${b.pickupLocation} — ${b.pickupDate}${b.pickupTime ? ` ${b.pickupTime}` : ""}`,
    `Destination: ${b.destination}`,
    `Return: ${b.returnDate}`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    b.email ? `Email: ${b.email}` : null,
    b.message ? `Note: ${b.message}` : null,
  ]
  return lines.filter(Boolean).join("\n")
}
