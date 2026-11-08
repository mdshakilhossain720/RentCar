"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, CarFront, LoaderCircle, MapPin, Navigation, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { pickupLocations } from "@/lib/site"
import { categories, categoryLabels } from "@/lib/vehicles"
import { addDaysISO, type FieldErrors } from "@/lib/validation"
import { useToday } from "@/hooks/use-today"
import { Button } from "@/components/ui/button"
import { Field, Input, Select, fieldAria } from "@/components/ui/field"
import { useToast } from "@/components/ui/toaster"

type SearchInput = {
  pickup: string
  dropoff: string
  from: string
  to: string
  type: string
}

export function BookingSearch({ className }: { className?: string }) {
  const router = useRouter()
  const toast = useToast()
  const today = useToday()
  const [pending, startTransition] = React.useTransition()
  const [values, setValues] = React.useState<SearchInput>({
    pickup: "",
    dropoff: "",
    from: "",
    to: "",
    type: "",
  })
  const [errors, setErrors] = React.useState<FieldErrors<SearchInput>>({})

  const set =
    (key: keyof SearchInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value
      setValues((v) => {
        const next = { ...v, [key]: value }
        // Keep the return date valid when the pickup date moves past it.
        if (key === "from" && next.to && next.to < value) next.to = value
        return next
      })
      setErrors((err) => ({ ...err, [key]: undefined }))
    }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const err: FieldErrors<SearchInput> = {}
    if (!values.pickup) err.pickup = "Choose a pickup location."
    if (!values.from) err.from = "Choose a pickup date."
    else if (today && values.from < today) err.from = "Date can't be in the past."
    if (!values.to) err.to = "Choose a return date."
    else if (values.from && values.to < values.from)
      err.to = "Must be on or after pickup."
    setErrors(err)
    if (Object.keys(err).length) {
      toast({ kind: "error", title: "Please complete your search", description: "Check the highlighted fields." })
      return
    }
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(values)) if (v) params.set(k, v)
    startTransition(() => router.push(`/fleet?${params.toString()}#results`))
  }

  return (
    <form
      id="booking-search"
      onSubmit={onSubmit}
      noValidate
      aria-label="Search available cars"
      className={cn(
        "grid gap-4 rounded-2xl border border-white/10 bg-surface/80 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:grid-cols-2 sm:p-6 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto] lg:items-start",
        className
      )}
    >
      <Field id="pickup" label="Pickup Location" icon={<MapPin />} error={errors.pickup} required>
        <Select {...fieldAria("pickup", errors.pickup)} value={values.pickup} onChange={set("pickup")}>
          <option value="">Select area</option>
          {pickupLocations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </Select>
      </Field>
      <Field id="dropoff" label="Drop-off Location" icon={<Navigation />}>
        <Select {...fieldAria("dropoff")} value={values.dropoff} onChange={set("dropoff")}>
          <option value="">Same as pickup</option>
          {pickupLocations.map((l) => (
            <option key={l}>{l}</option>
          ))}
          <option>Outside Dhaka</option>
        </Select>
      </Field>
      <Field id="from" label="Pickup Date" icon={<CalendarDays />} error={errors.from} required>
        <Input
          type="date"
          {...fieldAria("from", errors.from)}
          min={today || undefined}
          value={values.from}
          onChange={set("from")}
        />
      </Field>
      <Field id="to" label="Return Date" icon={<CalendarDays />} error={errors.to} required>
        <Input
          type="date"
          {...fieldAria("to", errors.to)}
          min={values.from || today || undefined}
          value={values.to}
          onChange={set("to")}
          onFocus={() => {
            if (!values.to && values.from)
              setValues((v) => ({ ...v, to: addDaysISO(v.from, 1) }))
          }}
        />
      </Field>
      <Field id="type" label="Car Type" icon={<CarFront />}>
        <Select {...fieldAria("type")} value={values.type} onChange={set("type")}>
          <option value="">All types</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c]}
            </option>
          ))}
        </Select>
      </Field>
      <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
        <span aria-hidden className="hidden text-xs lg:block">&nbsp;</span>
        <Button type="submit" variant="gold" size="xl" disabled={pending} className="h-11 w-full lg:w-auto">
          {pending ? <LoaderCircle className="animate-spin" /> : <Search />}
          <span className="lg:hidden xl:inline">Search Available Cars</span>
          <span className="hidden lg:inline xl:hidden">Search</span>
        </Button>
      </div>
    </form>
  )
}
