import type { Metadata } from "next";
import { AdentHero } from "@/components/sections/adent/AdentHero";
import { AdentPlans } from "@/components/sections/adent/AdentPlans";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import {
  adentConfig,
  adentCta,
  adentFaq,
  adentFeatures,
  adentSteps,
} from "@/lib/adent";
import { siteConfig } from "@/lib/site";

const title = `${adentConfig.name} — ${adentConfig.tagline}`;
const url = `${siteConfig.url}${adentConfig.path}`;

export const metadata: Metadata = {
  title,
  description: adentConfig.description,
  keywords: [...adentConfig.keywords],
  alternates: { canonical: adentConfig.path },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url,
    siteName: siteConfig.name,
    title,
    description: adentConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: adentConfig.description,
  },
};

/** faq.answer puede traer HTML simple; el JSON-LD quiere texto plano. */
const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

/**
 * Sin `offers`: los precios todavía no están definidos ni los cobros en línea
 * habilitados (ver `adentBillingNotice`). Un Offer sin precio real sería una
 * promesa que la página no cumple; se agrega cuando exista la lista de precios.
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}/#software`,
    name: adentConfig.name,
    url,
    applicationCategory: adentConfig.applicationCategory,
    applicationSubCategory: "Software de gestión odontológica",
    operatingSystem: "Web",
    description: adentConfig.description,
    inLanguage: "es",
    featureList: adentFeatures.map((feature) => feature.title),
    audience: {
      "@type": "Audience",
      audienceType: "Clínicas odontológicas y profesionales independientes",
    },
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "Paraguay" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      { "@type": "ListItem", position: 2, name: adentConfig.name, item: url },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: adentFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: stripHtml(item.answer) },
    })),
  },
];

export default function AdentPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Header variant="solid" />
      <main id="contenido">
        <AdentHero />
        <Features
          id="capacidades"
          title="Todo lo que se agenda, en un solo lugar"
          body="ADent cubre el día a día administrativo de la clínica: quién atiende, cuándo, a quién y con qué aviso previo."
          items={adentFeatures}
        />
        <HowItWorks
          id="como-empezar"
          eyebrow="Cómo empezar"
          title="De la primera charla a la agenda andando"
          items={adentSteps}
        />
        <AdentPlans />
        <Faq
          eyebrow={`Preguntas sobre ${adentConfig.name}`}
          title="Lo que suelen preguntarnos"
          items={adentFaq}
        />
        <CtaBanner content={adentCta} />
      </main>
      <Footer />
    </>
  );
}
