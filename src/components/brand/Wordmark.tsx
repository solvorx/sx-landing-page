import Image from "next/image";
import { siteConfig } from "@/lib/site";

/** Logotipo "SolvorX". `variant` elige la tinta según el fondo. */
export function Wordmark({
  variant = "claro",
  className,
  priority = false,
}: {
  variant?: "claro" | "oscuro";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/brand/logo-${variant}.svg`}
      alt={siteConfig.name}
      width={164}
      height={40}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
