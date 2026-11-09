import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

export function Logo({
  className,
  size = "md",
}: {
  className?: string
  size?: "md" | "lg"
}) {
  const px = size === "lg" ? 64 : 52
  return (
    <Link
      href="/"
      aria-label={`${site.nameEn} — home`}
      className={cn("group flex min-w-0 items-center gap-3", className)}
    >
      <Image
        src={site.logo}
        alt={`${site.nameEn} logo`}
        width={px}
        height={px}
        className="shrink-0 rounded-full drop-shadow-[0_0_14px_rgba(226,185,85,0.25)] transition-transform duration-500 group-hover:rotate-[8deg]"
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-display text-[1.05rem] font-bold sm:text-lg">
          Rent a Car <span className="text-gold">Motor Society</span>
        </span>
        <span className="truncate text-[0.7rem] text-muted-foreground sm:text-xs">
          Uttara · <span className="font-bangla">{site.availability}</span>
        </span>
      </span>
    </Link>
  )
}
