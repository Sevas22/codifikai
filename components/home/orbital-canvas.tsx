"use client"

/**
 * Pieza central del hero: esfera de alambre en rotación lenta con nodos que
 * recorren órbitas, dibujada en canvas 2D.
 *
 * Se eligió canvas plano en vez de WebGL a propósito: pesa unos pocos KB, no
 * arrastra `three` al bundle de la portada y el sitio depende de su tiempo de
 * carga para SEO. La sensación de profundidad viene de modular la opacidad y
 * el grosor de línea según la coordenada Z proyectada.
 */

import * as React from "react"

type Props = {
  className?: string
  /** Tinte de marca en formato "r, g, b". */
  tint?: string
}

const LAT_LINES = 9
const LON_LINES = 18
const SEGMENTS = 72
const NODE_COUNT = 14

type Node = {
  /** Inclinación del plano orbital. */
  tilt: number
  /** Rotación del plano orbital sobre Y. */
  swing: number
  /** Posición angular actual dentro de la órbita. */
  phase: number
  speed: number
  size: number
}

export function OrbitalCanvas({ className, tint = "125, 226, 245" }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const wrapRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let radius = 0
    let raf = 0
    let angle = 0
    let visible = true
    let last = performance.now()

    // Parallax suave: el puntero inclina la esfera sin llegar a marear.
    let targetTiltX = 0
    let targetTiltY = 0
    let tiltX = 0
    let tiltY = 0

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
      tilt: (Math.PI / 2) * (i / NODE_COUNT) - Math.PI / 4,
      swing: (Math.PI * 2 * i) / NODE_COUNT,
      phase: Math.random() * Math.PI * 2,
      speed: 0.16 + Math.random() * 0.26,
      size: 1.1 + Math.random() * 1.6,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      radius = Math.min(width, height) * 0.38
    }

    /** Proyecta un punto esférico a pantalla y devuelve su profundidad. */
    const project = (lat: number, lon: number) => {
      const cosLat = Math.cos(lat)
      let x = cosLat * Math.sin(lon)
      let y = Math.sin(lat)
      let z = cosLat * Math.cos(lon)

      // Inclinación por puntero (X) y cabeceo fijo del eje (Y).
      const cy = Math.cos(tiltY)
      const sy = Math.sin(tiltY)
      const y2 = y * cy - z * sy
      const z2 = y * sy + z * cy
      y = y2
      z = z2

      const cx = Math.cos(tiltX)
      const sx = Math.sin(tiltX)
      const x2 = x * cx + z * sx
      const z3 = -x * sx + z * cx
      x = x2
      z = z3

      return {
        sx: width / 2 + x * radius,
        sy: height / 2 - y * radius,
        depth: z,
      }
    }

    const strokeArc = (
      points: { sx: number; sy: number; depth: number }[],
      baseAlpha: number
    ) => {
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i]
        const b = points[i + 1]
        // Profundidad media del segmento: al fondo se atenúa y adelgaza.
        const d = (a.depth + b.depth) / 2
        const front = (d + 1) / 2
        const alpha = baseAlpha * (0.1 + front * 0.9)
        ctx.strokeStyle = `rgba(${tint}, ${alpha.toFixed(3)})`
        ctx.lineWidth = 0.4 + front * 0.75
        ctx.beginPath()
        ctx.moveTo(a.sx, a.sy)
        ctx.lineTo(b.sx, b.sy)
        ctx.stroke()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Halo detrás de la esfera.
      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        radius * 0.15,
        width / 2,
        height / 2,
        radius * 1.5
      )
      glow.addColorStop(0, `rgba(${tint}, 0.13)`)
      glow.addColorStop(0.45, `rgba(${tint}, 0.045)`)
      glow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // Paralelos.
      for (let i = 1; i < LAT_LINES; i++) {
        const lat = -Math.PI / 2 + (Math.PI * i) / LAT_LINES
        const pts = []
        for (let s = 0; s <= SEGMENTS; s++) {
          pts.push(project(lat, angle + (Math.PI * 2 * s) / SEGMENTS))
        }
        strokeArc(pts, 0.19)
      }

      // Meridianos.
      for (let i = 0; i < LON_LINES; i++) {
        const lon = angle + (Math.PI * 2 * i) / LON_LINES
        const pts = []
        for (let s = 0; s <= SEGMENTS / 2; s++) {
          pts.push(project(-Math.PI / 2 + (Math.PI * s) / (SEGMENTS / 2), lon))
        }
        strokeArc(pts, 0.13)
      }

      // Borde luminoso.
      ctx.strokeStyle = `rgba(${tint}, 0.34)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Nodos en órbita.
      for (const node of nodes) {
        const lat = Math.sin(node.phase) * node.tilt
        const lon = angle + node.swing + node.phase
        const p = project(lat, lon)
        const front = (p.depth + 1) / 2
        const alpha = 0.15 + front * 0.85
        const r = node.size * (0.55 + front * 0.75)

        ctx.fillStyle = `rgba(${tint}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
        ctx.fill()

        if (front > 0.72) {
          ctx.fillStyle = `rgba(${tint}, ${(alpha * 0.16).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, r * 4.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (visible) {
        angle += dt * 0.09
        for (const node of nodes) node.phase += dt * node.speed
        tiltX += (targetTiltX - tiltX) * 0.06
        tiltY += (targetTiltY - tiltY) * 0.06
        draw()
      }
      raf = requestAnimationFrame(frame)
    }

    const onPointer = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      const nx = (event.clientX - (rect.left + rect.width / 2)) / rect.width
      const ny = (event.clientY - (rect.top + rect.height / 2)) / rect.height
      targetTiltX = nx * 0.5
      targetTiltY = -0.22 + ny * 0.32
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(wrap)

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduced) draw()
    })
    resizeObserver.observe(wrap)

    resize()
    targetTiltY = -0.22
    tiltY = -0.22

    if (reduced) {
      // Sin animación: un único fotograma, con la misma composición.
      draw()
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true })
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointer)
    }
  }, [tint])

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
