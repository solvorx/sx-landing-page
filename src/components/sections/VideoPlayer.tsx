"use client";

import { useRef, useState } from "react";

/**
 * Video con carátula y botón de play. `preload="none"` mantiene el video
 * fuera de la carga inicial: no compite con el LCP de la portada.
 */
export function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    videoRef.current?.play();
    setPlaying(true);
  }

  return (
    <div className="relative overflow-hidden rounded-4xl border border-brand-ink/8 bg-brand-ink shadow-[0_30px_80px_-40px] shadow-brand-ink/50">
      <video
        ref={videoRef}
        src={src}
        preload="none"
        playsInline
        controls={playing}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="aspect-video w-full bg-brand-ink object-cover"
      />

      {!playing && (
        <button
          type="button"
          onClick={play}
          aria-label="Reproducir el video de presentación"
          className="absolute inset-0 grid place-items-center bg-gradient-to-br from-brand-ink via-brand-ink to-brand-blue/40 transition-opacity hover:opacity-95"
        >
          <span className="grid size-20 place-items-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 size-7 fill-brand-ink"
              aria-hidden="true"
            >
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
