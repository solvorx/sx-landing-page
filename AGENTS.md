<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SolvorX — landing

Landing page de SolvorX (Next.js 16 App Router, TypeScript, Tailwind v4, `motion`).

## Rutas

| Ruta               | Qué es                                          |
| ------------------ | ----------------------------------------------- |
| `/`                | Inicio: portada, servicios, proceso, FAQ, CTA.   |
| `/dentux`           | Vista del SaaS DentuX (gestión odontológica).     |
| `/terminos`        | Términos y condiciones de SolvorX.               |
| `/privacidad`      | Política de Privacidad (cuenta, login, checkout). |
| `/cookies`         | Política de Cookies.                             |
| `/eliminar-cuenta` | Cómo eliminar la cuenta (URL que pide Google Play). |
| `/soporte`         | Canales de soporte (URL que pide App Store).     |
| `/encargo-de-datos` | Acuerdo de encargo de tratamiento (DPA, art. 11 Ley 7593). |
| `/dentux/terminos`  | Términos y condiciones de DentuX.                 |

## Dónde tocar qué

- **Contenido del inicio** (copy, nav, servicios, pasos, FAQ, footer, datos de
  la empresa): [`src/lib/site.ts`](src/lib/site.ts). De ahí salen también
  metadata, sitemap, imagen OG y el JSON-LD de organización.
- **Contenido de DentuX**: [`src/lib/dentux.ts`](src/lib/dentux.ts) — hero,
  capacidades, pasos, planes y FAQ del producto. Los límites de cada plan
  (usuarios, turnos por mes y cupo de correos) son **espejo del catálogo
  real** de `sx-dentux-service` (`prisma/seed.ts`, tabla `billing.plan`): si
  cambian allá, cambian acá. Los términos de DentuX los leen de ahí.
- **Documentos legales**, todos como datos:
  - [`legal.ts`](src/lib/legal.ts): términos de SolvorX y de DentuX, más lo
    que comparten todos — tipos, `legalPaths`, `legalEntity`, `minimumAge` y
    los helpers `p`, `list`, `table`.
  - [`privacy.ts`](src/lib/privacy.ts): Política de Privacidad y de Cookies,
    con las tablas `subprocessors`, `retention` y `cookies`.
  - [`support.ts`](src/lib/support.ts): Eliminar mi cuenta y Soporte.
  - [`dpa.ts`](src/lib/dpa.ts): Acuerdo de encargo de tratamiento.
  - [`legal-documents.ts`](src/lib/legal-documents.ts): la lista de la que sale
    el sitemap. Un documento nuevo va ahí, en `legalPaths` y en la columna
    "Legal" de `footerLinks` (`site.ts`).
  - [`LegalDoc.tsx`](src/components/legal/LegalDoc.tsx) los maqueta y
    [`LegalPage.tsx`](src/components/legal/LegalPage.tsx) arma la página y la
    metadata. `LegalDoc` **no usa `Reveal`** a propósito: una sección que
    aparece al hacer scroll sale en blanco si alguien imprime la página sin
    recorrerla.
  - [`docs/legal/registro-de-tratamientos.md`](docs/legal/registro-de-tratamientos.md):
    registro interno (no se publica) del que salen los textos y los
    formularios de las tiendas.
  - [`docs/legal/procedimiento-incidentes.md`](docs/legal/procedimiento-incidentes.md)
    y [`docs/legal/procedimiento-derechos.md`](docs/legal/procedimiento-derechos.md):
    cómo se atiende una brecha (aviso en 72 horas) y un pedido de derechos
    (30 días), con su bitácora y su registro. Internos, no se publican.
- **Geometría de la portada**: variables CSS de `.hero` en
  [`src/app/globals.css`](src/app/globals.css) (alto/posición del isotipo,
  arranque y ángulo de la diagonal, posición del titular). `--header-h` está
  declarada en `:root` (no en `.hero`) porque el `<Header>` vive fuera de
  `Hero`, como hermano de `<main>` en `src/app/page.tsx` (para no romper el
  landmark `banner`), y necesita heredar la misma variable que usa el
  polígono. `/dentux` no reutiliza esa geometría: su portada es una tarjeta
  dentro del flujo, y el header va en `variant="solid"` (fijo, con borde).
- **Paleta de marca**: bloque `@theme` en `globals.css`.
- **Logos**: `public/brand/` (isotipo SX inline en
  `src/components/brand/SxIsotype.tsx`).
- **Secciones reutilizables**: `Features`, `HowItWorks`, `Faq` y `CtaBanner`
  toman su contenido por props, con el del inicio como valor por defecto —
  `/dentux` las reusa con el contenido de `dentux.ts`.

## SEO

