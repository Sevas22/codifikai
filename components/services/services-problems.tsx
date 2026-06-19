"use client"

import { Boxes, Layers, Link2Off, Timer, TrendingDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { useLanguage } from "@/components/providers/language-provider"

const PROBLEM_KEYS = [
  { key: "svc.problems.1", icon: Layers },
  { key: "svc.problems.2", icon: Timer },
  { key: "svc.problems.3", icon: TrendingDown },
  { key: "svc.problems.4", icon: Link2Off },
  { key: "svc.problems.5", icon: Boxes },
] as const

export function ServicesProblems() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t("svc.problems.eyebrow")}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("svc.problems.title")}
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEM_KEYS.map(({ key, icon: Icon }, index) => (
            <FadeIn key={key} delay={index * 0.05}>
              <ProblemCard icon={Icon} title={t(`${key}.title`)} desc={t(`${key}.desc`)} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProblemCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon
  title: string
  desc: string
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/40 p-6 transition-colors duration-300 hover:border-white/14">
      <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  )
}
