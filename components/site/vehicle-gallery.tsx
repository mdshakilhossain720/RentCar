"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import type { VehicleImage } from "@/lib/vehicles"

type GalleryProps = { images: VehicleImage[]; name: string }

export function VehicleGallery({ images, name }: GalleryProps) {
  // Pad single-photo vehicles with an interior shot so the gallery feels complete.
  const slides = React.useMemo<VehicleImage[]>(
    () =>
      images.length > 1
        ? images
        : [
            ...images,
            {
              src: "/images/site/interior.jpg",
              alt: "Driver at the wheel — representative interior photo",
              credit: "Representative photo · Unsplash",
            },
          ],
    [images]
  )
  const [active, setActive] = React.useState(0)
  const current = slides[active]
  const step = (dir: 1 | -1) => setActive((i) => (i + dir + slides.length) % slides.length)

  return (
    <div className="flex flex-col gap-3">
      <div
        className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-surface-2"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1)
          if (e.key === "ArrowLeft") step(-1)
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              preload={active === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 backdrop-blur transition hover:border-gold hover:text-gold sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 backdrop-blur transition hover:border-gold hover:text-gold sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}

        <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs backdrop-blur">
          {active + 1} / {slides.length}
        </span>
      </div>

      {current.credit ? (
        <p className="text-[0.7rem] text-muted-foreground">{current.credit}</p>
      ) : null}

      <div className="no-scrollbar flex gap-3 overflow-x-auto">
        {slides.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1} of ${name}`}
            aria-current={i === active}
            className={cn(
              "relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:w-32",
              i === active ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image src={img.src} alt="" fill sizes="128px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
