import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ctaBanner as siteCta, type CtaBannerContent } from "@/lib/site";

export function CtaBanner({
  id = "contacto",
  content = siteCta,
}: {
  id?: string;
  content?: CtaBannerContent;
}) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="scroll-mt-(--header-h) bg-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="grid overflow-hidden rounded-5xl bg-brand-ink lg:grid-cols-[1.15fr_1fr]">
          <div className="p-10 lg:p-14">
            <h2
              id={titleId}
              className="font-display text-3xl font-semibold text-balance text-white lg:text-4xl"
            >
              {content.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-white/65">
              {content.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={content.primary.href}
                variant="onDark"
                target="_blank"
                rel="noreferrer noopener"
              >
                {content.primary.label}
              </Button>
              <a
                href={content.secondary.href}
                className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:border-white/60"
              >
                {content.secondary.label}
              </a>
            </div>
          </div>

          {/* Panel con el degradado de la paleta */}
          <div
            aria-hidden="true"
            className="min-h-56"
            style={{
              background:
                "linear-gradient(135deg, #1d0639 0%, #0063b5 30%, #20868e 52%, #dc067a 78%, #ffa500 100%)",
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
