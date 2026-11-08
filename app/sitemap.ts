import type { MetadataRoute } from "next"

import { site } from "@/lib/site"
import { vehicles } from "@/lib/vehicles"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/fleet`, changeFrequency: "weekly", priority: 0.9 },
    ...vehicles.map((v) => ({
      url: `${site.url}/fleet/${v.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
