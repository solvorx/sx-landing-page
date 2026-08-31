import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { adentConfig } from "@/lib/adent";
import { adentTerms } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: adentTerms.title,
  description: adentTerms.description,
  alternates: { canonical: adentTerms.path },
  openGraph: {
    type: "article",
    locale: siteConfig.locale,
    url: `${siteConfig.url}${adentTerms.path}`,
    siteName: siteConfig.name,
    title: adentTerms.title,
    description: adentTerms.description,
    modifiedTime: adentTerms.updatedAt,
  },
};

export default function AdentTerminosPage() {
  return (
    <>
      <Header variant="solid" />
      <main id="contenido">
        <LegalDoc
          document={adentTerms}
          breadcrumb={[
            { label: siteConfig.name, href: "/" },
            { label: adentConfig.name, href: adentConfig.path },
            { label: "Términos y condiciones" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
