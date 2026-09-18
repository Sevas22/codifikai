"use client"

import * as React from "react"

import { EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import type { HomeCopy } from "@/lib/home-copy"
import { cn } from "@/lib/utils"

/**
 * Lista editorial de capacidades: filas separadas por reglas de un pixel que
 * se iluminan al pasar el puntero, en vez del clásico grid de tarjetas.
 */
export function CapabilitiesSection({ copy }: { copy: HomeCopy }) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <EdSection id="capabilities">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
        <SectionHeading
          index={2}
          label={copy.capabilities.label}
          title={copy.capabilities.title}
          lead={copy.capabilities.lead}
          className="lg:sticky lg:top-32 lg:self-start"
        />

        <ul
          className="border-t border-ed-rule"
          onMouseLeave={() => setHovered(null)}
        >
          {copy.capabilities.items.map((item, i) => {
            const dimmed = hovered !== null && hovered !== i
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.06}
                y={18}
                className="border-b border-ed-rule"
              >
                <div
                  onMouseEnter={() => setHovered(i)}
                  className={cn(
                    "group relative flex gap-6 py-8 transition-all duration-500 sm:gap-10",
                    dimmed ? "opacity-40" : "opacity-100"
                  )}
                >
                  {/* Barra de acento que crece desde arriba al enfocar la fila */}
                  <span
                    className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-ed-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                    aria-hidden
                  />
                  <span className="ed-label shrink-0 pt-1 text-ed-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[1.0625rem] font-medium tracking-tight text-ed-ink transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-[1.1875rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 max-w-[46ch] text-[0.875rem] leading-relaxed text-ed-ink-soft sm:text-[0.9375rem]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </EdSection>
  )
}
