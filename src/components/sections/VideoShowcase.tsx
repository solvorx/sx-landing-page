import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { showcase } from "@/lib/site";

/** Card de video con botón de reproducción, justo debajo de la portada. */
export function VideoShowcase() {
  return (
    <section id="video" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>{showcase.eyebrow}</Badge>
          <h2 className="mt-6 font-display text-3xl font-semibold text-balance text-brand-ink lg:text-4xl">
            {showcase.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-brand-slate/65">
            {showcase.body}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <VideoPlayer src={showcase.src} />
        </Reveal>
      </div>
    </section>
  );
}