El JSON-LD **no** está todo centralizado: el layout emite solo lo que vale
para todo el sitio (`ProfessionalService` con su `OfferCatalog`, y `WebSite`),
y cada vista emite lo suyo con [`<JsonLd>`](src/components/seo/JsonLd.tsx):
`VideoObject` + `FAQPage` en el inicio, y `SoftwareApplication` +
`BreadcrumbList` + `FAQPage` en `/dentux`. Un `FAQPage` global aparecería
también en las rutas que no muestran ese FAQ y Google no lo validaría: el
contenido estructurado tiene que estar visible en la misma página, y de eso se
encarga [`Faq.tsx`](src/components/sections/Faq.tsx).

`/dentux` no declara `offers` en su `SoftwareApplication`: la landing no
publica la lista de precios (se ve en vivo en el panel y en el checkout).

## Pendiente antes de publicar

- **Revisión legal de todos los documentos** (términos, privacidad, cookies,
  eliminación de cuenta, soporte y encargo). Son una base redactada a partir
  del producto real, no un texto revisado por un abogado. Puntos a confirmar:
  - el plazo de arrepentimiento: se publicó el de la Ley 1334 (7 días
    corridos), y la Ley 4868 (art. 30) fija 5 días hábiles;
  - que la Ley 6822/2021 reemplazó por completo a la 4017/2010;
  - los 5 años de conservación de pagos y comprobantes (normativa tributaria);
  - si la Agencia Nacional de Protección de Datos ya funciona y si hace
    falta delegado de protección de datos (depende del decreto reglamentario
    de la Ley 7593).
- **Que lo publicado sea verdad.** La Política de Privacidad describe el
  sistema como queda con la rama `feat/SX-73/legals` desplegada. Antes de
  publicarla:
  - desplegar esa rama en sx-management-service (migraciones primero), identity,
    account y console. Trae: límite de intentos del OTP, enmascarado de los
    registros técnicos, `/userinfo` acotado a los scopes, aceptación con versión
    y edad, consentimiento para apps de terceros, "Apps conectadas",
    eliminación con anonimización, "Descargar mis datos", Comunicaciones,
    Actividad de seguridad y los pies legales;
  - programar en Cloud Scheduler (una vez por día) el job
    `POST /v1/external/job/purge-personal-data` de sx-management-service: sin
    él no se cumplen los plazos de sesiones, códigos, auditoría y eventos de
    seguridad que publica `retention`;
  - los plazos que siguen sin implementar: TTL de `request_trace` a 30 días en
    prod, y la purga de las constancias a los 5 años de eliminada la cuenta;
  - confirmar la región de MongoDB Atlas y de Upstash (`subprocessors`
    marcados `pending`, que hoy se muestran como "A confirmar");
  - confirmar que Neon hace respaldos (lo afirma el acuerdo de encargo).
- **Versiones de los textos.** Las de `constant.legal` en
  sx-management-service tienen que ser el `updatedAt` de los Términos
  (`legal.ts`) y de la Privacidad (`privacy.ts`): si cambia un texto, cambia la
  versión allá y todos lo vuelven a aceptar en su próximo login.
- **Procedimientos internos** (`docs/legal/`): el de incidentes y el de pedidos
  de los titulares tienen que tener responsables con nombre antes de publicar.
- **Decidir la modalidad de entrega** de la sección "Titularidad del software":
  hoy el texto cubre las dos (cesión al cliente vs. licencia con alojamiento
  propio) y deja la licencia como supletoria.
- **Evaluar una casilla de dominio propio** (por ejemplo `hola@solvorx.com`)
  que reemplace al Gmail personal publicado en los términos: el art. 7 de la
  Ley N.º 4868/2013 exige una dirección electrónica, pero no que sea personal.
- **Sumar Pagopar a los medios de pago** cuando la cuenta quede habilitada
  para servicios virtuales: la cláusula "Pagos en línea" de SolvorX, "Cómo se
  paga" de DentuX, el aviso `dentuxBillingNotice` y la FAQ de pagos hoy dicen
  "solo transferencia" y tienen que seguir diciendo lo mismo entre sí.
- **Plazos de la suscripción** en los términos de DentuX (`subscriptionPolicy`
  en `legal.ts`): espejo de la política del proyecto `dentux` en sx-payment
  (gracia 5, mora 15, cobro 5 días antes, aviso de suba 30). Confirmar que
  prod usa esos valores.
- Reescribir el copy de `features` y `steps` en `src/lib/site.ts` con
  orientación a keywords (title, description, `h1` y FAQ ya están orientados).
- Definir la variante de deploy en Firebase (export estático vs. App
  Hosting/SSR) — ver sección "Deploy" del `README.md`.
- Cargar `NEXT_PUBLIC_GSC_TOKEN` cuando exista verificación de Search Console.
