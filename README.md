# SolvorX — landing

Landing page de SolvorX. Next.js 16 (App Router) + TypeScript + Tailwind v4 + `motion`.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
pnpm lint
```

## Dónde tocar qué

- **Todo el contenido** (copy, nav, features, pasos, FAQ, footer, datos de
  la empresa) vive en [`src/lib/site.ts`](src/lib/site.ts). Es la única fuente de
  verdad: de ahí salen también la metadata, el sitemap, la imagen OG y el JSON-LD.
- **Geometría de la portada**: las variables CSS de `.hero` en
  [`src/app/globals.css`](src/app/globals.css) — alto y posición del isotipo,
  dónde arranca la diagonal (`--poly-top-x`) y su ángulo (`--poly-run`, que a
  45° vale el alto del bloque), y la posición del titular. El `<Header>` es
  hermano de `<main>` en `src/app/page.tsx` (no vive dentro de `Hero`), para
  que el landmark `banner` no quede atrapado dentro de `<main>`.
- **Paleta de marca**: bloque `@theme` en el mismo `globals.css`
  (`--color-brand-blue`, `-teal`, `-magenta`, `-amber`, `-ink`).
- **Logos**: `public/brand/`. El isotipo SX de la portada está en línea en
  `src/components/brand/SxIsotype.tsx`.

## SEO

Metadata y todo el JSON-LD (`ProfessionalService` con `OfferCatalog` de los 6
servicios, `WebSite`, `VideoObject`, `FAQPage`) se generan en
`src/app/layout.tsx` a partir de `site.ts`. Rutas generadas: `/robots.txt`,
`/sitemap.xml`, `/opengraph-image`, `/icon.svg`, `/apple-icon.png`,
`/manifest.webmanifest`; `favicon.ico` es un archivo estático.

El `FAQPage` del JSON-LD tiene que tener su contraparte visible en
[`Faq.tsx`](src/components/sections/Faq.tsx) — Google no otorga el rich
result si el contenido estructurado no está también renderizado en la
página.

## Pendiente antes de publicar

- Reescribir el copy de `features` y `steps` en `src/lib/site.ts` con
  orientación a keywords (title, description, `h1` y FAQ ya lo están).
- Elegir la variante de deploy (ver abajo) y aplicar su configuración.
- Cargar `NEXT_PUBLIC_GSC_TOKEN` cuando exista verificación de Search Console.

## Deploy (Firebase)

El dominio definitivo es `https://solvorx.com` (ya cargado en
`siteConfig.url`). Falta decidir la modalidad de hosting; documentamos las
dos para no bloquear el resto del trabajo.

### A. Hosting clásico + export estático (recomendado)

Sin datos dinámicos, un export estático sirve todo desde CDN, sin cold
starts y a costo ~0.

`next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // obligatorio: Features.tsx usa el loader por defecto de next/image
};
```

`firebase.json`:

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["**/.DS_Store"],
    "headers": [
      {
        "source": "/_next/static/**",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      },
      {
        "source": "/opengraph-image",
        "headers": [{ "key": "Content-Type", "value": "image/png" }]
      }
    ]
  }
}
```

El header explícito sobre `/opengraph-image` es obligatorio: el export
estático copia los route handlers de metadata a `out/<ruta>` sin extensión
(`next/dist/export/index.js`), y Firebase infiere el `Content-Type` por
extensión de archivo. Sin ese header serviría `application/octet-stream` y
WhatsApp/LinkedIn/X no renderizarían la preview social.

`headers()` / `redirects()` de `next.config.ts` no se aplican en este modo:
todo el enrutamiento de HTTP va en `firebase.json`.

### B. Firebase App Hosting (SSR)

Se mantiene el optimizador de `next/image` y `headers()`/`redirects()`
funcionan desde `next.config.ts`. El problema del `Content-Type` de
`/opengraph-image` no aplica (el route handler responde con el suyo). A
cambio, hay costo de cold starts en el TTFB.

`apphosting.yaml` (mínimo):

```yaml
runConfig:
  minInstances: 0
  maxInstances: 1
```

### En ambos casos

Configurar la canonicalización `www` → apex (`solvorx.com`) en los dominios
personalizados de Firebase Hosting.
