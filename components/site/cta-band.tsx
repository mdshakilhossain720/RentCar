import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"

import { site, telLink } from "@/lib/site"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/site/reveal"

export function CtaBand() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-3xl border border-gold/25">
          <Image
            src="/images/site/amg.jpg"
            alt=""
            fill
            sizes="(min-width: 1400px) 1400px, 100vw"
            className="-z-20 object-cover object-[center_60%]"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/80 to-black/30" />
          <div className="flex flex-col items-start gap-6 px-6 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="font-bangla text-sm text-gold">{site.availability} সার্ভিস</p>
              <h2 className="mt-2 font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                Need a car right now? We&apos;re open around the clock.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Call us any time, day or night — we&apos;ll have the right car and driver ready.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={telLink} className={buttonVariants({ variant: "gold", size: "xl", className: "w-full sm:w-auto" })}>
                <Phone /> {site.contact.phoneDisplay}
              </a>
              <Link href="/fleet" className={buttonVariants({ variant: "glass", size: "xl", className: "w-full sm:w-auto" })}>
                Browse Fleet
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
