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
| `/adent`           | Vista del SaaS ADent (gestión odontológica).     |
| `/terminos`        | Términos y condiciones de SolvorX.               |
| `/adent/terminos`  | Términos y condiciones de ADent.                 |

## Dónde tocar qué

- **Contenido del inicio** (copy, nav, servicios, pasos, FAQ, footer, datos de
  la empresa): [`src/lib/site.ts`](src/lib/site.ts). De ahí salen también
  metadata, sitemap, imagen OG y el JSON-LD de organización.
- **Contenido de ADent**: [`src/lib/adent.ts`](src/lib/adent.ts) — hero,
  capacidades, pasos, planes y FAQ del producto. Los cupos de mensajes de cada
  plan son **espejo del catálogo real** de `adent-service`
  (`prisma/seed.ts`, tabla `billing.plan`): si cambian allá, cambian acá.
- **Términos y condiciones**: [`src/lib/legal.ts`](src/lib/legal.ts) contiene
  los dos documentos (SolvorX y ADent) como datos;
  [`LegalDoc.tsx`](src/components/legal/LegalDoc.tsx) solo los maqueta. Ese
  componente **no usa `Reveal`** a propósito: una sección que aparece al hacer
  scroll sale en blanco si alguien imprime la página sin recorrerla.
- **Geometría de la portada**: variables CSS de `.hero` en
  [`src/app/globals.css`](src/app/globals.css) (alto/posición del isotipo,
  arranque y ángulo de la diagonal, posición del titular). `--header-h` está
  declarada en `:root` (no en `.hero`) porque el `<Header>` vive fuera de
  `Hero`, como hermano de `<main>` en `src/app/page.tsx` (para no romper el
  landmark `banner`), y necesita heredar la misma variable que usa el
  polígono. `/adent` no reutiliza esa geometría: su portada es una tarjeta
  dentro del flujo, y el header va en `variant="solid"` (fijo, con borde).
- **Paleta de marca**: bloque `@theme` en `globals.css`.
- **Logos**: `public/brand/` (isotipo SX inline en
  `src/components/brand/SxIsotype.tsx`).
- **Secciones reutilizables**: `Features`, `HowItWorks`, `Faq` y `CtaBanner`
  toman su contenido por props, con el del inicio como valor por defecto —
  `/adent` las reusa con el contenido de `adent.ts`.

## SEO

El JSON-LD **no** está todo centralizado: el layout emite solo lo que vale
para todo el sitio (`ProfessionalService` con su `OfferCatalog`, y `WebSite`),
y cada vista emite lo suyo con [`<JsonLd>`](src/components/seo/JsonLd.tsx):
`VideoObject` + `FAQPage` en el inicio, y `SoftwareApplication` +
`BreadcrumbList` + `FAQPage` en `/adent`. Un `FAQPage` global aparecería
también en las rutas que no muestran ese FAQ y Google no lo validaría: el
contenido estructurado tiene que estar visible en la misma página, y de eso se
encarga [`Faq.tsx`](src/components/sections/Faq.tsx).

`/adent` no declara `offers` en su `SoftwareApplication`: no hay lista de
precios publicada todavía.

## Pendiente antes de publicar

- **Revisión legal de los términos.** Los dos documentos de `src/lib/legal.ts`
  son una base redactada a partir del producto real, no un texto revisado por
  un abogado.
- **Completar `legalEntity`** en `src/lib/legal.ts` (razón social y RUC): están
  vacíos y el documento omite esas líneas mientras lo estén.
- **Reescribir la cláusula de pagos** de ambos documentos y el aviso
  `adentBillingNotice` cuando el PSP entre en producción — hoy los tres dicen
  que los cobros en línea están en implementación y tienen que seguir diciendo
  lo mismo entre sí.
- Confirmar los cupos y los precios de los planes de ADent antes de publicar
  `/adent` (hoy se muestran cupos sin precio).
- Reescribir el copy de `features` y `steps` en `src/lib/site.ts` con
  orientación a keywords (title, description, `h1` y FAQ ya están orientados).
- Definir la variante de deploy en Firebase (export estático vs. App
  Hosting/SSR) — ver sección "Deploy" del `README.md`.
- Cargar `NEXT_PUBLIC_GSC_TOKEN` cuando exista verificación de Search Console.
