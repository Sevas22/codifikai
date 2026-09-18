"use client"

import Link from "next/link"
import { ArrowUpRight, Check, Plus } from "lucide-react"

import {
  EdLabel,
  EdSection,
  Reveal,
  SectionHeading,
  WordReveal,
} from "@/components/home/ed-primitives"
import { ParticleField } from "@/components/home/particle-field"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/components/providers/language-provider"
import { WHATSAPP_URL } from "@/lib/contact"
import {
  SERVICE_PAGE_LABELS,
  SERVICE_TIERS,
  getRelatedServices,
  type Service,
} from "@/lib/services"
import { useLocalePath } from "@/hooks/use-locale-path"

/** Lista con viñeta de marca, reutilizada por los tres bloques de detalle. */
function TickList({ items, tone = "check" }: { items: string[]; tone?: "check" | "dot" }) {
  return (
    <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={i * 0.05} y={14} className="flex gap-3">
          {tone === "check" ? (
            <Check className="mt-1 h-4 w-4 shrink-0 text-ed-punch" aria-hidden />
          ) : (
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ed-accent"
              aria-hidden
            />
          )}
          <span className="text-[0.9375rem] leading-relaxed text-ed-ink-soft">{item}</span>
        </Reveal>
      ))}
    </ul>
  )
}

