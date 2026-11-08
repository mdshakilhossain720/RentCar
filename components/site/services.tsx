import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { services } from "@/lib/content"
import { buttonVariants } from "@/components/ui/button"
import { RevealGroup, RevealItem } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Rental Services"
          title={
            <>
              Rentals built around <span className="text-gold-gradient">your schedule</span>
            </>
          }
          description="Whether it's a single day in the city, a month of office transport, or a chauffeured trip across the country — choose the service that fits."
        />

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.id} className="h-full">
              <article
                id={s.id}
                className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-white/8 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/5"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <span className="absolute top-4 left-4 font-display text-5xl font-bold text-white/90 drop-shadow-lg">
                    {s.number}
                    <span className="text-gold">.</span>
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2.5 text-sm">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/fleet?rental=${encodeURIComponent(s.rentalType)}#results`}
                    className={buttonVariants({
                      variant: "gold-outline",
                      size: "xl",
                      className: "mt-auto w-full group-hover:bg-gold group-hover:text-primary-foreground",
                    })}
                  >
                    {s.cta}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
