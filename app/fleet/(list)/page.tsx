import type { Metadata } from "next"
import { CalendarDays, MapPin, Navigation, Tag } from "lucide-react"

import { categories } from "@/lib/vehicles"
import { FleetExplorer } from "@/components/site/fleet-explorer"
import { PageHero } from "@/components/site/page-hero"
import { CtaBand } from "@/components/site/cta-band"

export const metadata: Metadata = {
  title: "Our Fleet — Cars, SUVs, Microbus & Hiace for Rent",
  description:
    "Browse economy cars, sedans, premium sedans, SUVs, luxury cars, microbuses and Hiace vans for daily and monthly rent in Uttara, Dhaka.",
  alternates: { canonical: "/fleet" },
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? ""

export default async function FleetPage({ searchParams }: PageProps<"/fleet">) {
  const sp = await searchParams
  const search = {
    pickup: one(sp.pickup),
    dropoff: one(sp.dropoff),
    from: one(sp.from),
    to: one(sp.to),
    type: one(sp.type),
    rental: one(sp.rental),
  }

  // Forward trip details to each vehicle page so the booking form is prefilled.
  const forward = new URLSearchParams()
  for (const key of ["pickup", "dropoff", "from", "to", "rental"] as const)
    if (search[key]) forward.set(key, search[key])

  const chips = [
    search.pickup && { icon: MapPin, text: search.pickup },
    search.dropoff && { icon: Navigation, text: search.dropoff },
    (search.from || search.to) && {
      icon: CalendarDays,
      text: `${search.from || "?"} → ${search.to || "?"}`,
    },
    search.rental && { icon: Tag, text: search.rental },
  ].filter(Boolean) as { icon: typeof MapPin; text: string }[]

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Fleet" }]}
        title={
          <>
            Our <span className="text-gold-gradient">Fleet</span>
          </>
        }
        description={`${categories.length} vehicle categories — from fuel-efficient city cars to luxury SUVs and 12-seat Hiace vans. Filter, compare and book in minutes.`}
      />
      <section id="results" className="scroll-mt-24 pb-24">
        <div className="container-x">
          {chips.length ? (
            <div className="mb-8 flex flex-wrap items-center gap-2 rounded-xl border border-gold/25 bg-gold/5 p-3 text-sm">
              <span className="px-1 text-muted-foreground">Your trip:</span>
              {chips.map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-background/60 px-3 py-1">
                  <Icon className="size-3.5 text-gold" /> {text}
                </span>
              ))}
            </div>
          ) : null}
          <FleetExplorer
            key={search.type}
            initialCategory={search.type}
            forwardQuery={forward.toString() || undefined}
          />
        </div>
      </section>
      <CtaBand />
      <div className="h-16" />
    </>
  )
}
