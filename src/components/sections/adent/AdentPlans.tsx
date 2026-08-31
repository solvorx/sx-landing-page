import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  adentBillingNotice,
  adentConfig,
  adentPlans,
  type AdentPlan,
} from "@/lib/adent";
import { waLink } from "@/lib/site";

const formatQuota = (value: number) =>
  new Intl.NumberFormat("es-PY").format(value);

function quotaLines(plan: AdentPlan) {
  return [
    `${formatQuota(plan.quota.email)} recordatorios por correo al mes`,
    `${formatQuota(plan.quota.sms)} recordatorios por SMS al mes`,
  ];
}

/**
 * Planes de ADent. Todavía no se muestran precios: los cobros en línea están
 * en implementación (ver `adentBillingNotice` y la cláusula de pagos de
 * `src/lib/legal.ts`, que tienen que decir lo mismo). Los cupos son espejo del
 * catálogo real de `adent-service`.
 */
export function AdentPlans() {
  return (
    <section
      id="planes"
      aria-labelledby="planes-title"
      className="scroll-mt-(--header-h) bg-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>Planes</Badge>
          <h2
            id="planes-title"
            className="mt-6 font-display text-3xl font-semibold text-balance text-brand-ink lg:text-4xl"
          >
            Empezá gratis y crecé cuando la agenda lo pida
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-slate/65">
            La diferencia entre planes está en el cupo de recordatorios. Agenda,
            pacientes y portal del paciente están en todos.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {adentPlans.map((plan, i) => (
            <Reveal
              as="li"
              key={plan.code}
              delay={i * 0.1}
              className={`flex flex-col rounded-4xl border p-8 lg:p-10 ${
                plan.featured
                  ? "border-brand-ink/15 bg-brand-ink/[0.02] shadow-[0_30px_70px_-50px] shadow-brand-ink"
                  : "border-brand-ink/8 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <h3 className="font-display text-xl font-semibold text-brand-ink">
                  {plan.name}
                </h3>
                {plan.featured && (
                  <span className="rounded-full bg-brand-magenta/10 px-3 py-1 text-xs font-medium text-brand-magenta">
                    Más elegido
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-brand-slate/65">
                {plan.summary}
              </p>

              <ul className="mt-7 space-y-2.5 border-t border-brand-ink/8 pt-7">
                {[...quotaLines(plan), ...plan.includes].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-brand-slate/70"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-teal"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                href={waLink}
                variant={plan.featured ? "primary" : "ghost"}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 self-start"
              >
                {plan.code === "free"
                  ? "Quiero el plan Free"
                  : "Quiero el plan Standard"}
              </Button>
            </Reveal>
          ))}
        </ul>

        <Reveal
          delay={0.15}
          className="mx-auto mt-10 max-w-3xl rounded-3xl border border-brand-amber/30 bg-brand-amber/[0.07] px-6 py-5"
        >
          <p className="text-sm leading-relaxed text-brand-slate/75">
            <b className="font-semibold text-brand-ink">Sobre los precios:</b>{" "}
            {adentBillingNotice}{" "}
            <Link
              href={adentConfig.termsPath}
              className="font-medium text-brand-blue underline underline-offset-2"
            >
              Ver términos y condiciones de {adentConfig.name}
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
