import type { Metadata } from "next";
import { DentuxHero } from "@/components/sections/dentux/DentuxHero";
import { DentuxPlans } from "@/components/sections/dentux/DentuxPlans";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import {
  dentuxConfig,
  dentuxCta,
  dentuxFaq,
  dentuxFeatures,
  dentuxSteps,
} from "@/lib/dentux";
import { siteConfig } from "@/lib/site";

const title = `${dentuxConfig.name} — ${dentuxConfig.tagline}`;
const url = `${siteConfig.url}${dentuxConfig.path}`;

export const metadata: Metadata = {
  title,
  description: dentuxConfig.description,
  keywords: [...dentuxConfig.keywords],
  alternates: { canonical: dentuxConfig.path },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url,
    siteName: siteConfig.name,
    title,
    description: dentuxConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: dentuxConfig.description,
  },
};

/** faq.answer puede traer HTML simple; el JSON-LD quiere texto plano. */
const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

/**
 * Sin `offers`: los precios todavía no están definidos ni los cobros en línea
 * habilitados (ver `dentuxBillingNotice`). Un Offer sin precio real sería una
 * promesa que la página no cumple; se agrega cuando exista la lista de precios.
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}/#software`,
    name: dentuxConfig.name,
    url,
    applicationCategory: dentuxConfig.applicationCategory,
    applicationSubCategory: "Software de gestión odontológica",
    operatingSystem: "Web",
    description: dentuxConfig.description,
    inLanguage: "es",
    featureList: dentuxFeatures.map((feature) => feature.title),
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
      { "@type": "ListItem", position: 2, name: dentuxConfig.name, item: url },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dentuxFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: stripHtml(item.answer) },
    })),
  },
];

export default function DentuxPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Header variant="solid" />
      <main id="contenido">
        <DentuxHero />
        <Features
          id="capacidades"
          title="Todo lo que se agenda, en un solo lugar"
          body="DentuX cubre el día a día administrativo de la clínica: quién atiende, cuándo, a quién y con qué aviso previo."
          items={dentuxFeatures}
        />
        <HowItWorks
          id="como-empezar"
          eyebrow="Cómo empezar"
          title="De la primera charla a la agenda andando"
          items={dentuxSteps}
        />
        <DentuxPlans />
        <Faq
          eyebrow={`Preguntas sobre ${dentuxConfig.name}`}
          title="Lo que suelen preguntarnos"
          items={dentuxFaq}
        />
        <CtaBanner content={dentuxCta} />
      </main>
      <Footer />
    </>
  );
}
