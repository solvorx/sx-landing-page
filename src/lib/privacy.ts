/**
 * Política de Privacidad y Política de Cookies — BASE para revisión legal.
 *
 * Redactadas contra lo que el código hace HOY (sx-management-service,
 * sx-identity-web, sx-account-web, sx-console-web, sx-payment) y siguiendo el
 * contenido mínimo del art. 27 de la Ley N.º 7593/2025. Cada dato de acá tiene
 * que seguir siendo verdad: si cambia un proveedor, una región, una cookie o un
 * plazo de conservación, se cambia acá y se mueve `updatedAt`.
 *
 * ⚠️ Antes de publicar, los plazos marcados con `pending` en `retention` tienen
 * que estar implementados (hoy no lo están) y las regiones `pending` de
 * `subprocessors`, confirmadas. Ver "Pendiente antes de publicar" en AGENTS.md.
 */

import {
  type LegalDocument,
  identification,
  legalEntity,
  legalPaths,
  list,
  minimumAge,
  p,
  table,
  whatsappLink,
} from "@/lib/legal";
import { siteConfig } from "@/lib/site";

/** Fecha de la última revisión de los dos documentos de este archivo. */
const updatedAt = "2026-11-23";

/** URL pública de la cuenta de SolvorX (sx-account-web). */
const accountUrl = "https://account.solvorx.com";

/**
 * Proveedores que tratan datos por cuenta de SolvorX (subencargados) y dónde.
 * `pending: true` = región sin confirmar en la consola del proveedor.
 */
export const subprocessors: {
  name: string;
  purpose: string;
  region: string;
  pending?: boolean;
}[] = [
  {
    name: "Vercel Inc.",
    purpose: "Alojamiento de los sitios y de las aplicaciones web (inicio de sesión, cuenta, consola)",
    region: "Estados Unidos",
  },
  {
    name: "Google Cloud (Google LLC)",
    purpose: "Servidores de la plataforma y tareas programadas",
    region: "Brasil (São Paulo)",
  },
  {
    name: "Neon Inc. (sobre Amazon Web Services)",
    purpose: "Base de datos principal",
    region: "Brasil (São Paulo)",
  },
  {
    name: "MongoDB Inc. (MongoDB Atlas)",
    purpose: "Registros técnicos de uso",
    region: "A confirmar",
    pending: true,
  },
  {
    name: "Upstash Inc.",
    purpose: "Caché y sesiones",
    region: "A confirmar",
    pending: true,
  },
  {
    name: "Resend Inc.",
    purpose: "Envío de correos electrónicos",
    region: "Estados Unidos",
  },
  {
    name: "Meta Platforms Inc. (WhatsApp Business)",
    purpose: "Atención por WhatsApp y envío de códigos y avisos por WhatsApp",
    region: "Estados Unidos",
  },
  {
    name: "Twilio Inc.",
    purpose: "Envío de SMS",
    region: "Estados Unidos",
  },
];

/**
 * Cuánto se guarda cada cosa. Espejo de los plazos de sx-management-service
 * (`PersonalDataService`, `SecurityEventService`, `ActionTokenService`).
 * `pending` = el plazo publicado todavía NO es el que aplica prod:
 *
 * - Cuenta, sesiones, códigos, auditoría y eventos de seguridad: implementados
 *   en la rama `feat/SX-73/legals` (eliminación con anonimización y el job
 *   `POST /v1/external/job/purge-personal-data`). Valen cuando se despliegue y
 *   se programe ese job en Cloud Scheduler (una vez por día).
 * - Registros técnicos: el TTL de `request_trace` en prod es de ~2,85 años
 *   (decisión pendiente).
 * - Constancias: al eliminar la cuenta quedan atadas a la cuenta anonimizada,
 *   sin plazo de borrado. Falta la purga a los 5 años.
 */
