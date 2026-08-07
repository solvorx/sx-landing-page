import { Reveal } from "@/components/ui/Reveal";
import { bento, type BentoCard } from "@/lib/site";

const tints: Record<BentoCard["tint"], string> = {
  blue: "bg-brand-blue/8 text-brand-ink",
  teal: "bg-brand-teal/10 text-brand-ink",
  magenta: "bg-brand-magenta/8 text-brand-ink",
  amber: "bg-brand-amber/14 text-brand-ink",
  ink: "bg-brand-ink text-white",
};

const spans: Record<BentoCard["span"], string> = {
  base: "lg:col-span-2",
  wide: "lg:col-span-4",
  tall: "lg:col-span-2 lg:row-span-2",
};

export function Bento() {
  return (
    <section id="soluciones" className="relative overflow-hidden bg-white py-20 lg:py-24">
      {/* Halo suave de marca, como el fondo del video de referencia */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-0 h-[420px] w-[900px] -translate-x-1/2 opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, #0063b5 18%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-balance text-brand-ink lg:text-4xl">
            Soluciones que ya hemos construido
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-brand-slate/65">
            Cada proyecto es distinto, pero casi todos caen en alguna de estas
            formas.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {bento.map((card, i) => (
            <Reveal
              as="li"
              key={card.title}
              delay={i * 0.06}
              className={spans[card.span]}
            >
              <article
                className={`flex h-full flex-col justify-between gap-8 rounded-4xl p-8 ${tints[card.tint]}`}
              >
                <h3 className="font-display text-xl font-semibold">
                  {card.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    card.tint === "ink" ? "text-white/70" : "text-brand-slate/65"
                  }`}
                >
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
