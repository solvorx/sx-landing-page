"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video en bucle que arranca solo al entrar en el viewport y no expone
 * controles nativos: solo un botón para silenciar/escuchar (mudo por defecto,
 * que es lo que permite el autoplay en la mayoría de los navegadores).
 */
export function VideoPlayer({
  src,
  poster,
  title,
  description,
}: {
  src: string;
  poster?: string;
  title: string;
  description: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Se fija por JS, antes del play(), para no depender de que el atributo
    // `muted` del HTML servido gane la carrera contra la política de
    // autoplay del navegador durante la hidratación.
    video.muted = true;

    if (typeof IntersectionObserver === "undefined") {
      void video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
  }

  return (
    <div className="relative overflow-hidden rounded-4xl border border-brand-ink/8 bg-brand-ink shadow-[0_30px_80px_-40px] shadow-brand-ink/50">
      <p className="sr-only">{description}</p>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        loop
        muted={muted}
        aria-label={title}
        className="aspect-video w-full bg-brand-ink object-cover"
      />

      {/* Botón de silencio */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
        aria-pressed={!muted}
        className="absolute bottom-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-brand-ink/55 text-white backdrop-blur-md transition-colors hover:bg-brand-ink/80"
      >
        {muted ? (
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="m22 9-6 6M16 9l6 6" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>
    </div>
  );
}