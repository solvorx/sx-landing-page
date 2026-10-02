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
- **Términos y condiciones**: [`src/lib/legal.ts`](src/lib/legal.ts) contiene
  los dos documentos (SolvorX y DentuX) como datos;
  [`LegalDoc.tsx`](src/components/legal/LegalDoc.tsx) solo los maqueta. Ese
  componente **no usa `Reveal`** a propósito: una sección que aparece al hacer
  scroll sale en blanco si alguien imprime la página sin recorrerla.
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

- **Revisión legal de los términos.** Los dos documentos de `src/lib/legal.ts`
  son una base redactada a partir del producto real, no un texto revisado por
  un abogado.
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
