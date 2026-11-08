import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CircleCheck,
  Cog,
  Fuel,
  Luggage,
  MessageCircle,
  Phone,
  ShieldCheck,
  Snowflake,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { bookingMessage, site, telLink, whatsappLink } from "@/lib/site"
import {
  categoryLabels,
  getRelatedVehicles,
  getVehicle,
  rentalTerms,
  vehicles,
} from "@/lib/vehicles"
import { buttonVariants } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/site/brand-icons"
import { VehicleGallery } from "@/components/site/vehicle-gallery"
import { VehicleCard, availabilityTone } from "@/components/site/vehicle-card"
import { Reveal } from "@/components/site/reveal"

// Only the vehicles in the catalogue exist; any other slug is a real 404.
export const dynamicParams = false

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: PageProps<"/fleet/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const v = getVehicle(slug)
  if (!v) return { title: "Vehicle not found" }
  return {
    title: `${v.name} ${v.year} for Rent in Dhaka`,
    description: `Rent a ${v.name} (${v.model}, ${v.year}) in Uttara, Dhaka. ${v.passengers} seats, ${v.transmission.toLowerCase()}, ${v.fuel}. ${v.summary}`,
    alternates: { canonical: `/fleet/${v.slug}` },
    openGraph: { images: [{ url: v.images[0].src, alt: v.images[0].alt }] },
  }
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? ""

export default async function VehiclePage({ params, searchParams }: PageProps<"/fleet/[slug]">) {
  const { slug } = await params
  const vehicle = getVehicle(slug)
  if (!vehicle) notFound()

  const sp = await searchParams
  // Trip details forwarded from the search form are added to the WhatsApp message.
  const trip = [
    one(sp.pickup) && `Pickup: ${one(sp.pickup)}`,
    one(sp.dropoff) && `Destination: ${one(sp.dropoff)}`,
    one(sp.from) && `From: ${one(sp.from)}`,
    one(sp.to) && `To: ${one(sp.to)}`,
    one(sp.rental) && `Rental type: ${one(sp.rental)}`,
  ].filter((x): x is string => !!x)
  const waHref = whatsappLink(bookingMessage(`${vehicle.name} (${vehicle.year})`, trip))

  const specs = [
    { icon: CalendarDays, label: "Model Year", value: String(vehicle.year) },
    { icon: Users, label: "Passengers", value: `${vehicle.passengers} seats` },
    { icon: Luggage, label: "Luggage", value: `${vehicle.luggage} bags` },
    { icon: Cog, label: "Transmission", value: vehicle.transmission },
    { icon: Fuel, label: "Fuel Type", value: vehicle.fuel },
    { icon: Snowflake, label: "Air Conditioning", value: vehicle.ac ? "Yes" : "No" },
  ]

  const related = getRelatedVehicles(vehicle, 4)

  return (
    <>
      <div className="pt-20 md:pt-29">
        <div className="container-x py-8 sm:py-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-gold">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/fleet" className="hover:text-gold">Our Fleet</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-foreground">{vehicle.name}</li>
            </ol>
            <Link href="/fleet" className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline">
              <ArrowLeft className="size-4" /> Back to fleet
            </Link>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            {/* Left: gallery + info */}
            <div className="flex min-w-0 flex-col gap-10">
              <Reveal>
                <VehicleGallery images={vehicle.images} name={vehicle.name} />
              </Reveal>

              <Reveal className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs">
                    {categoryLabels[vehicle.category]}
                  </span>
                  <span className={cn("rounded-full border px-3 py-1 text-xs", availabilityTone[vehicle.availability])}>
                    {vehicle.availability}
                  </span>
                </div>
                <h1 className="font-display text-4xl leading-tight font-semibold sm:text-5xl">
                  {vehicle.name}
                </h1>
                <p className="text-muted-foreground">
                  {vehicle.model} · {vehicle.year}
                </p>
                <p className="max-w-2xl text-lg leading-relaxed text-foreground/85">{vehicle.summary}</p>
              </Reveal>

              <Reveal>
                <h2 className="font-display text-2xl font-semibold">Specifications</h2>
                <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {specs.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-xl border border-white/8 bg-card p-4 transition hover:border-gold/30">
                      <Icon className="size-5 text-gold" />
                      <dt className="mt-3 text-xs tracking-wider text-muted-foreground uppercase">{label}</dt>
                      <dd className="mt-0.5 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-card p-6">
                  <h2 className="font-display text-xl font-semibold">Features &amp; Facilities</h2>
                  <ul className="mt-4 flex flex-col gap-3 text-sm">
                    {[...vehicle.features, "Professional driver available", "Clean & sanitised before every trip"].map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <CircleCheck className="size-4 shrink-0 text-gold" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/8 bg-card p-6">
                  <h2 className="font-display text-xl font-semibold">Ideal For</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {vehicle.idealFor.map((f) => (
                      <li key={f} className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1.5 text-sm text-gold">
                        {f}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-6 text-sm font-semibold">Availability</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {vehicle.availability === "Available"
                      ? "Usually available at short notice. Call to confirm for your dates."
                      : vehicle.availability === "Limited"
                        ? "Limited units — we recommend booking at least 2–3 days ahead."
                        : "Arranged on request. Contact us with your dates and we'll confirm."}
                  </p>
                </div>
              </Reveal>

              <Reveal className="rounded-2xl border border-white/8 bg-card p-6">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                  <ShieldCheck className="size-5 text-gold" /> Rental Terms &amp; Conditions
                </h2>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                  {rentalTerms.map((t) => (
                    <li key={t} className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" /> {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Right: booking by phone / WhatsApp (sticky on desktop) */}
            <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <Reveal id="book" className="scroll-mt-32 rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/10 to-card p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-semibold">Book this car</h2>
                  <MessageCircle className="size-5 text-gold" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Call or WhatsApp us with your trip details — we&apos;ll confirm availability and the
                  rate for the {vehicle.name} right away. Open 24/7.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={telLink} className={buttonVariants({ variant: "gold", size: "xl", className: "w-full" })}>
                    <Phone /> Call {site.contact.phoneDisplay}
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "glass", size: "xl", className: "w-full" })}
                  >
                    <WhatsAppIcon className="size-5 text-[#25D366]" /> Book on WhatsApp
                  </a>
                </div>
                {trip.length ? (
                  <ul className="mt-5 flex flex-col gap-1.5 rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm text-muted-foreground">
                    {trip.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            </aside>
          </div>
        </div>
      </div>

      <section className="border-t border-white/8 py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold">
              You may also <span className="text-gold-gradient">like</span>
            </h2>
            <Link href="/fleet" className="text-sm text-gold hover:underline">
              View full fleet →
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 desk:grid-cols-4">
            {related.map((v, i) => (
              <li key={v.slug} className={cn(i === 3 && "lg:hidden desk:block")}>
                <VehicleCard vehicle={v} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
