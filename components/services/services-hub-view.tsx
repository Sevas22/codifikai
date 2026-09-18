"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

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
import { useLocalePath } from "@/hooks/use-locale-path"
import { WHATSAPP_URL } from "@/lib/contact"
import { SERVICE_TIERS, getServicesByTier, type Service, type ServiceTier } from "@/lib/services"
import { isLogoPosterPath, successCases } from "@/lib/success-cases"
import { cn } from "@/lib/utils"

const LABELS = {
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbServices: "Servicios",
    kicker: "Servicios de inteligencia artificial y desarrollo a la medida",
    headline: "La IA en el centro. Todo lo demás, a su servicio.",
    highlight: ["centro."],
    lead: "Somos una agencia de inteligencia artificial. Construimos los agentes y automatizaciones que operan tu negocio, el software a la medida sobre el que corren y los servicios tecnológicos que los hacen crecer.",
    ctaHero: "Escríbenos por WhatsApp",
    seeService: "Ver el servicio",
    casesLabel: "El trabajo",
    casesTitle: "Sistemas que ya están en vivo.",
    casesLead:
      "Marketplaces, telemedicina, logística y comercio exterior. Cada uno con su sitio público, abierto a inspección.",
    liveSite: "Sitio en vivo",
    ctaTitle: "¿Por dónde empezamos?",
    ctaLead:
      "Cuéntanos qué proceso le consume más horas a tu equipo y te decimos, sin rodeos, si la inteligencia artificial puede hacerse cargo.",
    cta: "Escríbenos por WhatsApp",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    kicker: "Artificial intelligence and custom development services",
    headline: "AI at the centre. Everything else in its service.",
    highlight: ["centre."],
    lead: "We are an artificial intelligence agency. We build the AI agents and automations that run your business, the custom software they run on, and the technology services that help them grow.",
    ctaHero: "Message us on WhatsApp",
    seeService: "See the service",
    casesLabel: "The work",
    casesTitle: "Systems already live.",
    casesLead:
      "Marketplaces, telehealth, logistics and cross-border trade, each with a public site that is open to inspection.",
    liveSite: "Live site",
    ctaTitle: "Where do we start?",
    ctaLead:
      "Tell us which process eats the most hours on your team and we'll tell you straight whether artificial intelligence can take it over.",
    cta: "Message us on WhatsApp",
  },
} as const

/** Tarjeta de servicio. La del núcleo de IA es más grande y va en oscuro. */
function ServiceCard({
  service,
  featured,
  language,
  href,
  seeLabel,
}: {
  service: Service
  featured: boolean
  language: "es" | "en"
  href: string
  seeLabel: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "ed-card ed-card-lift group flex h-full flex-col p-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent",
        featured && "sm:p-10"
      )}
    >
      <span className="ed-display text-[2.5rem] leading-none text-ed-accent">
        {String(service.order).padStart(2, "0")}
      </span>
      <h3
        className={cn(
          "mt-6 font-semibold tracking-tight text-ed-ink",
          featured ? "text-[1.625rem] sm:text-[2rem]" : "text-[1.1875rem]"
        )}
      >
        {service.title[language]}
      </h3>
      <p
        className={cn(
          "mt-3 leading-relaxed text-ed-ink-soft",
          featured ? "max-w-[56ch] text-base sm:text-[1.0625rem]" : "text-[0.9375rem]"
        )}
      >
        {service.body[language]}
      </p>

      {/* En el núcleo se adelanta qué incluye: es el servicio que queremos que se
          entienda sin tener que abrirlo. */}
      {featured ? (
        <ul className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {service.includes[language].slice(0, 4).map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.875rem] text-ed-ink-soft">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ed-punch" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.875rem] font-semibold text-ed-ink transition-colors group-hover:text-ed-punch">
        {seeLabel}
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </span>
    </Link>
  )
}

/** Tono de cada nivel: el núcleo en oscuro para que se lea como protagonista. */
const TIER_TONE: Record<ServiceTier, { tone: "light" | "dark"; className: string }> = {
  ai: { tone: "dark", className: "" },
  build: { tone: "light", className: "ed-columns" },
  tech: { tone: "light", className: "bg-ed-canvas-sunken" },
}

