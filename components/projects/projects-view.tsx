"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  DrawnRule,
  EdSection,
  KineticTitle,
  Reveal,
} from "@/components/home/ed-primitives"
import { ParticleField } from "@/components/home/particle-field"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/components/providers/language-provider"
import { CaseCard } from "@/components/projects/case-card"
import { useLocalePath } from "@/hooks/use-locale-path"
import { WHATSAPP_URL } from "@/lib/contact"
import { homeCopy } from "@/lib/home-copy"
import { successCases } from "@/lib/success-cases"

const LABELS = {
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbProjects: "Proyectos",
    kicker: "Proyectos en producción",
    headlineLines: [
      { text: "Sistemas que", tone: "solid" },
      { text: "ya están", tone: "outline-accent" },
      { text: "en vivo.", tone: "gradient" },
    ],
    listTitle: "Todos los proyectos",
    ctaTitleLines: [
      { text: "¿Tienes un", tone: "solid" },
      { text: "proyecto en mente?", tone: "gradient" },
    ],
    ctaLead:
      "Cuéntanos qué quieres construir o automatizar y te decimos, sin rodeos, cómo lo abordaríamos.",
    cta: "Escríbenos por WhatsApp",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbProjects: "Projects",
    kicker: "Projects in production",
    headlineLines: [
      { text: "Systems that", tone: "solid" },
      { text: "are already", tone: "outline-accent" },
      { text: "live.", tone: "gradient" },
    ],
    listTitle: "All projects",
    ctaTitleLines: [
      { text: "Got a", tone: "solid" },
      { text: "project in mind?", tone: "gradient" },
    ],
    ctaLead:
      "Tell us what you want to build or automate and we'll tell you straight how we'd approach it.",
    cta: "Message us on WhatsApp",
  },
} as const

export function ProjectsView() {
  const { language } = useLanguage()
  const path = useLocalePath()
  const labels = LABELS[language] ?? LABELS.es
  const copy = homeCopy[language]

  // Mismo criterio que tenía la portada: dos protagonistas con métricas y el
  // resto en filas compactas; aquí sin tope, para que estén todos.
  const featured = successCases.filter((item) => item.featured).slice(0, 2)
  const featuredIds = new Set(featured.map((item) => item.id))
  const rest = successCases.filter((item) => !featuredIds.has(item.id))

  return (
    <div className="ed-light-scope relative bg-ed-canvas text-ed-ink">
      <Navigation />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="ed-grain relative isolate overflow-hidden pt-36 pb-[var(--ed-section-y)] sm:pt-40">
        <div className="ed-columns pointer-events-none absolute inset-0 -z-20" aria-hidden />
        <div
          className="pointer-events-none absolute -z-20 left-[-10%] top-[-12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-violet)_20%,transparent),transparent_68%)] blur-3xl"
          aria-hidden
        />
        <ParticleField className="pointer-events-none absolute inset-0 -z-10" density={3.5} />

        <div className="relative mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)]">
          <nav aria-label="breadcrumb">
            <ol className="ed-label flex flex-wrap items-center gap-2">
              <li>
                <Link href={path("/")} className="transition-colors hover:text-ed-accent">
                  {labels.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ed-ink">{labels.breadcrumbProjects}</li>
            </ol>
          </nav>

          <div className="mt-10 max-w-[56rem]">
            <h1 className="text-ed-ink">
              <span className="ed-label inline-flex items-center gap-3 rounded-full border border-ed-rule bg-ed-canvas-raised/80 px-4 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-ed-punch" aria-hidden />
                {labels.kicker}
              </span>
              <KineticTitle
                lines={labels.headlineLines}
                className="ed-display mt-8 text-[clamp(2.5rem,6.4vw,5.5rem)]"
              />
            </h1>

            <Reveal delay={0.15} y={18}>
              <p className="mt-8 max-w-[56ch] text-pretty text-base leading-relaxed text-ed-ink-soft sm:text-lg">
                {copy.work.lead}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Proyectos */}
      <EdSection id="projects" tone="dark">
        <h2 className="sr-only">{labels.listTitle}</h2>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-12">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.12} y={30}>
              <CaseCard
                item={item}
                language={language}
                copy={copy}
                size="lead"
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>

        {rest.length > 0 ? (
          <>
            <DrawnRule className="my-16" />

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 0.1} y={26}>
                  <CaseCard item={item} language={language} copy={copy} size="row" />
                </Reveal>
              ))}
            </div>
          </>
        ) : null}
      </EdSection>

      {/* --------------------------------------------------------------- Cierre */}
      <EdSection id="contact" className="ed-grain relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_18%,transparent),transparent_65%)] blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className="text-ed-ink">
            <KineticTitle
              lines={labels.ctaTitleLines}
              className="ed-display text-[clamp(2.5rem,6.5vw,5.25rem)]"
            />
          </h2>
          <Reveal delay={0.15} y={18}>
            <p className="mx-auto mt-6 max-w-[48ch] text-pretty text-base leading-relaxed text-ed-ink-soft">
              {labels.ctaLead}
            </p>
          </Reveal>
          <Reveal delay={0.25} y={18}>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-punch-btn group mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight"
            >
              {labels.cta}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </EdSection>
    </div>
  )
}
