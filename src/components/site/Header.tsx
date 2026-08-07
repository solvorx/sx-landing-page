import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { nav } from "@/lib/site";

/**
 * Barra blanca sólida en la parte superior de la portada. Su alto define
 * `--header-h`, del que cuelga la geometría del polígono del hero.
 */
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 h-(--header-h) bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="SolvorX — inicio" className="shrink-0">
          <Wordmark priority className="h-7 w-auto lg:h-8" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-brand-slate/70 transition-colors hover:text-brand-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contacto"
          className="inline-flex h-10 items-center rounded-full bg-brand-ink px-5 text-sm font-medium text-white transition-colors hover:bg-brand-blue"
        >
          Contacto
        </Link>
      </div>
    </header>
  );
}