export function ServiceDetailView({ service }: { service: Service }) {
  const path = useLocalePath()
  const { language } = useLanguage()
  const labels = SERVICE_PAGE_LABELS
  const related = getRelatedServices(service.slug)

  return (
    <div className="ed-light-scope relative bg-ed-canvas text-ed-ink">
      <Navigation />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="ed-grain relative isolate overflow-hidden pt-36 pb-[var(--ed-section-y)] sm:pt-40">
        <div className="ed-columns pointer-events-none absolute inset-0 -z-20" aria-hidden />
        <div
          className="pointer-events-none absolute -z-20 left-[-12%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-violet)_20%,transparent),transparent_68%)] blur-3xl"
          aria-hidden
        />
        <ParticleField
          className="pointer-events-none absolute inset-0 -z-10"
          density={3}
        />

        <div className="relative mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)]">
          {/* Migas: orientan al visitante y dan a Google la jerarquía del sitio. */}
          <nav aria-label="breadcrumb">
            <ol className="ed-label flex flex-wrap items-center gap-2">
              <li>
                <Link href={path("/")} className="transition-colors hover:text-ed-accent">
                  {labels.breadcrumbHome[language]}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={path("/services")} className="transition-colors hover:text-ed-accent">
                  {labels.breadcrumbServices[language]}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ed-ink">{service.title[language]}</li>
            </ol>
          </nav>

          <div className="mt-10 max-w-[52rem]">
            {/* Arriba, el nivel: deja claro en cada servicio si es el núcleo de IA
                o un servicio que lo rodea. */}
            <EdLabel index={service.order}>{SERVICE_TIERS[service.tier].label[language]}</EdLabel>

            {/* El h1 abre con el nombre del servicio, que es la palabra clave de la
                página; el titular creativo va después, igual que antes. */}
            <h1 className="mt-7 text-ed-ink">
              <span className="ed-label block text-ed-accent">{service.title[language]}</span>
              <span className="ed-display mt-4 block text-[clamp(2.25rem,6vw,4.75rem)]">
              <WordReveal
                text={service.headline[language]}
                accentWords={service.headlineHighlight[language]}
              />
              </span>
            </h1>

            <Reveal delay={0.15} y={18}>
              <p className="mt-8 max-w-[52ch] text-pretty text-base leading-relaxed text-ed-ink-soft sm:text-lg">
                {service.lead[language]}
              </p>
            </Reveal>

            <Reveal delay={0.25} y={18}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ed-punch-btn group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight"
                >
                  {labels.ctaPrimary[language]}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  href={path("/services")}
                  className="inline-flex items-center gap-2 rounded-full border border-ed-rule-strong bg-ed-canvas-raised px-7 py-4 text-[0.9375rem] font-semibold tracking-tight text-ed-ink transition-colors duration-300 hover:border-ed-accent hover:text-ed-accent"
                >
                  {labels.ctaSecondary[language]}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Incluye */}
      <EdSection id="includes" tone="dark">
        <SectionHeading
          index={1}
          label={labels.includes[language]}
          title={service.title[language]}
        />
        <TickList items={service.includes[language]} />
      </EdSection>

      {/* ---------------------------------------------------------- Para quién */}
      <EdSection id="for-who" className="bg-ed-canvas-sunken">
        <SectionHeading index={2} label={labels.forWho[language]} title={labels.forWho[language]} />
        <TickList items={service.forWho[language]} tone="dot" />
      </EdSection>

      {/* ------------------------------------------------------- Entregables */}
      <EdSection id="deliverables" className="ed-columns">
        <SectionHeading
          index={3}
          label={labels.deliverables[language]}
          title={labels.deliverables[language]}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.deliverables[language].map((item, i) => (
            <Reveal
              key={item}
              delay={i * 0.08}
              y={20}
              className="ed-card ed-card-lift group p-7"
            >
              <span className="ed-display text-[2.25rem] leading-none text-ed-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ed-ink">{item}</p>
            </Reveal>
          ))}
        </div>
      </EdSection>

      {/* --------------------------------------------------------------- FAQ */}
      <EdSection id="faq" className="bg-ed-canvas-sunken">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
          <SectionHeading
            index={4}
            label={labels.faq[language]}
            title={labels.faq[language]}
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <div className="border-t border-ed-rule">
            {service.faqs.map((item, i) => (
              <Reveal key={item.q.en} delay={i * 0.06} y={16}>
                <details className="group border-b border-ed-rule">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start gap-5">
                      <span className="ed-label shrink-0 pt-1 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.0625rem] font-medium tracking-tight text-ed-ink transition-colors group-hover:text-ed-accent sm:text-[1.125rem]">
                        {item.q[language]}
                      </span>
                    </span>
                    <Plus
                      className="mt-1 h-4 w-4 shrink-0 text-ed-ink-faint transition-transform duration-500 ease-out group-open:rotate-45 group-hover:text-ed-accent"
                      aria-hidden
                    />
                  </summary>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="max-w-[62ch] pb-8 text-[0.9375rem] leading-relaxed text-ed-ink-soft sm:pl-[3.25rem]">
                        {item.a[language]}
                      </p>
                    </div>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </EdSection>

      {/* -------------------------------------------------- Otros servicios */}
      <EdSection id="related">
        <SectionHeading index={5} label={labels.related[language]} title={labels.related[language]} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.07} y={20}>
              <Link
                href={path(`/services/${item.slug}`)}
                className="ed-card ed-card-lift group flex h-full flex-col p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
              >
                <span className="ed-label text-ed-accent tabular-nums">
                  {String(item.order).padStart(2, "0")}
                </span>
                <span className="mt-5 text-[1.0625rem] font-semibold tracking-tight text-ed-ink">
                  {item.title[language]}
                </span>
                <span className="mt-3 text-[0.8125rem] leading-relaxed text-ed-ink-soft">
                  {item.short[language]}
                </span>
                <ArrowUpRight
                  className="mt-auto h-4 w-4 translate-y-2 text-ed-ink-faint opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-ed-punch group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </EdSection>

      {/* --------------------------------------------------------- Cierre */}
      <EdSection id="contact" tone="dark" className="ed-grain relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_18%,transparent),transparent_65%)] blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className="ed-display text-[clamp(2rem,5vw,3.75rem)] text-ed-ink">
            <WordReveal text={labels.ctaTitle[language]} />
          </h2>
          <Reveal delay={0.15} y={18}>
            <p className="mx-auto mt-6 max-w-[44ch] text-pretty text-base leading-relaxed text-ed-ink-soft">
              {labels.ctaLead[language]}
            </p>
          </Reveal>
          <Reveal delay={0.25} y={18}>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-punch-btn group mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight"
            >
              {labels.ctaPrimary[language]}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </EdSection>
    </div>
  )
}
