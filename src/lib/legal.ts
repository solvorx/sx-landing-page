/**
 * Términos y condiciones — BASE para revisión legal.
 *
 * Este archivo es la fuente de verdad de los dos documentos legales del sitio:
 * los de SolvorX (`/terminos`, enlazados desde el inicio) y los de DentuX
 * (`/dentux/terminos`, enlazados desde la vista del producto). Los renderiza
 * `components/legal/LegalDoc.tsx`.
 *
 * Pendiente antes de considerarlos definitivos:
 *
 * 1. La cláusula de pagos describe el estado real de hoy — cobros en línea con
 *    pasarela todavía en implementación. Cuando el PSP entre en producción hay
 *    que reescribir esa cláusula (medios de pago, moneda, reintentos,
 *    reembolsos) y mover `updatedAt`.
 * 2. La modalidad de entrega de la sección "Titularidad del software" está
 *    escrita para cubrir las dos opciones (cesión al cliente vs. licencia con
 *    alojamiento propio). Cuando el modelo de negocio se decida, conviene
 *    dejar solo la que aplique.
 */

import { siteConfig, waLink } from "@/lib/site";
import { dentuxConfig } from "@/lib/dentux";

/**
 * Datos del prestador. Es una empresa unipersonal: el titular es una persona
 * física, así que "razón social" es el nombre que figura en el RUC y en el
 * timbrado, no una denominación societaria.
 *
 * Los campos vacíos no se publican (ver `identification`). El domicilio legal
 * vive acá y NO en `siteConfig.address`, que es la ciudad comercial que usan
 * el footer y el JSON-LD.
 */
export const legalEntity = {
  /** Nombre del titular, tal como figura en el RUC. */
  name: "Jessica Alarcon",
  /** RUC con dígito verificador. */
  taxId: "5711437-4",
  /**
   * Cédula de identidad civil. NO se publica: el RUC es la cédula más el
   * dígito verificador, así que una línea aparte no identifica mejor al
   * prestador y repite un documento de identidad de una persona física.
   * Queda acá porque es el dato que se usa para facturación y para el alta
   * ante la pasarela de pagos.
   */
  document: "5711437",
  /** Domicilio legal completo. */
  address: "Pedro Juan Caballero 2767, Fernando de la Mora",
  /**
   * Dirección electrónica del prestador. La exige el art. 7 de la Ley
   * N.º 4868/2013 para el comercio electrónico; por eso se publica en los
   * términos aunque WhatsApp siga siendo el canal de atención habitual.
   *
   * Se muestra como texto plano, sin enlace `mailto:`: es lo primero que
   * buscan los cosechadores de direcciones. Reemplazar por una casilla del
   * dominio en cuanto exista, para no publicar el correo personal.
   */
  email: "jessicala182@gmail.com",
  jurisdiction: "República del Paraguay",
  /**
   * Fernando de la Mora pertenece a la Circunscripción Judicial de Central
   * (Ley N.º 3151, con asiento en San Lorenzo), no a la de Capital: el fuero
   * acompaña al domicilio del prestador en vez de forzar una prórroga a
   * Asunción, que frente a un consumidor podría no sostenerse.
   */
  venue:
    "los tribunales ordinarios de la Circunscripción Judicial de Central, Paraguay",
};

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = {
  /** Ancla del índice: tiene que ser único dentro del documento. */
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  path: string;
  title: string;
  /** Description de la metadata de la página. */
  description: string;
  /** Entradilla, arriba del índice. */
  summary: string;
  /** Fecha de la última revisión del texto (ISO). */
  updatedAt: string;
  sections: LegalSection[];
};

const p = (text: string): LegalBlock => ({ type: "p", text });
const list = (items: string[]): LegalBlock => ({ type: "list", items });

/**
 * Identificación del prestador. WhatsApp es el único canal de contacto
 * habilitado: no hay casilla de correo publicada.
 */
