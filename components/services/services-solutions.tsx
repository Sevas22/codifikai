"use client"

import { ArrowUpRight, Bot, Cpu, Headphones, Network, Workflow } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { useLanguage } from "@/components/providers/language-provider"
import { WHATSAPP_URL } from "@/lib/contact"

const SOLUTION_KEYS = [
  { key: "svc.solutions.1", icon: Bot },
  { key: "svc.solutions.2", icon: Workflow },
  { key: "svc.solutions.3", icon: Network },
  { key: "svc.solutions.4", icon: Cpu },
  { key: "svc.solutions.5", icon: Headphones },
] as const

export function ServicesSolutions() {
  const { t } = useLanguage()

  return (
    <section className="border-t border-white/8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t("svc.solutions.eyebrow")}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("svc.solutions.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("svc.solutions.subtitle")}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTION_KEYS.map(({ key, icon: Icon }, index) => (
            <FadeIn key={key} delay={index * 0.06}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-black p-6 transition-all duration-300 hover:border-accent/30"
              >
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                <h3 className="mt-5 text-lg font-semibold text-foreground">{t(`${key}.title`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}.desc`)}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  {t("svc.solutions.cta")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center">
          <a
            href="#sistema-crecimiento"
            className="text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            {t("svc.solutions.platformLink")}
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
