import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Tarjeta OG generada en build. Reproduce la portada: bloque #1d0639 con la
 * diagonal y la franja de la paleta al pie.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#1d0639",
          padding: "80px 90px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 6,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          SOLVORX
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: 900,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 28,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 820,
          }}
        >
          Software a medida, automatización e inteligencia artificial aplicada.
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 18,
            background:
              "linear-gradient(90deg, #0063b5 0%, #20868e 33%, #dc067a 66%, #ffa500 100%)",
          }}
        />
      </div>
    ),
    size,
  );
}
