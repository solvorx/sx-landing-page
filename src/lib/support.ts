/**
 * Eliminar mi cuenta y Soporte — BASE para revisión legal.
 *
 * `/eliminar-cuenta` es la URL pública que pide Google Play para borrar la
 * cuenta sin tener la app instalada, y `/soporte` la URL de soporte que pide
 * App Store Connect (guía 1.5). Las dos tienen que funcionar sin iniciar sesión.
 *
 * La eliminación se hace desde Mi cuenta → Seguridad, que es lo que exigen
 * Google Play y Apple (5.1.1(v)): iniciarla dentro de la app. El pedido por
 * WhatsApp o correo queda para quien ya no puede entrar. Lo que se borra y lo
 * que se conserva es espejo de `PersonalDataService.closeAccount` en
 * sx-management-service.
 */

import {
  type LegalDocument,
  legalEntity,
  legalPaths,
  list,
  p,
  whatsappLink,
} from "@/lib/legal";
import { siteConfig } from "@/lib/site";

const updatedAt = "2026-11-23";

/** Flujo de recuperación de contraseña de sx-identity-web. */
const forgotPasswordUrl = "https://identity.solvorx.com/forgot-password";
const accountUrl = "https://account.solvorx.com";

/* ========================= Eliminar mi cuenta ========================= */

export const accountDeletion: LegalDocument = {
  path: legalPaths.accountDeletion,
  title: "Eliminar mi cuenta",
  description: `Cómo eliminar tu cuenta de ${siteConfig.name} y qué pasa con tus datos.`,
  summary: `Podés eliminar tu cuenta de ${siteConfig.name} cuando quieras, aunque no tengas instalada ninguna de nuestras aplicaciones. Acá te contamos cómo pedirlo, qué se borra y qué conservamos por obligación legal.`,
  updatedAt,
  sections: [
    {
      id: "como-pedirla",
      title: "1. Cómo pedirla",
      blocks: [
        p(
          `<b>Desde tu cuenta:</b> entrá a <a href="${accountUrl}/security">Mi cuenta → Seguridad → Eliminar mi cuenta</a>, confirmá tu contraseña y escribí ELIMINAR. Se elimina en el momento.`,
        ),
        p("<b>Si ya no podés entrar a tu cuenta:</b>"),
        list([
          `Escribinos por ${whatsappLink} o a ${legalEntity.email}, desde el teléfono o el correo asociados a tu cuenta.`,
          "Indicá el correo electrónico de la cuenta que querés eliminar.",
          "Si escribís desde otro correo u otro número, te vamos a enviar un código o un enlace a los datos de la cuenta para confirmar que el pedido es tuyo.",
        ]),
        p(
          "En ese caso confirmamos la eliminación por el mismo medio dentro de los treinta (30) días corridos siguientes a tu pedido.",
        ),
        p(
          `Antes de eliminarla podés <a href="${accountUrl}/security">descargar una copia de tus datos</a> desde la misma pantalla.`,
        ),
      ],
    },
    {
      id: "antes",
      title: "2. Antes de eliminarla",
      blocks: [
        list([
          `La cuenta es una sola para todo el ecosistema: al eliminarla perdés el acceso a todas las aplicaciones a las que entrás con ella, como DentuX.`,
          "Si pagás una suscripción, date de baja antes. Eliminar la cuenta no genera devoluciones por períodos ya pagados.",
          "Si administrás una organización, pasale la administración a otra persona antes: la organización y sus datos no se borran con tu cuenta.",
        ]),
      ],
    },
    {
      id: "que-se-borra",
      title: "3. Qué se borra",
      blocks: [
        list([
          "Tu perfil: nombre, correo, teléfono, usuario y foto. La cuenta queda anonimizada y tu correo libre para registrarte de nuevo.",
          "Tu contraseña y todas tus sesiones abiertas, en todas las aplicaciones, con su dirección IP y navegador.",
          "Tus accesos y permisos en las aplicaciones y organizaciones, y las autorizaciones a aplicaciones de terceros.",
          "Los códigos y enlaces pendientes a tu nombre.",
        ]),
      ],
    },
    {
      id: "que-se-conserva",
      title: "4. Qué conservamos y por cuánto tiempo",
      blocks: [
        list([
          "<b>Pagos y comprobantes:</b> el plazo que exige la normativa tributaria y contable (hoy, cinco años), sin otro uso que ese.",
          "<b>Constancias de lo que aceptaste</b> (versión de los textos, edad declarada, autorizaciones y preferencias): hasta 5 años, solo como prueba.",
          "<b>Actividad de seguridad</b> (inicios de sesión y cambios de credenciales): hasta 12 meses, para investigar un acceso indebido.",
          "<b>Registro de acciones administrativas:</b> hasta 2 años, identificado solo por un código interno.",
          "<b>Registros técnicos de uso:</b> hasta 30 días, con correos y teléfonos enmascarados; después se borran solos.",
        ]),
        p(
          `Los datos que una organización cargó sobre vos —por ejemplo, tu ficha como paciente de una clínica— son de esa organización: pedile a ella que los elimine. El detalle de cada plazo está en la <a href="${legalPaths.privacy}#conservacion">Política de Privacidad</a>.`,
        ),
      ],
    },
  ],
};