export function ServicesHubView() {
  const { language } = useLanguage()
  const path = useLocalePath()
  const labels = LABELS[language] ?? LABELS.es
  const tiers = getServicesByTier()

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
              <li className="text-ed-ink">{labels.breadcrumbServices}</li>
            </ol>
          </nav>

          <div className="mt-10 max-w-[56rem]">
            {/* La identidad va dentro del h1, como en el resto del sitio. */}
            <h1 className="text-ed-ink">
              <span className="ed-label inline-flex items-center gap-3 rounded-full border border-ed-rule bg-ed-canvas-raised/80 px-4 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-ed-punch" aria-hidden />
                {labels.kicker}
              </span>
              <span className="ed-display mt-8 block text-[clamp(2.5rem,6.5vw,5.25rem)]">
                <WordReveal text={labels.headline} accentWords={[...labels.highlight]} />
              </span>
            </h1>

            <Reveal delay={0.15} y={18}>
              <p className="mt-8 max-w-[56ch] text-pretty text-base leading-relaxed text-ed-ink-soft sm:text-lg">
                {labels.lead}
              </p>
            </Reveal>

            <Reveal delay={0.25} y={18}>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-punch-btn group mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight"
              >
                {labels.ctaHero}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>

          {/* Índice de los tres niveles: la jerarquía se ve antes de bajar. */}
          <Reveal delay={0.35} y={18}>
            <ol className="mt-16 grid gap-3 sm:grid-cols-3">
              {tiers.map(({ tier }, i) => (
                <li key={tier}>
                  <a
                    href={`#${tier}`}
                    className={cn(
                      "ed-card group flex h-full flex-col p-5 transition-colors",
                      tier === "ai" && "border-ed-accent"
                    )}
                  >
                    <span className="ed-label text-ed-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-3 text-[0.9375rem] font-semibold tracking-tight text-ed-ink">
                      {SERVICE_TIERS[tier].label[language]}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- Niveles */}
      {tiers.map(({ tier, services }, i) => {
        const tone = TIER_TONE[tier]
        const featured = tier === "ai"
        return (
          <EdSection key={tier} id={tier} tone={tone.tone} className={tone.className}>
            <div className="max-w-[48rem]">
              {/* h2 real: sin él, las tarjetas (h3) colgaban directo del h1. */}
              <Reveal y={14}>
                <h2>
                  <EdLabel index={i + 1}>{SERVICE_TIERS[tier].label[language]}</EdLabel>
                </h2>
              </Reveal>
              <Reveal delay={0.08} y={16}>
                <p
                  className={cn(
                    "mt-7 text-pretty leading-relaxed",
                    featured
                      ? "ed-display text-[clamp(1.75rem,3.6vw,2.75rem)] text-ed-ink"
                      : "text-[1.0625rem] text-ed-ink-soft sm:text-lg"
                  )}
                >
                  {SERVICE_TIERS[tier].lead[language]}
                </p>
              </Reveal>
            </div>

            <div
              className={cn(
                "mt-12 grid gap-5",
                services.length === 1 ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {services.map((service, j) => (
                <Reveal key={service.id} delay={j * 0.08} y={22}>
                  <ServiceCard
                    service={service}
                    featured={featured}
                    language={language}
                    href={path(`/services/${service.slug}`)}
                    seeLabel={labels.seeService}
                  />
                </Reveal>
              ))}
            </div>
          </EdSection>
        )
      })}

      {/* ---------------------------------------------------------------- Casos */}
      {/* El ancla #cases se conserva: la portada enlaza aquí con "Ver todos los casos". */}
      <EdSection id="cases" className="ed-columns">
        <SectionHeading
          index={4}
          label={labels.casesLabel}
          title={labels.casesTitle}
          lead={labels.casesLead}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {successCases.map((item, i) => {
            const isLogo = isLogoPosterPath(item.image)
            return (
              <Reveal key={item.id} delay={(i % 3) * 0.08} y={20}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ed-card ed-card-lift group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ed-canvas-sunken">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={cn(
                        "transition-[transform,filter] duration-[900ms] ease-out group-hover:scale-[1.04]",
                        isLogo ? "bg-white object-contain p-8" : "object-cover grayscale group-hover:grayscale-0"
                      )}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="ed-label text-ed-accent">{item.category}</span>
                    <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-tight text-ed-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[0.875rem] leading-relaxed text-ed-ink-soft">
                      {language === "es" ? item.descriptionEs : item.description}
                    </p>
                    <span className="ed-label mt-auto inline-flex items-center gap-2 pt-5 transition-colors group-hover:text-ed-punch">
                      {labels.liveSite}
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </span>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </EdSection>

      {/* --------------------------------------------------------------- Cierre */}
      <EdSection id="contact" tone="dark" className="ed-grain relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_18%,transparent),transparent_65%)] blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className="ed-display text-[clamp(2rem,5vw,3.75rem)] text-ed-ink">
            <WordReveal text={labels.ctaTitle} />
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
