"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { EnterpriseMockup } from "@/components/services/enterprise-mockup"
import { useLanguage } from "@/components/providers/language-provider"
import { WHATSAPP_URL } from "@/lib/contact"

export function ServicesHero() {
  const { t } = useLanguage()

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("svc.hero.eyebrow")}
            </p>
            <h1
              className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="heading-brand">{t("svc.hero.title")}</span>{" "}
              <span className="text-gradient">{t("svc.hero.titleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
              {t("svc.hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild variant="cta" size="cta-lg" className="group w-full sm:w-auto">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  {t("svc.hero.ctaPrimary")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-white/15 bg-transparent sm:w-auto"
              >
                <Link href="/casos-de-exito">{t("svc.hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <EnterpriseMockup variant="ops" className="shadow-[0_32px_80px_-40px_rgba(0,0,0,0.8)]" />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
