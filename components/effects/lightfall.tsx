"use client"

import { useEffect, useRef } from "react"

type LightfallProps = {
  colors?: string[]
  backgroundColor?: string
  speed?: number
  streakCount?: number
  streakWidth?: number
  streakLength?: number
  density?: number
  twinkle?: number
  glow?: number
  backgroundGlow?: number
  zoom?: number
  opacity?: number
  mouseInteraction?: boolean
  mouseStrength?: number
  mouseRadius?: number
  /** Color del brillo ambiental de fondo, como "r,g,b" (sin rgba/paréntesis). */
  backgroundGlowColor?: string
  className?: string
}

type Streak = {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  width: number
  color: string
  alpha: number
  twinklePhase: number
}

type Star = {
  x: number
  y: number
  r: number
  phase: number
  speed: number
}

const REFERENCE_AREA = 1080 * 1080

/**
 * Fondo animado tipo "lluvia de luz": recreado desde cero en canvas 2D
 * (sin WebGL/three.js) para mantenerlo liviano. Se pausa cuando la pestaña
 * no está visible y respeta prefers-reduced-motion.
 */
export function Lightfall({
  colors = ["#A6C8FF", "#5227FF", "#FF9FFC"],
  backgroundColor = "#0A29FF",
  speed = 0.5,
  streakCount = 2,
  streakWidth = 1,
  streakLength = 1,
  density = 0.6,
  twinkle = 1,
  glow = 1,
  backgroundGlow = 0.5,
  zoom = 3,
  opacity = 1,
  mouseInteraction = false,
  mouseStrength = 0.5,
  mouseRadius = 1,
  backgroundGlowColor = "255,255,255",
  className,
}: LightfallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    const mouse = { x: -9999, y: -9999, active: false }
    let mouseRadiusPx = 0

    function resize() {
      width = canvas!.clientWidth
      height = canvas!.clientHeight
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      mouseRadiusPx = mouseRadius * Math.min(width, height) * 0.6
    }
    resize()

    function scaledCount(base: number) {
      const area = Math.max(width * height, 1)
      const factor = Math.sqrt(area / REFERENCE_AREA)
      return Math.round(base * factor * (0.6 + density))
    }

    function spawnStreak(initial: boolean): Streak {
      const len = (40 + Math.random() * 90) * streakLength * (0.6 + zoom * 0.2)
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -len,
        vx: (0.15 + Math.random() * 0.15) * speed * 60,
        vy: (0.5 + Math.random() * 0.4) * speed * 60,
        len,
        width: Math.max(0.6, streakWidth),
        color: colors[Math.floor(Math.random() * colors.length)] ?? "#ffffff",
        alpha: 0.5 + Math.random() * 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
      }
    }

    const streaks: Streak[] = []
    const count = Math.min(Math.max(scaledCount(Math.max(1, streakCount)), 1), 80)
    for (let i = 0; i < count; i++) streaks.push(spawnStreak(true))

    const stars: Star[] = []
    if (twinkle > 0) {
      const starCount = Math.min(scaledCount(40), 220)
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.4 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.2,
        })
      }
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    function handlePointerLeave() {
      mouse.active = false
    }
    if (mouseInteraction) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true })
      window.addEventListener("pointerleave", handlePointerLeave)
    }

    let raf = 0
    let last = performance.now()

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      ctx!.globalAlpha = 1
      ctx!.fillStyle = backgroundColor
      ctx!.fillRect(0, 0, width, height)

      if (backgroundGlow > 0) {
        const grad = ctx!.createRadialGradient(
          width * 0.5,
          height * 0.25,
          0,
          width * 0.5,
          height * 0.25,
          Math.max(width, height) * 0.7
        )
        grad.addColorStop(0, `rgba(${backgroundGlowColor},${0.12 * backgroundGlow})`)
        grad.addColorStop(1, `rgba(${backgroundGlowColor},0)`)
        ctx!.fillStyle = grad
        ctx!.fillRect(0, 0, width, height)
      }

      if (twinkle > 0) {
        for (const s of stars) {
          const a = (Math.sin(now * 0.001 * s.speed + s.phase) + 1) / 2
          ctx!.globalAlpha = 0.15 + a * 0.5 * twinkle
          ctx!.fillStyle = "#ffffff"
          ctx!.beginPath()
          ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx!.fill()
        }
      }

      for (const st of streaks) {
        st.x += st.vx * dt
        st.y += st.vy * dt

        if (mouseInteraction && mouse.active) {
          const dx = st.x - mouse.x
          const dy = st.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < mouseRadiusPx && dist > 0.001) {
            const force = (1 - dist / mouseRadiusPx) * mouseStrength * 40
            st.vx += (dx / dist) * force * dt
            st.vy += (dy / dist) * force * dt
          }
        }

        if (st.y - st.len > height || st.x < -st.len * 2 || st.x > width + st.len * 2) {
          Object.assign(st, spawnStreak(false))
          continue
        }

        const twinkleAlpha = twinkle > 0 ? 0.6 + 0.4 * Math.sin(now * 0.002 + st.twinklePhase) : 1
        const angle = Math.atan2(st.vy, st.vx)
        const tailX = st.x - Math.cos(angle) * st.len
        const tailY = st.y - Math.sin(angle) * st.len

        const gradient = ctx!.createLinearGradient(st.x, st.y, tailX, tailY)
        gradient.addColorStop(0, st.color)
        gradient.addColorStop(1, "rgba(255,255,255,0)")

        ctx!.globalAlpha = st.alpha * twinkleAlpha * opacity
        ctx!.strokeStyle = gradient
        ctx!.lineWidth = st.width
        ctx!.lineCap = "round"
        ctx!.shadowBlur = glow > 0 ? 8 * glow : 0
        ctx!.shadowColor = st.color

        ctx!.beginPath()
        ctx!.moveTo(st.x, st.y)
        ctx!.lineTo(tailX, tailY)
        ctx!.stroke()
      }

      ctx!.shadowBlur = 0
      ctx!.globalAlpha = 1

      if (!prefersReducedMotion) raf = requestAnimationFrame(frame)
    }

    function handleVisibility() {
      if (prefersReducedMotion) return
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    let resizeRaf = 0
    function handleResize() {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(resize)
    }

    window.addEventListener("resize", handleResize)
    document.addEventListener("visibilitychange", handleVisibility)

    raf = requestAnimationFrame(frame)
    if (prefersReducedMotion) {
      // Una sola pasada estática: sin loop de animación.
      cancelAnimationFrame(raf)
      frame(performance.now())
    }

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(resizeRaf)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibility)
      if (mouseInteraction) {
        window.removeEventListener("pointermove", handlePointerMove)
        window.removeEventListener("pointerleave", handlePointerLeave)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    JSON.stringify(colors),
    backgroundColor,
    speed,
    streakCount,
    streakWidth,
    streakLength,
    density,
    twinkle,
    glow,
    backgroundGlow,
    zoom,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    backgroundGlowColor,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden
    />
  )
}
