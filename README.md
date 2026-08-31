# SolvorX — landing

Landing page de SolvorX. Next.js 16 (App Router) + TypeScript + Tailwind v4 + `motion`.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
pnpm lint
```

## Rutas

| Ruta              | Qué es                                        |
| ----------------- | --------------------------------------------- |
| `/`               | Inicio: portada, servicios, proceso, FAQ, CTA. |
| `/adent`          | Vista del SaaS ADent (gestión odontológica).   |
| `/terminos`       | Términos y condiciones de SolvorX.             |
| `/adent/terminos` | Términos y condiciones de ADent.               |

## Dónde tocar qué

- **Contenido del inicio** (copy, nav, servicios, pasos, FAQ, footer, datos de
  la empresa) vive en [`src/lib/site.ts`](src/lib/site.ts): de ahí salen
  también la metadata, el sitemap, la imagen OG y el JSON-LD de organización.
- **Contenido de ADent**: [`src/lib/adent.ts`](src/lib/adent.ts). Los cupos de
  mensajes de cada plan son espejo del catálogo real de `adent-service`
  (`prisma/seed.ts`, tabla `billing.plan`).
- **Términos y condiciones**: [`src/lib/legal.ts`](src/lib/legal.ts) tiene los
  dos documentos como datos y
  [`LegalDoc.tsx`](src/components/legal/LegalDoc.tsx) los maqueta (índice
  lateral + articulado). Ese componente no usa `Reveal`: una sección que
  aparece al hacer scroll saldría en blanco al imprimir la página.
- **Geometría de la portada**: las variables CSS de `.hero` en
  [`src/app/globals.css`](src/app/globals.css) — alto y posición del isotipo,
  dónde arranca la diagonal (`--poly-top-x`) y su ángulo (`--poly-run`, que a
  45° vale el alto del bloque), y la posición del titular. El `<Header>` es
  hermano de `<main>` en `src/app/page.tsx` (no vive dentro de `Hero`), para
  que el landmark `banner` no quede atrapado dentro de `<main>`. En las vistas
  interiores el header va con `variant="solid"` (fijo arriba, con borde).
- **Paleta de marca**: bloque `@theme` en el mismo `globals.css`
  (`--color-brand-blue`, `-teal`, `-magenta`, `-amber`, `-ink`).
- **Logos**: `public/brand/`. El isotipo SX de la portada está en línea en
  `src/components/brand/SxIsotype.tsx`.
- **Secciones reutilizables**: `Features`, `HowItWorks`, `Faq` y `CtaBanner`
  reciben su contenido por props (por defecto, el del inicio). `/adent` las
  reusa con el contenido de `adent.ts`.

## SEO

El layout emite el JSON-LD de alcance global (`ProfessionalService` con el
`OfferCatalog` de los servicios, y `WebSite`). Cada vista agrega el suyo con
[`<JsonLd>`](src/components/seo/JsonLd.tsx): `VideoObject` + `FAQPage` en el
inicio; `SoftwareApplication` + `BreadcrumbList` + `FAQPage` en `/adent`. Un
`FAQPage` en el layout aparecería también en `/terminos`, donde no hay FAQ
visible que lo respalde.

Rutas generadas: `/robots.txt`, `/sitemap.xml`, `/opengraph-image`,
`/icon.svg`, `/apple-icon.png`, `/manifest.webmanifest`; `favicon.ico` es un
archivo estático. Las cuatro páginas están en el sitemap, con los documentos
legales fechados por su propio `updatedAt`.

Cada `FAQPage` tiene su contraparte visible en
[`Faq.tsx`](src/components/sections/Faq.tsx) — Google no otorga el rich result
si el contenido estructurado no está también renderizado en la página.

`/adent` no declara `offers`: todavía no hay lista de precios publicada.

## Pendiente antes de publicar

- **Revisión legal de los términos**: los documentos de `src/lib/legal.ts` son
  una base redactada sobre el producto real, sin revisión de un abogado.
- **Completar `legalEntity`** (razón social y RUC) en `src/lib/legal.ts`;
  mientras estén vacíos, esas líneas no se publican.
- **Reescribir la cláusula de pagos** de ambos documentos y el aviso
  `adentBillingNotice` cuando el PSP entre en producción.
- Confirmar cupos y precios de los planes de ADent.
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
