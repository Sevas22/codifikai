"use client"

import { FadeIn } from "@/components/ui/fade-in"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { useLanguage } from "@/components/providers/language-provider"
import { SERVICE_CAPABILITIES } from "@/lib/services-capabilities"
import { cn } from "@/lib/utils"

export function ServicesArchitecture() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t("svc.arch.eyebrow")}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("svc.arch.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("svc.arch.subtitle")}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {SERVICE_CAPABILITIES.map((cap, index) => (
            <FadeIn key={cap.id} delay={index * 0.06}>
              <article
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/50",
                  "transition-all duration-300 hover:border-accent/25 hover:shadow-[0_24px_64px_-32px_rgba(34,211,238,0.2)]"
                )}
              >
                <div className="relative flex aspect-[2/1] items-center justify-center overflow-hidden bg-black sm:aspect-[5/2]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <IconSquircle
                    icon={cap.icon}
                    size="xxl"
                    className="relative transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-white/10 p-5 md:p-6">
                  <h3
                    className="text-lg font-semibold tracking-tight text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t(`${cap.labelKey}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`${cap.labelKey}.desc`)}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
