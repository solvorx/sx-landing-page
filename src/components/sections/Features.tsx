import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { features } from "@/lib/site";

const accents = [
  "text-brand-blue bg-brand-blue/8",
  "text-brand-teal bg-brand-teal/8",
  "text-brand-magenta bg-brand-magenta/8",
  "text-brand-amber bg-brand-amber/12",
];

export function Features() {
  return (
    <section id="servicios" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-balance text-brand-ink lg:text-4xl">
            Lo que hacemos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-slate/65">
            Cuatro frentes que solemos combinar en un mismo proyecto, según lo
            que pida tu operación.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal as="li" key={feature.title} delay={i * 0.08}>
              <span
                className={`grid size-11 place-items-center rounded-2xl ${accents[i % accents.length]}`}
              >
                <Icon name={feature.icon} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-brand-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate/65">
                {feature.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
