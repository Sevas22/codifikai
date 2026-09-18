"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { DrawnRule, EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import type { HomeCopy, HomeLang } from "@/lib/home-copy"
import { isLogoPosterPath, successCases, type SuccessCase } from "@/lib/success-cases"
import { cn } from "@/lib/utils"

function CaseCard({
  item,
  language,
  copy,
  size,
  priority,
}: {
  item: SuccessCase
  language: HomeLang
  copy: HomeCopy
  size: "lead" | "row"
  priority?: boolean
}) {
  const description = language === "es" ? item.descriptionEs : item.description
  const isLead = size === "lead"
  // Los logos de partners vienen sobre fondo blanco: encajarlos en vez de
  // recortarlos evita cortar la marca del cliente.
  const isLogo = isLogoPosterPath(item.image)

  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
    >
      <figure className="relative overflow-hidden bg-ed-canvas-raised">
        <div className={cn("relative w-full", isLead ? "aspect-[16/11]" : "aspect-[16/10]")}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={priority}
            sizes={isLead ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className={cn(
              "transition-[transform,filter,opacity] duration-[900ms] ease-out",
              isLogo ? "bg-white object-contain p-8" : "object-cover",
              // Desaturado en reposo, a color al acercarse: el trabajo se
              // "enciende" con la atención del visitante.
              "opacity-80 grayscale group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
            )}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ed-canvas/85 via-ed-canvas/10 to-transparent"
            aria-hidden
          />
          <span className="ed-label absolute left-5 top-5 rounded-full border border-ed-rule-strong bg-ed-canvas/70 px-3 py-1.5 text-ed-ink-soft backdrop-blur-sm">
            {item.category}
          </span>
          <span
            className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-ed-rule-strong bg-ed-canvas/70 text-ed-ink backdrop-blur-sm transition-all duration-500 group-hover:border-ed-accent group-hover:bg-ed-accent group-hover:text-ed-canvas"
            aria-hidden
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </figure>

      <div className="pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={cn(
              "ed-display text-ed-ink",
              isLead ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[1.5rem]"
            )}
          >
            {item.title}
          </h3>
          <span className="ed-label shrink-0 text-ed-ink-faint/70 transition-colors group-hover:text-ed-accent">
            {copy.work.liveSite}
          </span>
        </div>
        <p className="ed-label mt-2 text-ed-ink-faint normal-case tracking-[0.14em]">
          {item.subtitle}
        </p>
        <p
          className={cn(
            "mt-4 text-pretty text-[0.875rem] leading-relaxed text-ed-ink-soft",
            isLead ? "max-w-[52ch]" : "max-w-[42ch] line-clamp-3"
          )}
        >
          {description}
        </p>

        {isLead ? (
          <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-t border-ed-rule pt-6">
            {item.metrics.map((metric) => (
              <div key={metric.labelEn}>
                <dd className="ed-display text-[1.75rem] leading-none text-ed-ink">
                  {metric.value}
                </dd>
                <dt className="ed-label mt-2 text-ed-ink-faint">
                  {language === "es" ? metric.labelEs : metric.labelEn}
                </dt>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </Link>
  )
}

export function WorkSection({ copy, language }: { copy: HomeCopy; language: HomeLang }) {
  const featured = successCases.filter((c) => c.featured).slice(0, 2)
  const featuredIds = new Set(featured.map((c) => c.id))
  const rest = successCases.filter((c) => !featuredIds.has(c.id)).slice(0, 6)

  return (
    <EdSection id="work" tone="dark">
      <SectionHeading
        index={4}
        label={copy.work.label}
        title={copy.work.title}
        lead={copy.work.lead}
        align="wide"
      />

      <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-12">
        {featured.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.12} y={30}>
            <CaseCard item={item} language={language} copy={copy} size="lead" priority={i === 0} />
          </Reveal>
        ))}
      </div>

      <DrawnRule className="my-16" />

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 0.1} y={26}>
            <CaseCard item={item} language={language} copy={copy} size="row" />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-16">
        <Link
          href="/services#cases"
          className="ed-link inline-flex items-center gap-2 text-[0.9375rem] font-medium tracking-tight text-ed-ink transition-colors hover:text-ed-accent"
        >
          {copy.work.allCases}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </Reveal>
    </EdSection>
  )
}
