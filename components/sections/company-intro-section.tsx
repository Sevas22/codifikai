"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, BadgeCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"
import { CodifikaiLogo } from "@/components/brand/codifikai-logo"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"

const pillarsData = [
  "companyIntro.pillar1",
  "companyIntro.pillar2",
  "companyIntro.pillar3",
]

export function CompanyIntroSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="relative overflow-hidden pt-8 pb-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="pointer-events-none absolute -right-4 top-24 z-0 hidden w-[200px] lg:block">
        <Tech3DAccent variant="chip" size="sm" className="opacity-80" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:px-8">
        <div
          className={`text-center md:text-left transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionEyebrow label={t("companyIntro.label")} />

          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent mx-auto md:mx-0">
            <Sparkles className="h-4 w-4" />
            {t("companyIntro.badge")}
          </span>

          <div
            className={`mt-6 rounded-2xl border border-accent/25 bg-background/50 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md md:p-8 dark:bg-background/40 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="mb-5 flex justify-center md:justify-start">
              <CodifikaiLogo size="sm" showCode className="text-xs sm:text-sm" />
            </div>

            <h2
              className="mx-auto max-w-3xl text-3xl font-bold heading-brand md:text-4xl lg:text-5xl text-balance md:mx-0"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("companyIntro.title")}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground md:mx-0 md:text-lg">
              {t("companyIntro.subtitle")}
            </p>

            <div className="mt-7 grid gap-3">
              {pillarsData.map((pillarKey, index) => (
                <div
                  key={pillarKey}
                  className={`flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-background/70 px-4 py-3 text-center backdrop-blur-xl transition-all duration-700 dark:bg-background/50 sm:flex-row sm:items-center sm:text-left ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${index * 120 + 120}ms` }}
                >
                  <IconSquircle icon={BadgeCheck} size="md" className="shrink-0" />
                  <p className="text-sm heading-brand-sm md:text-base">{t(pillarKey)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col items-center text-center">
            <div className="flex justify-center">
              <Button asChild variant="cta" size="cta" className="group">
                <Link href="/about">
                  {t("companyIntro.cta")}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative mx-auto max-w-md">
            <div className="absolute left-10 right-0 top-14 bottom-12 rounded-[2rem] bg-accent" />
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-background/80 p-4 shadow-[0_20px_80px_oklch(0_0_0/0.18)] backdrop-blur-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-secondary/40">
                <Image
                  src="/images/team/jhoan-gomez.png"
                  alt="Fundador de Codifikai"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/65 to-transparent p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {t("companyIntro.leadership")}
                  </p>
                  <p
                    className="mt-2 text-2xl font-bold heading-brand-sm"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Codifikai
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t("companyIntro.cardTag")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
