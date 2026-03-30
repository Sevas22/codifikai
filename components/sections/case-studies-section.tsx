"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { SitePreviewIframe } from "@/components/site-preview-iframe"
import { successCases, type SuccessCase, isLogoPosterPath } from "@/lib/success-cases"
import { cn } from "@/lib/utils"

/** Solo 4 proyectos en la home; el resto sigue en /casos-de-exito */
const HOME_CASE_IDS = ["jibal-americas", "jin-global", "contraste", "mercaderus"] as const

const homeCases: SuccessCase[] = HOME_CASE_IDS.map((id) => {
  const c = successCases.find((x) => x.id === id)
  if (!c) throw new Error(`successCases missing id: ${id}`)
  return c
})

export function CaseStudiesSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute right-0 top-20 z-0 hidden w-48 lg:block lg:w-56">
        <Tech3DAccent variant="rings" size="md" className="opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`mb-10 flex flex-col items-center gap-6 text-center md:mb-12 md:flex-row md:items-end md:justify-between md:text-left transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mx-auto w-full max-w-xl md:mx-0 md:max-w-none">
            <SectionEyebrow label={t("cases.label")} />
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold heading-brand mb-3 md:mb-4 text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("cases.title")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl text-pretty">
              {t("cases.subtitle")}
            </p>
          </div>
          <Link
            href="/casos-de-exito"
            className="group inline-flex shrink-0 items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
          >
            {t("cases.viewAll")}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Cases grid - mismo estilo que casos de Ã©xito */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {homeCases.map((item, index) => (
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
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden",
                  isLogoPosterPath(item.image) ? "bg-white" : "bg-secondary/30"
                )}
              >
                <Image
                  src={item.image}
                  alt={`Preview de ${item.title}`}
                  fill
                  className={cn(
                    "transition-transform duration-700 group-hover:scale-105",
                    isLogoPosterPath(item.image)
                      ? "object-contain p-6 md:p-8"
                      : "object-cover"
                  )}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                {item.embedSitePreview !== false && <SitePreviewIframe url={item.url} />}
                <div className="absolute top-4 right-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <IconSquircle icon={ExternalLink} size="sm" />
                </div>
              </div>

              <div className="border-t border-border/50 bg-card p-5 text-center sm:text-left md:p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  {item.category}
                </p>
                <div className="mb-3 flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <h2
                    className="text-xl md:text-2xl font-bold heading-brand-sm"
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

        {/* CTA - Ver mÃ¡s casos */}
        <div
          className={`mt-12 md:mt-16 text-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/casos-de-exito"
            className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-medium text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            {t("cases.viewAll")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
