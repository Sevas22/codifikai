"use client"

/**
 * Campo de partículas del hero: cuadrados pequeños que flotan, derivan hacia
 * arriba y reaccionan al puntero apartándose.
 *
 * Canvas 2D en vez de decenas de nodos animados con CSS: mantiene el coste en
 * un solo elemento y permite la repulsión del cursor, que es lo que da la
 * sensación de que la página está viva.
 */

import * as React from "react"

type Props = {
  className?: string
  /** Colores de marca en formato "r, g, b". */
  palette?: string[]
  /** Partículas por cada 100.000 px² de lienzo. */
  density?: number
}

type Particle = {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  phase: number
  color: string
  alpha: number
  /** Desplazamiento acumulado por el empuje del cursor. */
  pushX: number
  pushY: number
}

const DEFAULT_PALETTE = ["124, 58, 237", "217, 70, 239", "34, 211, 238"]
const POINTER_RADIUS = 130

export function ParticleField({
  className,
  palette = DEFAULT_PALETTE,
  density = 4.5,
}: Props) {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let raf = 0
    let visible = true
    let last = performance.now()
    let particles: Particle[] = []

    // Fuera del lienzo hasta que el puntero entre, para no empujar de salida.
    let pointerX = -9999
    let pointerY = -9999
    // Posición del puntero en la ventana. Se traduce al lienzo una vez por
    // cuadro y no en cada pointermove: medir el lienzo ahí forzaba al
    // navegador a recalcular el layout con cada movimiento del mouse.
    let clientX: number | null = null
    let clientY = 0

    const build = () => {
      const count = Math.round((width * height) / 100000 * density)
      particles = Array.from({ length: Math.max(12, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 3 + Math.random() * 6,
        speed: 6 + Math.random() * 18,
        drift: 0.4 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 0.25 + Math.random() * 0.5,
        pushX: 0,
        pushY: 0,
      }))
    }

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
      build()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        const x = p.x + p.pushX
        const y = p.y + p.pushY
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha.toFixed(3)})`
        // Cuadrados de esquina redondeada: el gesto de la referencia.
        ctx.beginPath()
        ctx.roundRect(x, y, p.size, p.size, p.size * 0.28)
        ctx.fill()
      }
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (clientX !== null) {
        const rect = wrap.getBoundingClientRect()
        pointerX = clientX - rect.left
        pointerY = clientY - rect.top
      }

      for (const p of particles) {
        // Deriva vertical constante con un vaivén lateral suave.
        p.y -= p.speed * dt
        p.phase += dt * p.drift
        p.x += Math.sin(p.phase) * 8 * dt

        if (p.y < -p.size) {
          p.y = height + p.size
          p.x = Math.random() * width
        }
        if (p.x < -p.size) p.x = width + p.size
        if (p.x > width + p.size) p.x = -p.size

        // Repulsión del cursor, con retorno elástico al reposo.
        const dx = p.x - pointerX
        const dy = p.y - pointerY
        const dist = Math.hypot(dx, dy)
        if (dist < POINTER_RADIUS && dist > 0.01) {
          const force = (1 - dist / POINTER_RADIUS) ** 2 * 46
          p.pushX += (dx / dist) * force * dt * 6
          p.pushY += (dy / dist) * force * dt * 6
        }
        p.pushX += (0 - p.pushX) * Math.min(1, dt * 3)
        p.pushY += (0 - p.pushY) * Math.min(1, dt * 3)
      }
      draw()
      raf = visible ? requestAnimationFrame(frame) : 0
    }

    const onPointerMove = (event: PointerEvent) => {
      clientX = event.clientX
      clientY = event.clientY
    }
    const onPointerLeave = () => {
      clientX = null
      pointerX = -9999
      pointerY = -9999
    }

    // Fuera de la pantalla el ciclo se detiene del todo, en vez de seguir
    // despertando al navegador en cada cuadro sin dibujar nada.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf && !reduced) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(wrap)

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw()
    })
    ro.observe(wrap)

    resize()

    if (reduced) {
      draw()
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      window.addEventListener("pointerleave", onPointerLeave)
      raf = requestAnimationFrame(frame)
    }

    return () => {
      visible = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [density, palette])

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
