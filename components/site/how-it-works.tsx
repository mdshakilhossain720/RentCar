import { steps } from "@/lib/content"
import { RevealGroup, RevealItem } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              Book your ride in <span className="text-gold-gradient">four simple steps</span>
            </>
          }
          description="From choosing a car to hitting the road — the whole process takes just a few minutes."
        />

        <RevealGroup className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.12}>
          {/* Connector line on large screens */}
          <div
            aria-hidden
            className="absolute top-10 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 lg:block"
          />
          {steps.map(({ number, title, description, icon: Icon }) => (
            <RevealItem key={number} className="group relative flex flex-col items-center text-center">
              <div className="relative z-10 grid size-20 place-items-center rounded-2xl border border-gold/30 bg-background shadow-[0_0_40px_-10px] shadow-gold/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold group-hover:bg-gold/10">
                <Icon className="size-8 text-gold" strokeWidth={1.5} />
                <span className="absolute -top-2.5 -right-2.5 grid size-8 place-items-center rounded-full bg-gold-gradient text-xs font-bold text-primary-foreground">
                  {number}
                </span>
              </div>
              <h3 className="mt-7 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
