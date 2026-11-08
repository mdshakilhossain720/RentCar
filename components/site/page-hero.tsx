import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

type Crumb = { label: string; href?: string }

export function PageHero({
  title,
  description,
  crumbs,
  image = "/images/site/garage.jpg",
}: {
  title: React.ReactNode
  description?: React.ReactNode
  crumbs: Crumb[]
  image?: string
}) {
  return (
    <section className="relative isolate overflow-hidden pt-20 md:pt-29">
      <Image src={image} alt="" fill preload sizes="100vw" className="-z-20 object-cover opacity-40" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/80 to-background" />
      <div className="container-x py-14 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 ? <ChevronRight className="size-3.5" aria-hidden /> : null}
                {c.href ? (
                  <Link href={c.href} className="transition hover:text-gold">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-foreground">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-5 font-display text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  )
}