export const retention: { data: string; period: string; pending?: boolean }[] = [
  {
    data: "Datos de la cuenta: nombre, correo, teléfono, usuario y foto",
    period: "Mientras la cuenta esté activa. Al eliminarla desde Mi cuenta, se anonimizan en el momento; si la pedís por WhatsApp o correo, dentro de los 30 días corridos.",
    pending: true,
  },
  {
    data: "Contraseña (solo su versión cifrada, nunca el texto)",
    period: "Hasta que la cambies o elimines la cuenta.",
  },
  {
    data: "Sesiones y dispositivos: dirección IP, navegador y dispositivo",
    period: "Hasta 30 días después de que la sesión vence o se cierra.",
    pending: true,
  },
  {
    data: "Códigos y enlaces de un solo uso (verificación, recuperación, invitaciones)",
    period: "Vencen entre 10 minutos y 7 días después de emitidos; se borran a los 7 días de vencidos o usados.",
    pending: true,
  },
  {
    data: "Registros técnicos de uso, con correos y teléfonos enmascarados",
    period: "30 días.",
    pending: true,
  },
  {
    data: "Registro de acciones administrativas (quién cambió permisos, accesos o credenciales)",
    period: "2 años.",
    pending: true,
  },
  {
    data: "Actividad de seguridad de tu cuenta: inicios de sesión, intentos fallidos, bloqueos y cambios de credenciales, con IP y navegador",
    period: "12 meses.",
    pending: true,
  },
  {
    data: "Mensajes enviados y recibidos por la plataforma (correo, WhatsApp, SMS)",
    period: "30 días.",
  },
  {
    data: "Constancias de aceptación de estos textos, de autorizaciones a aplicaciones de terceros y de tus preferencias de novedades",
    period: "Mientras la cuenta exista y hasta 5 años después de eliminarla, solo como prueba de lo aceptado.",
    pending: true,
  },
  {
    data: "Pagos y comprobantes",
    period: "El plazo que exige la normativa tributaria y contable (hoy, cinco años).",
  },
  {
    data: "Consultas por WhatsApp que no terminan en una contratación",
    period: "Hasta 12 meses desde el último contacto.",
  },
];

/** Cookies que ponen el sitio y las aplicaciones. La landing no pone ninguna. */
export const cookies: {
  name: string;
  where: string;
  purpose: string;
  duration: string;
  kind: "Necesaria" | "Preferencia";
}[] = [
  {
    name: "sx_sso",
    where: "Inicio de sesión de SolvorX",
    purpose: "Mantener tu sesión única, para no pedirte la contraseña en cada aplicación",
    duration: "30 días",
    kind: "Necesaria",
  },
  {
    name: "__Host-sx_account_session",
    where: "Mi cuenta",
    purpose: "Mantener abierta tu sesión en la cuenta",
    duration: "30 días",
    kind: "Necesaria",
  },
  {
    name: "sx_account_bff_txn",
    where: "Mi cuenta",
    purpose: "Proteger el inicio de sesión mientras se completa",
    duration: "10 minutos",
    kind: "Necesaria",
  },
  {
    name: "__Host-sx_console_session",
    where: "Consola interna (solo personal de SolvorX)",
    purpose: "Mantener abierta la sesión en la consola",
    duration: "30 días",
    kind: "Necesaria",
  },
  {
    name: "sx_console_bff_txn",
    where: "Consola interna (solo personal de SolvorX)",
    purpose: "Proteger el inicio de sesión mientras se completa",
    duration: "10 minutos",
    kind: "Necesaria",
  },
  {
    name: "sx_theme",
    where: "Mi cuenta y consola interna",
    purpose: "Recordar si elegiste el tema claro u oscuro",
    duration: "1 año",
    kind: "Preferencia",
  },
];

/* ======================= Política de Privacidad ======================= */

