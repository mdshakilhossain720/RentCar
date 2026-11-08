/**
 * Vehicle catalogue.
 *
 * DEMO DATA — models, years and rates are illustrative placeholders based on
 * typical Dhaka rental listings. They are NOT live availability or quotes.
 * Replace with the company's real fleet before launch. Prices are in BDT;
 * a null price is shown as "Contact for Price".
 */

export const categories = [
  "Economy",
  "Sedan",
  "Premium Sedan",
  "SUV",
  "Luxury",
  "Microbus",
  "Hiace",
] as const

export type Category = (typeof categories)[number]

export const categoryLabels: Record<Category, string> = {
  Economy: "Economy Cars",
  Sedan: "Sedan Cars",
  "Premium Sedan": "Premium Sedan",
  SUV: "SUV",
  Luxury: "Luxury Cars",
  Microbus: "Microbus",
  Hiace: "Hiace",
}

export type VehicleImage = {
  src: string
  alt: string
  /** Attribution line for licensed photos (shown in the gallery). */
  credit?: string
}

export type Vehicle = {
  slug: string
  name: string
  model: string
  year: number
  category: Category
  passengers: number
  luggage: number
  transmission: "Automatic" | "Manual"
  fuel: "Octane" | "Hybrid" | "Diesel" | "Octane / CNG"
  ac: boolean
  dailyPrice: number | null
  monthlyPrice: number | null
  images: VehicleImage[]
  summary: string
  features: string[]
  idealFor: string[]
  /** Demo availability note — not live data. */
  availability: "Available" | "Limited" | "On request"
  popular?: boolean
}

const commons = (author: string, license: string) =>
  `Photo: ${author} / Wikimedia Commons, ${license}`

