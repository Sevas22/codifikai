"use client"

import { Check, Zap, Shield, Rocket, LineChart } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const strategiesData = [
  { icon: Zap, titleKey: "strategy.fast", descKey: "strategy.fastDesc" },
  { icon: Shield, titleKey: "strategy.security", descKey: "strategy.securityDesc" },
  { icon: Rocket, titleKey: "strategy.scale", descKey: "strategy.scaleDesc" },
  { icon: LineChart, titleKey: "strategy.roi", descKey: "strategy.roiDesc" },
]

const metricsData = [
  { value: "97%", labelKey: "strategy.metrics1" },
  { value: "4.9/5", labelKey: "strategy.metrics2" },
  { value: "200+", labelKey: "strategy.metrics3" },
]

export function StrategySection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-24 relative overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-14 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6 mb-5">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                {t("strategy.label")}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("strategy.title")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("strategy.subtitle")}
            </p>

            {/* Strategy list */}
            <div className="grid sm:grid-cols-2 gap-6">
              {strategiesData.map((strategy, index) => {
                const Icon = strategy.icon
                return (
                  <div
                    key={strategy.titleKey}
                    className={`flex gap-4 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t(strategy.titleKey)}</h4>
                      <p className="text-sm text-muted-foreground">{t(strategy.descKey)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Metrics card */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative p-8 rounded-3xl glass-card border-glow">
              {/* Decorative gradient */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              
              <h3
                className="text-2xl font-bold text-foreground mb-8 relative"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t("strategy.metricsTitle")}
              </h3>

              <div className="space-y-6 relative">
                {metricsData.map((metric, index) => (
                  <div
                    key={metric.labelKey}
                    className={`flex items-center justify-between p-4 rounded-xl bg-background/50 transition-all duration-500 hover-lift ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 500}ms` }}
                  >
                    <span className="text-muted-foreground">{t(metric.labelKey)}</span>
                    <span
                      className="text-2xl font-bold text-gradient"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Success indicators */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="flex items-center gap-2 text-accent">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("strategy.iso")}</span>
                </div>
                <div className="flex items-center gap-2 text-accent mt-3">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("strategy.gcp")}</span>
                </div>
                <div className="flex items-center gap-2 text-accent mt-3">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("strategy.aws")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
