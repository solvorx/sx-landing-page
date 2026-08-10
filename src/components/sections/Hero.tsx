import { SxIsotype } from "@/components/brand/SxIsotype";
import { Button } from "@/components/ui/Button";
import { hero } from "@/lib/site";

/**
 * Portada. Capas, de atrás hacia adelante:
 *   1. fondo blanco
 *   2. isotipo SX (queda tapado donde entra el polígono)
 *   3. polígono #1d0639 recortado por una diagonal de 45°, con el borde
 *      inferior recto contra el borde de la pantalla
 *   4. titular + CTA sobre el polígono
 * El header vive fuera de esta sección (hermano de `<main>`, ver page.tsx)
 * para no romper el landmark `banner`; `--header-h` vive en `:root` de
 * globals.css (no en `.hero`) precisamente para que header y polígono
 * compartan el mismo valor pese a estar en subárboles distintos.
 * La geometría es relativa al alto de la sección, por eso el `min-h`: en
 * pantallas muy bajas (móvil en horizontal) el bloque de texto se saldría
 * del polígono.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="hero relative h-svh min-h-[620px] overflow-hidden bg-white"
    >
      {/* Isotipo SX */}
      <SxIsotype className="absolute top-1/2 left-(--sx-left) h-(--sx-h) w-auto -translate-y-1/2 [display:var(--sx-display)]" />

      {/* Polígono principal */}
      <div
        className="absolute inset-x-0 top-(--header-h) bottom-0 bg-brand-ink"
        style={{ clipPath: "var(--poly-clip)" }}
      />

      {/*
        Titular sobre el polígono. Su borde izquierdo se calcula desde la misma
        diagonal (85% del ancho menos lo que la diagonal ya recorrió hasta
        --text-top), más un margen, así que el texto blanco nunca cae sobre el
        fondo blanco por estrecha o baja que sea la pantalla.
      */}
      <div className="absolute inset-x-6 top-[30%] z-40 md:inset-x-auto md:top-(--text-top) md:right-[6%] md:left-(--text-left)">
        <h1
          id="hero-title"
          className="font-display text-[clamp(1.5rem,1vw+2.6vh,2.5rem)] leading-[1.15] font-semibold text-balance text-white"
        >
          {hero.title}
        </h1>
        <p className="mt-5 text-[clamp(0.8125rem,0.4vw+1.1vh,1rem)] leading-relaxed text-pretty text-white/70">
          {hero.body}
        </p>
        <Button
          href={hero.cta.href}
          variant="onDark"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-8"
        >
          {hero.cta.label}
        </Button>
      </div>
    </section>
  );
}
