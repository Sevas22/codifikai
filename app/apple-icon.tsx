import { ImageResponse } from "next/og"

/** Apple touch icon — monograma Ck */
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
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
            fontSize: 92,
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
