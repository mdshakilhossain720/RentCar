"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUp, Phone } from "lucide-react"

import { telLink, whatsappLink } from "@/lib/site"
import { WhatsAppIcon } from "@/components/site/brand-icons"

/** Floating WhatsApp + call buttons, plus back-to-top after scrolling. */
export function FloatingActions() {
  const [showTop, setShowTop] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-background/80 text-foreground backdrop-blur transition hover:border-gold hover:text-gold"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        ) : null}
      </AnimatePresence>
      <a
        href={telLink}
        aria-label="Call us"
        className="grid size-12 place-items-center rounded-full bg-gold-gradient text-primary-foreground shadow-lg shadow-black/40 transition hover:scale-105 sm:hidden"
      >
        <Phone className="size-5" />
      </a>
      <a
        href={whatsappLink("আসসালামু আলাইকুম, আমি একটি গাড়ি ভাড়া নিতে চাই।")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition hover:scale-105"
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
        <WhatsAppIcon className="relative size-7" />
        <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-background/95 px-3 py-1.5 text-sm whitespace-nowrap opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  )
}
