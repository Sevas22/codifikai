"use client"

import { FadeIn } from "@/components/ui/fade-in"
import { useLanguage } from "@/components/providers/language-provider"

const STEP_KEYS = ["svc.process.1", "svc.process.2", "svc.process.3", "svc.process.4"] as const

export function ServicesProcess() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t("svc.process.eyebrow")}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("svc.process.title")}
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-4">
          {STEP_KEYS.map((key, index) => (
            <FadeIn key={key} delay={index * 0.05} className="bg-black">
              <div className="flex h-full flex-col p-6 md:p-7">
                <span className="font-mono text-xs text-accent/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{t(`${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${key}.desc`)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
