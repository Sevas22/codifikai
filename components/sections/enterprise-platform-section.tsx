"use client"

import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Building2,
  Cable,
  ChartNoAxesCombined,
  Cpu,
  Layers3,
  Network,
  Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { cn } from "@/lib/utils"

const capabilityKeys = [
  { key: "platform.cap.sales", icon: Bot },
  { key: "platform.cap.automation", icon: Workflow },
  { key: "platform.cap.workflows", icon: Layers3 },
  { key: "platform.cap.ops", icon: Cpu },
  { key: "platform.cap.infrastructure", icon: Network },
  { key: "platform.cap.roi", icon: ChartNoAxesCombined },
] as const

const industryKeys = ["platform.ind.1", "platform.ind.2", "platform.ind.3", "platform.ind.4"] as const

const integrationKeys = ["platform.int.1", "platform.int.2", "platform.int.3", "platform.int.4", "platform.int.5"] as const

export function EnterprisePlatformSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <section ref={ref} className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <SectionEyebrow label={t("platform.label")} alwaysCentered />
          <h2
            className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("platform.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("platform.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityKeys.map(({ key, icon: Icon }, index) => (
            <article
              key={key}
              className={cn(
                "rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-500 dark:border-white/10 dark:bg-white/[0.03]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="mb-4 inline-flex rounded-lg border border-accent/25 bg-accent/10 p-2.5 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t(`${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${key}.desc`)}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-2xl border border-border/60 bg-background/50 p-6 md:p-8 dark:border-white/10">
            <div className="mb-4 flex items-center gap-2 text-accent">
              <Building2 className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">{t("platform.process.label")}</p>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">{t("platform.process.title")}</h3>
            <ol className="mt-6 space-y-4">
              {["platform.process.1", "platform.process.2", "platform.process.3", "platform.process.4"].map(
                (stepKey, index) => (
                  <li key={stepKey} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-semibold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{t(`${stepKey}.title`)}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{t(`${stepKey}.desc`)}</p>
                    </div>
                  </li>
                )
              )}
            </ol>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 p-6 dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t("platform.industries.label")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {industryKeys.map((key) => (
                  <span
                    key={key}
                    className="rounded-full border border-border/70 px-3 py-1.5 text-xs font-medium text-foreground dark:border-white/15"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 p-6 dark:border-white/10">
              <div className="mb-3 flex items-center gap-2 text-accent">
                <Cable className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">{t("platform.integrations.label")}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {integrationKeys.map((key) => (
                  <span
                    key={key}
                    className="rounded-md bg-secondary/80 px-2.5 py-1 text-xs font-medium text-muted-foreground dark:bg-white/5"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
            </div>

            <Button asChild variant="cta" size="cta" className="group w-full">
              <Link href="/services">
                {t("platform.cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
