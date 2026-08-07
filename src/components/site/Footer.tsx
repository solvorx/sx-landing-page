import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { footerLinks, siteConfig } from "@/lib/site";

const social = [
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "X", href: siteConfig.social.x },
  { label: "GitHub", href: siteConfig.social.github },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-ink/8 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Wordmark className="h-7 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-slate/60">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-sm font-medium text-brand-blue"
            >
              {siteConfig.email}
            </a>
          </div>

          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-display text-sm font-semibold text-brand-ink">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-slate/60 transition-colors hover:text-brand-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-brand-ink/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-slate/50">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
            reservados.
          </p>
          <ul className="flex gap-5">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs text-brand-slate/60 transition-colors hover:text-brand-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
