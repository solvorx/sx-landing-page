# SolvorX — landing

Landing page de SolvorX. Next.js 16 (App Router) + TypeScript + Tailwind v4 + `motion`.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
pnpm lint
```

## Dónde tocar qué

- **Todo el contenido** (copy, nav, features, bento, pasos, FAQ, footer, datos de
  la empresa) vive en [`src/lib/site.ts`](src/lib/site.ts). Es la única fuente de
  verdad: de ahí salen también la metadata, el sitemap, la imagen OG y el JSON-LD.
- **Geometría de la portada**: las variables CSS de `.hero` en
  [`src/app/globals.css`](src/app/globals.css) — alto y posición del isotipo,
  dónde arranca la diagonal (`--poly-top-x`) y su ángulo (`--poly-run`, que a
  45° vale el alto del bloque), y la posición del titular.
- **Paleta de marca**: bloque `@theme` en el mismo `globals.css`
  (`--color-brand-blue`, `-teal`, `-magenta`, `-amber`, `-ink`).
- **Logos**: `public/brand/` (copias de `assets/Logo SolvorX V2`). El isotipo SX
  de la portada está en línea en `src/components/brand/SxIsotype.tsx`.

## SEO

Metadata y JSON-LD (`Organization`, `WebSite`) en `src/app/layout.tsx`; `FAQPage`
en `src/components/sections/Faq.tsx`. Rutas generadas: `/robots.txt`,
`/sitemap.xml`, `/opengraph-image`, `/icon.svg`, `/apple-icon.png`.

## Pendiente antes de publicar

- Reemplazar el copy placeholder de `src/lib/site.ts`.
- Poner el dominio real en `siteConfig.url` (alimenta `metadataBase`, canonical,
  sitemap y JSON-LD).
- Sustituir `public/media/demo.mp4`: hoy es el video de referencia de `assets/`,
  un template de stock ajeno a la marca.
