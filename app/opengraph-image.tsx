import { ImageResponse } from "next/og"
import { siteName } from "@/lib/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** OG/Twitter card por defecto para toda ruta que no defina la suya propia. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#08090c",
          backgroundImage:
            "radial-gradient(ellipse 60% 55% at 88% 8%, rgba(52,211,234,0.20), transparent 60%), radial-gradient(ellipse 55% 50% at 8% 95%, rgba(217,70,239,0.16), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          }}
        >
          <span style={{ color: "#e7eaf0" }}>{"<"}</span>
          <span style={{ color: "#e7eaf0" }}>Codifik</span>
          <span style={{ color: "#34d3ea", margin: "0 6px" }}>·</span>
          <span style={{ color: "#34d3ea" }}>ai</span>
          <span style={{ color: "#8790a0", fontWeight: 300 }}>{"/>"}</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            color: "#9aa3b2",
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          }}
        >
          Enterprise AI Systems &amp; Automation
        </div>
      </div>
    ),
    { ...size }
  )
}

export const alt = `${siteName} — Enterprise AI Systems & Automation`
