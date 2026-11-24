# Registro de tratamientos — SolvorX (interno)

Documento interno: **no se publica**. Es la base de la Política de Privacidad
(`src/lib/privacy.ts`), del Acuerdo de encargo (`src/lib/dpa.ts`) y de los
formularios de las tiendas (Data safety de Google Play, App Privacy de Apple).
Si cambia un tratamiento, se cambia acá primero y después en los textos.

- **Responsable:** los datos de `legalEntity` en `src/lib/legal.ts`.
- **Alcance:** cuenta SolvorX, login (sx-identity-web), Mi cuenta
  (sx-account-web), consola interna (sx-console-web), backend
  (sx-management-service), checkout (sx-payment) y la landing. DentuX y VorPay
  se registran aparte.
- **Última revisión:** 2026-11-23.

## Tratamientos como responsable

| # | Tratamiento | Finalidad | Base legal (Ley 7593, art. 5) | Datos | Titulares | Sistemas | Proveedores | Plazo publicado | Estado real hoy |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Cuenta SolvorX | Registro, perfil y acceso al ecosistema | Ejecución del contrato | Nombre, correo, usuario, teléfono, foto | Usuarios | identity, account, management (`user.user`) | Vercel, Google Cloud, Neon | Mientras esté activa; borrado o anonimización en 30 días al eliminarla | **No existe la eliminación** (`deletedAt` sin uso) |
| 2 | Credenciales | Autenticación | Ejecución del contrato | Hash Argon2id de la contraseña | Usuarios | management (`user_credential`) | Google Cloud, Neon | Hasta el cambio o la eliminación | Coincide |
| 3 | Sesiones y SSO | Mantener sesiones, mostrar y revocar dispositivos | Ejecución del contrato; interés legítimo (seguridad) | IP, user-agent, dispositivo, fechas | Usuarios | management (`session`, `refresh_token`, `sso_session`), Redis de account y console | Google Cloud, Neon, Upstash | 30 días desde el vencimiento o cierre | **Las vencidas no se purgan** |
| 4 | Verificación y recuperación | Verificar correo y teléfono, resetear contraseña, invitaciones | Ejecución del contrato | Correo, teléfono, IP, user-agent | Usuarios e invitados | management (`action_token`) | Resend, Meta (WhatsApp), Twilio | Se borran a los 7 días de vencidos o usados | **`cleanupExpired()` no se invoca** |
| 5 | Login con SolvorX | Compartir identidad con apps propias y de terceros | Apps propias: ejecución del contrato. Apps de terceros: consentimiento explícito en el login | Según scopes: id, nombre, correo, teléfono | Usuarios | management (OAuth, `userinfo`) | — (el tercero es responsable de lo que recibe) | — | `/userinfo` acotado a los scopes y consentimiento explícito para apps de terceros, en la rama `feat/SX-73/legals`, **sin desplegar** |
| 6 | Registros técnicos | Diagnóstico, seguridad, prevención de fraude | Interés legítimo | Endpoint, IP, user-agent, cuerpos con correos y teléfonos enmascarados | Usuarios, consumers | management (Mongo `request_trace`) | MongoDB Atlas | 30 días | **TTL de prod ≈ 2,85 años**; el enmascarado está en la rama `feat/SX-73/legals`, sin desplegar |
| 7 | Auditoría administrativa | Responder "quién cambió qué" ante un incidente | Interés legítimo | IP, user-agent, actor, acción | Staff | management (`audit_log`) | Google Cloud, Neon | 2 años (propuesta) | **Sin plazo** |
| 8 | Consola interna | Gestión de la plataforma por el staff | Interés legítimo | Datos de usuarios, miembros, sesiones | Usuarios, staff | console, management (`bff-console`) | Vercel, Google Cloud, Neon, Upstash | — | Falta una política de acceso del staff |
| 9 | Checkout y pagos | Cobrar, emitir comprobantes, contabilidad | Ejecución del contrato; obligación legal | Nombre, correo, CI o RUC, teléfono, pagos | Quien paga | sx-payment | A completar al revisar sx-payment | Plazo tributario (5 años, a confirmar) | A revisar con sx-payment |
| 10 | Consultas comerciales | Responder y preparar propuestas | Medidas precontractuales | Nombre, teléfono, lo que se escriba | Interesados | WhatsApp (landing) | Meta | 12 meses desde el último contacto | Sin procedimiento de borrado |
| 11 | Constancias legales | Probar la aceptación de los textos, la declaración de edad y las autorizaciones a apps de terceros | Obligación legal; interés legítimo | Versiones aceptadas, edad declarada, apps y scopes autorizados, fecha, IP, user-agent | Usuarios | management (`user.legal_acceptance`, `auth.oauth_consent`) | Google Cloud, Neon | Mientras exista la cuenta + 5 años (propuesta) | En la rama `feat/SX-73/legals`, sin desplegar; hoy se borran con la cuenta |
| 12 | Eventos de seguridad | Detectar e investigar accesos indebidos; mostrarle a la persona su actividad | Interés legítimo (seguridad) | Tipo de evento, IP, user-agent, fecha | Usuarios | management (`audit.security_event`) | Google Cloud, Neon | 12 meses (job `purge-personal-data`) | En la rama `feat/SX-73/legals`, sin desplegar |
| 13 | Preferencias de comunicaciones | Enviar novedades solo a quien las pidió, por el canal que eligió | Consentimiento | Canal, sí/no, origen, fecha, IP | Usuarios | management (`user.communication_consent`); identity (registro); account (Comunicaciones) | Google Cloud, Neon | Mientras exista la cuenta | En la rama `feat/SX-73/legals`, sin desplegar; hoy no se envían novedades |

## Tratamientos como encargado

| # | Tratamiento | Responsable | Datos | Titulares | Sistemas | Plazo | Contrato |
|---|---|---|---|---|---|---|---|
| E1 | Mensajería por cuenta de proyectos | Cada proyecto o cliente (por ejemplo, las clínicas de DentuX) | Destinatarios, contenido, respuestas entrantes | Terceros (pacientes, clientes del cliente) | management (`message.log`, `message.event`) | 30 días | Acuerdo de encargo (`/encargo-de-datos`) |
| E2 | Datos de pacientes en DentuX | La clínica | Identificación, contacto, turnos, datos de salud | Pacientes | sx-dentux-service | Según la clínica; copia en 30 días al terminar | Acuerdo de encargo |
| E3 | Proyectos con servicio administrado | El cliente | Los que defina cada propuesta | Usuarios del cliente | Según el proyecto | Según la propuesta | Acuerdo de encargo |

## Transferencias internacionales

| Proveedor | País o región | Garantía |
|---|---|---|
| Vercel | Estados Unidos (región por defecto; `vercel.json` no la fija) | Cláusulas del proveedor (DPA de Vercel) |
| Google Cloud | Brasil (`southamerica-east1`) | DPA de Google Cloud |
| Neon (AWS) | Brasil (`sa-east-1`) | DPA de Neon |
| MongoDB Atlas | **A confirmar** | DPA de MongoDB |
| Upstash | **A confirmar** | DPA de Upstash |
| Resend | Estados Unidos | DPA de Resend |
| Meta (WhatsApp) | Estados Unidos | Términos de WhatsApp Business |
| Twilio | Estados Unidos | DPA de Twilio |

Hay que descargar y archivar el DPA de cada proveedor: es la garantía que la
Política de Privacidad invoca para el art. 19.
