import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { steps as siteSteps, type Step } from "@/lib/site";

export function HowItWorks({
  id = "proceso",
  eyebrow = "Cómo trabajamos",
  title = "Tres fases, sin sorpresas",
  items = siteSteps,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  items?: Step[];
}) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="scroll-mt-(--header-h) bg-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>{eyebrow}</Badge>
          <h2
            id={titleId}
            className="mt-6 font-display text-3xl font-semibold text-balance text-brand-ink lg:text-4xl"
          >
            {title}
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.1}
              className="rounded-4xl border border-brand-ink/8 bg-white p-8 shadow-[0_20px_50px_-40px] shadow-brand-ink/60"
            >
              <span className="grid size-9 place-items-center rounded-full bg-brand-ink text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-brand-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate/65">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
