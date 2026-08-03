"use client"

import { FadeIn } from "@/components/ui/fade-in"
import { useLanguage } from "@/components/providers/language-provider"
import { CaseStudyCard } from "@/components/cases/case-study-card"
import { successCases } from "@/lib/success-cases"

export function ServicesCasesCompact() {
  const { t } = useLanguage()

  return (
    <section id="cases" className="border-t border-white/8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t("svc.cases.eyebrow")}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("svc.cases.title")}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {successCases.map((item, index) => (
            <FadeIn key={item.id} delay={Math.min(index, 8) * 0.06}>
              <CaseStudyCard caseStudy={item} featured={item.featured} index={index} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
