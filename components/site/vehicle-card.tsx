import Image from "next/image"
import Link from "next/link"
import { Cog, Fuel, Phone, Snowflake, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { bookingMessage, telLink, whatsappLink } from "@/lib/site"
import { type Vehicle } from "@/lib/vehicles"
import { buttonVariants } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/site/brand-icons"

export const availabilityTone: Record<Vehicle["availability"], string> = {
  Available: "border-success/50 bg-black/70 text-success",
  Limited: "border-gold/50 bg-black/70 text-gold",
  "On request": "border-white/25 bg-black/70 text-foreground/85",
}

type VehicleCardProps = {
  vehicle: Vehicle
  /** Query string (without "?") forwarded to the details page for prefill. */
  query?: string
  className?: string
}

export function VehicleCard({ vehicle: v, query, className }: VehicleCardProps) {
  const href = `/fleet/${v.slug}${query ? `?${query}` : ""}`
  const specs = [
    { icon: Users, label: `${v.passengers} Seats` },
    { icon: Cog, label: v.transmission },
    { icon: Fuel, label: v.fuel },
    { icon: Snowflake, label: v.ac ? "AC" : "Non-AC" },
  ]

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-2xl hover:shadow-black/50",
        className
      )}
    >
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-surface-2" tabIndex={-1} aria-hidden>
        <Image
          src={v.images[0].src}
          alt={v.images[0].alt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-black/20" />
        <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium backdrop-blur">
          {v.category}
        </span>
        <span
          className={cn(
            "absolute top-3 right-3 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium backdrop-blur",
            availabilityTone[v.availability]
          )}
        >
          {v.availability}
        </span>
        {v.popular ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-gold-gradient px-2.5 py-0.5 text-[0.7rem] font-semibold text-primary-foreground">
            Popular
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold">
              <Link href={href} className="transition hover:text-gold">
                {v.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {v.model} · {v.year}
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 text-sm text-foreground/80">
          {specs.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="size-4 shrink-0 text-gold" />
              <span className="truncate">{label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={telLink}
              aria-label={`Call to book ${v.name}`}
              className={buttonVariants({ variant: "gold", size: "lg", className: "h-10" })}
            >
              <Phone /> Call to Book
            </a>
            <a
              href={whatsappLink(bookingMessage(v.name))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book ${v.name} on WhatsApp`}
              className={buttonVariants({ variant: "glass", size: "lg", className: "h-10" })}
            >
              <WhatsAppIcon className="size-4 text-[#25D366]" /> WhatsApp
            </a>
          </div>
          <Link href={href} className="text-center text-sm text-muted-foreground transition hover:text-gold">
            View details →
          </Link>
        </div>
      </div>
    </article>
  )
}