export const privacyPolicy: LegalDocument = {
  path: legalPaths.privacy,
  title: "Política de Privacidad",
  description: `Cómo ${siteConfig.name} trata los datos personales de quienes usan su sitio, su cuenta y sus aplicaciones, conforme a la ley paraguaya.`,
  summary: `Esta política explica qué datos personales tratamos cuando usás este sitio, tu cuenta de ${siteConfig.name} y las aplicaciones a las que entrás con ella, para qué, con quién los compartimos, cuánto tiempo los guardamos y cómo ejercer tus derechos. Se aplica junto con los <a href="${legalPaths.terms}">Términos y condiciones</a>.`,
  updatedAt,
  sections: [
    {
      id: "responsable",
      title: "1. Quién es el responsable",
      blocks: [
        p(
          `El responsable del tratamiento de tus datos es ${siteConfig.name}:`,
        ),
        list(identification),
        p(
          `Para cualquier tema de privacidad escribinos por ${whatsappLink} o a ${legalEntity.email}.`,
        ),
      ],
    },
    {
      id: "alcance",
      title: "2. A qué se aplica",
      blocks: [
        p("Esta política cubre:"),
        list([
          "El sitio web y las consultas que nos hacés por WhatsApp.",
          `La cuenta de ${siteConfig.name}: el registro, el inicio de sesión y la sección <a href="${accountUrl}">Mi cuenta</a>.`,
          `El inicio de sesión con tu cuenta de ${siteConfig.name} en otras aplicaciones, nuestras o de terceros.`,
          "El checkout donde se pagan nuestros productos.",
        ]),
        p(
          `<b>Cuando tratamos datos por cuenta de un cliente</b> —por ejemplo, los pacientes que una clínica carga en DentuX— el responsable es ese cliente, y ${siteConfig.name} actúa como encargado del tratamiento, según el <a href="${legalPaths.dpa}">Acuerdo de encargo de tratamiento de datos</a>. Para ejercer tus derechos sobre esos datos, dirigite al cliente; si nos escribís a nosotros, le trasladamos el pedido.`,
        ),
      ],
    },
    {
      id: "datos",
      title: "3. Qué datos tratamos",
      blocks: [
        list([
          "<b>Datos de la cuenta:</b> nombre, correo electrónico, nombre de usuario, teléfono (opcional) y foto de perfil, si la cargás.",
          "<b>Credenciales:</b> tu contraseña, que guardamos solo en una versión cifrada que no permite recuperarla.",
          "<b>Datos de uso y seguridad:</b> dirección IP, tipo de navegador y de dispositivo, fecha y hora de cada inicio de sesión, y registros técnicos de las operaciones que hacés.",
          "<b>Datos de pago:</b> nombre, correo, documento de identidad o RUC y teléfono de quien paga, y el detalle de cada pago. No recibimos ni guardamos datos de tarjetas.",
          "<b>Consultas:</b> lo que nos escribís por WhatsApp o por correo y tus datos de contacto.",
          "<b>Constancias:</b> qué versión de estos textos aceptaste, tu declaración de edad, a qué aplicaciones de terceros autorizaste y qué novedades aceptaste recibir, con la fecha, la hora y la dirección IP de cada una.",
          "<b>Actividad de seguridad:</b> inicios de sesión, intentos fallidos, bloqueos y cambios de contraseña, correo o teléfono, con la dirección IP y el navegador.",
        ]),
        p(
          "No pedimos datos sensibles —como datos de salud, origen étnico, creencias u orientación sexual— para la cuenta. Tampoco tomamos decisiones basadas únicamente en tratamientos automatizados que te produzcan efectos jurídicos o te afecten de forma significativa.",
        ),
      ],
    },
    {
      id: "finalidades",
      title: "4. Para qué los usamos y con qué base legal",
      blocks: [
        table(
          ["Finalidad", "Base legal (Ley N.º 7593/2025, art. 5)"],
          [
            [
              "Crear y mantener tu cuenta, dejarte iniciar sesión y verificar tu correo o tu teléfono",
              "Ejecución del contrato que aceptás al registrarte",
            ],
            [
              "Proteger tu cuenta y la plataforma: bloquear intentos repetidos, detectar accesos indebidos, avisarte de cambios de seguridad e investigar incidentes",
              "Interés legítimo en la seguridad del servicio y de tu cuenta",
            ],
            [
              `Compartir tus datos con una aplicación de ${siteConfig.name} cuando entrás a ella con tu cuenta`,
              "Ejecución del contrato, con los datos que te muestra la pantalla de inicio de sesión",
            ],
            [
              "Compartir tus datos con una aplicación de un tercero cuando entrás a ella con tu cuenta",
              "Tu consentimiento, que te pedimos en la pantalla de inicio de sesión y podés retirar desde Mi cuenta",
            ],
            [
              "Guardar constancia de lo que aceptaste y autorizaste",
              "Cumplimiento de obligaciones legales e interés legítimo en poder probarlo",
            ],
            [
              "Cobrar, emitir comprobantes y llevar la contabilidad",
              "Ejecución del contrato y cumplimiento de obligaciones legales tributarias",
            ],
            [
              "Responder tus consultas y preparar propuestas",
              "Medidas precontractuales que nos pedís",
            ],
            [
              "Enviarte novedades o promociones",
              `Tu consentimiento, que das o retirás por canal (correo o WhatsApp) en <a href="${accountUrl}/communications">Mi cuenta → Comunicaciones</a>. Hoy no enviamos comunicaciones de este tipo`,
            ],
          ],
        ),
        p(
          "No vendemos tus datos, no los cedemos con fines publicitarios y no los usamos para fines distintos de los que se indican acá.",
        ),
      ],
    },
    {
      id: "aplicaciones",
      title: `5. Iniciar sesión con ${siteConfig.name}`,
      blocks: [
        p(
          `Tu cuenta de ${siteConfig.name} sirve para entrar a varias aplicaciones. Cuando entrás a una, la pantalla de inicio de sesión te muestra qué aplicación es y qué datos va a recibir —por ejemplo, tu nombre y tu correo—. Solo le compartimos esos datos.`,
        ),
        p(
          `<b>Si la aplicación es de un tercero</b>, antes de compartir nada te mostramos quién es, qué datos va a recibir y los enlaces a su política de privacidad, y te pedimos que lo autorices. Si no lo autorizás, no recibe nada. Ese tercero trata los datos que recibe bajo su propia política y es responsable de ellos.`,
        ),
        p(
          `Podés ver las aplicaciones de terceros que autorizaste y quitarles el acceso cuando quieras desde <a href="${accountUrl}/connected-apps">Mi cuenta → Apps conectadas</a>. Al quitarlo, se cierran tus sesiones en esa aplicación.`,
        ),
      ],
    },
    {
      id: "destinatarios",
      title: "6. Con quién los compartimos",
      blocks: [
        p(
          "Para prestar el servicio nos apoyamos en proveedores que tratan datos por nuestra cuenta, solo para lo que les encargamos y bajo obligaciones de confidencialidad y seguridad:",
        ),
        table(
          ["Proveedor", "Para qué", "Dónde"],
          subprocessors.map((s) => [s.name, s.purpose, s.region]),
        ),
        p(
          "Además, podemos comunicar datos a autoridades públicas cuando una ley o una orden judicial lo exija.",
        ),
      ],
    },
    {
      id: "transferencias",
      title: "7. Transferencias internacionales",
      blocks: [
        p(
          "Varios de esos proveedores almacenan o procesan los datos fuera de Paraguay, en Estados Unidos y en Brasil. Esas transferencias se hacen con las garantías que exige el art. 19 de la Ley N.º 7593/2025: los contratos con cada proveedor incluyen cláusulas de protección de datos y medidas de seguridad equivalentes a las de esta política.",
        ),
      ],
    },
    {
      id: "conservacion",
      title: "8. Cuánto tiempo los guardamos",
      blocks: [
        table(
          ["Datos", "Plazo"],
          retention.map((r) => [r.data, r.period]),
        ),
        p(
          "Vencidos esos plazos, los datos se eliminan o se anonimizan, salvo que una ley nos obligue a conservarlos por más tiempo o que hagan falta para defendernos en un reclamo en curso.",
        ),
      ],
    },
    {
      id: "derechos",
      title: "9. Tus derechos y cómo ejercerlos",
      blocks: [
        p("Podés pedirnos en cualquier momento:"),
        list([
          "<b>Acceso:</b> saber qué datos tuyos tratamos y obtener una copia.",
          "<b>Rectificación:</b> corregir datos inexactos o incompletos.",
          `<b>Supresión:</b> que eliminemos tus datos, incluida tu cuenta. Los pasos están en <a href="${legalPaths.accountDeletion}">Eliminar mi cuenta</a>.`,
          "<b>Oposición:</b> que dejemos de tratar tus datos para una finalidad basada en nuestro interés legítimo.",
          "<b>Portabilidad:</b> recibir tus datos en un formato de uso común y legible por máquina.",
          "<b>Retiro del consentimiento:</b> cuando el tratamiento se basa en él, sin que afecte lo hecho antes.",
        ]),
        p(
          `Desde <a href="${accountUrl}">Mi cuenta</a> ya podés ver y corregir los datos de tu perfil, cambiar la contraseña, cerrar tus sesiones abiertas, quitarle el acceso a las aplicaciones de terceros, elegir qué novedades recibir, ver la actividad de seguridad, <b>descargar tus datos</b> y <b>eliminar tu cuenta</b>. Para todo lo demás, escribinos por ${whatsappLink} o a ${legalEntity.email}, desde el correo o el teléfono asociados a tu cuenta. Si no podemos confirmar que el pedido es tuyo, te vamos a pedir que lo verifiques.`,
        ),
        p(
          "Respondemos dentro de los treinta (30) días corridos siguientes a recibir el pedido, sin costo.",
        ),
        p(
          "Si no quedás conforme con la respuesta, podés reclamar ante la Agencia Nacional de Protección de Datos Personales que crea la Ley N.º 7593/2025, y ejercer en cualquier caso la garantía de hábeas data del art. 135 de la Constitución Nacional.",
        ),
      ],
    },
    {
      id: "seguridad",
      title: "10. Seguridad",
      blocks: [
        p("Aplicamos medidas técnicas y organizativas para proteger tus datos, entre ellas:"),
        list([
          "Cifrado de las comunicaciones entre tu navegador y nuestros servidores.",
          "Contraseñas guardadas con un algoritmo de cifrado diseñado para resistir ataques, y bloqueo temporal ante intentos repetidos.",
          "Códigos de verificación de un solo uso, con vencimiento y límite de intentos.",
          "Acceso del personal a los datos limitado por roles, y registro de las acciones administrativas sobre permisos, accesos y credenciales.",
          "Sesiones que podés ver y cerrar en cualquier momento.",
        ]),
        p(
          "Si ocurre un incidente de seguridad que afecte tus datos, lo notificamos a la autoridad de control dentro de las 72 horas de conocerlo y, cuando pueda afectarte, también a vos, con lo que sepamos y las medidas que tomamos (art. 17 de la Ley N.º 7593/2025).",
        ),
      ],
    },
    {
      id: "menores",
      title: "11. Menores de edad",
      blocks: [
        p(
          `Para crear una cuenta hay que tener al menos ${minimumAge} años, y se declara al registrarse. No permitimos cuentas de personas menores de esa edad: si detectamos una, la eliminamos.`,
        ),
        p(
          "Los datos de menores que un cliente carga en sus sistemas —por ejemplo, pacientes de una clínica— son responsabilidad de ese cliente, que debe contar con la autorización de quien ejerza la patria potestad.",
        ),
      ],
    },
    {
      id: "cookies",
      title: "12. Cookies",
      blocks: [
        p(
          `Usamos solo cookies necesarias para que funcionen el inicio de sesión y la cuenta, y una de preferencia para recordar el tema visual. No usamos cookies de publicidad ni de analítica. El detalle está en la <a href="${legalPaths.cookies}">Política de Cookies</a>.`,
        ),
      ],
    },
    {
      id: "cambios",
      title: "13. Cambios en esta política",
      blocks: [
        p(
          "La versión vigente es la publicada en esta página, con su fecha de última actualización. Si hacemos un cambio importante —por ejemplo, una finalidad nueva o un proveedor nuevo en otro país— te lo avisamos por correo electrónico o dentro de la cuenta con al menos quince (15) días corridos de anticipación.",
        ),
      ],
    },
  ],
};

