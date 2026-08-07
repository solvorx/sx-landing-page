<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SolvorX — landing

Landing page de SolvorX (Next.js 16 App Router, TypeScript, Tailwind v4, `motion`).

## Dónde tocar qué

- **Contenido** (copy, nav, features, bento, pasos, FAQ, footer, datos de la
  empresa): [`src/lib/site.ts`](src/lib/site.ts) es la única fuente de verdad;
  de ahí salen también metadata, sitemap, imagen OG y JSON-LD.
- **Geometría de la portada**: variables CSS de `.hero` en
  [`src/app/globals.css`](src/app/globals.css) (alto/posición del isotipo,
  arranque y ángulo de la diagonal, posición del titular).
- **Paleta de marca**: bloque `@theme` en `globals.css`.
- **Logos**: `public/brand/` (isotipo SX inline en
  `src/components/brand/SxIsotype.tsx`).
- **SEO**: metadata y JSON-LD (`Organization`, `WebSite`) en
  `src/app/layout.tsx`; `FAQPage` en `src/components/sections/Faq.tsx`.

## Pendiente antes de publicar

- Reemplazar el copy placeholder de `src/lib/site.ts`.
- Poner el dominio real en `siteConfig.url`.
- Sustituir `public/media/demo.mp4` (hoy es un video de stock genérico).
