import { cn } from "@/lib/utils"
import { Reveal } from "@/components/site/reveal"

type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "left"
  className?: string
  as?: "h1" | "h2"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
        <span className="h-px w-8 bg-gold/60" aria-hidden />
        {eyebrow}
        {align === "center" ? (
          <span className="h-px w-8 bg-gold/60" aria-hidden />
        ) : null}
      </span>
      <Heading className="font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Heading>
      {description ? (
        <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
