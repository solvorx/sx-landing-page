/**
 * Fuente de verdad del contenido y la configuración del sitio.
 *
 * Todo el copy es PLACEHOLDER: reemplazarlo aquí actualiza a la vez las
 * secciones, la metadata, el sitemap, la imagen OG y el JSON-LD.
 */

export const siteConfig = {
  name: "SolvorX",
  /** Cambiar por el dominio real antes de publicar. */
  url: "https://solvorx.com",
  /** Fecha de la última revisión de contenido, usada como `lastmod` del sitemap. */
  lastUpdated: "2026-08-10",
  locale: "es_LA",
  tagline: "Desarrollo de software a medida e IA en Paraguay",
  description:
    "Desarrollamos software a medida, automatizaciones e integraciones de IA para empresas en Paraguay. Del descubrimiento al lanzamiento en semanas.",
  keywords: [
    "desarrollo de software a medida",
    "inteligencia artificial para empresas",
    "automatización de procesos",
    "integraciones de sistemas",
    "consultoría tecnológica",
    "SolvorX",
  ],
  email: "hola@solvorx.com",
  whatsapp: "+595 986 741996",
  telephone: "+595986741996",
  address: {
    street: "",
    city: "Asunción",
    region: "Asunción",
    country: "PY",
  },
  social: {
    instagram: "https://www.instagram.com/solvorx",
    github: "https://github.com/solvorx",
  },
} as const;

/** Único canal de contacto habilitado: WhatsApp. */
export const waLink = "https://wa.me/595986741996";

export const nav = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
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

export type Feature = {
  icon: "spark" | "layers" | "shield" | "gauge" | "sx";
  title: string;
  body: string;
};

export const features: Feature[] = [
  {
    icon: "sx",
    title: "Ecosistema de SolvorX",
    body: "El núcleo SolvorX: Servicios de usuarios y servicios de consumer para APIs.",
  },
  {
    icon: "layers",
    title: "Producto a medida",
    body: "Plataformas diseñadas alrededor de tu operación: Landing page, Apps y más.",
  },
  {
    icon: "layers",
    title: "Landing Page",
    body: "Sitios rápidos y conversores, pensados desde el primer frame para vender.",
  },
  {
    icon: "spark",
    title: "Apps",
    body: "Aplicaciones web y móviles que tu equipo y tus clientes usan a diario.",
  },
  {
    icon: "shield",
    title: "Integraciones seguras",
    body: "En SolvorX guardamos tus datos de forma segura y privada.",
  },
  {
    icon: "gauge",
    title: "Entrega continua",
    body: "Ciclos cortos, métricas visibles y despliegues sin interrumpir el servicio.",
  },
];

export const steps = [
  {
    title: "Descubrimiento",
    body: "Mapeamos el proceso, los sistemas y el resultado que se espera del proyecto.",
  },
  {
    title: "Prototipo",
    body: "En dos semanas hay algo funcionando que se puede probar con usuarios reales.",
  },
  {
    title: "Escala",
    body: "Iteramos, medimos y dejamos el sistema documentado y en manos de tu equipo.",
  },
] as const;

export const faq = [
  {
    question: "¿Cuánto cuesta desarrollar software a medida con SolvorX?",
    answer:
      "Depende del alcance, puedes comunicarte con nosotros por WhatsApp y te daremos un presupuesto personalizado.",
  },
  {
    question: "¿Cuánto tiempo toma un proyecto?",
    answer:
      "El primer prototipo funcional suele estar listo en dos semanas. De ahí iteramos en ciclos cortos hasta escalar el sistema completo, en vez de entregar todo junto al final de un trimestre.",
  },
  {
    question: "¿Ofrecen dominio?",
    answer:
      "Sí, ofrecemos dominio de SolvorX para apps de forma gratuita <b>minegocio.solvorx.app</b> <br> Para dominios personalizados, ofrecemos asistencia en la compra y configuración.",
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
] as const;

export const ctaBanner = {
  title: "Cuéntanos qué necesitas resolver",
  body: "Una conversación por WhatsApp es suficiente para saber si podemos ayudarte y cómo.",
  primary: { label: "Escríbenos al WhatsApp", href: waLink },
  secondary: { label: "Ver servicios", href: "#servicios" },
} as const;

export const footerLinks = [
  {
    title: "Servicios",
    links: [{ label: "Ver servicios", href: "#servicios" }],
  },
  {
    title: "Empresa",
    links: [
      { label: "Cómo trabajamos", href: "#proceso" },
      { label: "Contacto", href: "#contacto" },
      { label: "WhatsApp", href: waLink },
    ],
  },
] as const;