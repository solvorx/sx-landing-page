import type { IconName } from "@/lib/site";

type StrokeIcon = Exclude<IconName, "sx">;

/** Cada icono es una o más subrutas del mismo trazo. */
const paths: Record<StrokeIcon, string[]> = {
  spark: ["M12 3l2.2 5.3L19.5 10l-5.3 2.2L12 17.5l-2.2-5.3L4.5 10l5.3-1.7L12 3Z"],
  layers: ["M12 3l9 5-9 5-9-5 9-5Zm9 9l-9 5-9-5m18 4l-9 5-9-5"],
  shield: [
    "M12 3l7.5 3v6c0 4.4-3.1 7.9-7.5 9-4.4-1.1-7.5-4.6-7.5-9V6L12 3Zm-2.6 8.8l2 2 3.9-4",
  ],
  gauge: ["M4 17a8 8 0 1 1 16 0M12 17l4.2-5.6"],
  tooth: [
    "M12 5.4C10.4 4.1 8.9 3.7 7.6 4.2 5.8 4.9 5 6.5 5 8.9c0 1.7.3 3.2.8 4.6.4 1.2.7 2.4.9 3.7.2 1.4.5 2.4.9 2.8.5.6 1.2.4 1.5-.4.3-.8.6-2 .8-3.5.2-1.3.7-2 2.1-2s1.9.7 2.1 2c.2 1.5.5 2.7.8 3.5.3.8 1 1 1.5.4.4-.4.7-1.4.9-2.8.2-1.3.5-2.5.9-3.7.5-1.4.8-2.9.8-4.6 0-2.4-.8-4-2.6-4.7-1.3-.5-2.8-.1-4.4 1.2Z",
  ],
  calendar: [
    "M5.5 5.5h13A1.5 1.5 0 0 1 20 7v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V7a1.5 1.5 0 0 1 1.5-1.5Z",
    "M4 9.5h16M8.5 3.5v3m7-3v3",
    "M8.5 13h3",
  ],
  users: [
    "M15 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H7.4A3.4 3.4 0 0 0 4 18.4V20",
    "M9.5 11.6a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z",
    "M20 20v-1.6a3.4 3.4 0 0 0-2.6-3.3M14.8 5.2a3.3 3.3 0 0 1 0 6.2",
  ],
  bell: [
    "M18 9a6 6 0 1 0-12 0c0 4.9-2 6.3-2 6.3h16S18 13.9 18 9Z",
    "M13.8 18.5a2 2 0 0 1-3.6 0",
  ],
  chart: ["M4 4v16h16", "M8 16.5v-3.8m4 3.8V9m4 7.5V6.5"],
};

/** Iconos de trazo, un solo estilo para toda la página. "sx" tiene su propio render en Features. */
export function Icon({
  name,
  className = "size-5",
}: {
  name: StrokeIcon;
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
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
