import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { mailLink, site, telLink, whatsappLink } from "@/lib/site"
import { Logo } from "@/components/site/logo"
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/site/brand-icons"

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
]

const serviceLinks = [
  { label: "Daily Rent", href: "/#daily-rent" },
  { label: "Monthly Rent", href: "/#monthly-rent" },
  { label: "Driver Support", href: "/#driver-support" },
  { label: "Airport Transfer", href: "/#pricing" },
]

const socials = [
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: site.social.youtube, Icon: YouTubeIcon },
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
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Reliable, comfortable and affordable car rental across Dhaka and
            Bangladesh — daily, monthly and with professional drivers.
          </p>
          <ul className="flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-lg border border-white/10 text-muted-foreground transition hover:border-gold/60 hover:text-gold"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
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
              <a href={mailLink()} className="flex items-start gap-3 break-all transition hover:text-gold">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              {site.contact.address}
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:text-gold"
              >
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-[#25D366]" />
                WhatsApp: {site.contact.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          {site.isDemo ? (
            <p className="text-center">
              Demo website — contact details, prices and reviews are placeholders.
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