const identification: string[] = [
  `Nombre comercial: ${siteConfig.name}`,
  legalEntity.name && `Razón social: ${legalEntity.name}`,
  legalEntity.taxId && `RUC: ${legalEntity.taxId}`,
  `Domicilio: ${legalEntity.address}, ${legalEntity.jurisdiction}`,
  `WhatsApp: ${siteConfig.whatsapp}`,
  legalEntity.email && `Correo electrónico: ${legalEntity.email}`,
].filter((line): line is string => line.length > 0);

/**
 * OJO al actualizar: la Ley N.º 1682/2001 (que citaba la versión anterior de
 * este documento) fue DEROGADA por la Ley N.º 6534/2020, que a su vez solo
 * regula datos crediticios. El marco general vigente es la Ley N.º 7593/2025,
 * promulgada el 27/11/2025 con dos años de vacatio legis: rige plenamente
 * desde noviembre de 2027, y hasta entonces sirve como estándar de referencia.
 */
const applicableLaw = (subject: string): LegalBlock[] => [
  p(
    `Estas condiciones se rigen por las leyes de la ${legalEntity.jurisdiction}, en particular:`,
  ),
  list([
    "Ley N.º 1334/1998 de Defensa del Consumidor y del Usuario, y sus modificatorias.",
    "Ley N.º 4868/2013 de Comercio Electrónico y su Decreto Reglamentario N.º 1165/2014.",
    "Ley N.º 4017/2010, modificada y ampliada por la Ley N.º 4610/2012, sobre validez jurídica de la firma electrónica, la firma digital, los mensajes de datos y el expediente electrónico.",
    "Ley N.º 1328/1998 de Derecho de Autor y Derechos Conexos, y su Decreto Reglamentario N.º 5159/1999.",
    "Ley N.º 7593/2025 de Protección de Datos Personales, promulgada el 27 de noviembre de 2025. Su plena vigencia opera en noviembre de 2027, tras el plazo de adecuación de dos años que la propia ley establece; hasta entonces la tomamos como estándar de referencia para el tratamiento de datos.",
  ]),
  p(
    `Cualquier controversia relacionada con ${subject} se someterá a ${legalEntity.venue}, sin perjuicio del fuero que corresponda de manera imperativa a quien tenga la calidad de consumidor.`,
  ),
];

const contactSection = (subject: string): LegalSection => ({
  id: "contacto",
  title: "Contacto",
  blocks: [
    p(
      `Para cualquier consulta sobre ${subject}, incluido el ejercicio de derechos sobre datos personales, escribinos por <a href="${waLink}" target="_blank" rel="noreferrer noopener">WhatsApp al ${siteConfig.whatsapp}</a>, que es nuestro canal de atención habitual, o a ${legalEntity.email} si preferís dejar constancia por escrito. Respondemos por el mismo medio en un plazo razonable.`,
    ),
  ],
});

/* ============================ SolvorX ============================ */

