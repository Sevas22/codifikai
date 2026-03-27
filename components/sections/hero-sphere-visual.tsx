"use client"

import { useMemo, useId } from "react"

type HeroSphereVisualProps = {
  mouseX: number
  mouseY: number
  isMobile: boolean
}

/** Esfera digital estilo HUD: núcleo luminoso, anillos orbitales; acento cyan + violeta. */
export function HeroSphereVisual({ mouseX, mouseY, isMobile }: HeroSphereVisualProps) {
  const uid = useId().replace(/:/g, "")
  const gradCore = `heroSphereCore-${uid}`
  const gradRing = `heroSphereRing-${uid}`

  const tilt = useMemo(() => {
    if (isMobile) {
      return { rx: 6, ry: -8, rz: 0 }
    }
    const rx = 8 + (mouseY - 50) * 0.1
    const ry = -18 + (mouseX - 50) * 0.16
    const rz = (mouseX - 50) * 0.03
    return { rx, ry, rz }
  }, [mouseX, mouseY, isMobile])

  const rings: { w: number; h: number; rx: number; z: number; o: number }[] = [
    { w: 200, h: 56, rx: 72, z: 10, o: 0.4 },
    { w: 248, h: 72, rx: 58, z: 28, o: 0.32 },
    { w: 300, h: 88, rx: 42, z: 48, o: 0.24 },
    { w: 340, h: 100, rx: 26, z: 66, o: 0.18 },
  ]

  return (
    <div
      className="relative mx-auto h-[260px] w-full max-w-[min(100%,460px)] sm:h-[320px] lg:mx-0 lg:h-[min(400px,44svh)] lg:max-w-none"
      aria-hidden
    >
      {/* Estelas horizontales (datos en movimiento) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
        <div className="hero-sphere-streak absolute left-[-20%] top-[28%] h-[2px] w-[70%] bg-gradient-to-r from-transparent via-violet-400/50 to-fuchsia-500/25 blur-[1px] opacity-65" />
        <div className="hero-sphere-streak-delay absolute left-[10%] top-[48%] h-px w-[55%] bg-gradient-to-r from-transparent via-fuchsia-400/35 to-transparent opacity-55" />
        <div className="hero-sphere-streak absolute right-[-10%] top-[62%] h-[2px] w-[65%] bg-gradient-to-r from-transparent via-violet-500/40 to-cyan-400/30 blur-[1px] opacity-50" />
      </div>

      {/* Resplandor global hacia la izquierda (ilumina el copy) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,oklch(0.99_0_0/0.12)_0%,oklch(0.72_0.2_285/0.14)_12%,oklch(0.76_0.18_195/0.16)_22%,transparent_58%)] blur-3xl" />
        <div className="absolute right-[8%] top-[32%] h-56 w-56 rounded-full bg-violet-500/25 blur-[80px] hero-tech-pulse" />
        <div className="absolute right-[5%] top-[38%] h-48 w-48 rounded-full bg-accent/15 blur-[70px] hero-tech-pulse" />
      </div>

      <div className="relative h-full w-full" style={{ perspective: "1200px" }}>
        <div className="absolute inset-0 flex scale-[0.78] items-center justify-center sm:scale-[0.9] lg:scale-[0.96]">
        <div
          className="relative h-[420px] w-full max-w-[420px] transition-transform duration-500 ease-out will-change-transform lg:h-[480px] lg:max-w-[480px]"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(${tilt.rz}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Anillos tipo latitudes */}
          {rings.map((r, i) => (
            <div
              key={i}
              className="pointer-events-none absolute left-1/2 top-[46%] rounded-full border border-violet-500/25"
              style={{
                width: r.w,
                height: r.h,
                opacity: r.o,
                transform: `translate(-50%, -50%) translateZ(${r.z}px) rotateX(${r.rx}deg)`,
                boxShadow:
                  "0 0 22px oklch(0.68 0.2 285 / 0.1), 0 0 18px oklch(0.76 0.18 195 / 0.06), inset 0 0 24px oklch(0.65 0.18 285 / 0.05)",
              }}
            />
          ))}

          {/* Anillo ecuatorial animado */}
          <div
            className="pointer-events-none absolute left-1/2 top-[46%] h-[200px] w-[200px] sm:h-[240px] sm:w-[240px] lg:h-[280px] lg:w-[280px]"
            style={{
              transform: "translate(-50%, -50%) translateZ(72px) rotateX(82deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="hero-sphere-equator h-full w-full rounded-full border border-violet-400/35 opacity-85" />
          </div>
          <div
            className="pointer-events-none absolute left-1/2 top-[46%] h-[190px] w-[190px] sm:h-[230px] sm:w-[230px] lg:h-[270px] lg:w-[270px]"
            style={{
              transform: "translate(-50%, -50%) translateZ(88px) rotateX(84deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="hero-tech-orbit-ring h-full w-full rounded-full border-2 border-dashed border-fuchsia-500/30 opacity-75" />
          </div>

          {/* NÃºcleo luminoso */}
          <div
            className="pointer-events-none absolute left-1/2 top-[46%]"
            style={{ transform: "translate(-50%, -50%) translateZ(110px)" }}
          >
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 lg:h-40 lg:w-40">
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 40% 35%, oklch(0.99 0 0 / 0.95) 0%, oklch(0.72 0.18 285 / 0.35) 28%, oklch(0.78 0.16 195 / 0.45) 42%, oklch(0.62 0.2 300 / 0.2) 58%, transparent 72%)",
                }}
              />
              <div
                className="absolute inset-[18%] rounded-full border border-white/25 shadow-[0_0_36px_oklch(0.68_0.2_285/0.45),0_0_48px_oklch(0.76_0.18_195/0.35)]"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, oklch(0.99 0 0 / 0.25), oklch(0.68 0.2 285 / 0.3) 38%, oklch(0.76 0.18 195 / 0.32) 52%, oklch(0.12 0.03 280 / 0.88) 100%)",
                }}
              />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
                <defs>
                  <radialGradient id={gradCore} cx="40%" cy="35%" r="55%">
                    <stop offset="0%" stopColor="oklch(0.99 0 0)" stopOpacity="0.92" />
                    <stop offset="32%" stopColor="oklch(0.72 0.2 285)" stopOpacity="0.55" />
                    <stop offset="58%" stopColor="oklch(0.76 0.18 195)" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="oklch(0.62 0.22 300)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id={gradRing} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.7 0.2 285)" stopOpacity="0.35" />
                    <stop offset="45%" stopColor="oklch(0.8 0.14 195)" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="oklch(0.68 0.22 300)" stopOpacity="0.35" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="28" fill={`url(#${gradCore})`} />
                <circle cx="50" cy="50" r="30" fill="none" stroke={`url(#${gradRing})`} strokeWidth="0.6" opacity="0.85" />
              </svg>
            </div>
          </div>

          {/* Flechas / vectores orbitando */}
          {[0, 55, 110, 165, 220, 275].map((deg) => (
            <div
              key={deg}
              className="pointer-events-none absolute left-1/2 top-[46%] text-violet-400"
              style={{
                width: 18,
                height: 18,
                transform: `translate(-50%, -50%) translateZ(100px) rotate(${deg}deg) translateY(-128px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div style={{ transform: `rotate(${-deg}deg)` }}>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 opacity-95 drop-shadow-[0_0_12px_oklch(0.68_0.2_285/0.85)]"
                >
                  <path d="M12 3 L21 19 L3 19 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          ))}

          {/* Planos flotantes */}
          <div
            className="pointer-events-none absolute left-[12%] top-[32%] h-12 w-20 rotate-12 border border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-accent/5 backdrop-blur-[2px] sm:h-14 sm:w-24"
            style={{ transform: "translateZ(76px) skewX(-8deg) rotateY(-12deg)" }}
          />
          <div
            className="pointer-events-none absolute bottom-[26%] right-[10%] h-10 w-16 -rotate-6 border border-fuchsia-500/20 bg-violet-950/20 backdrop-blur-sm sm:h-12 sm:w-20"
            style={{ transform: "translateZ(92px) rotateX(8deg) rotateY(18deg)" }}
          />
        </div>
        </div>
      </div>

      {/* Triángulos de fondo (overlay 2D) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22] sm:opacity-[0.3]"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M320 40 L360 100 L280 90 Z" fill="oklch(0.65 0.2 285 / 0.18)" />
        <path d="M40 320 L90 280 L100 360 Z" fill="oklch(0.72 0.18 195 / 0.12)" />
        <path fill="oklch(0.68 0.22 300 / 0.08)" d="M200 360 L240 300 L280 340 Z" />
        <path d="M200 360 L240 300 L280 340 Z" fill="none" stroke="oklch(0.7 0.2 285 / 0.35)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}
