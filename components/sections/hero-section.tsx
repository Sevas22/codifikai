"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { WHATSAPP_URL } from "@/lib/contact"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { HeroConsoleVideo } from "@/components/hero-console-video"
import { cn } from "@/lib/utils"
import { useLocalePath } from "@/hooks/use-locale-path"
const HERO_METRIC_KEYS = [
  "hero.console.metric1",
  "hero.console.metric2",
  "hero.console.metric3",
] as const

function HeroWorkflowVisual() {
  const { t } = useLanguage()

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.14),transparent_68%)]"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-4 shadow-[0_24px_80px_-32px_rgba(34,211,238,0.25)] backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("hero.console.title")}
          </span>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/8 bg-[#060d18]">
          <HeroConsoleVideo />
          <div className="grid grid-cols-3 gap-2 border-t border-white/8 bg-black/40 p-3">
            {HERO_METRIC_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-md border border-white/10 bg-black/80 px-2 py-2 text-center text-[10px] font-medium text-foreground/90 sm:text-[11px]"
              >
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const path = useLocalePath()
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 })

  const proofPoints = [t("hero.proof.1"), t("hero.proof.2"), t("hero.proof.3")]

  const stats = [
    { value: "150+", label: t("hero.stats.projects") },
    { value: "50+", label: t("hero.stats.clients") },
    { value: "4.2x", label: t("hero.stats.roi") },
  ]

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[min(480px,50vh)] w-[min(480px,45vw)] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20",
            "transition-all duration-400",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <div className="text-center lg:text-left">
            <SectionEyebrow
              label={t("hero.tagline")}
              alwaysCentered
              className="lg:!flex-row lg:!items-center lg:justify-start"
            />

            <h1
              className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:mx-0 lg:text-[3.25rem] lg:leading-[1.08] xl:text-[3.5rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="heading-brand">{t("hero.title")}</span>{" "}
              <span className="text-gradient">{t("hero.titleHighlight")}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              {t("hero.subtitle")}
            </p>

            <ul className="mx-auto mt-8 flex max-w-lg flex-col gap-3 text-left lg:mx-0">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground sm:text-[0.9375rem]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild variant="cta" size="cta-lg" className="group w-full sm:w-auto">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  {t("hero.cta.primary")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-border/80 bg-transparent sm:w-auto"
              >
                <Link href={path("/services#cases")}>{t("hero.cta.secondary")}</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-3 border-t border-white/10 pt-8 sm:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <p className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroWorkflowVisual />
        </div>
      </div>
    </section>
  )
}
