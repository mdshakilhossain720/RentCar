"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, ArrowUpDown, CarFront, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { categories, categoryLabels, vehicles, type Category } from "@/lib/vehicles"
import { buttonVariants } from "@/components/ui/button"
import { Select, controlClass } from "@/components/ui/field"
import { VehicleCard } from "@/components/site/vehicle-card"

const sorts = {
  recommended: "Recommended",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "seats-desc": "Most Seats",
  newest: "Newest Models",
} as const
type SortKey = keyof typeof sorts

type FleetExplorerProps = {
  initialCategory?: string
  initialSearch?: string
  /** Show only the first N results plus a "view all" link. */
  limit?: number
  /** Query string forwarded to vehicle pages (search + rental prefill). */
  forwardQuery?: string
}

const isCategory = (v?: string): v is Category =>
  !!v && (categories as readonly string[]).includes(v)

export function FleetExplorer({
  initialCategory,
  initialSearch = "",
  limit,
  forwardQuery,
}: FleetExplorerProps) {
  const [category, setCategory] = React.useState<Category | "All">(
    isCategory(initialCategory) ? initialCategory : "All"
  )
  const [search, setSearch] = React.useState(initialSearch)
  const [sort, setSort] = React.useState<SortKey>("recommended")
  const deferredSearch = React.useDeferredValue(search)
  const isStale = deferredSearch !== search

  const results = React.useMemo(() => {
    const q = deferredSearch.trim().toLowerCase()
    const list = vehicles.filter((v) => {
      if (category !== "All" && v.category !== category) return false
      if (!q) return true
      return [v.name, v.model, v.category, v.fuel, v.transmission, String(v.year)]
        .join(" ")
        .toLowerCase()
        .includes(q)
    })
    const sorted = [...list]
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.dailyPrice - b.dailyPrice)
        break
      case "price-desc":
        sorted.sort((a, b) => b.dailyPrice - a.dailyPrice)
        break
      case "seats-desc":
        sorted.sort((a, b) => b.passengers - a.passengers)
        break
      case "newest":
        sorted.sort((a, b) => b.year - a.year)
        break
      default:
        sorted.sort((a, b) => Number(!!b.popular) - Number(!!a.popular))
    }
    return sorted
  }, [category, deferredSearch, sort])

  const visible = limit ? results.slice(0, limit) : results
  const counts = React.useMemo(() => {
    const map = new Map<string, number>([["All", vehicles.length]])
    for (const v of vehicles) map.set(v.category, (map.get(v.category) ?? 0) + 1)
    return map
  }, [])

  const reset = () => {
    setCategory("All")
    setSearch("")
    setSort("recommended")
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div
          role="tablist"
          aria-label="Vehicle categories"
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {(["All", ...categories] as const).map((c) => {
            const active = category === c
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c)}
                className={cn(
                  "relative shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors",
                  active
                    ? "border-gold text-primary-foreground"
                    : "border-white/10 text-foreground/80 hover:border-gold/50 hover:text-gold"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="fleet-chip"
                    className="absolute inset-0 -z-0 rounded-full bg-gold-gradient"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <span className="relative">
                  {c === "All" ? "All Vehicles" : categoryLabels[c]}
                  <span className={cn("ml-1.5 text-xs", active ? "opacity-70" : "text-muted-foreground")}>
                    {counts.get(c) ?? 0}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by model, year, fuel…"
              aria-label="Search vehicles"
              className={cn(controlClass, "pl-10")}
            />
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="size-4 shrink-0 text-gold" aria-hidden />
            <label htmlFor="fleet-sort" className="sr-only">
              Sort vehicles
            </label>
            <Select
              id="fleet-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="sm:w-56"
            >
              {Object.entries(sorts).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing <span className="text-foreground">{visible.length}</span> of{" "}
          {results.length} {results.length === 1 ? "vehicle" : "vehicles"}
          {category !== "All" ? ` in ${categoryLabels[category]}` : ""}
          {deferredSearch.trim() ? ` matching “${deferredSearch.trim()}”` : ""}
        </p>
      </div>

      {/* Results */}
      {results.length ? (
        <motion.ul
          layout
          className={cn(
            "grid gap-6 transition-opacity md:grid-cols-2 xl:grid-cols-3",
            isStale && "opacity-60"
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((v) => (
              <motion.li
                key={v.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <VehicleCard vehicle={v} query={forwardQuery} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-gold/10 text-gold">
            <CarFront className="size-6" />
          </span>
          <div>
            <p className="font-display text-xl">No vehicles match your search</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different category or keyword — or ask us on WhatsApp, we
              can often arrange other models.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className={buttonVariants({ variant: "gold-outline", size: "lg" })}
          >
            <X /> Clear filters
          </button>
        </div>
      )}

      {limit && results.length > limit ? (
        <div className="flex justify-center">
          <Link href="/fleet" className={buttonVariants({ variant: "gold-outline", size: "xl" })}>
            View all {results.length} vehicles
            <ArrowRight />
          </Link>
        </div>
      ) : null}
    </div>
  )
}