export const vehicles: Vehicle[] = [
  {
    slug: "toyota-corolla-axio",
    name: "Toyota Corolla Axio",
    model: "Axio X (E160)",
    year: 2018,
    category: "Economy",
    passengers: 4,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Octane / CNG",
    ac: true,
    dailyPrice: 3500,
    monthlyPrice: 75000,
    images: [
      {
        src: "/images/fleet/axio-1.jpg",
        alt: "White Toyota Corolla Axio sedan, front three-quarter view",
        credit: commons("Tokumeigakarinoaoshima", "CC0"),
      },
      {
        src: "/images/fleet/axio-2.jpg",
        alt: "Silver Toyota Corolla Axio parked on a street",
        credit: commons("Corsadent56709", "CC BY-SA 4.0"),
      },
    ],
    summary:
      "A fuel-efficient, easy-to-park compact sedan — the smart choice for everyday city errands and office commutes.",
    features: [
      "Dual airbags",
      "Bluetooth audio",
      "Rear parking camera",
      "Fuel-efficient engine",
    ],
    idealFor: ["City travel", "Office commute", "Solo & couples"],
    availability: "Available",
  },
  {
    slug: "toyota-allion",
    name: "Toyota Allion",
    model: "Allion A15 (E210)",
    year: 2021,
    category: "Sedan",
    passengers: 4,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Octane",
    ac: true,
    dailyPrice: 4000,
    monthlyPrice: 85000,
    images: [
      {
        src: "/images/fleet/allion-1.jpg",
        alt: "White Toyota Allion sedan, front view",
        credit: commons("Quzhouliulian", "CC BY-SA 4.0"),
      },
      {
        src: "/images/fleet/allion-2.jpg",
        alt: "White Toyota Allion sedan, rear three-quarter view",
        credit: commons("Quzhouliulian", "CC BY-SA 4.0"),
      },
    ],
    summary:
      "Comfortable mid-size sedan with a quiet cabin and generous boot — ideal for family trips and airport runs.",
    features: [
      "Spacious rear seats",
      "Touchscreen infotainment",
      "Reverse camera",
      "Cruise control",
    ],
    idealFor: ["Family trips", "Airport transfer", "Business meetings"],
    availability: "Available",
    popular: true,
  },
  {
    slug: "toyota-premio",
    name: "Toyota Premio",
    model: "Premio F-EX (T260)",
    year: 2019,
    category: "Sedan",
    passengers: 4,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Octane",
    ac: true,
    dailyPrice: 4500,
    monthlyPrice: 95000,
    images: [
      {
        src: "/images/fleet/premio-1.jpg",
        alt: "Black Toyota Premio sedan, front three-quarter view",
        credit: commons("CEFICEFI", "CC BY-SA 4.0"),
      },
    ],
    summary:
      "Dhaka's favourite executive sedan — refined, reliable and well-suited to corporate and intercity travel.",
    features: [
      "Leather-finish seats",
      "Climate control",
      "Push-start ignition",
      "Rear AC vents",
    ],
    idealFor: ["Corporate use", "Intercity travel", "Family trips"],
    availability: "Available",
    popular: true,
  },
  {
    slug: "toyota-camry-hybrid",
    name: "Toyota Camry Hybrid",
    model: "Camry 2.5 Hybrid",
    year: 2020,
    category: "Premium Sedan",
    passengers: 4,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Hybrid",
    ac: true,
    dailyPrice: 7500,
    monthlyPrice: 160000,
    images: [
      {
        src: "/images/fleet/camry-1.jpg",
        alt: "Dark grey Toyota Camry sedan on a wet road",
        credit: "Photo: Unsplash",
      },
    ],
    summary:
      "A smooth, whisper-quiet hybrid sedan with premium comfort for executives and special occasions.",
    features: [
      "Hybrid drivetrain",
      "Premium sound system",
      "Dual-zone climate control",
      "Wireless charging",
    ],
    idealFor: ["Executive travel", "Airport VIP pickup", "Events"],
    availability: "Limited",
  },
  {
    slug: "mercedes-benz-c-class",
    name: "Mercedes-Benz C-Class",
    model: "C 200",
    year: 2019,
    category: "Premium Sedan",
    passengers: 4,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Octane",
    ac: true,
    dailyPrice: 12000,
    monthlyPrice: 260000,
    images: [
      {
        src: "/images/fleet/cclass-1.jpg",
        alt: "White Mercedes-Benz sedan in a dramatically lit garage",
        credit: "Photo: Unsplash",
      },
    ],
    summary:
      "German engineering and an elegant cabin — make a polished impression at meetings, weddings and events.",
    features: [
      "Leather interior",
      "Ambient lighting",
      "Premium audio",
      "Advanced safety assist",
    ],
    idealFor: ["Weddings", "VIP guests", "Business events"],
    availability: "Limited",
  },
  {
    slug: "honda-cr-v",
    name: "Honda CR-V",
    model: "CR-V EX",
    year: 2019,
    category: "SUV",
    passengers: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Octane",
    ac: true,
    dailyPrice: 8000,
    monthlyPrice: 170000,
    images: [
      {
        src: "/images/fleet/crv-1.jpg",
        alt: "White Honda CR-V SUV on a wet road with mountains behind",
        credit: "Photo: Unsplash",
      },
    ],
    summary:
      "A practical, high-riding crossover with plenty of space for family holidays and longer road trips.",
    features: [
      "High ground clearance",
      "Large boot space",
      "Rear AC vents",
      "Apple CarPlay & Android Auto",
    ],
    idealFor: ["Family holidays", "Outside Dhaka", "Group travel"],
    availability: "Available",
  },
  {
    slug: "toyota-land-cruiser-prado",
    name: "Toyota Land Cruiser Prado",
    model: "Prado TX-L (J150)",
    year: 2018,
    category: "SUV",
    passengers: 7,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    dailyPrice: 12000,
    monthlyPrice: 250000,
    images: [
      {
        src: "/images/fleet/prado-1.jpg",
        alt: "Silver Toyota Land Cruiser Prado SUV, front three-quarter view",
        credit: commons("EurovisionNim", "CC BY-SA 4.0"),
      },
      {
        src: "/images/fleet/prado-2.jpg",
        alt: "Silver Toyota Land Cruiser Prado SUV, rear view with spare wheel",
        credit: commons("EurovisionNim", "CC BY-SA 4.0"),
      },
    ],
    summary:
      "Rugged, commanding and comfortable — the go-to 4x4 for hill tracts, highways and VIP movement.",
    features: [
      "4WD capability",
      "Seven seats",
      "Leather interior",
      "Rear entertainment-ready",
    ],
    idealFor: ["Sylhet & Cox's Bazar trips", "VIP movement", "Rough roads"],
    availability: "Available",
    popular: true,
  },
  {
    slug: "bmw-5-series",
    name: "BMW 5 Series",
    model: "530e M Sport",
    year: 2020,
    category: "Luxury",
    passengers: 4,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Hybrid",
    ac: true,
    dailyPrice: 18000,
    monthlyPrice: null,
    images: [
      {
        src: "/images/fleet/bmw5-1.jpg",
        alt: "Light blue BMW 5 Series sedan driving on a palm-lined road",
        credit: "Photo: Unsplash",
      },
    ],
    summary:
      "A sporting luxury saloon that pairs effortless performance with first-class comfort.",
    features: [
      "M Sport package",
      "Harman Kardon audio",
      "Heated leather seats",
      "Head-up display",
    ],
    idealFor: ["Weddings", "Executive travel", "Photo shoots"],
    availability: "On request",
  },
  {
    slug: "range-rover-sport",
    name: "Range Rover Sport",
    model: "HSE",
    year: 2018,
    category: "Luxury",
    passengers: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    dailyPrice: null,
    monthlyPrice: null,
    images: [
      {
        src: "/images/fleet/rangerover-1.jpg",
        alt: "Black Range Rover Sport parked in front of a dark garage door",
        credit: "Photo: Unsplash",
      },
    ],
    summary:
      "The ultimate statement of presence — luxury SUV comfort for VIP guests, weddings and premium events.",
    features: [
      "Panoramic roof",
      "Meridian audio",
      "Air suspension",
      "Four-zone climate",
    ],
    idealFor: ["Weddings", "VIP protocol", "Premium events"],
    availability: "On request",
  },
  {
    slug: "toyota-noah",
    name: "Toyota Noah",
    model: "Noah Si (R80)",
    year: 2018,
    category: "Microbus",
    passengers: 7,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Octane",
    ac: true,
    dailyPrice: 5500,
    monthlyPrice: 120000,
    images: [
      {
        src: "/images/fleet/noah-1.jpg",
        alt: "Dark purple Toyota Noah microbus, front three-quarter view",
        credit: commons("User3204", "CC BY 4.0"),
      },
      {
        src: "/images/fleet/noah-2.jpg",
        alt: "Silver Toyota Noah microbus parked in a car park",
        credit: commons("User3204", "CC BY-SA 4.0"),
      },
    ],
    summary:
      "A roomy seven-seater with sliding doors — perfect for families, small groups and airport pickups with luggage.",
    features: [
      "Sliding doors",
      "Seven comfortable seats",
      "Rear AC",
      "Flexible luggage space",
    ],
    idealFor: ["Family groups", "Airport transfer", "Day trips"],
    availability: "Available",
    popular: true,
  },
  {
    slug: "toyota-hiace-commuter",
    name: "Toyota HiAce Commuter",
    model: "HiAce Commuter (H300)",
    year: 2019,
    category: "Hiace",
    passengers: 12,
    luggage: 8,
    transmission: "Manual",
    fuel: "Diesel",
    ac: true,
    dailyPrice: 7000,
    monthlyPrice: 150000,
    images: [
      {
        src: "/images/fleet/hiace-1.jpg",
        alt: "White Toyota HiAce Commuter van parked indoors",
        credit: commons("Lawrence Ruiz", "CC BY-SA 4.0"),
      },
      {
        src: "/images/fleet/hiace-2.jpg",
        alt: "Toyota HiAce passenger van on a road",
        credit: "Photo: Bull-Doser / Wikimedia Commons, Public domain",
      },
    ],
    summary:
      "High-capacity, air-conditioned van for corporate shuttles, tours and large group travel across Bangladesh.",
    features: [
      "Up to 12 passengers",
      "Powerful rear AC",
      "Large luggage capacity",
      "Ideal for tours",
    ],
    idealFor: ["Corporate shuttle", "Group tours", "Wedding guests"],
    availability: "Available",
  },
]

