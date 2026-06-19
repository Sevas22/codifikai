"use client"

import { FadeIn } from "@/components/ui/fade-in"
import { useLanguage } from "@/components/providers/language-provider"

const TRUST_KEYS = ["svc.trust.1", "svc.trust.2", "svc.trust.3", "svc.trust.4"] as const

export function ServicesTrust() {
  const { t } = useLanguage()

  return (
    <section className="border-y border-white/8 py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {TRUST_KEYS.map((key) => (
              <div key={key} className="text-center md:text-left">
                <p className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {t(`${key}.value`)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{t(`${key}.label`)}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
