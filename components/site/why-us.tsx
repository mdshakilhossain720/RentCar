import Image from "next/image"

import { whyUs } from "@/lib/content"
import { RevealGroup, RevealItem } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

export function WhyUs() {
  return (
    <section id="why-us" className="relative isolate overflow-hidden py-24 sm:py-32">
      <Image
        src="/images/site/garage.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-25"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={
            <>
              The difference is in <span className="text-gold-gradient">every detail</span>
            </>
          }
          description="We combine a well-kept fleet, skilled drivers and round-the-clock support so you can simply sit back and enjoy the ride."
        />

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map(({ title, description, icon: Icon }, i) => (
            <RevealItem key={title} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-card/70 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-card">
                <span
                  aria-hidden
                  className="absolute -top-4 -right-1 font-display text-8xl font-bold text-white/[0.03] transition-colors duration-500 group-hover:text-gold/10"
                >
                  0{i + 1}
                </span>
                <span className="grid size-14 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-primary-foreground">
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-gradient transition-all duration-500 group-hover:w-full"
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
