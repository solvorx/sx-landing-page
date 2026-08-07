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
  locale: "es_ES",
  tagline: "Software e inteligencia artificial a la medida de tu operación",
  description:
    "SolvorX diseña y desarrolla software a medida, automatizaciones e integraciones de inteligencia artificial para empresas que necesitan resolver problemas reales de negocio.",
  keywords: [
    "desarrollo de software a medida",
    "inteligencia artificial para empresas",
    "automatización de procesos",
    "integraciones de sistemas",
    "consultoría tecnológica",
    "SolvorX",
  ],
  email: "hola@solvorx.com",
  address: {
    street: "Calle Falsa 123",
    city: "Ciudad de México",
    country: "MX",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/solvorx",
    x: "https://x.com/solvorx",
    github: "https://github.com/solvorx",
  },
} as const;

export const nav = [
  { label: "Servicios", href: "#servicios" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Preguntas", href: "#faq" },
] as const;

export const hero = {
  title: "Construimos el software que tu negocio necesita",
  body: "Diseño, desarrollo e inteligencia artificial aplicada. Un equipo que se integra al tuyo y entrega en semanas, no en trimestres.",
  cta: { label: "Agenda una llamada", href: "#contacto" },
} as const;

export const showcase = {
  eyebrow: "En 90 segundos",
  title: "Así se ve trabajar con SolvorX",
  body: "Un recorrido corto por la forma en que descubrimos, prototipamos y lanzamos producto junto a nuestros clientes.",
  src: "/media/demo.mp4",
} as const;

export type Feature = {
  icon: "spark" | "layers" | "shield" | "gauge";
  title: string;
  body: string;
};

export const features: Feature[] = [
  {
    icon: "spark",
    title: "IA aplicada",
    body: "Asistentes, clasificación y extracción de datos conectados a tus sistemas reales.",
  },
  {
    icon: "layers",
    title: "Producto a medida",
    body: "Plataformas web y móviles diseñadas alrededor de tu operación, no de una plantilla.",
  },
  {
    icon: "shield",
    title: "Integraciones seguras",
    body: "APIs, ERPs y pasarelas conectadas con trazabilidad y control de accesos.",
  },
  {
    icon: "gauge",
    title: "Entrega continua",
    body: "Ciclos cortos, métricas visibles y despliegues sin interrumpir el servicio.",
  },
];

export type BentoCard = {
  title: string;
  body: string;
  tint: "blue" | "teal" | "magenta" | "amber" | "ink";
  span: "wide" | "tall" | "base";
};

export const bento: BentoCard[] = [
  {
    title: "Automatización de procesos",
    body: "Flujos que eliminan el trabajo repetitivo entre áreas y sistemas que no se hablan.",
    tint: "blue",
    span: "base",
  },
  {
    title: "Analítica y reportes",
    body: "Tableros con la información que realmente se usa para decidir, actualizada al día.",
    tint: "teal",
    span: "base",
  },
  {
    title: "Agentes con IA",
    body: "Copilotos internos entrenados con tu documentación y tus reglas de negocio.",
    tint: "magenta",
    span: "tall",
  },
  {
    title: "Portales de cliente",
    body: "Autoservicio, cotizaciones y seguimiento en una experiencia propia de tu marca.",
    tint: "amber",
    span: "base",
  },
  {
    title: "Modernización de legado",
    body: "Migramos sistemas críticos por partes, sin apagar la operación en el camino.",
    tint: "ink",
    span: "wide",
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

export const ctaBanner = {
  title: "Cuéntanos qué necesitas resolver",
  body: "Una llamada de 30 minutos es suficiente para saber si podemos ayudarte y cómo.",
  primary: { label: "Agenda una llamada", href: "#contacto" },
  secondary: { label: "Ver servicios", href: "#servicios" },
} as const;

export const faq = [
  {
    q: "¿Qué tipo de proyectos toma SolvorX?",
    a: "Desarrollamos plataformas web, aplicaciones internas, integraciones entre sistemas y soluciones de inteligencia artificial aplicadas a procesos de negocio concretos.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Un prototipo funcional suele estar listo en dos a cuatro semanas. Un producto completo en producción, entre tres y seis meses según el alcance.",
  },
  {
    q: "¿Trabajan con equipos internos?",
    a: "Sí. Nos integramos a tus procesos y herramientas, y dejamos el código y la documentación en tu poder desde el primer día.",
  },
  {
    q: "¿Cómo se estructura el costo?",
    a: "Trabajamos por fases con alcance y precio cerrados, o por equipo dedicado cuando el proyecto es de largo plazo.",
  },
  {
    q: "¿Qué pasa después del lanzamiento?",
    a: "Ofrecemos soporte y evolución continua, con acuerdos de servicio adaptados a la criticidad del sistema.",
  },
  {
    q: "¿Con qué tecnologías trabajan?",
    a: "Principalmente TypeScript, React, Next.js, Python y servicios en la nube, además de los modelos de lenguaje más adecuados para cada caso.",
  },
] as const;

export const footerLinks = [
  {
    title: "Servicios",
    links: [
      { label: "Software a medida", href: "#servicios" },
      { label: "Inteligencia artificial", href: "#servicios" },
      { label: "Integraciones", href: "#servicios" },
      { label: "Automatización", href: "#soluciones" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Cómo trabajamos", href: "#proceso" },
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Aviso de privacidad", href: "#" },
      { label: "Términos de servicio", href: "#" },
    ],
  },
] as const;
