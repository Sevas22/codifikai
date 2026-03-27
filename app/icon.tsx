import { ImageResponse } from "next/og"

/** Favicon: gradiente marca + monograma Ck (CodifiKai). */
export const size = { width: 48, height: 48 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #22d3ee 0%, #6366f1 48%, #d946ef 100%)",
          borderRadius: "22%",
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            letterSpacing: "-0.04em",
          }}
        >
          Ck
        </span>
      </div>
    ),
    { ...size }
  )
}
