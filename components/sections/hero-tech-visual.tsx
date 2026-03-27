"use client"

import { useMemo } from "react"

type HeroTechVisualProps = {
  mouseX: number
  mouseY: number
  isMobile: boolean
}

/** Escena decorativa 3D (CSS perspective + SVG): nÃºcleo, anillos y plano isomÃ©trico. */
export function HeroTechVisual({ mouseX, mouseY, isMobile }: HeroTechVisualProps) {
  const tilt = useMemo(() => {
    if (isMobile) {
      return { rx: 8, ry: -6, rz: 0 }
    }
    const rx = 10 + (mouseY - 50) * 0.12
    const ry = -14 + (mouseX - 50) * 0.18
    const rz = (mouseX - 50) * 0.04
    return { rx, ry, rz }
  }, [mouseX, mouseY, isMobile])

  return (
    <div
      className="relative mx-auto h-[280px] w-full max-w-[min(100%,420px)] sm:h-[340px] lg:mx-0 lg:h-[420px] lg:max-w-none"
      aria-hidden
    >
      {/* Glow ambiental detrÃ¡s de la escena */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.76_0.18_195/0.22)_0%,transparent_55%)] blur-3xl" />
        <div className="absolute left-[20%] top-[15%] h-32 w-32 rounded-full bg-accent/15 blur-3xl hero-tech-pulse" />
        <div className="absolute bottom-[10%] right-[15%] h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl hero-tech-pulse-delay" />
      </div>

      <div
        className="hero-tech-stage relative h-full w-full"
        style={{
          perspective: "1400px",
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(${tilt.rz}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Plano de rejilla isomÃ©trica (suelo 3D) */}
          <div
            className="hero-tech-grid-plane pointer-events-none absolute left-1/2 top-[58%] h-[200px] w-[280px] -translate-x-1/2 border border-accent/20 sm:h-[240px] sm:w-[320px] lg:h-[280px] lg:w-[380px]"
            style={{
              transform: "rotateX(72deg) translateZ(-80px)",
              transformStyle: "preserve-3d",
              background:
                "linear-gradient(135deg, oklch(0.76 0.18 195 / 0.06) 0%, transparent 50%), repeating-linear-gradient(-30deg, transparent, transparent 11px, oklch(0.98 0 0 / 0.04) 11px, oklch(0.98 0 0 / 0.04) 12px), repeating-linear-gradient(30deg, transparent, transparent 11px, oklch(0.98 0 0 / 0.03) 11px, oklch(0.98 0 0 / 0.03) 12px)",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 75%)",
            }}
          />

          {/* Anillo exterior */}
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 sm:h-[260px] sm:w-[260px]"
            style={{
              transform: "translateZ(40px) rotateX(68deg)",
              boxShadow:
                "0 0 40px oklch(0.76 0.18 195 / 0.15), inset 0 0 30px oklch(0.76 0.18 195 / 0.08)",
            }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 sm:h-[240px] sm:w-[240px]"
            style={{
              transform: "translateZ(60px) rotateX(72deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="hero-tech-orbit-ring h-full w-full rounded-full border-2 border-dashed border-accent/30" />
          </div>

          {/* Núcleo central — "chip" flotante */}
          <div
            className="pointer-events-none absolute left-1/2 top-[40%] flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-28 sm:w-28"
            style={{
              transform: "translateZ(120px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/40 via-cyan-400/20 to-transparent opacity-90 blur-md"
              style={{ transform: "translateZ(-8px) scale(1.15)" }}
            />
            <div
              className="relative flex h-full w-full items-center justify-center rounded-2xl border border-accent/50 bg-[linear-gradient(145deg,oklch(0.15_0.02_260/0.9),oklch(0.12_0.02_260/0.95))] shadow-[0_25px_60px_-15px_oklch(0.76_0.18_195/0.45),inset_0_1px_0_oklch(0.98_0_0/0.12)] backdrop-blur-sm"
              style={{
                transform: "translateZ(0)",
              }}
            >
              <svg viewBox="0 0 64 64" className="h-14 w-14 text-accent sm:h-16 sm:w-16" fill="none">
                <path
                  d="M32 8 L52 20 V44 L32 56 L12 44 V20 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="opacity-90"
                />
                <path d="M32 8 V32 M32 32 L52 20 M32 32 L12 20 M32 32 L32 56" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
                <circle cx="32" cy="32" r="6" fill="currentColor" className="opacity-80" />
              </svg>
            </div>
            {/* aristas 3D simuladas */}
            <div
              className="absolute -right-1 top-2 h-[85%] w-3 rounded-sm bg-gradient-to-l from-accent/30 to-transparent opacity-60"
              style={{ transform: "rotateY(90deg) translateZ(12px)" }}
            />
            <div
              className="absolute -bottom-1 left-2 h-3 w-[85%] rounded-sm bg-gradient-to-t from-accent/20 to-transparent opacity-50"
              style={{ transform: "rotateX(90deg) translateZ(10px)" }}
            />
          </div>

          {/* Tarjetas flotantes tipo "módulos" */}
          <div
            className="hero-tech-float-card pointer-events-none absolute left-[8%] top-[28%] rounded-lg border border-white/10 bg-background/40 px-3 py-2 text-[10px] font-mono text-accent/90 shadow-lg backdrop-blur-md sm:left-[5%] sm:top-[24%] sm:px-3.5 sm:py-2.5 sm:text-xs"
            style={{ transform: "translateZ(90px) rotateY(-8deg)" }}
          >
            <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">AI</span>
            inference
          </div>
          <div
            className="hero-tech-float-card pointer-events-none absolute right-[6%] top-[38%] rounded-lg border border-white/10 bg-background/40 px-3 py-2 text-[10px] font-mono text-accent/90 shadow-lg backdrop-blur-md sm:right-[4%] sm:px-3.5 sm:py-2.5 sm:text-xs"
            style={{ transform: "translateZ(100px) rotateY(10deg)" }}
          >
            <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">Edge</span>
            deploy
          </div>
          <div
            className="hero-tech-pill pointer-events-none absolute bottom-[22%] left-[18%] rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-accent sm:bottom-[18%] sm:left-[14%] sm:px-3 sm:text-[0.7rem]"
            style={{ transform: "translateZ(70px) rotateX(12deg)" }}
          >
            scale{"\u00b7"} secure
          </div>
        </div>
      </div>

      {/* SVG decorativo: arcos de datos */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35] sm:opacity-50"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroArc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.76 0.18 195)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.76 0.18 195)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.80 0.12 160)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 40 200 Q 200 80 360 200"
          fill="none"
          stroke="url(#heroArc)"
          strokeWidth="1"
          className="hero-tech-dash"
        />
        <path
          d="M 60 240 Q 200 120 340 240"
          fill="none"
          stroke="oklch(0.76 0.18 195 / 0.25)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  )
}
