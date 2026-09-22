"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import { PlanCard } from "@/components/services/plan-card"
import type { PricingPlan } from "@/lib/pricing-plans"
import { WHATSAPP_URL } from "@/lib/contact"

const LABELS = {
  es: {
    label: "Planes",
    title: "Elige tu plan de crecimiento",
    lead: "Cada plan incluye todo lo que necesitas para crecer. Elige el que se ajuste a tu presupuesto y tus objetivos.",
    comparison: "Ver comparativa completa",
  },
  en: {
    label: "Plans",
    title: "Choose your growth plan",
    lead: "Each plan includes everything you need to grow. Choose the one that fits your budget and goals.",
    comparison: "See full comparison",
  },
}

export function PlansSection({
  plans,
  language,
}: {
  plans: PricingPlan[]
  language: "es" | "en"
}) {
  const labels = LABELS[language]

  return (
    <EdSection id="plans" className="ed-columns">
      <div className="max-w-[56rem]">
        <Reveal y={14}>
          <SectionHeading index={2} label={labels.label} title={labels.title} lead={labels.lead} />
        </Reveal>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 0.1} y={22}>
            <PlanCard plan={plan} language={language} whatsappHref={WHATSAPP_URL} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} y={18} className="mt-10">
        <div className="flex justify-center">
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-ed-ink transition-colors hover:text-ed-punch"
          >
            {labels.comparison}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </EdSection>
  )
}
