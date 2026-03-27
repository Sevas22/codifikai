"use client"

import { type ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useMouseAmbient } from "@/components/providers/mouse-ambient-provider"
import { HeroSphereVisual } from "@/components/sections/hero-sphere-visual"

function HeroHudFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="relative w-full max-w-2xl lg:max-w-[42rem]">
      <p className="mb-2 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.32em] text-accent/85 sm:mb-2.5 sm:text-xs sm:tracking-[0.38em]">
        {label}
      </p>
      <div className="relative px-0 py-0.5 sm:py-1.5">
        <div className="pointer-events-none absolute -left-0.5 -top-0.5 h-7 w-7 border-l-2 border-t-2 border-accent sm:h-9 sm:w-9" />
        <div className="pointer-events-none absolute -right-0.5 -top-0.5 h-7 w-7 border-r-2 border-t-2 border-violet-400/50 sm:h-9 sm:w-9" />
        <div className="pointer-events-none absolute -bottom-0.5 -left-0.5 h-7 w-7 border-b-2 border-l-2 border-white/15 sm:h-9 sm:w-9" />
        <div className="pointer-events-none absolute -bottom-0.5 -right-0.5 h-7 w-7 border-b-2 border-r-2 border-fuchsia-500/45 sm:h-9 sm:w-9" />
        <div className="pointer-events-none absolute left-6 top-0 h-px w-20 bg-gradient-to-r from-accent/90 via-violet-400/50 to-transparent sm:left-10 sm:w-28" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-px w-16 bg-gradient-to-l from-white/35 to-transparent sm:right-14" />
        <div className="pointer-events-none absolute -right-1 top-1/2 h-8 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        {children}
      </div>
    </div>
  )
}

export function HeroSection() {
  const { t } = useLanguage()
  const { x: mouseX, y: mouseY, isMobile } = useMouseAmbient()
  const { ref: contentRef, isVisible } = useScrollReveal({ threshold: 0.1 })

  const stats = [
    { value: "150+", label: t("hero.stats.projects") },
    { value: "50+", label: t("hero.stats.clients") },
    { value: "98%", label: t("hero.stats.satisfaction") },
  ]

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden pt-16 md:pt-20">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-6 pt-2 sm:px-6 sm:pb-8 sm:pt-3 md:pb-10 lg:px-8 lg:pb-10 lg:pt-4">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-6 xl:gap-10">
          {/* Columna copy */}
          <div
            ref={contentRef}
            className={`flex flex-col text-center transition-all duration-1000 lg:text-left ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <HeroHudFrame label={t("hero.hudLabel")}>
              <h1
                className="text-3xl font-bold tracking-[-0.02em] text-balance sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.15rem] xl:leading-[1.06] max-w-xl lg:max-w-none mx-auto lg:mx-0 uppercase tracking-wide sm:tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="heading-brand">{t("hero.title")}</span>{" "}
                <span className="text-gradient">{t("hero.titleHighlight")}</span>
              </h1>
            </HeroHudFrame>

            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg md:text-xl lg:mx-0">
              {t("hero.subtitle")}
            </p>

            <div className="mt-6 flex w-full flex-col justify-stretch gap-3 sm:mt-7 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 px-7 sm:px-10 py-5 sm:py-6 text-sm sm:text-base font-semibold text-white shadow-[0_0_40px_-10px_oklch(0.76_0.18_195/0.45),0_0_28px_oklch(0.68_0.24_310/0.25)] backdrop-blur-sm transition-all hover:brightness-110 hover:shadow-[0_0_52px_-8px_oklch(0.76_0.18_195/0.5),0_0_36px_oklch(0.68_0.24_310/0.35)] hover-lift w-full sm:w-auto light:border-white/25 light:from-cyan-500 light:via-violet-600 light:to-fuchsia-600"
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm">
                    {t("hero.cta.primary")}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group rounded-full border-white/15 bg-white/[0.04] px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/45 hover:bg-accent/10 dark:border-white/12 dark:bg-transparent w-full sm:w-auto"
              >
                <Link href="/about">
                  <span>{t("hero.cta.secondary")}</span>
                </Link>
              </Button>
            </div>

            <div className="mx-auto mt-12 grid w-full max-w-xl grid-cols-3 gap-2 sm:mt-16 sm:gap-4 lg:mx-0 lg:max-w-none">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-card/35 px-2 py-3 text-center shadow-inner backdrop-blur-md sm:px-3 sm:py-4 dark:border-white/[0.08] dark:bg-white/[0.04]"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(16px)",
                    transition: `all 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 1) * 120}ms`,
                  }}
                >
                  <div
                    className="text-xl font-bold text-gradient sm:text-2xl md:text-3xl lg:text-4xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[0.65rem] leading-tight text-muted-foreground sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna visual 3D */}
          <div
            className={`flex min-h-[200px] items-center justify-center sm:min-h-[240px] lg:min-h-[min(360px,42svh)] transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <HeroSphereVisual mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground animate-float md:bottom-8 md:flex">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-current p-2">
          <div className="h-2 w-1 animate-bounce rounded-full bg-current" />
        </div>
      </div>
    </section>
  )
}
