import Link from "next/link"
import { Check, Crown } from "lucide-react"

import { cn } from "@/lib/utils"
import { getRentalPackages } from "@/lib/pricing"
import { CONTACT_FOR_PRICE, formatBDT } from "@/lib/vehicles"
import { buttonVariants } from "@/components/ui/button"
import { RevealGroup, RevealItem } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

export function Pricing() {
  const packages = getRentalPackages()

  return (
    <section id="pricing" className="relative bg-surface/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Rental Packages"
          title={
            <>
              Transparent pricing, <span className="text-gold-gradient">no surprises</span>
            </>
          }
          description="Starting rates are calculated from our current fleet. Your final quote depends on the car, duration and route."
        />

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <RevealItem key={p.id} className="h-full">
              <article
                className={cn(
                  "group relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 sm:p-8",
                  p.featured
                    ? "border-gold/60 bg-gradient-to-b from-gold/10 to-card shadow-2xl shadow-gold/10"
                    : "border-white/8 bg-card hover:border-gold/40"
                )}
              >
                {p.featured ? (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold-gradient px-4 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                    <Crown className="size-3.5" /> Most Popular
                  </span>
                ) : null}
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                <div className="mt-6 border-y border-white/8 py-6">
                  {p.price === null ? (
                    <p className="font-display text-3xl font-semibold text-gold">{CONTACT_FOR_PRICE}</p>
                  ) : (
                    <>
                      <p className="text-xs tracking-widest text-muted-foreground uppercase">Starting from</p>
                      <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
                        <span className="font-display text-4xl font-bold text-gold">{formatBDT(p.price)}</span>
                        <span className="text-sm text-muted-foreground">{p.unit}</span>
                      </p>
                    </>
                  )}
                </div>

                <ul className="mt-6 flex flex-col gap-3 text-sm">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="size-4 shrink-0 text-gold" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/fleet?rental=${encodeURIComponent(p.rentalType)}#results`}
                  className={buttonVariants({
                    variant: p.featured ? "gold" : "gold-outline",
                    size: "xl",
                    className: "mt-8 w-full",
                  })}
                >
                  Book Now
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Sample rates for demonstration. Fuel, tolls and parking are extra unless agreed otherwise.
        </p>
      </div>
    </section>
  )
}
