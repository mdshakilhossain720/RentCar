import type { Metadata, Viewport } from "next"
import { Hind_Siliguri, Inter, Playfair_Display } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
})
const bangla = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-bangla",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nameEn} — Premium Car Rental in Uttara, Dhaka | 24/7`,
    template: `%s | ${site.nameEn}`,
  },
  description: site.description,
  keywords: [
    "rent a car Dhaka",
    "rent a car Uttara",
    "car rental Bangladesh",
    "monthly car rental Dhaka",
    "airport transfer Dhaka",
    "car with driver Dhaka",
    "Hiace rent",
    "microbus rent",
    "মনির রেন্ট এ কার",
  ],
  openGraph: {
    type: "website",
    locale: "en_BD",
    siteName: site.nameEn,
    title: `${site.nameEn} — ${site.availabilityEn} Car Rental in Uttara`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#0e1014",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark antialiased", sans.variable, display.variable, bangla.variable)}
    >
      <body className="min-h-svh overflow-x-clip font-sans">
        <ThemeProvider forcedTheme="dark" defaultTheme="dark" enableSystem={false}>
          <Toaster>
            <a
              href="#main"
              className="sr-only z-[100] rounded-lg bg-gold px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              Skip to content
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <FloatingActions />
          </Toaster>
        </ThemeProvider>
      </body>
    </html>
  )
}
