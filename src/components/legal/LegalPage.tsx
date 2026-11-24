import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import type { LegalDocument } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

/** Metadata de una página legal: la misma forma que usan `/terminos` y `/dentux/terminos`. */
export function legalMetadata(document: LegalDocument): Metadata {
  return {
    title: document.title,
    description: document.description,
    alternates: { canonical: document.path },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: `${siteConfig.url}${document.path}`,
      siteName: siteConfig.name,
      title: document.title,
      description: document.description,
      modifiedTime: document.updatedAt,
    },
  };
}

/** Página legal de primer nivel: header, documento con migas y footer. */
export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <Header variant="solid" />
      <main id="contenido">
        <LegalDoc
          document={document}
          breadcrumb={[
            { label: siteConfig.name, href: "/" },
            { label: document.title },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
