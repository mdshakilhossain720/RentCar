import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { aboutHighlights } from "@/lib/content"
import { categories, vehicles } from "@/lib/vehicles"
import { buttonVariants } from "@/components/ui/button"
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal"

const stats = [
  { value: `${vehicles.length}`, label: "Models in fleet" },
  { value: `${categories.length}`, label: "Vehicle categories" },
  { value: "24/7", label: "Customer support" },
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-surface/50 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute -right-40 bottom-0 size-[32rem] rounded-full bg-gold/8 blur-[120px]"
      />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-last lg:order-first">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/site/about.jpg"
              alt="Black luxury sedan driving on a highway"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-background/90 p-4 shadow-2xl backdrop-blur-xl sm:left-8 sm:right-auto sm:p-5">
            {stats.map((s) => (
              <div key={s.label} className="px-3 text-center sm:px-6">
                <p className="font-display text-2xl font-bold text-gold sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-[0.7rem] leading-tight text-muted-foreground sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="absolute -top-4 -left-4 -z-10 size-32 rounded-3xl border border-gold/30"
          />
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-5">
            <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
              <span className="h-px w-8 bg-gold/60" aria-hidden />
              About Us
            </span>
            <h2 className="font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-[2.75rem]">
              Your Trusted Partner for <span className="text-gold-gradient">Every Journey.</span>
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              We provide reliable, comfortable, and affordable car rental services
              designed to make every journey convenient. From daily city travel to
              monthly corporate transportation, our goal is to deliver safe
              vehicles, professional service, and a hassle-free booking experience.
            </p>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {aboutHighlights.map(({ title, description, icon: Icon }) => (
              <RevealItem
                key={title}
                className="flex items-start gap-4 rounded-xl border border-white/8 bg-card/60 p-4 transition hover:border-gold/30"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <Link href="/fleet" className={buttonVariants({ variant: "gold", size: "xl" })}>
              Browse the Fleet
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
