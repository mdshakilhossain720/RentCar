"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Clock, MapPin, Menu, Phone, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { navLinks, site, telLink, whatsappLink } from "@/lib/site"
import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { WhatsAppIcon } from "@/components/site/brand-icons"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu on navigation (adjusting state during render).
  const [lastPath, setLastPath] = React.useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Lock body scroll and enable Escape-to-close while the menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname.startsWith(href)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled || open
          ? "border-white/8 bg-background/85 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div
        className={cn(
          "hidden overflow-hidden border-b border-white/8 bg-black/60 text-xs text-foreground/75 transition-[height] duration-300 md:block",
          scrolled || open ? "h-0 border-transparent" : "h-9"
        )}
      >
        <div className="container-x flex h-9 items-center justify-between gap-6">
          <p className="flex min-w-0 items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-gold" />
            <span className="truncate">{site.contact.addressEn}</span>
            <span className="hidden text-white/25 lg:inline">|</span>
            <span className="hidden truncate text-gold/90 lg:inline">{site.society}</span>
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <span className="flex items-center gap-2">
              <Clock className="size-3.5 text-gold" />
              Open 24 Hours / 7 Days
            </span>
            <a href={telLink} className="flex items-center gap-2 transition hover:text-gold">
              <Phone className="size-3.5 text-gold" />
              {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
      <div className="container-x flex h-20 items-center justify-between gap-4 lg:gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[0.92rem] text-foreground/85 transition-colors hover:text-gold",
                    "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100",
                    isActive(link.href) && "text-gold after:scale-x-100"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telLink}
            className="hidden items-center gap-2 text-sm text-foreground/85 transition hover:text-gold xl:flex"
          >
            <Phone className="size-4 text-gold" />
            {site.contact.phoneDisplay}
          </a>
          <a
            href={whatsappLink("আসসালামু আলাইকুম, আমি একটি গাড়ি ভাড়া নিতে চাই।")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid size-10 place-items-center rounded-lg border border-white/10 text-[#25D366] transition hover:border-[#25D366]/60 hover:bg-[#25D366]/10"
          >
            <WhatsAppIcon className="size-[18px]" />
          </a>
          <Link href="/fleet" className={buttonVariants({ variant: "gold", size: "lg", className: "h-10 rounded-lg px-5" })}>
            Book a Car
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telLink}
            aria-label="Call us"
            className="grid size-10 place-items-center rounded-lg border border-white/10 text-gold"
          >
            <Phone className="size-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-lg border border-white/10 transition hover:border-gold/60"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 5rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto border-t border-white/8 bg-background lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/6 py-4 font-display text-2xl transition hover:text-gold"
                  >
                    {link.label}
                    <span className="text-xs text-muted-foreground">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/fleet"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ variant: "gold", size: "xl" })}
                >
                  Book a Car
                </Link>
                <a
                  href={whatsappLink("Hello! I'd like to book a car.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "glass", size: "xl" })}
                >
                  <WhatsAppIcon className="size-5 text-[#25D366]" />
                  WhatsApp Us
                </a>
              </div>
              <a href={telLink} className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-4 text-gold" /> {site.contact.phoneDisplay}
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
