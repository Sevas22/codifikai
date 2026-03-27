"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { useLanguage } from "@/components/providers/language-provider"
import { CONTACT_EMAIL, MAILTO_CONTACT } from "@/lib/contact"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"

export type LegalSection = { titleKey: string; bodyKey: string }

type LegalDocumentPageProps = {
  titleKey: string
  updatedKey: string
  sections: LegalSection[]
}

export function LegalDocumentPage({ titleKey, updatedKey, sections }: LegalDocumentPageProps) {
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen bg-transparent text-foreground">
      <Navigation />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-40 left-1/4 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute right-2 top-28 hidden h-40 w-44 opacity-30 sm:block md:right-8">
          <Tech3DAccent variant="network" size="sm" />
        </div>
      </div>

      <article className="relative mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("legal.backToHome")}
        </Link>

        <header className="mb-12 border-b border-border/60 pb-8">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
            Codifikai · legal
          </p>
          <h1
            className="text-3xl font-bold tracking-tight heading-brand sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t(titleKey)}
          </h1>
          <p className="mt-4 font-mono text-xs text-muted-foreground">{t(updatedKey)}</p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.titleKey} className="scroll-mt-28">
              <h2
                className="mb-3 text-lg font-semibold heading-brand-sm sm:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t(section.titleKey)}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t(section.bodyKey)
                  .split("\n\n")
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-border/50 bg-secondary/20 p-6 font-mono text-xs text-muted-foreground">
          <p>
            <span className="text-accent">//</span> {t("legal.contactHint")}{" "}
            <a href={MAILTO_CONTACT} className="text-accent underline-offset-2 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </article>

      <Footer />
      <FloatingContact />
    </main>
  )
}
