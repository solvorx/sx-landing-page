import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { faq, showcase, siteConfig } from "@/lib/site";

/** faq.answer puede traer HTML simple; el JSON-LD quiere texto plano. */
const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

/**
 * JSON-LD propio del inicio: el video y el FAQ solo existen en esta vista, así
 * que no pueden vivir en el layout (aparecerían en `/dentux` y en las páginas
 * legales, donde Google no encontraría el contenido visible que los respalda).
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: showcase.title,
    description: showcase.body,
    contentUrl: `${siteConfig.url}${showcase.src}`,
    thumbnailUrl: `${siteConfig.url}/media/video-poster.webp`,
    uploadDate: siteConfig.lastUpdated,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer),
      },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main id="contenido">
        <Hero />
        <VideoShowcase />
        <Features />
        <HowItWorks />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
