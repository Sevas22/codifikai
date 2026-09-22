"use client"

/**
 * Carrusel horizontal que se arrastra con el puntero y muestra una barra de
 * progreso, como el de servicios de la referencia.
 *
 * Se apoya en el scroll nativo del contenedor (no en transformaciones), así
 * que la rueda, el teclado, el táctil y los lectores de pantalla siguen
 * funcionando; el arrastre solo añade el gesto de ratón encima.
 */

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function DragCarousel({
  children,
  className,
  ariaLabel,
  previousLabel,
  nextLabel,
}: {
  children: React.ReactNode
  className?: string
  ariaLabel: string
  previousLabel: string
  nextLabel: string
}) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [progress, setProgress] = React.useState(0)
  const [atStart, setAtStart] = React.useState(true)
  const [atEnd, setAtEnd] = React.useState(false)

  const readProgress = React.useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const ratio = max > 0 ? el.scrollLeft / max : 0
    setProgress(ratio)
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(max - el.scrollLeft <= 2)
  }, [])

  React.useEffect(() => {
    readProgress()
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(readProgress)
    ro.observe(el)
    return () => ro.disconnect()
  }, [readProgress])

  React.useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let dragging = false
    let startX = 0
    let startScroll = 0
    let moved = 0

    const onPointerDown = (event: PointerEvent) => {
      // Solo ratón: en táctil el scroll nativo ya hace el trabajo, y en lápiz
      // capturar el puntero rompe el desplazamiento del sistema.
      if (event.pointerType !== "mouse") return
      dragging = true
      moved = 0
      startX = event.clientX
      startScroll = el.scrollLeft
      el.dataset.dragging = "true"
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      const delta = event.clientX - startX
      moved = Math.max(moved, Math.abs(delta))
      el.scrollLeft = startScroll - delta
    }

    const stop = () => {
      if (!dragging) return
      dragging = false
      delete el.dataset.dragging
    }

    // Tras un arrastre real, anula el clic para no abrir la tarjeta soltada.
    const onClickCapture = (event: MouseEvent) => {
      if (moved > 6) {
        event.preventDefault()
        event.stopPropagation()
        moved = 0
      }
    }

    el.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", stop)
    window.addEventListener("pointercancel", stop)
    el.addEventListener("click", onClickCapture, true)

    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", stop)
      window.removeEventListener("pointercancel", stop)
      el.removeEventListener("click", onClickCapture, true)
    }
  }, [])

  const step = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.8), behavior: "smooth" })
  }

  return (
    <div className={className}>
      <div
        ref={trackRef}
        onScroll={readProgress}
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        className="ed-drag flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
      >
        {children}
      </div>

      <div className="mt-8 flex items-center gap-5">
        {/* Barra de progreso */}
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-ed-rule">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-ed-punch transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label={previousLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ed-rule-strong text-ed-ink transition-colors duration-300 hover:border-ed-accent hover:text-ed-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label={nextLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ed-rule-strong text-ed-ink transition-colors duration-300 hover:border-ed-accent hover:text-ed-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
