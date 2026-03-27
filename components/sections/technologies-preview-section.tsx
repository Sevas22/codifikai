"use client"

import Link from "next/link"
import { ArrowUpRight, MonitorSmartphone, Server, Database, Layers3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"
import { IconSquircle } from "@/components/ui/icon-squircle"

const technologiesData = [
  { icon: MonitorSmartphone, titleKey: "techPreview.frontend", descKey: "techPreview.frontendDesc" },
  { icon: Server, titleKey: "techPreview.backend", descKey: "techPreview.backendDesc" },
  { icon: Database, titleKey: "techPreview.datascience", descKey: "techPreview.datascienceDesc" },
  { icon: Layers3, titleKey: "techPreview.cms", descKey: "techPreview.cmsDesc" },
]

export function TechnologiesPreviewSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 md:gap-6 mb-5">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                {t("techPreview.label")}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.76_0.18_195/0.35)]" />
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold heading-brand mb-5 text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("techPreview.title")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {t("techPreview.subtitle")}
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="group border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Link href="/about#technologies">
              {t("techPreview.viewTools")}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {technologiesData.map((item, index) => {
            const Icon = item.icon

            return (
              <article
                key={item.titleKey}
                className={`group rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-accent/30 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100 + 120}ms` }}
              >
                <div className="mb-5">
                  <IconSquircle icon={Icon} size="lg" className="group-hover:scale-105" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t(item.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {t(item.descKey)}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
