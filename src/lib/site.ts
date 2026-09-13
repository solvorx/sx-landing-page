/**
 * Fuente de verdad del contenido y la configuración del sitio.
 *
 * Todo el copy es PLACEHOLDER: reemplazarlo aquí actualiza a la vez las
 * secciones, la metadata, el sitemap, la imagen OG y el JSON-LD.
 *
 * El contenido del producto DentuX vive aparte, en `src/lib/dentux.ts`; los
 * términos y condiciones, en `src/lib/legal.ts`.
 */

export const siteConfig = {
  name: "SolvorX",
  /** Cambiar por el dominio real antes de publicar. */
  url: "https://solvorx.com",
  /** Fecha de la última revisión de contenido, usada como `lastmod` del sitemap. */
  lastUpdated: "2026-08-31",
  locale: "es_LA",
  tagline: "Desarrollo de software a medida en Paraguay",
  description:
    "Desarrollamos software a medida, automatizaciones e integraciones de IA para empresas en Paraguay. Del descubrimiento al lanzamiento en semanas.",
  keywords: [
    "desarrollo de software a medida",
    "inteligencia artificial para empresas",
    "automatización de procesos",
    "integraciones de sistemas",
    "consultoría tecnológica",
    "software para clínicas odontológicas",
    "SolvorX",
  ],
  whatsapp: "+595 986 741996",
  telephone: "+595986741996",
  address: {
    street: "Pedro Juan Caballero 2767",
    city: "Fernando de la Mora",
    /** Departamento, no ciudad: Fernando de la Mora está en Central. */
    region: "Central",
    country: "PY",
  },
  social: {
    instagram: "https://www.instagram.com/solvorx",
    github: "https://github.com/solvorx",
  },
} as const;

/** Único canal de contacto habilitado: WhatsApp. */
export const waLink = "https://wa.me/595986741996";

/**
 * Los enlaces de ancla van con `/` adelante: el header y el footer también se
 * renderizan en `/dentux` y en las páginas legales, donde un `#servicios` suelto
 * apuntaría a una sección que no existe en esa ruta.
 */
export const nav = [
  { label: "Servicios", href: "/#servicios" },
  { label: "DentuX", href: "/dentux" },
  { label: "Cómo trabajamos", href: "/#proceso" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export const hero = {
  title: "Construimos el software a medida que tu negocio necesita",
  body: "Diseño, desarrollo e inteligencia artificial aplicada. Un equipo que se integra al tuyo y entrega en semanas, no en trimestres.",
  cta: { label: "Escríbenos al WhatsApp", href: waLink },
} as const;

export const showcase = {
  title: "Lo digitalizamos con SolvorX",
  body: "Descubrimos, prototipamos y lanzamos producto junto a nuestros clientes.",
  src: "/media/video.mp4",
} as const;

/**
 * Nombres de icono disponibles. "sx" es el isotipo de marca (tiene su propio
 * render); el resto son trazos y viven en `components/ui/Icon.tsx`.
 */
export type IconName =
  | "spark"
  | "layers"
  | "shield"
  | "gauge"
  | "sx"
  | "tooth"
  | "calendar"
  | "users"
  | "bell"
  | "chart";

export type Feature = {
  icon: IconName;
  title: string;
  body: string;
  /** Si está, la tarjeta entera es un enlace a la vista del servicio. */
  href?: string;
  /** Texto del enlace; solo se usa junto con `href`. */
  cta?: string;
};

export const features: Feature[] = [
  {
    icon: "sx",
    title: "Ecosistema de SolvorX",
    body: "El núcleo SolvorX: Servicios de usuarios y servicios de consumer para APIs.",
  },
  {
    icon: "tooth",
    title: "DentuX — software para clínicas dentales",
    body: "Nuestro SaaS para consultorios odontológicos: agenda, pacientes, recordatorios automáticos y portal del paciente.",
    href: "https://dentux.solvorx.com",
    cta: "Conocer DentuX",
  },
  {
    icon: "layers",
    title: "Producto a medida",
    body: "Landing pages e integraciones seguras, diseñadas alrededor de tu operación. Ciclos cortos, datos protegidos y despliegues que no interrumpen el servicio.",
  },
];

export type Step = { title: string; body: string };

export const steps: Step[] = [
  {
    title: "Descubrimiento",
    body: "Mapeamos el proceso, los sistemas y el resultado que se espera del proyecto.",
  },
  {
    title: "Prototipo",
    body: "En semanas hay algo funcionando que se puede probar con usuarios reales.",
  },
  {
    title: "Escala",
    body: "Iteramos, medimos y seguimos con mantenimientos y mejoras.",
  },
];

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "¿Cuánto cuesta desarrollar software a medida con SolvorX?",
    answer:
      "Depende del alcance, puedes comunicarte con nosotros por WhatsApp y te daremos un presupuesto personalizado.",
  },
  {
    question: "¿Cuánto tiempo toma un proyecto?",
    answer:
      "El primer prototipo funcional suele estar listo en semanas. De ahí iteramos en ciclos cortos hasta escalar el sistema completo, en vez de entregar todo junto al final de un trimestre.",
  },
  {
    question: "¿Tienen productos propios que pueda contratar ya?",
    answer:
      'Sí. <b>DentuX</b> es nuestro SaaS para clínicas odontológicas y profesionales independientes: agenda, pacientes, recordatorios automáticos y portal del paciente. <a href="/dentux">Conocé DentuX</a>.',
  },
  {
    question: "¿Ofrecen dominio?",
    answer:
      "Sí, te ayudamos a gestionar tu dominio: te asistimos en la elección, compra y configuración, ya sea un dominio propio o un subdominio de SolvorX.",
  },
  {
    question: "¿Ofrecen soporte después del lanzamiento?",
    answer:
      "Sí, ofrecemos servicio de mantenimiento gratuito y nuevos desarrollos se cotizan de forma separada.",
  },
  {
    question: "¿Cómo empezamos a trabajar juntos?",
    answer:
      "Escríbenos por WhatsApp contándonos el problema que querés resolver. En esa primera conversación evaluamos la problematica y definimos los próximos pasos.",
  },
];

export type CtaBannerContent = {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export const ctaBanner: CtaBannerContent = {
  title: "Cuéntanos qué necesitas resolver",
  body: "Una conversación por WhatsApp es suficiente para saber si podemos ayudarte y cómo.",
  primary: { label: "Escríbenos al WhatsApp", href: waLink },
  secondary: { label: "Ver servicios", href: "/#servicios" },
};

export const footerLinks = [
  {
    title: "Servicios",
    links: [
      { label: "Ver servicios", href: "/#servicios" },
      { label: "DentuX — software dental", href: "/dentux" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Cómo trabajamos", href: "/#proceso" },
      { label: "Contacto", href: "/#contacto" },
      { label: "WhatsApp", href: waLink },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Términos de DentuX", href: "/dentux/terminos" },
    ],
  },
] as const;
