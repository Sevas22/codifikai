"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { useLanguage } from "@/components/providers/language-provider"
import { successCases, isLogoPosterPath, type SuccessCase } from "@/lib/success-cases"

const SERVICE_CASE_IDS = ["venextrading", "th-global", "jin-global"] as const

function getCase(id: string): SuccessCase | undefined {
  return successCases.find((c) => c.id === id)
}

export function ServicesCasesCompact() {
  const { t, language } = useLanguage()
  const isEs = language === "es"
  const cases = SERVICE_CASE_IDS.map(getCase).filter(Boolean) as SuccessCase[]

  return (
    <section className="border-t border-white/8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("svc.cases.eyebrow")}
            </p>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("svc.cases.title")}
            </h2>
          </div>
          <Link
            href="/casos-de-exito"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80"
          >
            {t("svc.cases.viewAll")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cases.map((item, index) => {
            const metric = item.metrics[0]
            const description = isEs ? item.descriptionEs : item.description

            return (
              <FadeIn key={item.id} delay={index * 0.06}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black transition-colors hover:border-accent/30"
                >
                  <div className="relative aspect-[16/10] border-b border-white/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={
                        isLogoPosterPath(item.image)
                          ? "object-contain p-4"
                          : "object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      }
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-accent/90">
                      {item.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
                    {metric ? (
                      <p className="mt-4 text-sm font-medium text-foreground">
                        {metric.value}{" "}
                        <span className="font-normal text-muted-foreground">
                          {isEs ? metric.labelEs : metric.labelEn}
                        </span>
                      </p>
                    ) : null}
                  </div>
                </a>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
