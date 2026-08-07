import type { ReactNode } from "react";

/** Píldora de etiqueta, como los "eyebrow" del video de referencia. */
export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-brand-ink/10 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-brand-ink/70 shadow-sm ${className}`}
    >
      <span className="size-1.5 rounded-full bg-brand-magenta" />
      {children}
    </span>
  );
}
