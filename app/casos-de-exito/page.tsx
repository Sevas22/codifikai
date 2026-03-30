"use client"

import Image from "next/image"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { SitePreviewIframe } from "@/components/site-preview-iframe"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"
import { Button } from "@/components/ui/button"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { WHATSAPP_URL } from "@/lib/contact"
import { successCases } from "@/lib/success-cases"

export default function CasosDeExitoPage() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 })
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen bg-transparent text-foreground">
      <Navigation />
      <FloatingContact />

      <section ref={ref} className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-0 top-20 z-0 hidden w-52 lg:block lg:opacity-40">
          <Tech3DAccent variant="chip" size="md" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`mb-16 text-center md:mb-20 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionEyebrow label={t("casesPage.label")} alwaysCentered />
            <h1
              className="mx-auto max-w-4xl text-4xl font-bold heading-brand mb-6 text-balance md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("casesPage.title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
              {t("casesPage.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {successCases.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block rounded-2xl overflow-hidden border border-border/50 bg-card transition-all duration-700 hover:border-accent/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                  <Image
                    src={item.image}
                    alt={`Preview de ${item.title}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <SitePreviewIframe url={item.url} />
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-background/90 backdrop-blur-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>

                <div className="border-t border-border/50 bg-card p-5 text-center sm:text-left md:p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    {item.category}
                  </p>
                  <div className="mb-3 flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <h2
                      className="text-xl md:text-2xl font-bold heading-brand"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h2>
                    <ExternalLink className="h-5 w-5 shrink-0 text-accent opacity-70 group-hover:opacity-100 transition-opacity sm:mt-1" />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="mb-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mx-auto inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all duration-300 sm:mx-0">
                    {t("casesPage.visitSite")}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div
            className={`mt-16 md:mt-20 text-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-muted-foreground mb-6">
              {t("casesPage.ctaTitle")}
            </p>
            <Button asChild variant="cta" size="cta" className="group">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("casesPage.ctaButton")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
