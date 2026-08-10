import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/lib/site";

/**
 * Preguntas frecuentes, en `<details>/<summary>` nativos (el marcador se
 * oculta vía CSS en globals.css). El contenido tiene que ser visible en la
 * página: es lo que hace válido el rich result `FAQPage` que se emite en
 * layout.tsx, además de ser el copy más denso en keywords de todo el sitio.
 */
export function Faq() {
  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-title"
      className="bg-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal className="text-center">
          <Badge>Preguntas frecuentes</Badge>
          <h2
            id="faq-title"
            className="mt-6 font-display text-3xl font-semibold text-balance text-brand-ink lg:text-4xl"
          >
            Lo que suelen preguntarnos
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 space-y-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-3xl border border-brand-ink/8 bg-white px-6 py-5 open:shadow-[0_20px_50px_-40px] open:shadow-brand-ink/60"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-brand-ink">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-lg text-brand-ink/40 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p
                className="mt-3 text-sm leading-relaxed text-brand-slate/65"
                // item.answer es copy estático de site.ts (no entrada de
                // usuario): puede traer HTML simple (<strong>, <a>, etc.).
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
