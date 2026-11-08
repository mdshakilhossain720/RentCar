import Link from "next/link"
import { ArrowLeft, CarFront, Phone } from "lucide-react"

import { site, telLink } from "@/lib/site"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden pt-20">
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[36rem] -translate-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="container-x flex flex-col items-center py-24 text-center">
        <span className="grid size-20 place-items-center rounded-2xl border border-gold/30 bg-gold/5 text-gold">
          <CarFront className="size-9" strokeWidth={1.5} />
        </span>
        <p className="mt-8 font-display text-8xl font-bold text-gold-gradient sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Looks like you took a wrong turn</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on the road.
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/" className={buttonVariants({ variant: "gold", size: "xl" })}>
            <ArrowLeft /> Back to Home
          </Link>
          <Link href="/fleet" className={buttonVariants({ variant: "gold-outline", size: "xl" })}>
            Browse Our Fleet
          </Link>
        </div>
        <a href={telLink} className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
          <Phone className="size-4 text-gold" /> Need help? Call {site.contact.phoneDisplay}
        </a>
      </div>
    </section>
  )
}