export const rentalTerms = [
  "Rates shown are demo rates and are confirmed at the time of booking.",
  "Daily rent covers up to 10 hours / 100 km within Dhaka city; extra hours and kilometres are charged separately.",
  "Fuel, tolls, parking and ferry charges are paid by the customer unless agreed otherwise.",
  "Trips outside Dhaka include the driver's food and overnight accommodation allowance.",
  "A valid NID or passport is required for every booking; self-drive requires a valid driving licence and security deposit.",
  "Free cancellation up to 24 hours before pickup. Later cancellations may incur a charge.",
]

export function getVehicle(slug: string) {
  return vehicles.find((v) => v.slug === slug)
}

export function getRelatedVehicles(vehicle: Vehicle, count = 3) {
  const sameCategory = vehicles.filter(
    (v) => v.slug !== vehicle.slug && v.category === vehicle.category
  )
  const others = vehicles.filter(
    (v) => v.slug !== vehicle.slug && v.category !== vehicle.category
  )
  return [...sameCategory, ...others].slice(0, count)
}

/** Lowest listed daily/monthly rate across the fleet (null prices ignored). */
export function startingPrice(
  kind: "dailyPrice" | "monthlyPrice",
  filter?: (v: Vehicle) => boolean
) {
  const list = (filter ? vehicles.filter(filter) : vehicles)
    .map((v) => v[kind])
    .filter((p): p is number => p !== null)
  return list.length ? Math.min(...list) : null
}

export const CONTACT_FOR_PRICE = "Contact for Price"

const bdt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })

export function formatBDT(amount: number) {
  return `৳${bdt.format(amount)}`
}

export function formatPrice(amount: number | null) {
  return amount === null ? CONTACT_FOR_PRICE : formatBDT(amount)
}
