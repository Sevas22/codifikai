"use client"

import { useMouseAmbient } from "@/components/providers/mouse-ambient-provider"

const SITE_BG_NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/**
 * Fondo fijo estilo Nosotros / hero: malla, rejilla, ruido, brillo que sigue al ratón (solo tema oscuro).
 */
export function SiteInteractiveBackground() {
  const { x, y, isMobile } = useMouseAmbient()

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 hero-diagonal-mesh opacity-35 dark:opacity-25" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 82% 38%, oklch(0.68 0.2 285 / 0.12), transparent 50%), radial-gradient(ellipse 90% 60% at 78% 45%, oklch(0.76 0.18 195 / 0.12), transparent 54%), radial-gradient(ellipse 80% 50% at 12% 88%, oklch(0.55 0.14 285 / 0.06), transparent 50%), radial-gradient(ellipse 55% 45% at 8% 18%, oklch(0.72 0.16 300 / 0.05), transparent 46%)",
        }}
      />
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: isMobile
            ? "radial-gradient(circle at 50% 30%, oklch(0.68 0.18 285 / 0.08) 0%, transparent 55%)"
            : `radial-gradient(circle at ${x}% ${y}%, oklch(0.65 0.2 285 / 0.1) 0%, oklch(0.76 0.16 195 / 0.08) 40%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4] mix-blend-overlay dark:opacity-[0.32]"
        style={{ backgroundImage: SITE_BG_NOISE, backgroundSize: "128px 128px" }}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.98_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.98_0_0/0.035)_1px,transparent_1px)] bg-[length:min(72px,11vw)_min(72px,11vw)] dark:bg-[linear-gradient(to_right,oklch(0.98_0_0/0.022)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.98_0_0/0.022)_1px,transparent_1px)]"
        style={{
          maskImage: "radial-gradient(ellipse 88% 72% at 50% 38%, black 22%, transparent 74%)",
          WebkitMaskImage: "radial-gradient(ellipse 88% 72% at 50% 38%, black 22%, transparent 74%)",
        }}
      />
      <div className="absolute inset-0 overflow-hidden opacity-25 dark:opacity-20">
        <div className="hero-scanline absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/35 to-transparent" />
      </div>
      <div className="absolute -left-16 top-1/3 h-64 w-64 rounded-full bg-violet-600/12 blur-3xl md:animate-float" />
      <div className="absolute -right-12 bottom-1/3 hidden h-56 w-56 rounded-full bg-fuchsia-600/10 blur-3xl md:block md:animate-float md:delay-300" />
    </div>
  )
}
