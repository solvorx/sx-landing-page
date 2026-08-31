import Link from "next/link";
import type { LegalDocument } from "@/lib/legal";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-PY", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(iso));

/** Los textos legales admiten HTML simple (enlaces, negritas) desde legal.ts. */
const linkStyles =
  "[&_a]:font-medium [&_a]:text-brand-blue [&_a]:underline [&_a]:underline-offset-2";

/**
 * Documento legal: encabezado con la fecha de vigencia, índice lateral fijo y
 * el articulado. El contenido llega entero desde `src/lib/legal.ts`; este
 * componente solo lo maqueta, así que sirve igual para los términos de
 * SolvorX y para los de ADent.
 */
export function LegalDoc({
  document,
  breadcrumb,
}: {
  document: LegalDocument;
  /** Migas de pan; el último elemento es la página actual y no lleva enlace. */
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <article className="bg-white pt-14 pb-24 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Migas de pan" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-brand-slate/50">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-brand-ink"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-brand-slate/70">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <header className="max-w-3xl">
          <h1 className="font-display text-3xl font-semibold text-balance text-brand-ink lg:text-5xl">
            {document.title}
          </h1>
          <p className="mt-5 text-xs tracking-wide text-brand-slate/50 uppercase">
            Última actualización:{" "}
            <time dateTime={document.updatedAt}>
              {formatDate(document.updatedAt)}
            </time>
          </p>
          <p
            className={`mt-6 text-base leading-relaxed text-pretty text-brand-slate/70 ${linkStyles}`}
            dangerouslySetInnerHTML={{ __html: document.summary }}
          />
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-labelledby="indice-title"
            className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start"
          >
            <p
              id="indice-title"
              className="font-display text-sm font-semibold text-brand-ink"
            >
              Contenido
            </p>
            <ol className="mt-4 space-y-2 border-l border-brand-ink/10 pl-4">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-brand-slate/60 transition-colors hover:text-brand-ink"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl space-y-12">
            {document.sections.map((section) => (
              /* Sin `Reveal`: una sección legal que aparece al hacer scroll
                 queda en blanco si alguien imprime o guarda la página en PDF
                 sin haberla recorrido entera. */
              <section
                key={section.id}
                className="scroll-mt-[calc(var(--header-h)+1.5rem)]"
              >
                <h2
                  id={section.id}
                  className="font-display text-xl font-semibold text-brand-ink lg:text-2xl"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.blocks.map((block, i) =>
                    block.type === "p" ? (
                      <p
                        key={i}
                        className={`text-sm leading-relaxed text-brand-slate/70 ${linkStyles}`}
                        dangerouslySetInnerHTML={{ __html: block.text }}
                      />
                    ) : (
                      <ul key={i} className="space-y-2">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className={`flex gap-3 text-sm leading-relaxed text-brand-slate/70 ${linkStyles}`}
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-magenta"
                            />
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
