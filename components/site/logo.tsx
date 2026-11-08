import Link from "next/link"
import { CarFront } from "lucide-react"

import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("group flex items-center gap-3", className)}
    >
      <span className="grid size-11 place-items-center rounded-xl border border-gold/40 bg-black shadow-[inset_0_0_20px] shadow-gold/10 transition group-hover:border-gold">
        <CarFront className="size-5 text-gold" strokeWidth={1.75} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-[0.18em] whitespace-nowrap">
          RENT <span className="text-gold">A</span> CAR
        </span>
        <span className="mt-1 text-[0.6rem] tracking-[0.32em] text-muted-foreground uppercase">
          Dhaka · Bangladesh
        </span>
      </span>
    </Link>
  )
}
