/**
 * Contenido de ADent, el SaaS de gestión odontológica del ecosistema SolvorX.
 *
 * Fuente de verdad de la vista `/adent`: de acá salen la metadata, el JSON-LD
 * (`SoftwareApplication` + `FAQPage`), la imagen OG y las secciones. Los datos
 * duros (cupos de mensajes de cada plan) son espejo del catálogo real de
 * `adent-service` (`prisma/seed.ts`, tabla `billing.plan`): si cambian allá,
 * cambian acá.
 *
 * Los términos y condiciones del servicio viven en `src/lib/legal.ts`.
 */

import type { Feature, FaqItem, Step } from "@/lib/site";
import { waLink } from "@/lib/site";

export const adentConfig = {
  name: "ADent",
  path: "/adent",
  tagline: "Software de gestión para clínicas odontológicas",
  description:
    "ADent es el software de gestión para clínicas odontológicas y dentistas independientes: agenda por profesional, ficha de pacientes, recordatorios automáticos de citas y portal del paciente.",
  keywords: [
    "software para clínicas odontológicas",
    "software dental Paraguay",
    "agenda para consultorio odontológico",
    "gestión de pacientes dentales",
    "recordatorio de citas dentales",
    "ADent",
  ],
  /** Categoría de schema.org para el JSON-LD de la vista. */
  applicationCategory: "BusinessApplication",
  termsPath: "/adent/terminos",
} as const;

export const adentHero = {
  eyebrow: "Un producto de SolvorX",
  title: "La agenda de tu clínica dental, ordenada y sin ausencias",
  body: "ADent reúne agenda, pacientes y recordatorios en un solo lugar. Todo el equipo trabaja sobre el mismo calendario y cada paciente recibe su aviso sin que nadie tenga que escribirlo a mano.",
  primary: { label: "Pedir una demo por WhatsApp", href: waLink },
  secondary: { label: "Ver planes", href: "#planes" },
} as const;

export const adentFeatures: Feature[] = [
  {
    icon: "calendar",
    title: "Agenda por profesional",
    body: "Calendario con la disponibilidad real de cada profesional, bloqueos por vacaciones o feriados y citas que se repiten sin volver a cargarlas.",
  },
  {
    icon: "users",
    title: "Pacientes en un solo lugar",
    body: "Datos de contacto, historial de citas y comentarios internos del equipo, siempre a mano y sin planillas paralelas.",
  },
  {
    icon: "bell",
    title: "Recordatorios automáticos",
    body: "Avisos por correo y SMS antes de cada cita. Menos ausencias y menos tiempo de recepción al teléfono confirmando uno por uno.",
  },
  {
    icon: "spark",
    title: "Portal del paciente",
    body: "El paciente entra desde un enlace de un solo uso —sin usuario ni contraseña— para ver, agendar o cancelar su cita.",
  },
  {
    icon: "shield",
    title: "Equipo con permisos",
    body: "Invitá a recepción y a cada profesional con su propio acceso. La sesión es la del ecosistema SolvorX, con cierre inmediato cuando alguien deja el equipo.",
  },
  {
    icon: "chart",
    title: "Cómo viene el mes",
    body: "Citas agendadas, confirmadas y ausencias a la vista, para decidir con datos en vez de con la sensación de la semana.",
  },
];

export const adentSteps: Step[] = [
  {
    title: "Damos de alta tu clínica",
    body: "Cargamos la organización, los profesionales y los horarios de atención con vos en una sola sesión.",
  },
  {
    title: "Migramos tu agenda",
    body: "Traemos los pacientes y las citas ya agendadas para que no tengas que cargar todo de nuevo.",
  },
  {
    title: "Tu equipo entra a trabajar",
    body: "Se usa desde el navegador, sin instalar nada, y los recordatorios empiezan a salir solos.",
  },
];

export type AdentPlan = {
  code: string;
  name: string;
  summary: string;
  /** Cupo de mensajes por ciclo de facturación, espejo de `billing.plan`. */
  quota: { email: number; sms: number };
  includes: string[];
  featured?: boolean;
};

export const adentPlans: AdentPlan[] = [
  {
    code: "free",
    name: "Free",
    summary: "Para arrancar y ordenar la agenda de un consultorio chico.",
    quota: { email: 1000, sms: 200 },
    includes: [
      "Agenda, pacientes y profesionales sin límite",
      "Portal del paciente",
      "Recordatorios automáticos dentro del cupo",
    ],
  },
  {
    code: "standard",
    name: "Standard",
    summary: "Para clínicas con varios sillones y agenda llena todo el día.",
    quota: { email: 5000, sms: 1000 },
    includes: [
      "Todo lo del plan Free",
      "Cupo de recordatorios ampliado",
      "Saldo adicional de mensajes cuando el cupo no alcanza",
    ],
    featured: true,
  },
];

/**
 * Estado de los cobros. Los pagos en línea con la pasarela todavía están en
 * implementación: hasta que estén, el alta y el cambio de plan se coordinan
 * por WhatsApp. Este aviso y la cláusula de pagos de los términos
 * (`src/lib/legal.ts`) tienen que decir lo mismo.
 */
export const adentBillingNotice =
  "Estamos habilitando los pagos en línea. Mientras tanto, el alta y el cambio de plan se coordinan por WhatsApp y los precios vigentes te los pasamos en esa conversación.";

export const adentFaq: FaqItem[] = [
  {
    question: "¿Para quién es ADent?",
    answer:
      "Para clínicas odontológicas con varios profesionales y también para dentistas que trabajan solos. Una misma cuenta puede administrar más de una clínica.",
  },
  {
    question: "¿Hay que instalar algo?",
    answer:
      "No. ADent funciona desde el navegador, en computadora o celular. No hay servidores que mantener del lado de la clínica.",
  },
  {
    question: "¿Cómo recibe el paciente su recordatorio?",
    answer:
      "Por correo electrónico o SMS antes de la cita, con un enlace de un solo uso para confirmar, reprogramar o cancelar sin crearse una cuenta.",
  },
  {
    question: "¿Puedo probar ADent sin pagar?",
    answer:
      "Sí. El plan <b>Free</b> incluye agenda, pacientes, portal del paciente y un cupo mensual de recordatorios, sin costo.",
  },
  {
    question: "¿Cómo se paga ADent?",
    answer:
      "Estamos habilitando los pagos en línea con una pasarela local. Hasta que estén disponibles, el alta y el cambio de plan se coordinan por WhatsApp.",
  },
  {
    question: "¿De quién son los datos de mis pacientes?",
    answer:
      'De tu clínica. SolvorX los trata únicamente para prestarte el servicio y no los usa para otra cosa. El detalle está en los <a href="/adent/terminos">términos y condiciones de ADent</a>.',
  },
];

export const adentCta = {
  title: "¿Vemos ADent con tu agenda real?",
  body: "Coordinamos una demo por WhatsApp, cargamos un par de días de tu clínica y decidís con el sistema andando.",
  primary: { label: "Escribinos al WhatsApp", href: waLink },
  secondary: { label: "Ver planes", href: "#planes" },
};
