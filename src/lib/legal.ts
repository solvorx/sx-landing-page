/**
 * Términos y condiciones — BASE para revisión legal.
 *
 * Este archivo es la fuente de verdad de los dos documentos legales del sitio:
 * los de SolvorX (`/terminos`, enlazados desde el inicio) y los de DentuX
 * (`/dentux/terminos`, enlazados desde la vista del producto). Los renderiza
 * `components/legal/LegalDoc.tsx`.
 *
 * Espejos de otros repos (si cambian allá, cambian acá y se mueve `updatedAt`):
 *
 * - Límites de cada plan de DentuX: salen de `dentuxPlans` (`lib/dentux.ts`),
 *   que a su vez espeja `billing.plan` de `sx-dentux-service`.
 * - Plazos de la suscripción (`subscriptionPolicy`): son la política del
 *   proyecto de pago `dentux` en `sx-payment-service` (`PaymentProject`:
 *   gracia, mora, anticipación del cobro y aviso de suba de precio).
 * - Medios de pago: hoy solo transferencia con confirmación manual. Cuando
 *   Pagopar quede habilitado para servicios virtuales, sumarlo a
 *   las cláusulas de medios de pago de los dos documentos y revisar la de
 *   reintentos.
 *
 * Pendiente antes de considerarlos definitivos:
 *
 * 1. La modalidad de entrega de la sección "Titularidad del software" está
 *    escrita para cubrir las dos opciones (cesión al cliente vs. licencia con
 *    alojamiento propio). Cuando el modelo de negocio se decida, conviene
 *    dejar solo la que aplique.
 */

import { siteConfig, waLink } from "@/lib/site";
import { dentuxConfig, dentuxPlans } from "@/lib/dentux";

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

/**
 * Política de suscripción del proyecto de pago `dentux` en sx-payment. Se
 * copia a cada suscripción al darse de alta, así que bajar un plazo allá no
 * alcanza a quien ya estaba suscripto: acá se publica el valor vigente para
 * las altas nuevas.
 */
