import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { dentuxConfig } from "@/lib/dentux";
import { dentuxTerms } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: dentuxTerms.title,
  description: dentuxTerms.description,
  alternates: { canonical: dentuxTerms.path },
  openGraph: {
    type: "article",
    locale: siteConfig.locale,
    url: `${siteConfig.url}${dentuxTerms.path}`,
    siteName: siteConfig.name,
    title: dentuxTerms.title,
    description: dentuxTerms.description,
    modifiedTime: dentuxTerms.updatedAt,
  },
};

export default function DentuxTerminosPage() {
  return (
    <>
      <Header variant="solid" />
      <main id="contenido">
        <LegalDoc
          document={dentuxTerms}
          breadcrumb={[
            { label: siteConfig.name, href: "/" },
            { label: dentuxConfig.name, href: dentuxConfig.path },
            { label: "Términos y condiciones" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
