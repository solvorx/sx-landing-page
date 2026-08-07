import { Reveal } from "@/components/ui/Reveal";
import { faq, siteConfig } from "@/lib/site";

/** El JSON-LD sale de los mismos datos que se renderizan: no pueden divergir. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.url}/#faq`,
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-balance text-brand-ink lg:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-slate/65">
            Si no encuentras lo que buscas, escríbenos a{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-brand-blue underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-5 gap-y-3 lg:grid-cols-2">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={(i % 2) * 0.08}>
              <details className="group h-full rounded-3xl border border-brand-ink/10 bg-white px-6 transition-colors open:border-brand-ink/20 hover:border-brand-ink/25">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-base font-medium text-brand-ink">
                  {item.q}
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5 shrink-0 text-brand-slate/40 transition-transform duration-300 group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="pb-6 text-sm leading-relaxed text-brand-slate/65">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
