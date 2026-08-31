import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { solvorxTerms } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: solvorxTerms.title,
  description: solvorxTerms.description,
  alternates: { canonical: solvorxTerms.path },
  openGraph: {
    type: "article",
    locale: siteConfig.locale,
    url: `${siteConfig.url}${solvorxTerms.path}`,
    siteName: siteConfig.name,
    title: solvorxTerms.title,
    description: solvorxTerms.description,
    modifiedTime: solvorxTerms.updatedAt,
  },
};

export default function TerminosPage() {
  return (
    <>
      <Header variant="solid" />
      <main id="contenido">
        <LegalDoc
          document={solvorxTerms}
          breadcrumb={[
            { label: siteConfig.name, href: "/" },
            { label: solvorxTerms.title },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
