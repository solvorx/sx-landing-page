import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { features, siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const title = `${siteConfig.name} | ${siteConfig.tagline}`;


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  verification: process.env.NEXT_PUBLIC_GSC_TOKEN
    ? { google: process.env.NEXT_PUBLIC_GSC_TOKEN }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

/**
 * JSON-LD de alcance global. Lo específico de cada vista (FAQPage, VideoObject,
 * SoftwareApplication) lo emite su propia página con <JsonLd>.
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-claro.svg`,
    image: `${siteConfig.url}/brand/logo-claro.svg`,
    description: siteConfig.description,
    telephone: siteConfig.telephone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    areaServed: { "@type": "Country", name: "Paraguay" },
    sameAs: Object.values(siteConfig.social),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de SolvorX",
      itemListElement: features.map((feature) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature.title,
          description: feature.body,
          url: feature.href ? `${siteConfig.url}${feature.href}` : undefined,
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: { "@type": "Country", name: "Paraguay" },
        },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "es",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-brand-slate">
        <JsonLd data={jsonLd} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand-ink focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
