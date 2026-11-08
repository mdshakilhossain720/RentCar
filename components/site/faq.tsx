"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Phone, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { faqs } from "@/lib/content"
import { site, telLink } from "@/lib/site"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0)
  const baseId = React.useId()

  return (
    <section id="faq" className="relative bg-surface/50 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={
              <>
                Frequently asked <span className="text-gold-gradient">questions</span>
              </>
            }
            description="Everything you need to know before you book. Can't find your answer? We're available 24/7."
          />
          <Reveal className="rounded-2xl border border-gold/25 bg-gold/5 p-6">
            <p className="font-display text-lg">Still have questions?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Call us any time — day or night.
            </p>
            <a href={telLink} className={buttonVariants({ variant: "gold", size: "xl", className: "mt-5 w-full sm:w-auto" })}>
              <Phone /> {site.contact.phoneDisplay}
            </a>
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            const btnId = `${baseId}-q${i}`
            const panelId = `${baseId}-a${i}`
            return (
              <div
                key={f.q}
                className={cn(
                  "rounded-xl border transition-colors duration-300",
                  isOpen ? "border-gold/40 bg-card" : "border-white/8 bg-card/50 hover:border-white/20"
                )}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className={cn("font-medium transition-colors sm:text-lg", isOpen && "text-gold")}>
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        isOpen ? "rotate-45 border-gold bg-gold text-primary-foreground" : "border-white/15"
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:text-[0.95rem]">
                        {f.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
