"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

export type Tech3DAccentVariant = "rings" | "chip" | "stack" | "network" | "prism"

type Tech3DAccentProps = {
  variant: Tech3DAccentVariant
  className?: string
  /** Altura visual aproximada del bloque */
  size?: "sm" | "md" | "lg"
}

const sizeHeight: Record<NonNullable<Tech3DAccentProps["size"]>, string> = {
  sm: "h-[120px] min-h-[120px]",
  md: "h-[180px] min-h-[180px]",
  lg: "h-[260px] min-h-[260px]",
}

function GlowBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-1/2 h-full w-full max-w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.76_0.18_195/0.2)_0%,transparent_65%)] blur-2xl" />
    </div>
  )
}

function RingsVariant({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      <GlowBackdrop />
      <div className="relative h-full w-full max-w-[220px]" style={{ perspective: "900px" }}>
        <div
          className="tech-3d-sway absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute h-[160px] w-[160px] rounded-full border border-accent/35 sm:h-[190px] sm:w-[190px]"
            style={{
              transform: "translateZ(24px) rotateX(68deg)",
              boxShadow: "0 0 32px oklch(0.76 0.18 195 / 0.12), inset 0 0 24px oklch(0.76 0.18 195 / 0.06)",
            }}
          />
          <div
            className="absolute flex h-[150px] w-[150px] items-center justify-center sm:h-[180px] sm:w-[180px]"
            style={{
              transform: "translateZ(36px) rotateX(72deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="hero-tech-orbit-ring h-full w-full rounded-full border-2 border-dashed border-accent/35 opacity-90" />
          </div>
          <div
            className="absolute h-3 w-3 rounded-full bg-accent shadow-[0_0_16px_oklch(0.76_0.18_195/0.8)]"
            style={{ transform: "translateZ(80px)" }}
          />
        </div>
      </div>
    </div>
  )
}

function ChipVariant({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      <GlowBackdrop />
      <div className="relative h-full w-full max-w-[260px]" style={{ perspective: "1000px" }}>
        <div
          className="tech-3d-sway absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[62%] h-[100px] w-[200px] -translate-x-1/2 border border-accent/15 sm:h-[120px] sm:w-[230px]"
            style={{
              transform: "rotateX(74deg) translateZ(-40px)",
              background:
                "repeating-linear-gradient(-30deg, transparent, transparent 9px, oklch(0.98 0 0 / 0.035) 9px, oklch(0.98 0 0 / 0.035) 10px), repeating-linear-gradient(30deg, transparent, transparent 9px, oklch(0.98 0 0 / 0.025) 9px, oklch(0.98 0 0 / 0.025) 10px)",
              maskImage: "radial-gradient(ellipse 75% 55% at 50% 50%, black 15%, transparent 80%)",
            }}
          />
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/45 bg-gradient-to-br from-background/95 to-background/80 shadow-[0_20px_50px_-12px_oklch(0.76_0.18_195/0.4)] backdrop-blur-sm sm:h-[72px] sm:w-[72px]"
            style={{ transform: "translateZ(72px)" }}
          >
            <svg viewBox="0 0 48 48" className="h-10 w-10 text-accent sm:h-11 sm:w-11" fill="none" aria-hidden>
              <path
                d="M24 6 L40 15 V33 L24 42 L8 33 V15 Z"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="24" cy="24" r="4" fill="currentColor" className="opacity-90" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function StackVariant({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      <GlowBackdrop />
      <div className="relative h-full w-full max-w-[200px]" style={{ perspective: "900px" }}>
        <div
          className="absolute left-1/2 top-1/2 flex h-[130px] w-[140px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(12deg) rotateY(-28deg)" }}
        >
          <div className="tech-stack-layer-1 absolute h-[72px] w-[120px] rounded-xl border border-accent/25 bg-background/50 shadow-lg backdrop-blur-md" />
          <div className="tech-stack-layer-2 absolute h-[72px] w-[120px] rounded-xl border border-accent/35 bg-accent/10 shadow-lg backdrop-blur-md" />
          <div className="tech-stack-layer-3 absolute h-[72px] w-[120px] rounded-xl border border-white/10 bg-gradient-to-br from-accent/20 to-transparent shadow-xl backdrop-blur-md" />
        </div>
      </div>
    </div>
  )
}

function NetworkVariant({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "")
  const gradId = `tech3dNet-${uid}`
  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      <GlowBackdrop />
      <svg
        className="h-full max-h-[200px] w-full max-w-[240px] overflow-visible opacity-90"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.76 0.18 195)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="oklch(0.76 0.18 195)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="oklch(0.80 0.12 160)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M100 36 L164 78 L140 154 L60 154 L36 78 Z"
          stroke={`url(#${gradId})`}
          strokeWidth="0.8"
          className="tech-3d-net-dash"
        />
        <line x1="100" y1="36" x2="100" y2="100" stroke="oklch(0.76 0.18 195 / 0.35)" strokeWidth="0.6" />
        <line x1="36" y1="78" x2="164" y2="78" stroke="oklch(0.76 0.18 195 / 0.25)" strokeWidth="0.6" />
        <line x1="60" y1="154" x2="140" y2="154" stroke="oklch(0.76 0.18 195 / 0.25)" strokeWidth="0.6" />
        {[
          [100, 36],
          [164, 78],
          [140, 154],
          [60, 154],
          [36, 78],
          [100, 100],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={5} className="fill-accent/90" style={{ filter: "drop-shadow(0 0 6px oklch(0.76 0.18 195 / 0.8))" }} />
        ))}
      </svg>
    </div>
  )
}

function PrismVariant({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "")
  const gradId = `tech3dPrism-${uid}`
  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      <GlowBackdrop />
      <div className="tech-3d-prism relative h-[140px] w-[120px] sm:h-[160px] sm:w-[140px]">
        <svg viewBox="0 0 120 140" className="h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.76 0.18 195)" />
              <stop offset="100%" stopColor="oklch(0.55 0.12 200)" />
            </linearGradient>
          </defs>
          <path
            d="M60 8 L108 44 L108 96 L60 132 L12 96 L12 44 Z"
            fill="oklch(0.76 0.18 195 / 0.08)"
            stroke={`url(#${gradId})`}
            strokeWidth="1.2"
          />
          <path
            d="M60 32 L88 54 L88 86 L60 108 L32 86 L32 54 Z"
            fill="oklch(0.76 0.18 195 / 0.12)"
            stroke="oklch(0.76 0.18 195 / 0.4)"
            strokeWidth="0.8"
            opacity="0.85"
          />
        </svg>
      </div>
    </div>
  )
}

/**
 * Acentos 3D decorativos (CSS + SVG), coherentes con el hero.
 * Sin interacciÃ³n; `pointer-events-none` en el contenedor padre recomendado.
 */
export function Tech3DAccent({ variant, className, size = "md" }: Tech3DAccentProps) {
  const inner = (() => {
    switch (variant) {
      case "rings":
        return <RingsVariant />
      case "chip":
        return <ChipVariant />
      case "stack":
        return <StackVariant />
      case "network":
        return <NetworkVariant />
      case "prism":
        return <PrismVariant />
      default:
        return <RingsVariant />
    }
  })()

  return (
    <div
      className={cn("pointer-events-none select-none", sizeHeight[size], className)}
      aria-hidden
    >
      {inner}
    </div>
  )
}
