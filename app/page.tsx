import { site } from "@/lib/site"
import { Hero } from "@/components/site/hero"
import { Services } from "@/components/site/services"
import { About } from "@/components/site/about"
import { FleetSection } from "@/components/site/fleet-section"
import { HowItWorks } from "@/components/site/how-it-works"
import { WhyUs } from "@/components/site/why-us"
import { Pricing } from "@/components/site/pricing"
import { CtaBand } from "@/components/site/cta-band"
import { Testimonials } from "@/components/site/testimonials"
import { Faq } from "@/components/site/faq"
import { Contact } from "@/components/site/contact"
import { faqs } from "@/lib/content"

// Structured data for local SEO.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoRental",
      name: site.nameEn,
      alternateName: site.name,
      description: site.description,
      url: site.url,
      telephone: site.contact.phone,
      image: `${site.url}${site.logo}`,
      openingHours: "Mo-Su 00:00-23:59",
      address: {
        "@type": "PostalAddress",
        streetAddress: "House 81, Gausul Azam Avenue, Sector 14",
        addressLocality: "Uttara, Dhaka",
        postalCode: "1230",
        addressCountry: "BD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Services />
      <About />
      <FleetSection />
      <HowItWorks />
      <WhyUs />
      <Pricing />
      <CtaBand />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  )
}
