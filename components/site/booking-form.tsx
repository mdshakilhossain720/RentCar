"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  CalendarCheck,
  CalendarDays,
  CircleCheck,
  Clock,
  LoaderCircle,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  UserRound,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { pickupLocations, site, telLink } from "@/lib/site"
import { CONTACT_FOR_PRICE, formatBDT, type Vehicle } from "@/lib/vehicles"
import {
  daysBetween,
  rentalTypes,
  validateBooking,
  type BookingInput,
  type FieldErrors,
} from "@/lib/validation"
import { useToday } from "@/hooks/use-today"
import { Button, buttonVariants } from "@/components/ui/button"
import { Field, Input, Select, Textarea, fieldAria } from "@/components/ui/field"
import { useToast } from "@/components/ui/toaster"

type BookingFormProps = {
  vehicle: Pick<Vehicle, "slug" | "name" | "dailyPrice" | "monthlyPrice">
  defaults?: Partial<BookingInput>
}

const id = (k: keyof BookingInput) => `book-${k}`

function estimate(v: BookingFormProps["vehicle"], b: BookingInput) {
  if (!b.pickupDate || !b.returnDate || b.returnDate < b.pickupDate) return null
  const days = daysBetween(b.pickupDate, b.returnDate) + 1
  if (b.rentalType === "Monthly") {
    const months = Math.max(1, Math.ceil(days / 30))
    return {
      label: `${months} month${months > 1 ? "s" : ""}`,
      total: v.monthlyPrice === null ? null : v.monthlyPrice * months,
    }
  }
  return {
    label: `${days} day${days > 1 ? "s" : ""}`,
    total: v.dailyPrice === null ? null : v.dailyPrice * days,
  }
}

