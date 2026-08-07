import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "onDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200";

const sizes = {
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
} as const;

const variants: Record<Variant, string> = {
  primary: "bg-brand-ink text-white hover:bg-brand-blue",
  ghost:
    "border border-brand-ink/15 bg-white text-brand-slate hover:border-brand-ink/40",
  onDark: "bg-white text-brand-ink hover:bg-brand-amber hover:text-brand-ink",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
