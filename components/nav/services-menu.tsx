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
import Image from "next/image"
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Code,
  Globe,
  Megaphone,
  Palette,
  Search,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react"

import { useLanguage } from "@/components/providers/language-provider"
import { ServiceBadge } from "@/components/services/service-badge"
import { AGENTS } from "@/lib/agents"
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

/** Un icono por servicio para escanear el panel de un vistazo; Sparkles cubre uno nuevo. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "ai-automation": Workflow,
  "seo-geo": Search,
  "ai-agents": Bot,
  "custom-software": Code,
  web: Globe,
  branding: Palette,
}
const iconFor = (id: string): LucideIcon => SERVICE_ICONS[id] ?? Sparkles

function IconTile({ icon: Icon, featured }: { icon: LucideIcon; featured?: boolean }) {
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
        featured
          ? "bg-ed-canvas-raised text-ed-accent shadow-sm ring-1 ring-ed-rule group-hover:bg-ed-accent group-hover:text-white"
          : "bg-ed-canvas-sunken text-ed-ink-soft group-hover:bg-ed-accent/10 group-hover:text-ed-accent"
      )}
    >
      <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
    </span>
  )
}

/** Fila del panel: icono, título (con insignia si la hay) y una línea de contexto. */
function MenuRow({
  href,
  icon,
  title,
  short,
  badge,
  featured,
  children,
}: {
  href: string
  icon: LucideIcon
  title: string
  short: string
  badge?: string
  featured?: boolean
  children?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-start gap-3 rounded-2xl p-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent",
        featured ? "hover:bg-ed-canvas-raised/85" : "hover:bg-ed-canvas-sunken"
      )}
    >
      <IconTile icon={icon} featured={featured} />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="whitespace-nowrap text-[0.9375rem] font-semibold leading-tight tracking-tight text-ed-ink">
            {title}
          </span>
          {badge ? <ServiceBadge label={badge} /> : null}
        </span>
        <span className="mt-1 block text-[0.78rem] leading-snug text-ed-ink-soft">{short}</span>
        {children}
      </span>
    </Link>
  )
}

/** Caritas de los seis agentes, superpuestas: anticipan lo que hay detrás del enlace. */
function AgentFaces() {
  return (
    <span className="mt-2.5 flex items-center" aria-hidden>
      {AGENTS.map((agent, i) => (
        <span
          key={agent.id}
          className={cn(
            "relative h-6 w-6 overflow-hidden rounded-full bg-ed-canvas-raised ring-2 ring-ed-canvas-raised",
            i > 0 && "-ml-1.5"
          )}
          style={{ zIndex: AGENTS.length - i }}
        >
          <Image
            src={agent.image}
            alt=""
            fill
            sizes="24px"
            className="origin-[45%_36%] scale-[1.7] object-cover"
          />
        </span>
      ))}
    </span>
  )
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
            <div className="ed-light-scope overflow-hidden rounded-[1.75rem] border border-ed-rule bg-ed-canvas-raised/95 p-2 shadow-[0_28px_70px_-24px_rgba(24,20,48,0.38)] backdrop-blur-xl">
              <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-2">
                {/* Núcleo de IA: lo que nos define, sobre un fondo de marca suave. */}
                <div className="rounded-3xl bg-[linear-gradient(160deg,color-mix(in_oklch,var(--brand-violet)_15%,transparent),color-mix(in_oklch,var(--brand-magenta)_6%,transparent)_65%,transparent)] p-2 ring-1 ring-inset ring-[color-mix(in_oklch,var(--brand-violet)_22%,transparent)]">
                  <p className="ed-label px-3 pb-1 pt-2.5 text-ed-accent">
                    {SERVICE_TIERS.ai.label[language]}
                  </p>
                  <ul>
                    {core.map((service) => (
                      <li key={service.id}>
                        <MenuRow
                          featured
                          href={path(`/services/${service.slug}`)}
                          icon={iconFor(service.id)}
                          title={service.title[language]}
                          short={service.short[language]}
                          badge={service.badge?.[language]}
                        >
                          {service.id === "ai-agents" ? <AgentFaces /> : null}
                        </MenuRow>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lo que rodea al núcleo. */}
                <div className="p-1">
                  <p className="ed-label px-3 pb-1 pt-2.5 text-ed-ink-faint">{intro.rest[language]}</p>
                  <ul>
                    {others.map((entry) =>
                      entry.kind === "service" ? (
                        <li key={entry.service.id}>
                          <MenuRow
                            href={path(`/services/${entry.service.slug}`)}
                            icon={iconFor(entry.service.id)}
                            title={entry.service.title[language]}
                            short={entry.service.short[language]}
                          />
                        </li>
                      ) : (
                        <li key={entry.services.map((service) => service.id).join("+")}>
                          {/* Entrada fusionada: el título no es un enlace, cada página tiene el suyo. */}
                          <div className="flex items-start gap-3 rounded-2xl p-3">
                            <IconTile icon={Megaphone} />
                            <span className="min-w-0 flex-1">
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
                                    className="group/chip inline-flex items-center gap-1 rounded-full border border-ed-rule-strong bg-ed-canvas-raised px-3 py-1 text-[0.75rem] font-medium text-ed-ink transition-colors duration-200 hover:border-ed-accent hover:text-ed-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent"
                                  >
                                    {service.title[language]}
                                    <ArrowUpRight
                                      className="h-3 w-3 text-ed-ink-faint transition-colors group-hover/chip:text-ed-accent"
                                      aria-hidden
                                    />
                                  </Link>
                                ))}
                              </span>
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 px-4 pb-2.5 pt-3.5">
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