export function BookingForm({ vehicle, defaults }: BookingFormProps) {
  const toast = useToast()
  const today = useToday()
  const initial = React.useMemo<BookingInput>(
    () => ({
      vehicle: vehicle.slug,
      name: "",
      phone: "",
      email: "",
      pickupLocation: defaults?.pickupLocation ?? "",
      destination: defaults?.destination ?? "",
      pickupDate: defaults?.pickupDate ?? "",
      pickupTime: "",
      returnDate: defaults?.returnDate ?? "",
      rentalType:
        defaults?.rentalType && (rentalTypes as readonly string[]).includes(defaults.rentalType)
          ? defaults.rentalType
          : "Daily",
      driverRequired: defaults?.rentalType === "With Driver" ? "Yes" : "",
      message: "",
    }),
    [vehicle.slug, defaults]
  )
  const [values, setValues] = React.useState<BookingInput>(initial)
  const [errors, setErrors] = React.useState<FieldErrors<BookingInput>>({})
  const [status, setStatus] = React.useState<"idle" | "sending" | "done">("idle")
  const [reference, setReference] = React.useState("")

  const set =
    (key: keyof BookingInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setValues((v) => {
        const next = { ...v, [key]: value } as BookingInput
        if (key === "pickupDate" && next.returnDate && next.returnDate < value) next.returnDate = value
        return next
      })
      if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
    }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = validateBooking(values, today || undefined)
    setErrors(result.errors)
    if (!result.valid) {
      toast({ kind: "error", title: "Booking incomplete", description: "Please fix the highlighted fields." })
      const first = Object.keys(result.errors)[0] as keyof BookingInput
      document.getElementById(id(first))?.focus()
      return
    }
    // UI demo only — no booking is submitted. Simulate a request for the loading state.
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 1400))
    setReference(`DEMO-${Date.now().toString(36).toUpperCase().slice(-6)}`)
    setStatus("done")
    toast({ kind: "success", title: "Booking request preview", description: "Design demo — call us to confirm your car." })
  }

  const est = estimate(vehicle, values)
  const radio = (opt: "Yes" | "No") => (
    <label
      key={opt}
      className={cn(
        "flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm transition",
        values.driverRequired === opt
          ? "border-gold bg-gold/10 text-gold"
          : "border-input hover:border-white/25",
        errors.driverRequired && "border-destructive/60"
      )}
    >
      <input
        type="radio"
        name="driverRequired"
        value={opt}
        checked={values.driverRequired === opt}
        onChange={set("driverRequired")}
        className="sr-only"
        id={opt === "Yes" ? id("driverRequired") : undefined}
      />
      {opt === "Yes" ? "Yes, with driver" : "No, self-drive"}
    </label>
  )

  return (
    <div className="relative rounded-2xl border border-white/10 bg-card p-5 shadow-2xl shadow-black/30 sm:p-7">
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-success/15 text-success">
              <CircleCheck className="size-8" />
            </span>
            <h3 className="font-display text-2xl font-semibold">Booking request received</h3>
            <p className="text-sm text-muted-foreground">
              Preview reference <span className="font-mono text-gold">{reference}</span>
            </p>
            <div className="w-full rounded-xl border border-white/8 bg-white/[0.02] p-4 text-left text-sm">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                <dt className="text-muted-foreground">Vehicle</dt>
                <dd>{vehicle.name}</dd>
                <dt className="text-muted-foreground">Rental</dt>
                <dd>{values.rentalType} · Driver: {values.driverRequired}</dd>
                <dt className="text-muted-foreground">Pickup</dt>
                <dd>
                  {values.pickupLocation}, {values.pickupDate}
                  {values.pickupTime ? ` at ${values.pickupTime}` : ""}
                </dd>
                <dt className="text-muted-foreground">Return</dt>
                <dd>{values.returnDate}</dd>
              </dl>
            </div>
            <p className="max-w-sm text-xs text-muted-foreground">
              This website is a design preview — no booking has been placed. Please call{" "}
              {site.contact.phoneDisplay} to confirm availability and price.
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <a href={telLink} className={buttonVariants({ variant: "gold", size: "xl", className: "flex-1" })}>
                <Phone /> Call to Confirm
              </a>
              <Button
                variant="glass"
                size="xl"
                className="flex-1"
                onClick={() => {
                  setValues(initial)
                  setStatus("idle")
                }}
              >
                New Booking
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            aria-label={`Book ${vehicle.name}`}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <h2 className="font-display text-2xl font-semibold">Book this car</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in your trip details — fields marked <span className="text-gold">*</span> are required.
              </p>
            </div>

            <Field id={id("name")} label="Customer Name" icon={<UserRound />} error={errors.name} required>
              <Input {...fieldAria(id("name"), errors.name)} autoComplete="name" value={values.name} onChange={set("name")} placeholder="Your full name" />
            </Field>
            <Field id={id("phone")} label="Phone Number" icon={<Phone />} error={errors.phone} required>
              <Input {...fieldAria(id("phone"), errors.phone)} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" />
            </Field>
            <Field id={id("email")} label="Email Address" icon={<Mail />} error={errors.email} hint="Optional" className="sm:col-span-2">
              <Input {...fieldAria(id("email"), errors.email)} type="email" autoComplete="email" value={values.email} onChange={set("email")} placeholder="you@example.com" />
            </Field>
            <Field id={id("pickupLocation")} label="Pickup Location" icon={<MapPin />} error={errors.pickupLocation} required>
              <Input
                {...fieldAria(id("pickupLocation"), errors.pickupLocation)}
                list="pickup-suggestions"
                value={values.pickupLocation}
                onChange={set("pickupLocation")}
                placeholder="e.g. Sector 7, Uttara"
              />
              <datalist id="pickup-suggestions">
                {pickupLocations.map((l) => (
                  <option key={l} value={l} />
                ))}
              </datalist>
            </Field>
            <Field id={id("destination")} label="Destination" icon={<Navigation />} error={errors.destination} required>
              <Input {...fieldAria(id("destination"), errors.destination)} value={values.destination} onChange={set("destination")} placeholder="e.g. Cox's Bazar" />
            </Field>
            <Field id={id("pickupDate")} label="Pickup Date" icon={<CalendarDays />} error={errors.pickupDate} required>
              <Input type="date" {...fieldAria(id("pickupDate"), errors.pickupDate)} min={today || undefined} value={values.pickupDate} onChange={set("pickupDate")} />
            </Field>
            <Field id={id("pickupTime")} label="Pickup Time" icon={<Clock />} hint="Optional">
              <Input type="time" {...fieldAria(id("pickupTime"))} value={values.pickupTime} onChange={set("pickupTime")} />
            </Field>
            <Field id={id("returnDate")} label="Return Date" icon={<CalendarCheck />} error={errors.returnDate} required>
              <Input type="date" {...fieldAria(id("returnDate"), errors.returnDate)} min={values.pickupDate || today || undefined} value={values.returnDate} onChange={set("returnDate")} />
            </Field>
            <Field id={id("rentalType")} label="Rental Type" error={errors.rentalType} required>
              <Select {...fieldAria(id("rentalType"), errors.rentalType)} value={values.rentalType} onChange={set("rentalType")}>
                {rentalTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
            </Field>
            <fieldset className="flex flex-col gap-1.5 sm:col-span-2">
              <legend className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Driver Required <span className="text-gold">*</span>
              </legend>
              <div className="flex gap-3">{(["Yes", "No"] as const).map(radio)}</div>
              {errors.driverRequired ? (
                <p role="alert" className="text-xs text-destructive">{errors.driverRequired}</p>
              ) : null}
            </fieldset>
            <Field id={id("message")} label="Additional Message" icon={<MessageSquare />} error={errors.message} className="sm:col-span-2">
              <Textarea {...fieldAria(id("message"), errors.message)} rows={3} value={values.message} onChange={set("message")} placeholder="Flight number, number of passengers, special requests…" />
            </Field>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-gold/25 bg-gold/5 px-4 py-3 sm:col-span-2">
              <div>
                <p className="text-xs tracking-wider text-muted-foreground uppercase">Estimated rent</p>
                <p className="text-xs text-muted-foreground">{est ? est.label : "Select your dates"}</p>
              </div>
              <p className="text-right font-display text-xl font-semibold text-gold">
                {est ? (est.total === null ? CONTACT_FOR_PRICE : formatBDT(est.total)) : "—"}
              </p>
            </div>

            <Button type="submit" variant="gold" size="xl" disabled={status === "sending"} className="w-full sm:col-span-2">
              {status === "sending" ? (
                <>
                  <LoaderCircle className="animate-spin" /> Confirming…
                </>
              ) : (
                <>
                  <CalendarCheck /> Confirm Booking
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground sm:col-span-2">
              Design preview — submitting does not place a real booking.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
