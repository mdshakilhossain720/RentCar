/**
 * Business details.
 *
 * DEMO DATA — every contact value below is a placeholder. Replace them with
 * the company's real phone, WhatsApp, email and address before going live.
 * They are kept in one place so a single edit updates the whole site.
 */
export const site = {
  name: "RENT A CAR",
  shortName: "Rent A Car",
  tagline: "Premium car rental in Dhaka",
  description:
    "Reliable, comfortable and affordable car rental in Dhaka. Daily and monthly rentals, professional drivers, airport transfers and trips outside Dhaka.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  isDemo: true,
  contact: {
    // Placeholder numbers in E.164 (for links) and display form.
    phone: "+8801000000000",
    phoneDisplay: "+880 1000-000000",
    whatsapp: "8801000000000",
    whatsappDisplay: "+880 1000-000000",
    email: "booking@example.com",
    address: "House 00, Road 00, Gulshan, Dhaka 1212 (demo address)",
    mapQuery: "Gulshan, Dhaka, Bangladesh",
    hours: [
      { days: "Saturday – Thursday", time: "8:00 AM – 10:00 PM" },
      { days: "Friday", time: "2:00 PM – 10:00 PM" },
      { days: "Phone & WhatsApp support", time: "24/7" },
    ],
  },
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
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
  "Gulshan",
  "Banani",
  "Dhanmondi",
  "Uttara",
  "Mirpur",
  "Motijheel",
  "Bashundhara R/A",
  "Hazrat Shahjalal Int'l Airport",
] as const

/** Builds a wa.me deep link with a pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const telLink = `tel:${site.contact.phone}`
export const mailLink = (subject?: string) =>
  `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`
