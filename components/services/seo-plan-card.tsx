"use client"

import Link from "next/link"
import { ArrowUpRight, Check, Gift } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SeoPlan } from "@/lib/seo-plans"

export function SeoPlanCard({
  plan,
  language,
  whatsappHref,
}: {
  plan: SeoPlan
  language: "es" | "en"
  whatsappHref: string
}) {
  const isFeatured = plan.order === 2

  return (
    <div
      className={cn(
        "ed-card ed-card-lift group relative flex flex-col overflow-hidden",
        isFeatured && "ring-1 ring-ed-punch shadow-[0_24px_48px_-16px_color-mix(in_oklch,var(--brand-magenta)_35%,transparent)] lg:-translate-y-3"
      )}
    >
      {/* Franja superior: nombre, precio y CTA quedan agrupados como la
          cabecera de venta; el resto de la tarjeta es contenido de apoyo. */}
      <div className={cn("p-7 pb-8 sm:p-9 sm:pb-9", isFeatured && "bg-ed-canvas-sunken")}>
        {isFeatured && (
          <span className="ed-label mb-5 inline-flex items-center gap-1.5 rounded-full bg-ed-punch px-3 py-1 text-[0.5625rem] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
            {language === "es" ? "Más popular" : "Most popular"}
          </span>
        )}

        <h3 className="text-[1.375rem] font-semibold tracking-tight text-ed-ink sm:text-[1.5rem]">
          {plan.name[language]}
        </h3>
        <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ed-ink-soft">
          {plan.subtitle[language]}
        </p>

        <div className="mt-7 flex items-baseline gap-1.5">
          <span className="ed-display text-[2.25rem] leading-none text-ed-ink sm:text-[2.5rem]">
            ${plan.price.toLocaleString("es-CO")}
          </span>
          <span className="text-[0.8125rem] text-ed-ink-faint">
            {plan.currency} / {language === "es" ? "mes" : "mo"}
          </span>
        </div>

        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group/btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[0.875rem] font-semibold tracking-tight transition-all duration-300",
            isFeatured
              ? "bg-ed-punch text-white hover:shadow-[0_12px_24px_-8px_color-mix(in_oklch,var(--brand-magenta)_70%,transparent)]"
              : "border border-ed-rule-strong text-ed-ink hover:border-ed-punch hover:text-ed-punch"
          )}
        >
          {plan.cta[language]}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      </div>

      {/* Cuerpo: una sola columna evita que textos de largo distinto queden
          desalineados entre sí, como pasaba con la grilla de dos columnas. */}
      <div className="flex flex-1 flex-col gap-8 p-7 pt-8 sm:p-9 sm:pt-9">
        <div>
          <p className="ed-label mb-4 text-ed-ink-faint">
            {language === "es" ? "Qué incluye" : "What's included"}
          </p>
          <ul className="space-y-3">
            {plan.includes[language].map((item: string) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ed-punch" aria-hidden />
                <span className="text-[0.8125rem] leading-snug text-ed-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-ed-rule pt-7">
          <p className="ed-label mb-4 text-ed-ink-faint">
            {language === "es" ? "Beneficios" : "Benefits"}
          </p>
          <ul className="space-y-3">
            {plan.benefits[language].map((benefit: string) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ed-accent" aria-hidden />
                <span className="text-[0.8125rem] leading-snug text-ed-ink-soft">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {plan.bonus[language].length > 0 && (
          <div className="mt-auto flex items-start gap-2.5 rounded-xl bg-ed-canvas-sunken p-4">
            <Gift className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ed-punch" aria-hidden />
            <p className="text-[0.75rem] leading-relaxed text-ed-ink-soft">
              {plan.bonus[language].join(" · ")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
