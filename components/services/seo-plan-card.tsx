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
        "ed-card ed-card-lift group relative flex flex-col p-8 sm:p-10",
        isFeatured && "ring-2 ring-ed-accent shadow-[0_20px_40px_-10px_color-mix(in_oklch,var(--brand-magenta)_30%,transparent)]"
      )}
    >
      {isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="ed-label inline-flex items-center gap-1.5 rounded-full bg-ed-punch px-3 py-1 text-[0.5625rem] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
            {language === "es" ? "Más popular" : "Most popular"}
          </span>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-[1.625rem] font-semibold tracking-tight text-ed-ink sm:text-[1.875rem]">
          {plan.name[language]}
        </h3>
        <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ed-ink-soft">
          {plan.description[language]}
        </p>
      </div>

      <div className="mb-10 pb-10 border-b border-ed-rule">
        <div className="flex items-baseline gap-1">
          <span className="ed-display text-[2.5rem] leading-none text-ed-punch">
            ${plan.price.toLocaleString("es-CO")}
          </span>
          <span className="text-[0.875rem] text-ed-ink-soft">{plan.currency}/mes</span>
        </div>
      </div>

      <div className="mb-10">
        <p className="ed-label mb-6 text-ed-accent">
          {language === "es" ? "¿Qué incluye?" : "What's included?"}
        </p>
        <ul className="grid gap-y-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
          {plan.includes[language].map((item: string, i: number) => (
            <li key={item} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ed-punch" aria-hidden />
              <span className="text-[0.875rem] leading-relaxed text-ed-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-10 rounded-2xl bg-ed-canvas-sunken p-7">
        <p className="ed-label mb-5 text-ed-accent">
          {language === "es" ? "Beneficios" : "Benefits"}
        </p>
        <div className="space-y-4">
          {plan.benefits[language].map((benefit: string, i: number) => (
            <div key={benefit} className="flex gap-3">
              <span className="ed-display mt-1 text-lg leading-none text-ed-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.9375rem] leading-relaxed text-ed-ink">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {plan.bonus[language].length > 0 && (
        <div className="mb-8">
          <p className="ed-label mb-3 flex items-center gap-2 text-ed-punch">
            <Gift className="h-4 w-4" aria-hidden />
            {language === "es" ? "Bonus" : "Bonus"}
          </p>
          <ul className="space-y-2">
            {plan.bonus[language].map((item: string) => (
              <li key={item} className="text-[0.875rem] text-ed-ink-soft">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group/btn mt-auto inline-flex items-center justify-center gap-2 rounded-full py-4 px-8 font-semibold tracking-tight transition-all duration-300",
          isFeatured
            ? "bg-ed-punch text-white hover:shadow-[0_12px_24px_-8px_color-mix(in_oklch,var(--brand-magenta)_70%,transparent)]"
            : "border border-ed-rule-strong text-ed-ink hover:border-ed-punch hover:text-ed-punch"
        )}
      >
        {plan.cta[language]}
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          aria-hidden
        />
      </Link>
    </div>
  )
}