export const solvorxTerms: LegalDocument = {
  path: "/terminos",
  title: "Términos y condiciones",
  description: `Términos y condiciones de uso del sitio y de contratación de los servicios de ${siteConfig.name} en Paraguay.`,
  summary: `Estas condiciones regulan el uso de este sitio y la contratación de los servicios de ${siteConfig.name}. Están escritas en lenguaje simple a propósito: si algo no queda claro, preguntanos antes de contratar.`,
  updatedAt: "2026-09-04",
  sections: [
    {
      id: "quienes-somos",
      title: "1. Quiénes somos",
      blocks: [
        p(
          `${siteConfig.name} es un estudio de desarrollo de software con base en ${siteConfig.address.city}, Paraguay. Datos del prestador:`,
        ),
        list(identification),
      ],
    },
    {
      id: "aceptacion",
      title: "2. Aceptación",
      blocks: [
        p(
          `Al navegar este sitio o contratar un servicio de ${siteConfig.name} aceptás estas condiciones en la versión publicada al momento del uso o de la contratación. Si no estás de acuerdo, no uses el sitio ni contrates los servicios.`,
        ),
      ],
    },
    {
      id: "uso-del-sitio",
      title: "3. Uso del sitio",
      blocks: [
        p(
          "El sitio es informativo. Su contenido —textos, imágenes, marcas y código— no puede copiarse, alterarse ni reutilizarse con fines comerciales sin autorización escrita.",
        ),
        p(
          "No está permitido intentar acceder a partes no públicas del sitio, interferir con su funcionamiento ni utilizarlo para enviar contenido ilícito.",
        ),
      ],
    },
    {
      id: "servicios",
      title: "4. Servicios",
      blocks: [
        p(
          "Prestamos servicios de desarrollo de software a medida, aplicaciones web, landing pages, integraciones entre sistemas, automatización de procesos y consultoría tecnológica. También ofrecemos productos propios en modalidad de suscripción.",
        ),
        p(
          "La información publicada en el sitio es descriptiva y no constituye una oferta vinculante: el alcance de cada trabajo se define en la propuesta que enviamos a cada cliente.",
        ),
      ],
    },
    {
      id: "contratacion",
      title: "5. Cómo se contrata",
      blocks: [
        p(
          "El proceso es siempre el mismo: conversamos el problema, enviamos una propuesta escrita con alcance, plazo estimado y precio, y el trabajo empieza cuando esa propuesta queda aceptada.",
        ),
        p(
          "La aceptación se hace por WhatsApp. Conforme a la Ley N.º 4017/2010, esa conformidad por medios electrónicos tiene plena validez entre las partes.",
        ),
        p(
          "Lo que no está descrito en la propuesta aceptada no está incluido. Todo pedido adicional se cotiza aparte antes de ejecutarse.",
        ),
      ],
    },
    {
      id: "precios-y-pagos",
      title: "6. Precios, pagos y facturación",
      blocks: [
        p(
          "Los precios se informan en la propuesta, en guaraníes o en dólares estadounidenses según se acuerde, e indican si incluyen o no el IVA.",
        ),
        p(
          "<b>Estado actual de los cobros:</b> todavía estamos integrando una pasarela de pagos. Hasta que esté disponible, los pagos se realizan por transferencia bancaria o por el medio que se acuerde por escrito en la propuesta. Cuando habilitemos el pago en línea, actualizaremos esta cláusula con los medios de pago, la moneda y las condiciones de reembolso aplicables.",
        ),
        p(
          "Emitimos comprobante legal por cada pago. La demora en un pago habilita a suspender los trabajos en curso hasta su regularización, previo aviso.",
        ),
      ],
    },
    {
      id: "plazos",
      title: "7. Plazos y colaboración",
      blocks: [
        p(
          "Los plazos que damos son estimados y se calculan asumiendo una colaboración razonable del cliente: accesos, contenidos, definiciones y respuestas dentro de los tiempos acordados.",
        ),
        p(
          "Las demoras en esas entregas por parte del cliente corren el cronograma en la misma medida, sin costo adicional para ninguna de las partes.",
        ),
      ],
    },
    {
      id: "titularidad-y-licencia",
      title: "8. Titularidad del software, licencia y alojamiento",
      blocks: [
        p(
          "Cada propuesta indica bajo cuál de estas dos modalidades se entrega el trabajo. Se define antes de empezar, porque cambia qué se lleva el cliente al terminar:",
        ),
        list([
          "<b>Desarrollo con cesión.</b> Pagado el precio total acordado, el cliente pasa a ser titular del código y de los entregables desarrollados específicamente para su proyecto, y puede alojarlos donde quiera.",
          `<b>Licencia con servicio administrado.</b> ${siteConfig.name} conserva la titularidad del código y opera la infraestructura —servidores, dominios, certificados y respaldos—. El cliente recibe una licencia de uso no exclusiva e intransferible, vigente mientras esté vigente el servicio y al día la cuota periódica que la propuesta indique.`,
        ]),
        p(
          "Conforme a la Ley N.º 1328/1998 de Derecho de Autor y Derechos Conexos, en una obra creada por encargo la titularidad de los derechos patrimoniales es la que las partes acuerden. Por eso manda lo que diga la propuesta aceptada: si no dice nada sobre este punto, se entiende contratada la modalidad de licencia con servicio administrado.",
        ),
        p(
          `Quedan excluidos de toda cesión los componentes, librerías y herramientas propias de ${siteConfig.name} reutilizables entre proyectos, y el software de terceros, que se rige por su propia licencia. Sobre esos componentes el cliente recibe una licencia de uso perpetua, no exclusiva e intransferible para operar su solución.`,
        ),
        p(
          "<b>Los datos son siempre del cliente</b>, en cualquiera de las dos modalidades y con independencia de quién aloje el sistema. Al terminar la relación puede pedir una copia completa en un formato de uso corriente dentro de los treinta (30) días corridos siguientes.",
        ),
        p(
          `Si ${siteConfig.name} deja de prestar el servicio administrado, avisará con una antelación mínima de sesenta (60) días corridos y acompañará la migración entregando los datos y la documentación necesaria para operar el sistema en otra infraestructura.`,
        ),
        p(
          `Salvo indicación en contrario del cliente, ${siteConfig.name} puede mencionar el proyecto como referencia comercial, sin revelar información confidencial.`,
        ),
      ],
    },
    {
      id: "confidencialidad",
      title: "9. Confidencialidad",
      blocks: [
        p(
          "Toda la información no pública que las partes intercambien durante un proyecto es confidencial y no se comparte con terceros, salvo obligación legal o autorización escrita. Esta obligación sigue vigente después de terminado el proyecto.",
        ),
      ],
    },
    {
      id: "datos-personales",
      title: "10. Datos personales",
      blocks: [
        p(
          "Los datos de contacto que nos envíes por WhatsApp se usan únicamente para responder tu consulta y gestionar la eventual relación comercial. No los vendemos ni los cedemos con fines publicitarios.",
        ),
        p(
          "Cuando en el marco de un proyecto tratamos datos personales que son del cliente, lo hacemos siguiendo sus instrucciones y solo para prestar el servicio contratado, alineados con la Ley N.º 7593/2025 de Protección de Datos Personales.",
        ),
        p(
          `Podés pedir el acceso, la rectificación o la supresión de tus datos escribiéndonos por <a href="${waLink}" target="_blank" rel="noreferrer noopener">WhatsApp al ${siteConfig.whatsapp}</a> o a ${legalEntity.email}.`,
        ),
      ],
    },
    {
      id: "garantia",
      title: "11. Garantía y soporte",
      blocks: [
        p(
          "Corregimos sin costo los defectos atribuibles a nuestro desarrollo que se reporten dentro del plazo de garantía indicado en la propuesta.",
        ),
        p(
          "No están cubiertos por la garantía: nuevas funcionalidades, cambios de alcance, fallas causadas por modificaciones hechas por terceros, ni caídas de servicios externos ajenos a nuestro control.",
        ),
      ],
    },
    {
      id: "responsabilidad",
      title: "12. Limitación de responsabilidad",
      blocks: [
        p(
          `${siteConfig.name} responde por los daños directos comprobados que resulten de su incumplimiento, con un límite equivalente al monto efectivamente pagado por el cliente en los últimos doce meses por el servicio involucrado.`,
        ),
        p(
          "No respondemos por lucro cesante, pérdida de datos imputable a terceros, ni por interrupciones de servicios de infraestructura, conectividad o proveedores externos.",
        ),
        p(
          "Ninguna cláusula de este documento limita los derechos que la ley reconoce de forma imperativa a los consumidores.",
        ),
      ],
    },
    {
      id: "productos",
      title: "13. Productos del ecosistema",
      blocks: [
        p(
          `Además de los proyectos a medida, ofrecemos productos propios en modalidad de suscripción. <b>${dentuxConfig.name}</b>, nuestro software de gestión para clínicas odontológicas, se rige por sus propias condiciones: <a href="${dentuxConfig.termsPath}">términos y condiciones de ${dentuxConfig.name}</a>. En caso de contradicción entre ambos documentos, prevalecen las condiciones específicas del producto.`,
        ),
      ],
    },
    {
      id: "cambios",
      title: "14. Cambios en estas condiciones",
      blocks: [
        p(
          "Podemos actualizar estas condiciones. La versión vigente es siempre la publicada en esta página, con su fecha de última actualización. Los cambios no afectan de manera retroactiva a proyectos ya contratados, que se rigen por la versión aceptada al momento de la contratación.",
        ),
      ],
    },
    {
      id: "ley-aplicable",
      title: "15. Ley aplicable y jurisdicción",
      blocks: applicableLaw("estas condiciones"),
    },
    { ...contactSection("estas condiciones"), title: "16. Contacto" },
  ],
};

