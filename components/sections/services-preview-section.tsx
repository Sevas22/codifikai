"use client"

import { ArrowRight, MonitorSmartphone, Code2, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { WHATSAPP_URL } from "@/lib/contact"

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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-violet-600/10" />
      <div className="pointer-events-none absolute -left-1/4 top-1/3 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-3xl md:bg-violet-500/[0.09]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-4xl mx-auto mb-10 md:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionEyebrow
            label={t("servicesPreview.label")}
            labelClassName="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-xs font-semibold uppercase tracking-[0.22em] text-transparent md:text-sm"
          />
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold heading-brand mb-6"
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
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-background/60 p-8 backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-violet-500/25 hover:shadow-[0_0_40px_-12px_oklch(0.68_0.22_310/0.18)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 120 + 100}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 via-violet-500/45 to-transparent" />
                <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-b from-accent/15 to-violet-600/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-violet-500/15 blur-xl opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                    <IconSquircle
                      icon={Icon}
                      size="xxl"
                      className="relative group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3
                  className="text-2xl font-bold heading-brand-sm mb-4 text-center"
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
          className={`mt-10 md:mt-12 rounded-3xl border border-violet-500/25 bg-gradient-to-br from-accent/[0.08] via-violet-600/[0.09] to-fuchsia-600/[0.06] px-6 py-8 md:px-10 md:py-10 text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-sm uppercase tracking-[0.18em] text-transparent">
            {t("servicesPreview.contactLabel")}
          </p>
          <h3
            className="text-2xl md:text-3xl font-bold heading-brand mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("servicesPreview.contactTitle")}
          </h3>
          <Button asChild variant="cta" size="cta" className="group">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              {t("servicesPreview.contactCta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