/* ======================== Política de Cookies ======================== */

export const cookiePolicy: LegalDocument = {
  path: legalPaths.cookies,
  title: "Política de Cookies",
  description: `Qué cookies usan el sitio y las aplicaciones de ${siteConfig.name} y para qué.`,
  summary: `Una cookie es un archivo pequeño que un sitio guarda en tu navegador. ${siteConfig.name} usa solo las necesarias para que funcionen el inicio de sesión y la cuenta, y una de preferencia. Complementa la <a href="${legalPaths.privacy}">Política de Privacidad</a>.`,
  updatedAt,
  sections: [
    {
      id: "cuales",
      title: "1. Qué cookies usamos",
      blocks: [
        table(
          ["Cookie", "Dónde", "Para qué", "Duración", "Tipo"],
          cookies.map((c) => [`<code>${c.name}</code>`, c.where, c.purpose, c.duration, c.kind]),
        ),
        p(
          "Este sitio web —la página de inicio y sus secciones informativas— no guarda ninguna cookie.",
        ),
      ],
    },
    {
      id: "terceros",
      title: "2. Cookies de terceros",
      blocks: [
        p(
          "No usamos cookies de publicidad, de redes sociales ni de analítica, ni dejamos que terceros pongan cookies desde nuestras páginas.",
        ),
      ],
    },
    {
      id: "control",
      title: "3. Cómo controlarlas",
      blocks: [
        p(
          "Podés borrar o bloquear las cookies desde la configuración de tu navegador. Si bloqueás las necesarias, no vas a poder iniciar sesión ni usar tu cuenta. Si borrás la de preferencia, el tema visual vuelve al predeterminado.",
        ),
        p(
          "Como solo usamos cookies necesarias y de preferencia, no te mostramos un aviso para aceptarlas. Si algún día sumamos otras, te vamos a pedir tu consentimiento antes de usarlas.",
        ),
      ],
    },
  ],
};
