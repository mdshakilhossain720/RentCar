"use client"

import * as React from "react"
import Image from "next/image"
import { motion, type PanInfo } from "motion/react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { testimonials } from "@/lib/content"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

function subscribeResize(cb: () => void) {
  window.addEventListener("resize", cb)
  return () => window.removeEventListener("resize", cb)
}
const getPerView = () =>
  window.matchMedia("(min-width: 1024px)").matches
    ? 3
    : window.matchMedia("(min-width: 768px)").matches
      ? 2
      : 1

function usePerView() {
  return React.useSyncExternalStore(subscribeResize, getPerView, () => 1)
}

function Avatar({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <Image src={photo} alt={name} width={48} height={48} className="size-12 rounded-full object-cover" />
    )
  }
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(-2)
    .join("")
  return (
    <span
      aria-hidden
      className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 font-display text-sm font-bold text-gold"
    >
      {initials}
    </span>
  )
}

export function Testimonials() {
  const perView = usePerView()
  const maxIndex = Math.max(0, testimonials.length - perView)
  const [rawIndex, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const index = Math.min(rawIndex, maxIndex)

  const go = React.useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => {
        const next = Math.min(i, maxIndex) + dir
        return next > maxIndex ? 0 : next < 0 ? maxIndex : next
      }),
    [maxIndex]
  )

  React.useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => go(1), 6000)
    return () => window.clearInterval(id)
  }, [go, paused])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
  }

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[40rem] -translate-1/2 rounded-full bg-gold/5 blur-[140px]" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              What our <span className="text-gold-gradient">customers say</span>
            </>
          }
          description="Sample reviews shown for design purposes — real customer feedback will appear here."
        />

        <Reveal
          className="mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="-mx-3 overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
          >
            <motion.ul
              className="flex cursor-grab touch-pan-y active:cursor-grabbing"
              animate={{ x: `-${(index * 100) / perView}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={onDragEnd}
            >
              {testimonials.map((t, i) => (
                <li
                  key={t.name}
                  className="w-full shrink-0 px-3 md:w-1/2 lg:w-1/3"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${testimonials.length}`}
                  aria-hidden={i < index || i >= index + perView}
                >
                  <figure className="relative flex h-full flex-col rounded-2xl border border-white/8 bg-card p-7 select-none">
                    <Quote className="absolute top-6 right-6 size-10 text-gold/15" />
                    <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`} role="img">
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star
                          key={s}
                          className={cn("size-4", s < t.rating ? "fill-gold text-gold" : "text-white/20")}
                        />
                      ))}
                    </div>
                    <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-foreground/85">
                      “{t.review}”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                      <Avatar name={t.name} photo={t.photo} />
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
