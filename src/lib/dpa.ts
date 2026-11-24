/**
 * Acuerdo de encargo de tratamiento de datos (DPA) — BASE para revisión legal.
 *
 * Es el contrato escrito que exige el art. 11 de la Ley N.º 7593/2025 cuando
 * SolvorX trata datos por cuenta de un cliente: los pacientes que una clínica
 * carga en DentuX, los usuarios finales de un proyecto con servicio
 * administrado, o los destinatarios de la mensajería de la plataforma. Se
 * publica como anexo de los términos para que cada cliente lo acepte junto con
 * el servicio; un cliente que necesite firmarlo por separado recibe este mismo
 * texto.
 */

import {
  type LegalDocument,
  identification,
  legalEntity,
  legalPaths,
  list,
  p,
  table,
} from "@/lib/legal";
import { subprocessors } from "@/lib/privacy";
import { siteConfig } from "@/lib/site";

/**
 * Plazo en el que SolvorX avisa al cliente de un incidente. Es menor que las 72
 * horas del art. 17 a propósito: el que notifica a la autoridad es el
 * responsable, y necesita margen para hacerlo.
 */
const breachNoticeHours = 48;

/** Aviso previo antes de sumar o cambiar un subencargado. */
const subprocessorNoticeDays = 30;

/** Días para devolver los datos al terminar, antes de borrarlos. */
const returnDays = 30;