/* ============================= DentuX ============================= */

export const dentuxTerms: LegalDocument = {
  path: dentuxConfig.termsPath,
  title: `Términos y condiciones de ${dentuxConfig.name}`,
  description: `Condiciones de uso y contratación de ${dentuxConfig.name}, el software de gestión para clínicas odontológicas de ${siteConfig.name}.`,
  summary: `Estas condiciones regulan el uso de ${dentuxConfig.name}, el servicio de gestión odontológica de ${siteConfig.name}. Complementan los <a href="${solvorxTerms.path}">términos generales de ${siteConfig.name}</a>; ante una diferencia, manda este documento.`,
  updatedAt: "2026-09-04",
  sections: [
    {
      id: "partes",
      title: "1. Partes y aceptación",
      blocks: [
        p(
          `El servicio lo presta ${siteConfig.name} (el "prestador"), con los datos de identificación publicados en sus <a href="${solvorxTerms.path}#quienes-somos">términos generales</a>. Lo contrata una clínica odontológica o un profesional independiente (el "cliente" o la "organización").`,
        ),
        p(
          `Al crear una organización en ${dentuxConfig.name} o al usar el servicio, el cliente acepta estas condiciones. Quien acepta declara tener facultades para obligar a la organización que representa.`,
        ),
      ],
    },
    {
      id: "el-servicio",
      title: "2. Qué es el servicio",
      blocks: [
        p(
          `${dentuxConfig.name} es un software de gestión que se usa desde el navegador e incluye agenda por profesional, ficha de pacientes, gestión del equipo, recordatorios automáticos de citas y un portal donde el paciente consulta y gestiona su turno.`,
        ),
        p(
          `<b>Qué no es:</b> ${dentuxConfig.name} es una herramienta administrativa. No es un producto sanitario ni un dispositivo médico, no emite diagnósticos, no sustituye el criterio del profesional y no reemplaza los registros clínicos ni los libros que la normativa sanitaria exija llevar a la organización.`,
        ),
      ],
    },
    {
      id: "cuentas",
      title: "3. Cuentas, usuarios y accesos",
      blocks: [
        p(
          `El acceso al panel de la organización se hace con una cuenta del ecosistema ${siteConfig.name}. La organización decide a qué personas invita y con qué permisos.`,
        ),
        list([
          "Cada usuario es responsable de su credencial y no debe compartirla.",
          "La organización debe dar de baja el acceso de quien deje de formar parte del equipo.",
          "Los accesos del paciente son enlaces de un solo uso enviados a su contacto verificado: no crean una cuenta ni requieren contraseña.",
          "Cualquier actividad realizada desde un acceso de la organización se considera hecha por ella.",
        ]),
        p(
          "Avisanos de inmediato ante cualquier uso no autorizado que detectes.",
        ),
      ],
    },
    {
      id: "planes",
      title: "4. Planes y cupos",
      blocks: [
        p(
          `${dentuxConfig.name} se ofrece en planes. Cada plan incluye un cupo de mensajes de recordatorio por ciclo de facturación, diferenciado por canal (correo electrónico y SMS). El cupo se renueva al inicio de cada ciclo y lo no consumido no se acumula.`,
        ),
        p(
          "Cuando el cupo del ciclo se agota, la organización puede comprar saldo adicional de mensajes. Ese saldo es plata ya pagada: no vence al cerrar el ciclo y se conserva ante un cambio o una baja de plan. Se consume después de agotado el cupo del plan.",
        ),
        p(
          "Agotados el cupo y el saldo, los recordatorios automáticos dejan de enviarse hasta el ciclo siguiente o hasta que se compre saldo. El resto del servicio sigue funcionando con normalidad.",
        ),
      ],
    },
    {
      id: "pagos",
      title: "5. Pagos y facturación",
      blocks: [
        p(
          "<b>Estado actual:</b> los pagos en línea están en implementación con una pasarela de pagos local. Hasta que se habiliten, el alta, el cambio de plan y la compra de saldo se coordinan por WhatsApp y se abonan por el medio que se acuerde por escrito. Los precios vigentes se informan antes de contratar.",
        ),
        p(
          "Cuando el pago en línea entre en funcionamiento, actualizaremos esta cláusula con los medios de pago aceptados, la moneda, la periodicidad del cobro, los reintentos ante un rechazo y las condiciones de reembolso, y lo comunicaremos a las organizaciones activas antes de aplicarlo.",
        ),
        p(
          "Por cada pago se emite el comprobante legal correspondiente. Los impuestos aplicables se indican en el precio informado.",
        ),
      ],
    },
    {
      id: "vigencia",
      title: "6. Vigencia, mora y baja",
      blocks: [
        p(
          "La suscripción se renueva por períodos sucesivos mientras no se solicite la baja. La organización puede darse de baja en cualquier momento; la baja se hace efectiva al final del período ya pagado, sin devolución proporcional salvo que la ley disponga otra cosa.",
        ),
        p(
          "Ante una falta de pago se aplica un período de gracia durante el cual el servicio sigue disponible. Superado ese plazo, la suscripción se degrada al plan gratuito: se conservan los datos y el acceso al panel, y se pierden los beneficios del plan pago.",
        ),
        p(
          "Podemos suspender el servicio, con aviso previo, ante una falta de pago sostenida o un incumplimiento grave de estas condiciones.",
        ),
      ],
    },
    {
      id: "uso-aceptable",
      title: "7. Uso aceptable",
      blocks: [
        p("La organización se compromete a no utilizar el servicio para:"),
        list([
          "Cargar datos de personas sin base legal para tratarlos.",
          "Enviar comunicaciones no solicitadas o ajenas a la atención odontológica.",
          "Intentar acceder a datos de otras organizaciones o vulnerar los mecanismos de seguridad.",
          "Revender, sublicenciar o dar acceso al servicio a terceros ajenos a su equipo.",
          "Realizar actividades que degraden el rendimiento del servicio para otros clientes.",
        ]),
      ],
    },
    {
      id: "datos-de-pacientes",
      title: "8. Datos de pacientes",
      blocks: [
        p(
          "Los datos de los pacientes son de la organización. Ella es la responsable de esos datos: define qué carga, con qué finalidad y por cuánto tiempo, y es quien debe contar con el consentimiento o la base legal correspondiente.",
        ),
        p(
          `${siteConfig.name} actúa como encargado del tratamiento: trata esos datos únicamente para prestar el servicio y siguiendo las instrucciones de la organización. No los vende, no los cede a terceros con fines comerciales ni los usa para publicidad.`,
        ),
        p(
          "Los datos vinculados a la salud son datos sensibles y reciben el tratamiento reforzado que exige la normativa aplicable: la Ley N.º 7593/2025 de Protección de Datos Personales y las obligaciones de confidencialidad del Código Sanitario (Ley N.º 836/1980).",
        ),
        p(
          "Para prestar el servicio nos apoyamos en proveedores de infraestructura y de envío de mensajes, que acceden a los datos solo en lo necesario y bajo obligación de confidencialidad.",
        ),
      ],
    },
    {
      id: "comunicaciones",
      title: "9. Recordatorios y comunicaciones al paciente",
      blocks: [
        p(
          "Los recordatorios se envían en nombre de la organización, a los contactos que ella cargó. Es responsabilidad de la organización que esos contactos sean correctos y que el paciente haya prestado su conformidad para recibirlos.",
        ),
        p(
          "El envío depende de operadores y proveedores externos: no garantizamos la entrega ni el momento exacto de recepción de cada mensaje, ni respondemos por una cita perdida por una falla de entrega ajena a nuestro control.",
        ),
      ],
    },
    {
      id: "seguridad",
      title: "10. Seguridad y confidencialidad",
      blocks: [
        p(
          "Aplicamos medidas técnicas y organizativas razonables para proteger la información: cifrado en tránsito, control de accesos por organización, sesiones revocables y registros de actividad.",
        ),
        p(
          "Ningún sistema es infalible. Si ocurriera un incidente de seguridad que afecte datos de la organización, se lo comunicaremos sin demora indebida junto con la información disponible y las medidas adoptadas.",
        ),
      ],
    },
    {
      id: "disponibilidad",
      title: "11. Disponibilidad y soporte",
      blocks: [
        p(
          "Trabajamos para que el servicio esté disponible de forma continua, pero no comprometemos un nivel de disponibilidad garantizado (SLA) en esta etapa del producto.",
        ),
        p(
          "Podemos realizar tareas de mantenimiento; cuando impliquen una interrupción previsible, avisaremos con antelación razonable.",
        ),
        p(
          `El soporte se brinda por WhatsApp, en días hábiles y en horario comercial de ${legalEntity.jurisdiction}.`,
        ),
      ],
    },
    {
      id: "propiedad-intelectual",
      title: "12. Propiedad intelectual",
      blocks: [
        p(
          `${dentuxConfig.name}, su código, su diseño y su marca son de ${siteConfig.name}. El cliente recibe una licencia de uso no exclusiva, intransferible y limitada a la vigencia de su suscripción.`,
        ),
        p(
          "El contenido que la organización carga sigue siendo suyo. Nos autoriza a alojarlo y procesarlo en la medida necesaria para prestar el servicio.",
        ),
      ],
    },
    {
      id: "terminacion",
      title: "13. Terminación y datos al finalizar",
      blocks: [
        p(
          "Al terminar la relación, la organización puede solicitar una copia de sus datos en un formato de uso corriente dentro de los treinta (30) días corridos siguientes.",
        ),
        p(
          "Vencido ese plazo, procedemos a eliminar o anonimizar los datos, salvo aquellos que debamos conservar por una obligación legal o contable.",
        ),
      ],
    },
    {
      id: "cambios",
      title: "14. Cambios en el servicio y en estas condiciones",
      blocks: [
        p(
          `${dentuxConfig.name} es un producto en evolución: podemos agregar, modificar o discontinuar funcionalidades. Si un cambio reduce de forma sustancial el servicio contratado, lo avisaremos con antelación razonable y la organización podrá darse de baja sin penalidad.`,
        ),
        p(
          "La versión vigente de estas condiciones es la publicada en esta página, con su fecha de última actualización.",
        ),
      ],
    },
    {
      id: "responsabilidad",
      title: "15. Limitación de responsabilidad",
      blocks: [
        p(
          "Nuestra responsabilidad total frente a la organización se limita al monto efectivamente pagado por el servicio en los doce (12) meses anteriores al hecho que la origine.",
        ),
        p(
          "No respondemos por decisiones clínicas o administrativas tomadas a partir de la información del sistema, por lucro cesante, ni por daños derivados del uso indebido del servicio o de la pérdida de credenciales por parte de la organización.",
        ),
        p(
          "Ninguna cláusula de este documento limita los derechos que la ley reconoce de forma imperativa a los consumidores.",
        ),
      ],
    },
    {
      id: "ley-aplicable",
      title: "16. Ley aplicable y jurisdicción",
      blocks: applicableLaw("el uso de " + dentuxConfig.name),
    },
    { ...contactSection(dentuxConfig.name), title: "17. Contacto" },
  ],
};

export const legalDocuments = [solvorxTerms, dentuxTerms];
