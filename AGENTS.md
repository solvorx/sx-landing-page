<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SolvorX — landing

Landing page de SolvorX (Next.js 16 App Router, TypeScript, Tailwind v4, `motion`).

## Dónde tocar qué

- **Contenido** (copy, nav, features, pasos, FAQ, footer, datos de la
  empresa): [`src/lib/site.ts`](src/lib/site.ts) es la única fuente de verdad;
  de ahí salen también metadata, sitemap, imagen OG y JSON-LD.
- **Geometría de la portada**: variables CSS de `.hero` en
  [`src/app/globals.css`](src/app/globals.css) (alto/posición del isotipo,
  arranque y ángulo de la diagonal, posición del titular). `--header-h` está
  declarada en `:root` (no en `.hero`) porque el `<Header>` vive fuera de
  `Hero`, como hermano de `<main>` en `src/app/page.tsx` (para no romper el
  landmark `banner`), y necesita heredar la misma variable que usa el
  polígono.
- **Paleta de marca**: bloque `@theme` en `globals.css`.
- **Logos**: `public/brand/` (isotipo SX inline en
  `src/components/brand/SxIsotype.tsx`).
- **SEO**: metadata y todo el JSON-LD (`ProfessionalService` con
  `OfferCatalog`, `WebSite`, `VideoObject`, `FAQPage`) están centralizados en
  `src/app/layout.tsx`, generados a partir de `site.ts`.
  [`Faq.tsx`](src/components/sections/Faq.tsx) renderiza el contenido visible
  de las preguntas frecuentes — tiene que existir y coincidir con el
  `FAQPage` del JSON-LD, o Google no concede el rich result.

## Pendiente antes de publicar

- Reescribir el copy de `features` y `steps` en `src/lib/site.ts` con
  orientación a keywords (title, description, `h1` y FAQ ya están orientados).
- Definir la variante de deploy en Firebase (export estático vs. App
  Hosting/SSR) — ver sección "Deploy" del `README.md`.
- Cargar `NEXT_PUBLIC_GSC_TOKEN` cuando exista verificación de Search Console.