export const dataProcessingAgreement: LegalDocument = {
  path: legalPaths.dpa,
  title: "Acuerdo de encargo de tratamiento de datos",
  description: `Condiciones en las que ${siteConfig.name} trata datos personales por cuenta de sus clientes, conforme al art. 11 de la Ley N.º 7593/2025.`,
  summary: `Este acuerdo regula el tratamiento de datos personales que ${siteConfig.name} hace por cuenta de sus clientes cuando les presta un servicio. Forma parte de los <a href="${legalPaths.terms}">Términos y condiciones</a> y de las condiciones de cada producto, y se acepta junto con ellas.`,
  updatedAt: "2026-11-23",
  sections: [
    {
      id: "partes",
      title: "1. Partes y roles",
      blocks: [
        p(
          `<b>El cliente</b> —la organización o persona que contrata el servicio— es el <b>responsable del tratamiento</b>: decide qué datos se tratan, para qué y por cuánto tiempo.`,
        ),
        p(
          `<b>${siteConfig.name}</b> es el <b>encargado del tratamiento</b>: trata esos datos solo para prestar el servicio y siguiendo las instrucciones del cliente. Sus datos de identificación:`,
        ),
        list(identification),
      ],
    },
    {
      id: "objeto",
      title: "2. Objeto, naturaleza y finalidad",
      blocks: [
        p(
          `${siteConfig.name} aloja, almacena, organiza, consulta y transmite los datos que el cliente carga o genera en el servicio, y envía en su nombre las comunicaciones que el cliente configura (por ejemplo, recordatorios de turnos). La única finalidad es prestar el servicio contratado.`,
        ),
      ],
    },
    {
      id: "datos-y-titulares",
      title: "3. Tipos de datos y categorías de titulares",
      blocks: [
        table(
          ["Servicio", "Titulares", "Datos"],
          [
            [
              "DentuX",
              "Pacientes de la clínica y el equipo de la clínica",
              "Identificación y contacto, turnos, historial de atención y los datos de salud que la clínica registre (datos sensibles)",
            ],
            [
              "Proyectos con servicio administrado",
              "Usuarios finales y personal del cliente",
              "Los que defina la propuesta aceptada para cada proyecto",
            ],
            [
              "Mensajería de la plataforma",
              "Destinatarios de los mensajes del cliente",
              "Correo, teléfono, contenido de los mensajes enviados y respuestas recibidas",
            ],
          ],
        ),
      ],
    },
    {
      id: "duracion",
      title: "4. Duración",
      blocks: [
        p(
          `El acuerdo rige mientras el servicio esté vigente y hasta que ${siteConfig.name} termine de devolver o borrar los datos según la cláusula 9.`,
        ),
      ],
    },
    {
      id: "obligaciones-encargado",
      title: `5. Qué se compromete a hacer ${siteConfig.name}`,
      blocks: [
        list([
          "Tratar los datos solo según las instrucciones documentadas del cliente —estas condiciones, la configuración del servicio y lo que el cliente indique por escrito—, y avisarle si una instrucción le parece contraria a la ley.",
          "No usar los datos para fines propios, no venderlos y no cederlos a terceros, salvo a los subencargados de la cláusula 6 o por obligación legal.",
          "Garantizar que las personas autorizadas a tratar los datos tengan un deber de confidencialidad.",
          "Aplicar las medidas de seguridad de la cláusula 7.",
          "Ayudar al cliente a responder los pedidos de los titulares (acceso, rectificación, supresión, oposición, portabilidad). Si un titular le escribe directamente, le traslada el pedido al cliente dentro de los cinco (5) días hábiles.",
          "Ayudar al cliente, con la información que tenga, en las evaluaciones de impacto y en las consultas a la autoridad de control.",
          "Poner a disposición del cliente la información necesaria para demostrar que cumple este acuerdo, y responder sus pedidos razonables de información.",
        ]),
      ],
    },
    {
      id: "subencargados",
      title: "6. Subencargados",
      blocks: [
        p(
          `El cliente autoriza a ${siteConfig.name} a apoyarse en estos proveedores, que tratan los datos solo en lo necesario para el servicio y con obligaciones de protección equivalentes a las de este acuerdo:`,
        ),
        table(
          ["Proveedor", "Para qué", "Dónde"],
          subprocessors.map((s) => [s.name, s.purpose, s.region]),
        ),
        p(
          `Antes de sumar o reemplazar un subencargado, ${siteConfig.name} avisa al cliente con al menos ${subprocessorNoticeDays} días corridos de anticipación. Si el cliente se opone por un motivo fundado de protección de datos y no se encuentra una alternativa, puede terminar el servicio sin penalidad. ${siteConfig.name} responde ante el cliente por lo que hagan sus subencargados.`,
        ),
      ],
    },
    {
      id: "seguridad",
      title: "7. Seguridad",
      blocks: [
        list([
          "Cifrado de las comunicaciones en tránsito.",
          "Separación de los datos de cada cliente y control de accesos por roles.",
          "Contraseñas y credenciales guardadas con algoritmos de cifrado y hash, nunca en texto.",
          "Registros de las acciones administrativas y de los accesos a la plataforma.",
          "Respaldos de la base de datos a cargo del proveedor de infraestructura.",
          "Revisión periódica de estas medidas, como exige el art. 16 de la Ley N.º 7593/2025.",
        ]),
        p(
          "Los datos sensibles, como los de salud, reciben además las medidas reforzadas que exija la normativa aplicable.",
        ),
      ],
    },
    {
      id: "incidentes",
      title: "8. Incidentes de seguridad",
      blocks: [
        p(
          `Si ${siteConfig.name} detecta un incidente que afecte datos del cliente, se lo comunica sin demora indebida y, como máximo, dentro de las ${breachNoticeHours} horas de conocerlo, para que el cliente pueda notificar a la autoridad dentro de las 72 horas que fija el art. 17 de la Ley N.º 7593/2025. El aviso incluye lo que se sepa del incidente, los datos y titulares afectados, sus consecuencias probables y las medidas tomadas.`,
        ),
      ],
    },
    {
      id: "fin",
      title: "9. Devolución y borrado al terminar",
      blocks: [
        p(
          `Al terminar el servicio, el cliente puede pedir una copia completa de sus datos en un formato de uso común dentro de los ${returnDays} días corridos siguientes. Vencido ese plazo, ${siteConfig.name} borra los datos —incluidas las copias— o los anonimiza, salvo los que una ley le obligue a conservar, que quedan bloqueados y sin otro uso.`,
        ),
      ],
    },
    {
      id: "transferencias",
      title: "10. Transferencias internacionales",
      blocks: [
        p(
          "Algunos subencargados almacenan o procesan los datos en Estados Unidos y en Brasil. Esas transferencias se hacen con las garantías del art. 19 de la Ley N.º 7593/2025: cláusulas contractuales de protección de datos con cada proveedor.",
        ),
      ],
    },
    {
      id: "obligaciones-cliente",
      title: "11. Qué se compromete a hacer el cliente",
      blocks: [
        list([
          "Contar con una base legal para cada dato que carga —y, para los datos sensibles y los de menores, con el consentimiento que exige la ley—.",
          "Informar a los titulares sobre el tratamiento, incluido el uso de un encargado.",
          "Obtener la conformidad de los destinatarios antes de enviarles comunicaciones por el servicio.",
          "Dar instrucciones lícitas y mantener actualizados los accesos de su equipo.",
        ]),
      ],
    },
    {
      id: "varios",
      title: "12. Responsabilidad, prevalencia y contacto",
      blocks: [
        p(
          `La responsabilidad de cada parte se rige por las condiciones del servicio contratado. En lo que se refiere a datos personales, este acuerdo prevalece sobre cualquier otra cláusula. Para cualquier tema relacionado, escribinos a ${legalEntity.email}.`,
        ),
      ],
    },
  ],
};
