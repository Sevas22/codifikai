"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SitePreviewIframe } from "@/components/site-preview-iframe"
import { useLanguage } from "@/components/providers/language-provider"
import { type SuccessCase, isLogoPosterPath } from "@/lib/success-cases"
import { cn } from "@/lib/utils"

type CaseStudyCardProps = {
  caseStudy: SuccessCase
  featured?: boolean
  index?: number
}

export function CaseStudyCard({ caseStudy, featured = false, index = 0 }: CaseStudyCardProps) {
  const { language, t } = useLanguage()
  const isEs = language === "es"

  const description = isEs ? caseStudy.descriptionEs : caseStudy.description
  const problem = isEs ? caseStudy.problemEs : caseStudy.problemEn

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black transition-all duration-500",
        "hover:border-accent/35 hover:shadow-[0_24px_64px_-24px_rgba(34,211,238,0.35)] hover:-translate-y-1",
        featured ? "lg:col-span-2" : ""
      )}
      style={{ transitionDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-white/10",
          featured ? "aspect-[21/10] min-h-[280px]" : "aspect-[16/10] min-h-[200px]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0",
            isLogoPosterPath(caseStudy.image) ? "bg-white" : "bg-secondary/40"
          )}
        >
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className={cn(
              "transition-transform duration-700 group-hover:scale-[1.03]",
              isLogoPosterPath(caseStudy.image) ? "object-contain p-6" : "object-cover"
            )}
            sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
          />
          {caseStudy.embedSitePreview !== false && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-90">
              <SitePreviewIframe url={caseStudy.url} />
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/25 to-transparent" />
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-md">
            {caseStudy.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-4">
          <h3
            className="text-xl font-semibold tracking-tight text-foreground md:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {caseStudy.title}
          </h3>
          <p className="mt-1 text-sm text-accent/90">{caseStudy.subtitle}</p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-4 rounded-xl border border-white/10 bg-black px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
            {t("casesPage.problemLabel")}
          </p>
          <p className="mt-1 text-sm text-foreground/90">{problem}</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {caseStudy.metrics.map((metric) => (
            <div
              key={`${caseStudy.id}-${metric.value}-${metric.labelEn}`}
              className="rounded-lg border border-white/10 bg-black px-2 py-2.5 text-center"
            >
              <div className="flex items-center justify-center gap-1 text-accent">
                <TrendingUp className="h-3 w-3 opacity-70" />
                <span className="text-sm font-semibold tabular-nums">{metric.value}</span>
              </div>
              <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                {isEs ? metric.labelEs : metric.labelEn}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-black px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/8 pt-5">
          <Button asChild variant="cta" size="sm" className="group/btn rounded-full">
            <a href={caseStudy.url} target="_blank" rel="noopener noreferrer">
              {t("casesPage.explorePlatform")}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </Button>
          <Link
            href={caseStudy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            {t("casesPage.livePreview")}
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
