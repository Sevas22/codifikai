"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { HomeCopy, HomeLang } from "@/lib/home-copy"
import { isLogoPosterPath, type SuccessCase } from "@/lib/success-cases"
import { cn } from "@/lib/utils"

/**
 * Tarjeta de un proyecto en producción. "lead" es la grande, con métricas;
 * "row" es la compacta del resto del listado.
 */
export function CaseCard({
  item,
  language,
  copy,
  size,
  priority,
}: {
  item: SuccessCase
  language: HomeLang
  copy: HomeCopy
  size: "lead" | "row"
  priority?: boolean
}) {
  const description = language === "es" ? item.descriptionEs : item.description
  const isLead = size === "lead"
  // Los logos de partners vienen sobre fondo blanco: encajarlos en vez de
  // recortarlos evita cortar la marca del cliente.
  const isLogo = isLogoPosterPath(item.image)

  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
    >
      <figure className="relative overflow-hidden rounded-ed bg-ed-canvas-raised">
        <div className={cn("relative w-full", isLead ? "aspect-[16/11]" : "aspect-[16/10]")}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={priority}
            sizes={isLead ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className={cn(
              "transition-[transform,filter,opacity] duration-[900ms] ease-out",
              isLogo ? "bg-white object-contain p-8" : "object-cover",
              // Desaturado en reposo, a color al acercarse: el trabajo se
              // "enciende" con la atención del visitante.
              "opacity-80 grayscale group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
            )}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ed-canvas/85 via-ed-canvas/10 to-transparent"
            aria-hidden
          />
          <span className="ed-label absolute left-5 top-5 rounded-full border border-ed-rule-strong bg-ed-canvas/70 px-3 py-1.5 text-ed-ink-soft backdrop-blur-sm">
            {item.category}
          </span>
          <span
            className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-ed-rule-strong bg-ed-canvas/70 text-ed-ink backdrop-blur-sm transition-all duration-500 group-hover:border-ed-accent group-hover:bg-ed-accent group-hover:text-ed-canvas"
            aria-hidden
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </figure>

      <div className="pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={cn(
              "ed-display text-ed-ink",
              isLead ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[1.5rem]"
            )}
          >
            {item.title}
          </h3>
          <span className="ed-label shrink-0 text-ed-ink-faint/70 transition-colors group-hover:text-ed-accent">
            {copy.work.liveSite}
          </span>
        </div>
        <p className="ed-label mt-2 text-ed-ink-faint normal-case tracking-[0.14em]">
          {item.subtitle}
        </p>
        <p
          className={cn(
            "mt-4 text-pretty text-[0.875rem] leading-relaxed text-ed-ink-soft",
            isLead ? "max-w-[52ch]" : "max-w-[42ch] line-clamp-3"
          )}
        >
          {description}
        </p>

        {isLead ? (
          <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-t border-ed-rule pt-6">
            {item.metrics.map((metric) => (
              <div key={metric.labelEn}>
                <dd className="ed-display text-[1.75rem] leading-none text-ed-ink">
                  {metric.value}
                </dd>
                <dt className="ed-label mt-2 text-ed-ink-faint">
                  {language === "es" ? metric.labelEs : metric.labelEn}
                </dt>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </Link>
  )
}
