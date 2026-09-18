"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { useLanguage } from "@/components/providers/language-provider"
import { WHATSAPP_URL } from "@/lib/contact"
import { useLocalePath } from "@/hooks/use-locale-path"

export function ServicesCta() {
  const path = useLocalePath()
  const { t } = useLanguage()

  return (
    <section className="pb-24 pt-8 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl border border-white/10 bg-black px-8 py-14 text-center md:px-16 md:py-16">
            <h2
              className="text-2xl font-bold tracking-tight text-balance md:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("svc.cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground md:text-base">
              {t("svc.cta.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="cta" size="cta-lg" className="group w-full sm:w-auto">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  {t("svc.cta.primary")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-white/15 bg-transparent sm:w-auto"
              >
                <Link href={path("/")}>{t("svc.cta.secondary")}</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
