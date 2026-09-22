"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import type { HomeCopy } from "@/lib/home-copy"

/**
 * Acordeón sobre `<details>` nativo: teclado, lectores de pantalla y búsqueda
 * del navegador funcionan sin añadir JavaScript ni dependencias.
 */
export function FaqSection({ copy }: { copy: HomeCopy }) {
  return (
    <EdSection id="faq" className="bg-ed-canvas-sunken">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
        <SectionHeading
          index={7}
          label={copy.faq.label}
          title={copy.faq.title}
        highlight={copy.highlights.faq}
          className="lg:sticky lg:top-32 lg:self-start"
        />

        <div className="border-t border-ed-rule">
          {copy.faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.06} y={16}>
              <details className="group border-b border-ed-rule">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-5">
                    <span className="ed-label shrink-0 pt-1 text-ed-ink-faint/60 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.0625rem] font-medium tracking-tight text-ed-ink transition-colors group-hover:text-ed-accent sm:text-[1.125rem]">
                      {item.q}
                    </span>
                  </span>
                  <Plus
                    className="mt-1 h-4 w-4 shrink-0 text-ed-ink-faint transition-transform duration-500 ease-out group-open:rotate-45 group-hover:text-ed-accent"
                    aria-hidden
                  />
                </summary>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-8 pl-0 text-[0.9375rem] leading-relaxed text-ed-ink-soft sm:pl-[3.25rem]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </EdSection>
  )
}
