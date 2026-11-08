import { FleetExplorer } from "@/components/site/fleet-explorer"
import { SectionHeading } from "@/components/site/section-heading"
import { Reveal } from "@/components/site/reveal"

export function FleetSection() {
  return (
    <section id="fleet" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Fleet"
          title={
            <>
              Choose from our <span className="text-gold-gradient">premium collection</span>
            </>
          }
          description="Economy cars to luxury SUVs, microbuses and Hiace vans — all air-conditioned, well-maintained and available with a professional driver."
        />
        <Reveal className="mt-14">
          <FleetExplorer limit={8} />
        </Reveal>
      </div>
    </section>
  )
}
