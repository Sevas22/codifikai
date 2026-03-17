"use client"

import Link from "next/link"
import { ArrowRight, MonitorSmartphone, Code2, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"

const servicesData = [
  { icon: MonitorSmartphone, titleKey: "servicesPreview.lowcode", descKey: "servicesPreview.lowcodeDesc" },
  { icon: Code2, titleKey: "servicesPreview.software", descKey: "servicesPreview.softwareDesc" },
  { icon: Megaphone, titleKey: "servicesPreview.marketing", descKey: "servicesPreview.marketingDesc" },
]

export function ServicesPreviewSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-24 relative overflow-hidden bg-secondary/20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`text-center max-w-4xl mx-auto mb-10 md:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 md:gap-6 mb-5">
            <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {t("servicesPreview.label")}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
            <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("servicesPreview.title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {t("servicesPreview.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {servicesData.map((service, index) => {
            const Icon = service.icon

            return (
              <article
                key={service.titleKey}
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-background/60 p-8 backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-accent/30 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 120 + 100}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/15">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                </div>
                <h3
                  className="text-2xl font-bold text-foreground mb-4 text-center"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t(service.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  {t(service.descKey)}
                </p>
              </article>
            )
          })}
        </div>

        <div
          className={`mt-10 md:mt-12 rounded-3xl border border-accent/20 bg-accent/10 px-6 py-8 md:px-10 md:py-10 text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.18em] text-accent mb-3">{t("servicesPreview.contactLabel")}</p>
          <h3
            className="text-2xl md:text-3xl font-bold text-foreground mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("servicesPreview.contactTitle")}
          </h3>
          <Button
            asChild
            className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground"
          >
            <Link href="/services">
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-accent-foreground">
                {t("servicesPreview.viewServices")}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
