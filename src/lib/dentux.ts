/**
 * Contenido de DentuX, el SaaS de gestión odontológica del ecosistema SolvorX.
 *
 * Fuente de verdad de la vista `/dentux`: de acá salen la metadata, el JSON-LD
 * (`SoftwareApplication` + `FAQPage`), la imagen OG y las secciones. Los datos
 * duros (cupos de mensajes de cada plan) son espejo del catálogo real de
 * `sx-dentux-service` (`prisma/seed.ts`, tabla `billing.plan`): si cambian allá,
 * cambian acá.
 *
 * Los términos y condiciones del servicio viven en `src/lib/legal.ts`.
 */

import type { Feature, FaqItem, Step } from "@/lib/site";
import { waLink } from "@/lib/site";

export const dentuxConfig = {
  name: "DentuX",
  path: "/dentux",
  tagline: "Software de gestión para clínicas odontológicas",
  description:
    "DentuX es el software de gestión para clínicas odontológicas y dentistas independientes: agenda por profesional, ficha de pacientes, recordatorios automáticos de citas y portal del paciente.",
  keywords: [
    "software para clínicas odontológicas",
    "software dental Paraguay",
    "agenda para consultorio odontológico",
    "gestión de pacientes dentales",
    "recordatorio de citas dentales",
    "DentuX",
  ],
  /** Categoría de schema.org para el JSON-LD de la vista. */
  applicationCategory: "BusinessApplication",
  termsPath: "/dentux/terminos",
} as const;

export const dentuxHero = {
  eyebrow: "Un producto de SolvorX",
  title: "La agenda de tu clínica dental, ordenada y sin ausencias",
  body: "DentuX reúne agenda, pacientes y recordatorios en un solo lugar. Todo el equipo trabaja sobre el mismo calendario y cada paciente recibe su aviso sin que nadie tenga que escribirlo a mano.",
  primary: { label: "Pedir una demo por WhatsApp", href: waLink },
  secondary: { label: "Ver planes", href: "#planes" },
} as const;

export const dentuxFeatures: Feature[] = [
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
    body: "Avisos por correo electrónico antes de cada cita. Menos ausencias y menos tiempo de recepción al teléfono confirmando uno por uno.",
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

export const dentuxSteps: Step[] = [
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

export type DentuxPlan = {
  code: string;
  name: string;
  summary: string;
  /** Cupo de mensajes por ciclo de facturación, espejo de `billing.plan.entitlements`. */
  quota: { email: number };
  /** Usuarios con acceso a la vez, espejo de `billing.plan.max_users`. */
  maxUsers: number;
  /** Turnos por mes calendario, espejo de `billing.plan.max_appointments_per_month`. */
  maxAppointmentsPerMonth: number;
  includes: string[];
  featured?: boolean;
};

export const dentuxPlans: DentuxPlan[] = [
  {
    code: "free",
    name: "Free",
    summary: "Para arrancar y ordenar la agenda de un consultorio chico.",
    quota: { email: 20 },
    maxUsers: 1,
    maxAppointmentsPerMonth: 100,
    includes: [
      "Agenda, pacientes y profesionales",
      "Portal del paciente",
      "Recordatorios automáticos dentro del cupo",
      "Packs de mensajes cuando el cupo no alcanza, sin vencimiento",
    ],
  },
  {
    code: "standard",
    name: "Standard",
    summary: "Para clínicas con varios sillones y agenda llena todo el día.",
    quota: { email: 5000 },
    maxUsers: 15,
    maxAppointmentsPerMonth: 500,
    includes: [
      "Todo lo del plan Free",
      "Cupo de recordatorios ampliado",
    ],
    featured: true,
  },
];

/**
 * Cómo se paga. Este aviso, la pregunta frecuente de pagos y la cláusula
 * "Cómo se paga" de los términos (`src/lib/legal.ts`) tienen que decir lo
 * mismo: hoy, checkout de SolvorX con transferencia y confirmación manual.
 */
export const dentuxBillingNotice =
  "Los planes se contratan desde el panel de DentuX y se pagan en el checkout de SolvorX, hoy por transferencia bancaria. El precio vigente lo ves antes de confirmar, y el plan se activa cuando se confirma la transferencia.";

export const dentuxFaq: FaqItem[] = [
  {
    question: "¿Para quién es DentuX?",
    answer:
      "Para clínicas odontológicas con varios profesionales y también para dentistas que trabajan solos. Una misma cuenta puede administrar más de una clínica.",
  },
  {
    question: "¿Hay que instalar algo?",
    answer:
      "No. DentuX funciona desde el navegador, en computadora o celular. No hay servidores que mantener del lado de la clínica.",
  },
  {
    question: "¿Cómo recibe el paciente su recordatorio?",
    answer:
      "Por correo electrónico antes de la cita, con un enlace de un solo uso para confirmar, reprogramar o cancelar sin crearse una cuenta.",
  },
  {
    question: "¿Puedo probar DentuX sin pagar?",
    answer:
      "Sí. El plan <b>Free</b> incluye agenda, pacientes, portal del paciente y un cupo mensual de recordatorios, sin costo.",
  },
  {
    question: "¿Cómo se paga DentuX?",
    answer:
      "Desde el panel de DentuX elegís el plan y lo pagás en el checkout de SolvorX, hoy por transferencia bancaria. El plan se activa cuando confirmamos la transferencia, y la baja la pedís desde tu cuenta de SolvorX cuando quieras.",
  },
  {
    question: "¿De quién son los datos de mis pacientes?",
    answer:
      'De tu clínica. SolvorX los trata únicamente para prestarte el servicio y no los usa para otra cosa. El detalle está en los <a href="/dentux/terminos">términos y condiciones de DentuX</a>.',
  },
];

export const dentuxCta = {
  title: "¿Vemos DentuX con tu agenda real?",
  body: "Coordinamos una demo por WhatsApp, cargamos un par de días de tu clínica y decidís con el sistema andando.",
  primary: { label: "Escribinos al WhatsApp", href: waLink },
  secondary: { label: "Ver planes", href: "#planes" },
};
