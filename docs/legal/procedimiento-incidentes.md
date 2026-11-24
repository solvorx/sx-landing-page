# Procedimiento ante incidentes de seguridad (interno)

Documento interno: **no se publica**. Cumple el art. 17 de la Ley 7593/2025 (aviso a la autoridad en 72 horas y,
si corresponde, a los titulares) y lo que prometen la Política de Privacidad (`/privacidad#seguridad`) y el
Acuerdo de encargo (`/encargo-de-datos#incidentes`: aviso al cliente en 48 horas).

- **Responsable del procedimiento:** la persona titular del prestador (`legalEntity` en `src/lib/legal.ts`).
- **Última revisión:** 2026-11-23. Revisar una vez por año y después de cada incidente.

## Qué es un incidente

Cualquier hecho que comprometa la confidencialidad, la integridad o la disponibilidad de datos personales. Por
ejemplo:
- acceso de alguien no autorizado a una cuenta, a la base o a la consola;
- una credencial filtrada: clave de un proveedor, `client_secret`, clave de API, `.env`;
- datos personales expuestos en un log, un error o un repo;
- un envío de mensajes al destinatario equivocado;
- la pérdida de datos sin respaldo.

Ante la duda, se trata como incidente y se descarta después.

## Reloj

| Desde que se conoce | Qué tiene que estar hecho |
|---|---|
| 0–4 h | Contenido: el acceso cortado, las credenciales rotadas y el hecho registrado en la bitácora |
| 24 h | Evaluación: qué datos, de quiénes, cuántas personas y qué riesgo tienen |
| 48 h | Aviso a los clientes cuyos datos tratamos como encargado (DentuX, proyectos administrados) |
| 72 h | Aviso a la Agencia Nacional de Protección de Datos Personales, si hay riesgo para las personas |
| Sin demora | Aviso a los titulares, si el riesgo es alto |
| 30 días | Informe final y medidas para que no se repita |

## 1. Contener (0–4 h)

- **Cuentas:**
  - cerrar las sesiones de la persona afectada desde la consola: Proyectos → Sesiones → revocar todas;
  - deshabilitar al miembro o al usuario si hace falta.
- **Credenciales:** rotar lo que esté expuesto.
  - `client_secret` desde la consola: Clientes OAuth → Rotar.
  - Claves de API desde la consola: Consumers → Claves.
  - Claves de proveedores: Upstash, Neon, MongoDB Atlas, Resend, Meta, Twilio.
  - `JWT_PRIVATE_KEY`, según `docs/RS256-MIGRATION.md` de sx-management-service.
- **Endpoint o deploy:** volver a la revisión anterior de Cloud Run o Vercel.
- **Bitácora:** abrir una entrada con qué se detectó, cuándo, quién lo detectó y qué se hizo, con hora.

## 2. Evaluar (hasta 24 h)

Las fuentes:
- `audit.security_event`: inicios de sesión, fallos, bloqueos, cambios de credenciales y eliminación de cuentas;
- `audit.audit_log`: quién cambió permisos, clientes o claves;
- `request_trace` en Mongo: tráfico, con correos y teléfonos enmascarados;
- los logs de Cloud Run y de Vercel.

Lo que hay que responder:
- **Qué datos:** categorías, según el registro de tratamientos. ¿Hay datos sensibles, como los de salud de DentuX?
- **De quiénes:** usuarios propios, pacientes de una clínica, clientes de un cliente. **Cuántas personas.**
- **En qué rol estamos:** responsable (cuentas SolvorX) o encargado (datos de un cliente).
- **Qué riesgo tienen** las personas: robo de identidad, fraude, exposición de su salud, etc.

## 3. Avisar

**Al cliente (48 h), cuando somos encargados.** Por el canal del contrato. Contiene lo que sepamos del hecho, los datos
y personas afectadas, las consecuencias probables, las medidas tomadas y un contacto. El cliente decide y avisa a la
autoridad y a sus titulares; lo ayudamos con la información.

**A la autoridad (72 h), cuando somos responsables y hay riesgo para las personas.** A la Agencia Nacional de
Protección de Datos Personales (MITIC), por el canal que fije el decreto reglamentario. Contiene:
- la naturaleza del incidente;
- las categorías y la cantidad aproximada de personas y de registros;
- las consecuencias probables;
- las medidas tomadas o propuestas;
- un contacto.

Si a las 72 horas falta información, se avisa con lo que hay y se completa después.

**A los titulares, sin demora, si el riesgo es alto.** Por correo, y además dentro de la cuenta si aplica. En lenguaje
simple: qué pasó, qué datos, qué hicimos y qué pueden hacer ellos (cambiar la contraseña, revisar su Actividad de
seguridad en Mi cuenta, desconfiar de mensajes que pidan datos).

## 4. Cerrar (30 días)

Informe final en la bitácora:
- causa;
- línea de tiempo;
- personas afectadas;
- avisos dados, con fecha;
- medidas tomadas.

Se actualizan el registro de tratamientos y este procedimiento si hizo falta. Todo incidente queda registrado,
también los que no requirieron aviso, con el motivo por el que no se avisó.

## Bitácora

| Fecha y hora | Qué pasó | Datos y personas | Medidas | Avisos (cliente, autoridad, titulares) | Cierre |
|---|---|---|---|---|---|
| 2026-11-23 | En una sesión de trabajo local se imprimió el `REDIS_URI` (con contraseña de Upstash) de `.env.dev` y `.env.prod` de sx-account-web | Ninguno: es una credencial, quedó en la salida local | Rotar las dos credenciales de Upstash (pendiente) | No corresponde | Abierto hasta rotar |
