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
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { useLanguage } from "@/components/providers/language-provider"
import { ServiceBadge } from "@/components/services/service-badge"
import {
  SERVICES,
  SERVICES_MENU_INTRO,
  SERVICE_TIERS,
  type Localized,
  type Service,
} from "@/lib/services"
import { cn } from "@/lib/utils"
import { useLocalePath } from "@/hooks/use-locale-path"

const CLOSE_DELAY_MS = 140

/**
 * Servicios que el panel presenta como una sola entrada con un acceso a cada
 * página. Solo cambia el menú: cada servicio conserva su propia URL.
 */
const MENU_GROUPS = [
  {
    ids: ["marketing", "social-media"],
    title: { es: "Marketing y redes sociales", en: "Marketing and social media" },
    short: {
      es: "Campañas, embudos y presencia en redes que traen clientes.",
      en: "Campaigns, funnels and social presence that bring clients.",
    },
  },
] as const

type MenuEntry =
  | { kind: "service"; service: Service }
  | { kind: "group"; title: Localized; short: Localized; services: Service[] }

/** Convierte la lista de servicios en entradas del panel, fusionando los grupos. */
function buildEntries(services: Service[]): MenuEntry[] {
  const entries: MenuEntry[] = []
  const taken = new Set<string>()
  for (const service of services) {
    if (taken.has(service.id)) continue
    const group = MENU_GROUPS.find((g) => (g.ids as readonly string[]).includes(service.id))
    if (!group) {
      entries.push({ kind: "service", service })
      continue
    }
    const members = group.ids
      .map((id) => services.find((s) => s.id === id))
      .filter((s): s is Service => Boolean(s))
    members.forEach((member) => taken.add(member.id))
    entries.push({ kind: "group", title: group.title, short: group.short, services: members })
  }
  return entries
}

export function ServicesMenu({
  label,
  triggerClassName,
}: {
  label: string
  triggerClassName?: string
}) {
  const { language } = useLanguage()
  const reduced = useReducedMotion()
  const path = useLocalePath()
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
  // El núcleo de IA va aparte; el resto, con los grupos ya fusionados.
  const core = SERVICES.filter((service) => service.tier === "ai")
  const others = buildEntries(SERVICES.filter((service) => service.tier !== "ai"))

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
          <m.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            // El panel se ancla al centro del pill y se limita al viewport para
            // no desbordar en portátiles estrechos.
            className="absolute left-1/2 top-[calc(100%+0.9rem)] z-50 w-[min(48rem,calc(100vw-2rem))] -translate-x-1/2"
          >
            <div className="ed-dark overflow-hidden rounded-[1.5rem] border border-white/10 bg-ed-canvas p-2 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.55)]">
              <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-2">
                {/* Núcleo de IA: lo que nos define, resaltado en violeta. */}
                <div className="rounded-2xl bg-[color-mix(in_oklch,var(--brand-violet)_14%,transparent)] p-2">
                  <p className="ed-label px-3 pb-1.5 pt-2 text-ed-accent">
                    {SERVICE_TIERS.ai.label[language]}
                  </p>
                  <ul>
                    {core.map((service) => {
                      const badge = service.badge?.[language]
                      return (
                        <li key={service.id}>
                          <Link
                            href={path(`/services/${service.slug}`)}
                            className="group flex flex-col rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent"
                          >
                            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                              <span className="whitespace-nowrap text-[0.9375rem] font-semibold leading-tight tracking-tight text-ed-ink">
                                {service.title[language]}
                              </span>
                              {badge ? <ServiceBadge label={badge} /> : null}
                            </span>
                            <span className="mt-1 text-[0.78rem] leading-snug text-ed-ink-soft">
                              {service.short[language]}
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Lo que rodea al núcleo. */}
                <div className="p-2">
                  <p className="ed-label px-3 pb-1.5 pt-2 text-ed-ink-faint">{intro.rest[language]}</p>
                  <ul>
                    {others.map((entry) =>
                      entry.kind === "service" ? (
                        <li key={entry.service.id}>
                          <Link
                            href={path(`/services/${entry.service.slug}`)}
                            className="group flex flex-col rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent"
                          >
                            <span className="text-[0.9375rem] font-semibold leading-tight tracking-tight text-ed-ink">
                              {entry.service.title[language]}
                            </span>
                            <span className="mt-1 text-[0.78rem] leading-snug text-ed-ink-soft">
                              {entry.service.short[language]}
                            </span>
                          </Link>
                        </li>
                      ) : (
                        <li key={entry.services.map((service) => service.id).join("+")}>
                          {/* Entrada fusionada: el título no es un enlace, cada página tiene el suyo. */}
                          <div className="rounded-xl px-3 py-3">
                            <span className="block text-[0.9375rem] font-semibold leading-tight tracking-tight text-ed-ink">
                              {entry.title[language]}
                            </span>
                            <span className="mt-1 block text-[0.78rem] leading-snug text-ed-ink-soft">
                              {entry.short[language]}
                            </span>
                            <span className="mt-2.5 flex flex-wrap gap-2">
                              {entry.services.map((service) => (
                                <Link
                                  key={service.id}
                                  href={path(`/services/${service.slug}`)}
                                  className="group/chip inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-[0.75rem] font-medium text-ed-ink transition-colors duration-200 hover:border-ed-accent hover:text-ed-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent"
                                >
                                  {service.title[language]}
                                  <ArrowUpRight
                                    className="h-3 w-3 text-ed-ink-faint transition-colors group-hover/chip:text-ed-accent"
                                    aria-hidden
                                  />
                                </Link>
                              ))}
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between gap-4 border-t border-white/10 px-4 pb-2 pt-3">
                <p className="ed-label text-ed-ink-faint">{intro.label[language]}</p>
                <Link
                  href={path("/services")}
                  className="group inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ed-ink transition-colors hover:text-ed-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent"
                >
                  {intro.cta[language]}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