const subscriptionPolicy = {
  graceDays: 5,
  dueDays: 15,
  billingLeadDays: 5,
  priceChangeNoticeDays: 30,
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("es-PY").format(value);

const planLimits: string[] = dentuxPlans.map((plan) => {
  const users =
    plan.maxUsers === 1
      ? "1 usuario con acceso"
      : `hasta ${plan.maxUsers} usuarios con acceso`;
  return `<b>${plan.name}:</b> ${users}, hasta ${formatNumber(plan.maxAppointmentsPerMonth)} turnos por mes y ${formatNumber(plan.quota.email)} recordatorios por correo electrónico por ciclo.`;
});

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
  updatedAt: "2026-09-30",
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
          "<b>Proyectos a medida.</b> Los precios se informan en la propuesta, en guaraníes o en dólares estadounidenses según se acuerde, e indican si incluyen o no el IVA. Se pagan por transferencia bancaria o por el medio que la propuesta indique.",
        ),
        p(
          "<b>Productos por suscripción.</b> Se contratan y se pagan en línea, a través del checkout de pagos descrito en la cláusula siguiente. Cada producto publica sus propias condiciones de planes, renovación y baja.",
        ),
        p(
          "Emitimos comprobante legal por cada pago, a nombre de los datos de facturación que indique quien paga. La demora en un pago habilita a suspender los trabajos en curso hasta su regularización, previo aviso.",
        ),
      ],
    },
    {
      id: "pagos-en-linea",
      title: "7. Pagos en línea",
      blocks: [
        p(
          `${siteConfig.name} opera un checkout propio para cobrar sus productos. Antes de confirmar, el checkout muestra quién cobra, el concepto, el importe y la moneda. El pago queda registrado recién cuando se confirma en el checkout: abrir el enlace no genera ningún cargo.`,
        ),
        list([
          `Para pagar hace falta una cuenta de ${siteConfig.name}. Quien paga puede ser una persona distinta de quien recibe el servicio —por ejemplo, el contador de una clínica—.`,
          "Cada enlace de pago tiene un vencimiento que se informa en la misma pantalla. Vencido, hay que iniciar la compra de nuevo.",
          "<b>Medios de pago habilitados hoy:</b> transferencia bancaria. El checkout muestra los datos de la cuenta, y el pago se confirma de forma manual al verificar la acreditación, en días hábiles. Hasta esa confirmación, lo comprado no se activa.",
          `Cuando se habiliten pagos con tarjeta u otros medios en línea, los procesará una procesadora de pagos habilitada en Paraguay, bajo sus propias condiciones. ${siteConfig.name} no es una entidad financiera ni una procesadora de pagos, y no recibe ni almacena los datos de tarjetas.`,
          `En la sección de pagos de tu cuenta de ${siteConfig.name} podés consultar los pagos y las suscripciones que hiciste por este checkout.`,
        ]),
        p(
          `Si un pago se acredita dos veces o por un importe mayor al debido por un error, lo devolvemos por transferencia a la cuenta de origen dentro de los treinta (30) días corridos siguientes a que se verifique. Si contratás como consumidor, conservás además los derechos que te reconoce la Ley N.º 1334/1998, incluido el de arrepentimiento en los casos y los plazos que ella fija.`,
        ),
      ],
    },
    {
      id: "cuenta",
      title: `8. Cuenta de ${siteConfig.name}`,
      blocks: [
        p(
          `Una misma cuenta de ${siteConfig.name} da acceso a todos los productos del ecosistema: la persona se identifica por su correo electrónico, y cada producto decide después a qué organizaciones y con qué permisos entra.`,
        ),
        list([
          "Cada persona es responsable de mantener su acceso bajo su control y de no compartirlo.",
          "Los datos de la cuenta deben ser verdaderos y mantenerse actualizados.",
          "Podemos suspender una cuenta usada para fraude, para suplantar a otra persona o para vulnerar la seguridad del servicio.",
        ]),
      ],
    },
    {
      id: "plazos",
      title: "9. Plazos y colaboración",
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
      title: "10. Titularidad del software, licencia y alojamiento",
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
      title: "11. Confidencialidad",
      blocks: [
        p(
          "Toda la información no pública que las partes intercambien durante un proyecto es confidencial y no se comparte con terceros, salvo obligación legal o autorización escrita. Esta obligación sigue vigente después de terminado el proyecto.",
        ),
      ],
    },
    {
      id: "datos-personales",
      title: "12. Datos personales",
      blocks: [
        p(
          "Los datos de contacto que nos envíes por WhatsApp se usan únicamente para responder tu consulta y gestionar la eventual relación comercial. No los vendemos ni los cedemos con fines publicitarios.",
        ),
        p(
          "Cuando en el marco de un proyecto tratamos datos personales que son del cliente, lo hacemos siguiendo sus instrucciones y solo para prestar el servicio contratado, alineados con la Ley N.º 7593/2025 de Protección de Datos Personales.",
        ),
        p(
          `Para cobrar, el checkout registra de quien paga su nombre, correo electrónico, documento de identidad o RUC y teléfono. Los usamos para registrar el pago, emitir el comprobante y, cuando el medio elegido lo requiera, identificar a quien paga ante la procesadora de pagos, que recibe solo los datos necesarios para esa operación.`,
        ),
        p(
          `Podés pedir el acceso, la rectificación o la supresión de tus datos escribiéndonos por <a href="${waLink}" target="_blank" rel="noreferrer noopener">WhatsApp al ${siteConfig.whatsapp}</a> o a ${legalEntity.email}.`,
        ),
      ],
    },
    {
      id: "garantia",
      title: "13. Garantía y soporte",
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
      title: "14. Limitación de responsabilidad",
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
      title: "15. Productos del ecosistema",
      blocks: [
        p(
          `Además de los proyectos a medida, ofrecemos productos propios en modalidad de suscripción. <b>${dentuxConfig.name}</b>, nuestro software de gestión para clínicas odontológicas, se rige por sus propias condiciones: <a href="${dentuxConfig.termsPath}">términos y condiciones de ${dentuxConfig.name}</a>. En caso de contradicción entre ambos documentos, prevalecen las condiciones específicas del producto.`,
        ),
      ],
    },
    {
      id: "cambios",
      title: "16. Cambios en estas condiciones",
      blocks: [
        p(
          "Podemos actualizar estas condiciones. La versión vigente es siempre la publicada en esta página, con su fecha de última actualización. Los cambios no afectan de manera retroactiva a proyectos ya contratados, que se rigen por la versión aceptada al momento de la contratación.",
        ),
      ],
    },
    {
      id: "ley-aplicable",
      title: "17. Ley aplicable y jurisdicción",
      blocks: applicableLaw("estas condiciones"),
    },
    { ...contactSection("estas condiciones"), title: "18. Contacto" },
  ],
};

/* ============================= DentuX ============================= */

