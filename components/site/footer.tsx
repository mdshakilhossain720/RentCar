import Link from "next/link"
import { Clock, MapPin, Phone, Store } from "lucide-react"

import { mapLink, site, telLink, whatsappLink } from "@/lib/site"
import { Logo } from "@/components/site/logo"
import { WhatsAppIcon } from "@/components/site/brand-icons"

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact", href: "/#contact" },
]

const serviceLinks = [
  { label: "Daily Rent", href: "/#daily-rent" },
  { label: "Monthly Rent", href: "/#monthly-rent" },
  { label: "Driver Support", href: "/#driver-support" },
  { label: "Airport Transfer", href: "/#services" },
  { label: "Outside Dhaka Trips", href: "/#services" },
]

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 text-sm font-semibold tracking-[0.2em] text-foreground uppercase">
      {children}
    </h3>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/8 bg-black/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] lg:gap-10">
        <div className="flex flex-col gap-5">
          <Logo size="lg" />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Reliable, comfortable and affordable car rental from Uttara — daily,
            monthly and with professional drivers, available 24 hours a day, 7
            days a week.
          </p>
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5 text-xs text-gold">
            <Store className="size-3.5" />
            {site.society}
          </p>
        </div>

        <nav aria-label="Quick links">
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="flex flex-col gap-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-muted-foreground transition hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our services">
          <FooterHeading>Our Services</FooterHeading>
          <ul className="flex flex-col gap-3 text-sm">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-muted-foreground transition hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Contact</FooterHeading>
          <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
            <li>
              <a href={telLink} className="flex items-start gap-3 transition hover:text-gold">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:text-gold"
              >
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-[#25D366]" />
                WhatsApp: {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 font-bangla leading-relaxed transition hover:text-gold"
              >
                <MapPin className="mt-1 size-4 shrink-0 text-gold" />
                {site.contact.address}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                <span className="font-bangla">{site.availability}</span> — Open 24/7
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {year} <span className="font-bangla">{site.name}</span> ({site.nameEn}). All rights reserved.
          </p>
          <p>Vehicle details and reviews shown are sample data.</p>
        </div>
      </div>
    </footer>
  )
}
