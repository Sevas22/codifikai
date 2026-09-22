"use client"

/**
 * Índice lateral fijo con la sección activa resaltada.
 *
 * Solo aparece en pantallas anchas: en móvil compite con el contenido y el
 * propio scroll ya cumple esa función.
 */

import * as React from "react"

import { HOME_SECTION_IDS } from "@/lib/home-copy"
import { cn } from "@/lib/utils"

export function SectionIndex({ labels, title }: { labels: string[]; title: string }) {
  const [active, setActive] = React.useState<string>(HOME_SECTION_IDS[0])

  React.useEffect(() => {
    const sections = HOME_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    )
    if (!sections.length) return

    // La franja de detección se centra en el tercio superior: una sección se
    // considera activa cuando su comienzo entra ahí, no cuando la cruza entera.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit?.target.id) setActive(hit.target.id)
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label={title}
      // Solo aparece cuando el contenedor de 80rem deja margen real a los lados;
      // por debajo de eso se montaria encima del titular.
      className="pointer-events-none fixed left-[max(1.5rem,calc((100vw-80rem)/2-9.5rem))] top-1/2 z-30 hidden -translate-y-1/2 min-[1560px]:block"
    >
      <p className="ed-label mb-5 text-[0.5625rem] text-ed-ink-faint/70">{title}</p>
      <ul className="pointer-events-auto space-y-[0.6rem]">
        {HOME_SECTION_IDS.map((id, i) => {
          const isActive = active === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className="group flex items-center gap-3 py-[0.15rem]"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "h-px transition-all duration-500 ease-out",
                    isActive
                      ? "w-7 bg-ed-accent"
                      : "w-3 bg-ed-rule-strong group-hover:w-5 group-hover:bg-ed-ink-faint"
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    "ed-label text-[0.5625rem] transition-colors duration-300",
                    isActive
                      ? "text-ed-ink"
                      : "text-ed-ink-faint/60 group-hover:text-ed-ink-soft"
                  )}
                >
                  {labels[i] ?? id}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
