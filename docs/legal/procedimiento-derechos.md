# Procedimiento de atención de derechos (interno)

Documento interno: **no se publica**. Cubre los pedidos de acceso, rectificación, supresión, oposición, portabilidad y
retiro del consentimiento (Ley 7593/2025, arts. 26 a 33). El plazo es de **30 días corridos** desde que llega el
pedido, como dice la Política de Privacidad (`/privacidad#derechos`).

- **Responsable:** la persona titular del prestador (`legalEntity` en `src/lib/legal.ts`).
- **Canales de entrada:** WhatsApp y el correo de `legalEntity`. Un pedido que llegue por otro lado se registra igual.
- **Última revisión:** 2026-11-23.

## Lo que la persona ya puede hacer sola (Mi cuenta)

| Derecho | Dónde |
|---|---|
| Acceso y portabilidad | Perfil → Descargar mis datos (JSON) |
| Rectificación | Perfil (nombre, usuario, correo, teléfono) |
| Supresión | Seguridad → Eliminar tu cuenta |
| Retiro del consentimiento | Comunicaciones (novedades) y Apps conectadas (apps de terceros) |
| Seguridad | Sesiones, Actividad de seguridad, cambio de contraseña |

Si el pedido es sobre algo de esta lista, se responde indicando el camino. Si la persona no puede entrar, se hace por
ella siguiendo los pasos de abajo.

## Pasos

1. **Registrar** el pedido en la tabla de abajo, el mismo día. El plazo corre desde ahí.
2. **Verificar la identidad.** Tiene que escribir desde el correo o el teléfono de la cuenta. Si no, se le manda un
   código a los datos de la cuenta. No se entrega ni se borra nada sin verificar.
3. **Ver en qué rol estamos.**
   - Si los datos son de un cliente (por ejemplo, la ficha de un paciente en una clínica de DentuX), el responsable es
     el cliente: se le traslada el pedido dentro de los 5 días hábiles y se le avisa a la persona.
   - Si son de su cuenta SolvorX, seguimos.
4. **Resolver.**
   - **Acceso o portabilidad:** se genera la exportación con el mismo servicio de Mi cuenta
     (`PersonalDataService.exportForUser`) y se envía al correo verificado.
   - **Rectificación:** se corrige en la consola o en la base, y se deja constancia.
   - **Supresión:** el mismo cierre que hace Mi cuenta (`PersonalDataService.closeAccount`). Antes, dar de baja las
     suscripciones. Si la persona es parte del staff, primero se la quita de la plataforma.
   - **Oposición o retiro del consentimiento:** se cambian sus preferencias o se revoca la app.
   - **Avisar a los proyectos que guardan una copia** (hoy, la sincronización de usuarios de DentuX), hasta que eso
     sea automático.
5. **Responder** por el mismo canal, dentro de los 30 días: qué se hizo, o por qué no (por ejemplo, datos que la ley
   obliga a conservar), y que puede reclamar ante la Agencia Nacional de Protección de Datos Personales.
6. **Cerrar** el registro con la fecha de respuesta.

## Registro de pedidos

| Fecha de entrada | Canal | Persona (código de cuenta) | Derecho | Rol (responsable o encargado) | Verificada | Respuesta (fecha y resumen) |
|---|---|---|---|---|---|---|
