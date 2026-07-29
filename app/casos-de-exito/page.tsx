"use client"

import { ArrowUpRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { CaseStudyCard } from "@/components/cases/case-study-card"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { WHATSAPP_URL } from "@/lib/contact"
import { successCases } from "@/lib/success-cases"
import { cn } from "@/lib/utils"

export default function CasosDeExitoPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.12 })
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.06 })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.15 })
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen bg-transparent text-foreground">
      <Navigation />
      <FloatingContact />

      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(34,211,238,0.14),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header
            ref={headerRef}
            className={cn(
              "mx-auto max-w-3xl text-center transition-all duration-400",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <SectionEyebrow label={t("casesPage.label")} alwaysCentered />
            <h1
              className="mt-2 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="heading-brand">{t("casesPage.heroTitle")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              {t("casesPage.heroSubtitle")}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground/80">{t("casesPage.heroSupport")}</p>
          </header>
        </div>
      </section>

      <section ref={gridRef} className="relative pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "grid gap-5 transition-all duration-400 md:gap-6 lg:grid-cols-2",
              gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {successCases.map((item, index) => (
              <CaseStudyCard
                key={item.id}
                caseStudy={item}
                featured={item.featured}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent px-6 py-12 text-center backdrop-blur-md md:px-12 md:py-16",
              "transition-all duration-400",
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("casesPage.ctaEyebrow")}</p>
            <h2
              className="mt-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("casesPage.ctaHeadline")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
              {t("casesPage.ctaSupport")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="cta" size="cta" className="group w-full sm:w-auto">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  {t("casesPage.ctaPrimary")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full rounded-full border-white/15 sm:w-auto">
                <a href="/services">{t("casesPage.ctaSecondary")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
