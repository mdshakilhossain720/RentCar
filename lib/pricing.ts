import { startingPrice, vehicles, type Vehicle } from "@/lib/vehicles"

/**
 * Package pricing rules (DEMO). Every package price is derived from the
 * vehicle catalogue so nothing is hard-coded — change a vehicle's daily or
 * monthly rate and every package updates automatically.
 */
export const pricingRules = {
  /** Weekly price = 7 × daily rate, less this discount. */
  weeklyDiscount: 0.1,
  /** One-way airport transfer = this share of the daily rate. */
  airportTransferShare: 0.5,
  /** Outside-Dhaka day rate = daily rate × this multiplier. */
  outsideDhakaMultiplier: 1.25,
} as const

const roundTo = (value: number, step = 100) => Math.round(value / step) * step

export const weeklyPrice = (v: Pick<Vehicle, "dailyPrice">) =>
  roundTo(v.dailyPrice * 7 * (1 - pricingRules.weeklyDiscount))

export const airportTransferPrice = (v: Pick<Vehicle, "dailyPrice">) =>
  roundTo(v.dailyPrice * pricingRules.airportTransferShare)

export const outsideDhakaPrice = (v: Pick<Vehicle, "dailyPrice">) =>
  roundTo(v.dailyPrice * pricingRules.outsideDhakaMultiplier)

const minOf = (fn: (v: Vehicle) => number) =>
  Math.min(...vehicles.map(fn))

export type RentalPackage = {
  id: string
  name: string
  price: number | null
  unit: string
  description: string
  includes: string[]
  rentalType: string
  featured?: boolean
}

export function getRentalPackages(): RentalPackage[] {
  return [
    {
      id: "daily",
      name: "Daily Rental",
      price: startingPrice("dailyPrice"),
      unit: "/ day",
      description: "City travel, meetings and errands — book by the day.",
      includes: [
        "Up to 10 hours within Dhaka",
        "Professional driver",
        "Economy to luxury cars",
      ],
      rentalType: "Daily",
    },
    {
      id: "weekly",
      name: "Weekly Rental",
      price: minOf(weeklyPrice),
      unit: "/ week",
      description: `Seven days of flexibility with ${pricingRules.weeklyDiscount * 100}% off the daily rate.`,
      includes: [
        `${pricingRules.weeklyDiscount * 100}% weekly saving`,
        "Same car all week",
        "Free schedule changes",
      ],
      rentalType: "Weekly",
    },
    {
      id: "monthly",
      name: "Monthly Rental",
      price: startingPrice("monthlyPrice"),
      unit: "/ month",
      description: "Long-term transport for offices, projects and families.",
      includes: [
        "Dedicated vehicle & driver",
        "Maintenance included",
        "Replacement car support",
      ],
      rentalType: "Monthly",
      featured: true,
    },
    {
      id: "airport",
      name: "Airport Transfer",
      price: minOf(airportTransferPrice),
      unit: "/ trip",
      description: "On-time pickup and drop-off at Hazrat Shahjalal Airport.",
      includes: [
        "Flight tracking",
        "Meet & greet at arrivals",
        "Luggage assistance",
      ],
      rentalType: "Airport Transfer",
    },
    {
      id: "corporate",
      name: "Corporate Rental",
      price: null,
      unit: "",
      description: "Fleet solutions with monthly billing for companies and NGOs.",
      includes: [
        "Multiple vehicles & drivers",
        "Monthly invoicing",
        "Dedicated account manager",
      ],
      rentalType: "Corporate",
    },
    {
      id: "outside-dhaka",
      name: "Outside Dhaka Trip",
      price: minOf(outsideDhakaPrice),
      unit: "/ day",
      description: "Intercity trips to Sylhet, Cox's Bazar, Chattogram and more.",
      includes: [
        "Experienced highway drivers",
        "Driver allowance included",
        "Round-trip & multi-day plans",
      ],
      rentalType: "Outside Dhaka",
    },
  ]
}
