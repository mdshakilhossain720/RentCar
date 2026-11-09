/**
 * Business details — single source of truth for the header, contact
 * section and footer.
 */
export const site = {
  name: "রেন্ট এ কার মোটর সোসাইটি, উত্তরা",
  nameEn: "Rent a Car Motor Society Uttara",
  availability: "২৪ ঘন্টা / ৭ দিন",
  availabilityEn: "24 Hours / 7 Days",
  society: "Rent a Car Motor Society Uttara",
  description:
    "Rent a Car Motor Society Uttara — reliable, comfortable and affordable car rental in Uttara, Dhaka. Daily and monthly rentals, professional drivers, airport transfers and trips outside Dhaka, 24 hours a day, 7 days a week.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: "/images/brand/logo.png",
  contact: {
    phone: "+8801919034366",
    phoneDisplay: "01919034366",
    // WhatsApp uses the same business number.
    whatsapp: "8801919034366",
    address:
      "হাউজ - ৮১, রোড গাউছুল আজম এভিনিউ, সেক্টর - ১৪, উত্তরা, ঢাকা - ১২৩০",
    addressEn:
      "House 81, Road Gausul Azam Avenue, Sector 14, Uttara, Dhaka 1230",
    // Used for the embedded Google Map and the "Open in Google Maps" link.
    mapQuery: "House 81, Gausul Azam Avenue, Sector 14, Uttara, Dhaka 1230, Bangladesh",
    hours: "২৪ ঘন্টা / ৭ দিন খোলা — Open 24 hours, 7 days a week",
  },
} as const

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Rental Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact Us", href: "/#contact" },
] as const

export const pickupLocations = [
  "Uttara",
  "Airport (Hazrat Shahjalal)",
  "Gulshan",
  "Banani",
  "Baridhara",
  "Bashundhara R/A",
  "Mirpur",
  "Dhanmondi",
  "Motijheel",
] as const

/** wa.me deep link, optionally with a pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Pre-filled WhatsApp booking message for a vehicle, with optional trip details. */
export function bookingMessage(vehicleName: string, details: string[] = []) {
  return [
    `আসসালামু আলাইকুম! I'd like to book the ${vehicleName}.`,
    ...details,
    "Please confirm availability and price.",
  ].join("\n")
}

export const telLink = `tel:${site.contact.phone}`

export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&z=15&output=embed`
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapQuery)}`
