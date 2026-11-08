import {
  Award,
  BadgeCheck,
  CalendarCheck,
  CarFront,
  ClipboardCheck,
  Headset,
  KeyRound,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export type Service = {
  id: string
  number: string
  title: string
  description: string
  features: string[]
  cta: string
  rentalType: string
  image: string
  imageAlt: string
}

export const services: Service[] = [
  {
    id: "daily-rent",
    number: "01",
    title: "Daily Rent",
    description:
      "Flexible daily vehicle rental services for city travel, airport pickup, business meetings, and family trips.",
    features: [
      "Flexible daily booking",
      "Economy to luxury vehicles",
      "Airport pickup and drop-off",
      "Short-term rental options",
    ],
    cta: "Book Daily Rent",
    rentalType: "Daily",
    image: "/images/site/road.jpg",
    imageAlt: "Sports car driving along an open road at sunset",
  },
  {
    id: "monthly-rent",
    number: "02",
    title: "Monthly Rent",
    description:
      "Affordable long-term vehicle rental solutions for offices, corporate projects, businesses, and regular transportation requirements.",
    features: [
      "Monthly rental packages",
      "Corporate rental solutions",
      "Flexible rental agreements",
      "Special long-term pricing",
    ],
    cta: "Explore Monthly Plans",
    rentalType: "Monthly",
    image: "/images/fleet/camry-1.jpg",
    imageAlt: "Dark executive sedan parked on a wet road",
  },
  {
    id: "driver-support",
    number: "03",
    title: "Driver Support",
    description:
      "Reliable and professional local drivers with trip planning support for Dhaka and routes outside Dhaka.",
    features: [
      "Experienced local drivers",
      "Dhaka city travel",
      "Intercity transportation",
      "Airport transfer service",
    ],
    cta: "Book With Driver",
    rentalType: "With Driver",
    image: "/images/site/interior.jpg",
    imageAlt: "Driver's hands on the steering wheel during a city drive",
  },
]

export type Step = { number: string; title: string; description: string; icon: LucideIcon }

export const steps: Step[] = [
  {
    number: "01",
    title: "Choose Your Car",
    description: "Explore our vehicle collection and select your preferred car.",
    icon: MousePointerClick,
  },
  {
    number: "02",
    title: "Select Your Schedule",
    description: "Choose your pickup location, rental date, and return date.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Confirm Your Booking",
    description: "Submit your booking information and receive confirmation.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Enjoy Your Journey",
    description: "Get your vehicle and enjoy a comfortable journey.",
    icon: KeyRound,
  },
]

export type Feature = { title: string; description: string; icon: LucideIcon }

export const whyUs: Feature[] = [
  {
    title: "Wide Range of Vehicles",
    description:
      "From fuel-efficient compacts to luxury SUVs, microbuses and Hiace vans — one call covers every trip.",
    icon: CarFront,
  },
  {
    title: "Affordable Pricing",
    description:
      "Transparent daily, weekly and monthly rates with no hidden charges. You approve the quote before you ride.",
    icon: Wallet,
  },
  {
    title: "Professional Drivers",
    description:
      "Verified, courteous drivers who know Dhaka's roads and the country's highways inside out.",
    icon: UserRound,
  },
  {
    title: "Clean and Maintained Cars",
    description:
      "Every vehicle is serviced on schedule and cleaned inside and out before each trip.",
    icon: Sparkles,
  },
  {
    title: "Easy Online Booking",
    description:
      "Reserve in minutes online or on WhatsApp and get a fast confirmation from our team.",
    icon: BadgeCheck,
  },
  {
    title: "24/7 Customer Support",
    description:
      "Real people on the phone and WhatsApp around the clock — before, during and after your trip.",
    icon: Headset,
  },
]

export const aboutHighlights: Feature[] = [
  {
    title: "Professional drivers",
    description: "Verified, trained and courteous.",
    icon: UserRound,
  },
  {
    title: "Well-maintained vehicles",
    description: "Serviced and inspected regularly.",
    icon: ShieldCheck,
  },
  {
    title: "Affordable rental packages",
    description: "Daily, weekly and monthly plans.",
    icon: Award,
  },
  {
    title: "24/7 customer support",
    description: "Phone and WhatsApp, any hour.",
    icon: Headset,
  },
]

/**
 * SAMPLE REVIEWS — placeholder content written to illustrate the layout.
 * Replace with genuine customer reviews (with permission) before launch.
 */
export type Testimonial = {
  name: string
  role: string
  rating: number
  review: string
  photo?: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Sample Customer A",
    role: "Monthly corporate rental",
    rating: 5,
    review:
      "We moved our office transport to a monthly plan and the driver has been punctual every single day. Billing is simple and the car is always spotless.",
  },
  {
    name: "Sample Customer B",
    role: "Airport transfer",
    rating: 5,
    review:
      "My flight landed late at night, but the driver was already waiting at arrivals with a name board. Smooth, safe ride home — exactly what I needed.",
  },
  {
    name: "Sample Customer C",
    role: "Family trip to Sylhet",
    rating: 4,
    review:
      "We took a Noah for a three-day family trip. The driver knew the route well and suggested great stops along the way. Will book again.",
  },
  {
    name: "Sample Customer D",
    role: "Wedding car",
    rating: 5,
    review:
      "Booked a luxury car for our wedding day. It arrived decorated and on time, and the team handled every detail without any stress for us.",
  },
  {
    name: "Sample Customer E",
    role: "Daily rental",
    rating: 5,
    review:
      "Booking on WhatsApp took two minutes. Clear pricing up front, a clean car and a friendly driver for my full day of meetings around Gulshan.",
  },
]

export const faqs = [
  {
    q: "How can I book a rental car?",
    a: "Browse our fleet, open the car you like and fill in the booking form — or tap the WhatsApp button and send us your trip details. Our team confirms availability and the final price before your booking is locked in.",
  },
  {
    q: "Do you provide cars with drivers?",
    a: "Yes. Most of our rentals include an experienced, verified driver who knows Dhaka and the major highways. Self-drive may be available for selected cars with a valid driving licence and security deposit.",
  },
  {
    q: "Can I rent a car monthly?",
    a: "Absolutely. Our monthly packages are popular with offices, NGOs and families. They include a dedicated vehicle and driver, scheduled maintenance and replacement support, at a lower effective rate than daily rental.",
  },
  {
    q: "Do you provide airport pickup and drop-off?",
    a: "Yes, we cover Hazrat Shahjalal International Airport around the clock. Share your flight number and we track it, so your driver is waiting even if the flight is early or delayed.",
  },
  {
    q: "Can I travel outside Dhaka?",
    a: "Yes. We regularly run trips to Sylhet, Cox's Bazar, Chattogram, Rajshahi and beyond. Outside-Dhaka trips are priced per day and include the driver's allowance; fuel, tolls and ferry charges are extra.",
  },
  {
    q: "What documents are required?",
    a: "A copy of your NID or passport and a contact number are required for every booking. For self-drive rentals you also need a valid driving licence. Corporate clients may need a trade licence or work order.",
  },
  {
    q: "What is your cancellation policy?",
    a: "You can cancel free of charge up to 24 hours before pickup. Cancellations within 24 hours may be charged a portion of the first day's rent. Contact us as early as possible if your plans change.",
  },
  {
    q: "How can I contact customer support?",
    a: "Call or WhatsApp us any time — support is available 24/7. You can also email us or send a message through the contact form and we will reply as quickly as possible.",
  },
]
