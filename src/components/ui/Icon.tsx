import type { Feature } from "@/lib/site";

const paths: Record<Feature["icon"], string> = {
  spark: "M12 3l2.2 5.3L19.5 10l-5.3 2.2L12 17.5l-2.2-5.3L4.5 10l5.3-1.7L12 3Z",
  layers: "M12 3l9 5-9 5-9-5 9-5Zm9 9l-9 5-9-5m18 4l-9 5-9-5",
  shield: "M12 3l7.5 3v6c0 4.4-3.1 7.9-7.5 9-4.4-1.1-7.5-4.6-7.5-9V6L12 3Zm-2.6 8.8l2 2 3.9-4",
  gauge: "M4 17a8 8 0 1 1 16 0M12 17l4.2-5.6",
};

/** Iconos de trazo, un solo estilo para toda la página. */
export function Icon({
  name,
  className = "size-5",
}: {
  name: Feature["icon"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
