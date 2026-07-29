"use client"

/**
 * Fondo fijo, estático (sin seguimiento de mouse): degradado sutil + rejilla,
 * consistente con el resto del sitio pero sin coste de render por frame.
 */
export function SiteInteractiveBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 hero-diagonal-mesh opacity-20" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 82% 10%, oklch(0.68 0.2 285 / 0.08), transparent 55%), radial-gradient(ellipse 70% 50% at 15% 90%, oklch(0.76 0.18 195 / 0.06), transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.98_0_0/0.022)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.98_0_0/0.022)_1px,transparent_1px)] bg-[length:min(72px,11vw)_min(72px,11vw)]"
        style={{
          maskImage: "radial-gradient(ellipse 88% 72% at 50% 38%, black 22%, transparent 74%)",
          WebkitMaskImage: "radial-gradient(ellipse 88% 72% at 50% 38%, black 22%, transparent 74%)",
        }}
      />
    </div>
  )
}
