/**
 * Bloque `application/ld+json`. El contenido siempre sale de `src/lib/*`
 * (copy estático, no entrada de usuario); aun así se escapa "<", siguiendo la
 * recomendación de Next para JSON-LD.
 *
 * Cada vista emite el suyo: el layout solo lleva lo que vale para todo el
 * sitio (organización y WebSite), y los tipos atados a una página —FAQPage,
 * VideoObject, SoftwareApplication— van en esa página. Un FAQPage global
 * aparecería también en rutas que no muestran ese FAQ, y Google no lo valida.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
