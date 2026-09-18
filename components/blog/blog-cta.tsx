"use client"

import { ArrowUpRight } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { WHATSAPP_URL } from "@/lib/contact"
import { useLocalePath } from "@/hooks/use-locale-path"
export function BlogCta() {
  const path = useLocalePath()
  const { t } = useLanguage()

  return (
    <FadeIn className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent px-6 py-12 text-center backdrop-blur-md md:px-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {t("blogPage.ctaEyebrow")}
      </p>
      <h2
        className="mt-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl md:text-4xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {t("blogPage.ctaHeadline")}
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
        {t("blogPage.ctaSupport")}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild variant="cta" size="cta" className="group w-full sm:w-auto">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            {t("blogPage.ctaPrimary")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full rounded-full border-white/15 sm:w-auto">
          <a href={path("/services")}>{t("blogPage.ctaSecondary")}</a>
        </Button>
      </div>
    </FadeIn>
  )
}
