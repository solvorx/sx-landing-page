import type { MetadataRoute } from "next";
import { adentConfig } from "@/lib/adent";
import { legalDocuments } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(siteConfig.lastUpdated),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}${adentConfig.path}`,
      lastModified: new Date(siteConfig.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...legalDocuments.map((document) => ({
      url: `${siteConfig.url}${document.path}`,
      lastModified: new Date(document.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