export const dentuxTerms: LegalDocument = {
  path: dentuxConfig.termsPath,
  title: `Términos y condiciones de ${dentuxConfig.name}`,
  description: `Condiciones de uso y contratación de ${dentuxConfig.name}, el software de gestión para clínicas odontológicas de ${siteConfig.name}.`,
  summary: `Estas condiciones regulan el uso de ${dentuxConfig.name}, el servicio de gestión odontológica de ${siteConfig.name}. Complementan los <a href="${solvorxTerms.path}">términos generales de ${siteConfig.name}</a>; ante una diferencia, manda este documento.`,
  updatedAt: "2026-09-30",
  sections: [
    {
      id: "partes",
      title: "1. Partes y aceptación",
      blocks: [
        p(
          `El servicio lo presta ${siteConfig.name} (el "prestador"), con los datos de identificación publicados en sus <a href="${solvorxTerms.path}#quienes-somos">términos generales</a>. Lo contrata una clínica odontológica o un profesional independiente (el "cliente" o la "organización").`,
        ),
        p(
          `Al crear una organización en ${dentuxConfig.name}, al usar el servicio o al confirmar una compra en el checkout, el cliente acepta estas condiciones en la versión publicada en ese momento. Quien acepta declara tener facultades para obligar a la organización que representa.`,
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
          `El acceso al panel de la organización se hace con una <a href="${solvorxTerms.path}#cuenta">cuenta de ${siteConfig.name}</a>. La organización decide a qué personas invita, con qué permisos y en qué orden, que es el que define quiénes entran dentro del límite de usuarios de su plan.`,
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
      title: "4. Planes y límites",
      blocks: [
        p(
          `${dentuxConfig.name} se ofrece en planes. Agenda, pacientes, portal del paciente, recordatorios automáticos y la compra de packs de mensajes están en todos; lo que cambia entre planes son estos límites:`,
        ),
        list(planLimits),
        p(
          "<b>Usuarios con acceso.</b> Cuentan las personas habilitadas de la organización, en el orden de la lista de usuarios que la organización administra; las deshabilitadas no ocupan lugar. Si hay más personas habilitadas que las que el plan permite, entran las primeras de la lista y el resto queda sin acceso hasta que se libere un lugar, se cambie el orden o se contrate un plan mayor. El cambio de plan aplica a este límite en el momento.",
        ),
        p(
          "<b>Turnos por mes.</b> Se cuentan por mes calendario, según la fecha del turno. Una serie de turnos recurrentes cuenta como un solo turno. Alcanzado el tope, no se pueden agendar turnos nuevos para ese mes —ni desde el panel ni desde el portal del paciente—, y los ya agendados siguen igual.",
        ),
        p(
          "<b>Recordatorios.</b> Hoy se envían por correo electrónico. El cupo de cada plan se renueva al inicio de cada ciclo y lo no consumido no se acumula. Agotados el cupo y el saldo de mensajes comprado, los recordatorios automáticos dejan de enviarse hasta el ciclo siguiente o hasta que se compre saldo; el resto del servicio sigue funcionando con normalidad.",
        ),
      ],
    },
    {
      id: "saldo-de-mensajes",
      title: "5. Saldo de mensajes",
      blocks: [
        p(
          "Además del cupo del plan, la organización puede comprar packs de mensajes de recordatorio con cualquier plan, incluido el gratuito. Cada pack es un pago único, no una suscripción:",
        ),
        list([
          "El saldo comprado se acredita cuando se confirma el pago.",
          "Se consume después de agotado el cupo del plan.",
          "No vence al cerrar el ciclo y se conserva ante un cambio o una baja de plan.",
          "Es de la organización a la que se acreditó: no se transfiere a otra organización ni se canjea por dinero.",
        ]),
      ],
    },
    {
      id: "precios",
      title: "6. Precios",
      blocks: [
        p(
          "Los precios se expresan en guaraníes y se muestran en el panel y en el checkout antes de confirmar cada compra. Los impuestos aplicables se indican junto al precio.",
        ),
        p(
          `El importe de una suscripción queda fijado al contratarla. Si aumentamos el precio de un plan, lo comunicamos a las organizaciones suscriptas con al menos ${subscriptionPolicy.priceChangeNoticeDays} días corridos de anticipación, y el nuevo importe recién se aplica al primer período que empiece después de ese plazo. Quien no esté de acuerdo puede darse de baja antes, sin penalidad.`,
        ),
        p(
          `Podemos ofrecer precios promocionales —por ejemplo, para las primeras organizaciones que adopten ${dentuxConfig.name}—. Sus condiciones y su duración se informan al otorgarlos. Si la promoción tiene fecha de fin, al terminar se aplica el precio de lista con el mismo aviso previo.`,
        ),
      ],
    },
    {
      id: "pagos",
      title: "7. Cómo se paga",
      blocks: [
        p(
          `Los planes y los packs se contratan desde el panel de ${dentuxConfig.name} y se pagan en el checkout de ${siteConfig.name}, que se rige por la cláusula de <a href="${solvorxTerms.path}#pagos-en-linea">pagos en línea</a> de los términos generales:`,
        ),
        list([
          `Para pagar hace falta una cuenta de ${siteConfig.name}. Quien paga puede ser una persona distinta de la organización que recibe el plan.`,
          "Abrir el enlace de pago no genera ningún cargo: la compra queda registrada al confirmarla en el checkout. Cada enlace tiene un vencimiento que se muestra en la misma pantalla.",
          "<b>Medio de pago habilitado hoy:</b> transferencia bancaria, con confirmación manual al verificar la acreditación, en días hábiles. Hasta esa confirmación, ni el plan ni el saldo se activan.",
          "Cuando se habiliten pagos con tarjeta u otros medios en línea, los informaremos en el checkout y en esta cláusula.",
        ]),
        p(
          "Por cada pago se emite el comprobante legal correspondiente, a nombre de los datos de facturación que indique quien paga.",
        ),
      ],
    },
    {
      id: "vigencia",
      title: "8. Renovación y falta de pago",
      blocks: [
        p(
          `La suscripción se contrata por períodos mensuales o anuales, según el plan, contados desde la fecha de alta, y se renueva por períodos iguales mientras no se pida la baja. El cobro de cada período se emite ${subscriptionPolicy.billingLeadDays} días antes de que venza el anterior y queda disponible en la cuenta de ${siteConfig.name} de quien paga.`,
        ),
        list([
          `<b>Gracia:</b> durante los ${subscriptionPolicy.graceDays} días corridos siguientes al vencimiento, el servicio sigue igual.`,
          `<b>Mora:</b> durante los ${subscriptionPolicy.dueDays} días corridos siguientes a la gracia, el servicio sigue funcionando con el plan contratado. Al empezar la mora, quien paga recibe un aviso por correo electrónico y el panel de la organización muestra el pago como pendiente.`,
          `<b>Fin de la suscripción:</b> vencida la mora sin pago, la suscripción termina, se avisa por correo electrónico a quien paga y a la organización, y la organización pasa al plan gratuito. Se conservan los datos y el acceso al panel, con los límites de ese plan: si hay más usuarios de los que permite, solo mantiene el acceso el primero de la lista.`,
        ]),
        p(
          "Si el primer pago de una suscripción nueva no se confirma dentro de su plazo, el alta se cancela sin generar deuda. Una suscripción terminada se puede volver a contratar desde el panel en cualquier momento.",
        ),
      ],
    },
    {
      id: "cambios-de-plan-y-baja",
      title: "9. Cambio de plan, baja y reembolsos",
      blocks: [
        p(
          "Desde el plan gratuito, un plan pago se activa al confirmarse su primer pago. Con una suscripción en curso, el cambio a otro plan queda agendado y entra en vigencia al pagarse el período siguiente, sin prorrateos.",
        ),
        p(
          `La organización puede pedir la baja en cualquier momento desde su cuenta de ${siteConfig.name}. La baja se hace efectiva al final del período ya pagado —hasta entonces el plan sigue activo— y desde ese momento no se emiten más cobros. No hay devolución proporcional del período en curso ni del saldo de mensajes ya comprado.`,
        ),
        p(
          `Lo anterior no afecta la devolución de pagos duplicados o erróneos ni los derechos que la ley reconoce de forma imperativa a los consumidores, que se rigen por los <a href="${solvorxTerms.path}#pagos-en-linea">términos generales</a>.`,
        ),
        p(
          "Podemos suspender el servicio, con aviso previo, ante un incumplimiento grave de estas condiciones.",
        ),
      ],
    },
    {
      id: "uso-aceptable",
      title: "10. Uso aceptable",
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
      title: "11. Datos de pacientes",
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
      title: "12. Recordatorios y comunicaciones al paciente",
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
      title: "13. Seguridad y confidencialidad",
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
      title: "14. Disponibilidad y soporte",
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
      title: "15. Propiedad intelectual",
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
      title: "16. Terminación y datos al finalizar",
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
      title: "17. Cambios en el servicio y en estas condiciones",
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
      title: "18. Limitación de responsabilidad",
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
      title: "19. Ley aplicable y jurisdicción",
      blocks: applicableLaw("el uso de " + dentuxConfig.name),
    },
    { ...contactSection(dentuxConfig.name), title: "20. Contacto" },
  ],
};

export const legalDocuments = [solvorxTerms, dentuxTerms];
