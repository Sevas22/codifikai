"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { DragCarousel } from "@/components/home/drag-carousel"
import { EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import type { HomeCopy } from "@/lib/home-copy"

/**
 * Servicios en carrusel arrastrable de tarjetas numeradas.
 *
 * Se prefiere al grid clásico porque el gesto de arrastre es lo que da la
 * sensación de página viva; el contenido sigue siendo accesible con rueda,
 * teclado y táctil (ver `DragCarousel`).
 */
export function CapabilitiesSection({
  copy,
  whatsappHref,
}: {
  copy: HomeCopy
  whatsappHref: string
}) {
  return (
    <EdSection id="capabilities" className="ed-columns">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          index={2}
          label={copy.capabilities.label}
          title={copy.capabilities.title}
          lead={copy.capabilities.lead}
        />
        <Reveal delay={0.15} className="shrink-0">
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ed-punch-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.875rem] font-semibold tracking-tight"
          >
            {copy.hero.ctaPrimary}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>

      <DragCarousel
        className="mt-16"
        ariaLabel={copy.ui.carousel}
        previousLabel={copy.ui.previous}
        nextLabel={copy.ui.next}
      >
        {copy.capabilities.items.map((item, i) => (
          <article
            key={item.title}
            className="ed-card ed-card-lift group flex w-[min(85vw,22rem)] shrink-0 snap-start flex-col justify-between p-7"
          >
            <div>
              <span className="ed-display text-[2.75rem] leading-none text-ed-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-[1.1875rem] font-semibold tracking-tight text-ed-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ed-ink-soft">
                {item.body}
              </p>
            </div>

            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-ed-rule-strong px-5 py-2.5 text-[0.8125rem] font-semibold tracking-tight text-ed-ink transition-colors duration-300 group-hover:border-ed-punch group-hover:text-ed-punch"
            >
              {copy.capabilities.cardCta}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </article>
        ))}
      </DragCarousel>
    </EdSection>
  )
}
