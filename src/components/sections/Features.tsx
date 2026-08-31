import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { features as siteFeatures, type Feature } from "@/lib/site";

const accents = [
  "text-brand-blue bg-brand-blue/8",
  "text-brand-teal bg-brand-teal/8",
  "text-brand-magenta bg-brand-magenta/8",
  "text-brand-amber bg-brand-amber/12",
];

function FeatureIcon({ feature, index }: { feature: Feature; index: number }) {
  if (feature.icon === "sx") {
    return (
      <span className="grid size-11 place-items-center rounded-2xl bg-brand-ink/6">
        <Image
          src="/brand/isotipo-sx-claro.svg"
          alt=""
          width={38}
          height={24}
          className="h-6 w-auto"
        />
      </span>
    );
  }

  return (
    <span
      className={`grid size-11 place-items-center rounded-2xl ${accents[index % accents.length]}`}
    >
      <Icon name={feature.icon} />
    </span>
  );
}

/**
 * Grilla de servicios. Se usa en el inicio con `features` de site.ts y en
 * `/adent` con las capacidades del producto. Una tarjeta con `href` es un
 * enlace completo a la vista de ese servicio (hoy, ADent).
 */
export function Features({
  id = "servicios",
  title = "Lo que hacemos",
  body = "Tres frentes que solemos combinar en un mismo proyecto, según lo que pida tu operación.",
  items = siteFeatures,
}: {
  id?: string;
  title?: string;
  body?: string;
  items?: Feature[];
}) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="scroll-mt-(--header-h) bg-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <h2
            id={titleId}
            className="font-display text-3xl font-semibold text-balance text-brand-ink lg:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-slate/65">
            {body}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((feature, i) => (
            <Reveal as="li" key={feature.title} delay={i * 0.06}>
              {feature.href ? (
                <Link
                  href={feature.href}
                  className="group block -m-4 rounded-4xl p-4 transition-colors hover:bg-brand-ink/[0.03]"
                >
                  <FeatureIcon feature={feature} index={i} />
                  <h3 className="mt-5 font-display text-lg font-semibold text-brand-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-slate/65">
                    {feature.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
                    {feature.cta ?? "Ver más"}
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ) : (
                <>
                  <FeatureIcon feature={feature} index={i} />
                  <h3 className="mt-5 font-display text-lg font-semibold text-brand-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-slate/65">
                    {feature.body}
                  </p>
                </>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
