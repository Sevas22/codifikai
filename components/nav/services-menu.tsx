"use client"

/**
 * Panel desplegable de servicios de la navegación.
 *
 * Se abre al pasar el puntero y también al hacer clic o al llegar con el
 * teclado: el hover solo no sirve en táctil ni con lector de pantalla. Un
 * pequeño retraso al salir evita que se cierre mientras el cursor cruza el
 * hueco entre el botón y el panel.
 */

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { useLanguage } from "@/components/providers/language-provider"
import { SERVICES, SERVICES_MENU_INTRO } from "@/lib/services"
import { cn } from "@/lib/utils"

const CLOSE_DELAY_MS = 140

export function ServicesMenu({
  label,
  triggerClassName,
}: {
  label: string
  triggerClassName?: string
}) {
  const { language } = useLanguage()
  const reduced = useReducedMotion()
  const [open, setOpen] = React.useState(false)
  const closeTimer = React.useRef<number | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS)
  }

  React.useEffect(() => cancelClose, [])

  // Escape cierra; un clic fuera también, para que no quede colgado.
  React.useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  const intro = SERVICES_MENU_INTRO

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose()
        setOpen(true)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) scheduleClose()
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all sm:px-4 sm:text-sm",
          triggerClassName
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            // El panel se ancla al centro del pill y se limita al viewport para
            // no desbordar en portátiles estrechos.
            className="absolute left-1/2 top-[calc(100%+0.9rem)] z-50 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2"
          >
            <div className="ed-dark overflow-hidden rounded-[1.75rem] border border-white/10 bg-ed-canvas p-3 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.55)]">
              {/* Tres columnas fijas: con la tarjeta de cabecera más cinco servicios
                  son exactamente dos filas llenas. A cuatro columnas la segunda
                  fila quedaba a medias. */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_repeat(2,minmax(0,1fr))]">
                {/* Tarjeta de cabecera */}
                <div className="flex flex-col justify-between rounded-3xl bg-white/[0.04] p-7">
                  <div>
                    <p className="ed-label text-ed-accent">{intro.label[language]}</p>
                    <p className="ed-display mt-6 text-[1.75rem] uppercase leading-[1.05] text-ed-ink">
                      {intro.title[language]}
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ed-punch px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {intro.cta[language]}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>

                {/* Tarjetas numeradas */}
                {SERVICES.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex flex-col rounded-3xl bg-white/[0.04] p-6 transition-colors duration-300 hover:bg-white/[0.09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent"
                  >
                    <span className="ed-label text-ed-accent tabular-nums">
                      {String(service.order).padStart(2, "0")}
                    </span>
                    <span className="mt-6 text-[1.0625rem] font-semibold leading-tight tracking-tight text-ed-ink">
                      {service.title[language]}
                    </span>
                    <span className="mt-3 text-[0.8125rem] leading-relaxed text-ed-ink-soft">
                      {service.short[language]}
                    </span>
                    <ArrowUpRight
                      className="mt-auto h-4 w-4 translate-y-2 pt-0 text-ed-ink-faint opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-ed-accent group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