/* ============================== Soporte ============================== */

export const support: LegalDocument = {
  path: legalPaths.support,
  title: "Soporte",
  description: `Cómo contactar al soporte de ${siteConfig.name} y resolver los problemas más comunes con tu cuenta.`,
  summary: `Si tenés un problema con tu cuenta de ${siteConfig.name} o con alguna de nuestras aplicaciones, acá están los canales para contactarnos y las respuestas a lo que más nos preguntan.`,
  updatedAt,
  sections: [
    {
      id: "canales",
      title: "1. Cómo contactarnos",
      blocks: [
        list([
          `<b>WhatsApp:</b> ${whatsappLink}. Es el canal más rápido.`,
          `<b>Correo electrónico:</b> ${legalEntity.email}.`,
        ]),
        p(
          `Atendemos en días hábiles y en horario comercial de la ${legalEntity.jurisdiction}, y respondemos por el mismo medio.`,
        ),
      ],
    },
    {
      id: "cuenta",
      title: "2. Tu cuenta",
      blocks: [
        list([
          `<b>Olvidé mi contraseña:</b> pedí un enlace para crear una nueva en <a href="${forgotPasswordUrl}">Recuperar contraseña</a>.`,
          `<b>Cambiar mis datos, mi contraseña o cerrar sesiones:</b> entrá a <a href="${accountUrl}">Mi cuenta</a>.`,
          "<b>Mi cuenta está bloqueada:</b> después de varios intentos fallidos el acceso se bloquea unos minutos para protegerte. Esperá y volvé a intentar, o recuperá la contraseña.",
          `<b>Quitarle el acceso a una app de otra empresa:</b> entrá a <a href="${accountUrl}/connected-apps">Mi cuenta → Apps conectadas</a>.`,
          `<b>Elegir si recibís novedades por correo o WhatsApp:</b> entrá a <a href="${accountUrl}/communications">Mi cuenta → Comunicaciones</a>. Los avisos de seguridad y los códigos te llegan siempre.`,
          `<b>Descargar una copia de tus datos:</b> entrá a <a href="${accountUrl}/profile">Mi cuenta → Perfil → Descargar mis datos</a>.`,
          `<b>Ver los inicios de sesión y cambios de tu cuenta:</b> entrá a <a href="${accountUrl}/security">Mi cuenta → Seguridad → Actividad de seguridad</a>.`,
          `<b>Eliminar mi cuenta:</b> seguí los pasos de <a href="${legalPaths.accountDeletion}">Eliminar mi cuenta</a>.`,
        ]),
      ],
    },
    {
      id: "privacidad",
      title: "3. Privacidad y datos personales",
      blocks: [
        p(
          `Para pedir acceso, corrección, portabilidad o supresión de tus datos, o para oponerte a un tratamiento, escribinos por cualquiera de los canales. Respondemos dentro de los treinta (30) días corridos. Todo el detalle está en la <a href="${legalPaths.privacy}">Política de Privacidad</a>.`,
        ),
      ],
    },
    {
      id: "pagos",
      title: "4. Pagos y suscripciones",
      blocks: [
        p(
          `Las condiciones de pago, de baja y de arrepentimiento están en los <a href="${legalPaths.terms}#pagos-en-linea">Términos y condiciones</a>. Si un pago no se acreditó o se cobró dos veces, escribinos con el comprobante.`,
        ),
      ],
    },
    {
      id: "reclamos",
      title: "5. Reclamos",
      blocks: [
        p(
          "Si no quedás conforme con nuestra respuesta y contrataste como consumidor, podés presentar tu reclamo ante la Secretaría de Defensa del Consumidor y el Usuario (SEDECO). Si el reclamo es sobre tus datos personales, ante la Agencia Nacional de Protección de Datos Personales.",
        ),
      ],
    },
  ],
};
