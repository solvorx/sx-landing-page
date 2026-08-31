import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { adentConfig, adentHero } from "@/lib/adent";
import { siteConfig } from "@/lib/site";

const highlights = [
  "Agenda por profesional",
  "Pacientes",
  "Recordatorios automáticos",
  "Portal del paciente",
];

/**
 * Portada de `/adent`. No reutiliza la geometría de `.hero` (que está atada al
 * alto de la ventana y al polígono del inicio): acá el bloque oscuro es una
 * tarjeta dentro del flujo, porque debajo sigue habiendo contenido y el header
 * es fijo, no superpuesto.
 */
export function AdentHero() {
  return (
    <section
      aria-labelledby="adent-hero-title"
      className="bg-white pt-10 lg:pt-14"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <nav aria-label="Migas de pan" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-brand-slate/50">
            <li>
              <Link href="/" className="transition-colors hover:text-brand-ink">
                {siteConfig.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-brand-slate/70">{adentConfig.name}</li>
          </ol>
        </nav>

        <div className="relative overflow-hidden rounded-5xl bg-brand-ink px-8 py-14 lg:px-14 lg:py-20">
          {/* Diagonal de la paleta, eco de la portada del inicio. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-2/3 opacity-25"
            style={{
              clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)",
              background:
                "linear-gradient(135deg, #0063b5 0%, #20868e 45%, #dc067a 80%, #ffa500 100%)",
            }}
          />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
              <span className="size-1.5 rounded-full bg-brand-amber" />
              {adentHero.eyebrow}
            </span>

            <p className="mt-8 font-display text-sm font-semibold tracking-[0.3em] text-white/50 uppercase">
              {adentConfig.name}
            </p>
            <h1
              id="adent-hero-title"
              className="mt-3 font-display text-3xl leading-[1.15] font-semibold text-balance text-white lg:text-5xl"
            >
              {adentHero.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-pretty text-white/70">
              {adentHero.body}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                href={adentHero.primary.href}
                variant="onDark"
                target="_blank"
                rel="noreferrer noopener"
              >
                {adentHero.primary.label}
              </Button>
              <a
                href={adentHero.secondary.href}
                className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:border-white/60"
              >
                {adentHero.secondary.label}
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-white/40"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
