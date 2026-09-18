"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"

import {
  EdSection,
  Reveal,
  SectionHeading,
  WordReveal,
} from "@/components/home/ed-primitives"
import { ParticleField } from "@/components/home/particle-field"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/components/providers/language-provider"
import { ABOUT_TEAM, aboutCopy } from "@/lib/about-copy"
import { WHATSAPP_URL } from "@/lib/contact"
import { useLocalePath } from "@/hooks/use-locale-path"

export function AboutView() {
  const path = useLocalePath()
  const { language } = useLanguage()
  const copy = aboutCopy

  return (
    <div className="ed-light-scope relative bg-ed-canvas text-ed-ink">
      <Navigation />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="ed-grain relative isolate overflow-hidden pt-36 pb-[var(--ed-section-y)] sm:pt-40">
        <div className="ed-columns pointer-events-none absolute inset-0 -z-20" aria-hidden />
        <div
          className="pointer-events-none absolute -z-20 right-[-10%] top-[-8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_18%,transparent),transparent_68%)] blur-3xl"
          aria-hidden
        />
        <ParticleField className="pointer-events-none absolute inset-0 -z-10" density={3.5} />

        <div className="relative mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)]">
          <nav aria-label="breadcrumb">
            <ol className="ed-label flex flex-wrap items-center gap-2">
              <li>
                <Link href={path("/")} className="transition-colors hover:text-ed-accent">
                  {copy.breadcrumbHome[language]}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ed-ink">{copy.breadcrumbAbout[language]}</li>
            </ol>
          </nav>

          <div className="mt-10 max-w-[54rem]">
            {/* La etiqueta de identidad vive dentro del h1: mismo aspecto, pero el
                encabezado principal ahora nombra lo que somos. */}
            <h1 className="text-ed-ink">
              <span className="ed-label inline-flex items-center gap-3 rounded-full border border-ed-rule bg-ed-canvas-raised/80 px-4 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-ed-punch" aria-hidden />
                {copy.hero.eyebrow[language]}
              </span>
              <span className="ed-display mt-8 block text-[clamp(2.5rem,6.5vw,5.25rem)]">
              <WordReveal
                text={copy.hero.headline[language]}
                accentWords={copy.hero.headlineHighlight[language]}
              />
              </span>
            </h1>

            <Reveal delay={0.15} y={18}>
              <p className="mt-8 max-w-[54ch] text-pretty text-base leading-relaxed text-ed-ink-soft sm:text-lg">
                {copy.hero.lead[language]}
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
                  {copy.hero.ctaPrimary[language]}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  href={path("/services")}
                  className="inline-flex items-center gap-2 rounded-full border border-ed-rule-strong bg-ed-canvas-raised px-7 py-4 text-[0.9375rem] font-semibold tracking-tight text-ed-ink transition-colors duration-300 hover:border-ed-accent hover:text-ed-accent"
                >
                  {copy.hero.ctaSecondary[language]}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Historia */}
      <EdSection id="history" tone="dark">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
          <SectionHeading
            index={1}
            label={copy.history.label[language]}
            title={copy.history.title[language]}
            highlight={copy.history.highlight[language]}
            className="lg:sticky lg:top-32 lg:self-start"
          />
          {/* Párrafos numerados: la historia se lee como una secuencia. */}
          <div className="space-y-10">
            {copy.history.paragraphs[language].map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={i * 0.1} y={20}>
                <div className="flex gap-6 border-b border-ed-rule pb-10 last:border-0 last:pb-0">
                  <span className="ed-label shrink-0 pt-1.5 text-ed-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-pretty text-[1.0625rem] leading-relaxed text-ed-ink-soft">
                    {paragraph}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </EdSection>

      {/* ------------------------------------------------------------- Visión */}
      <EdSection id="vision" className="bg-ed-canvas-sunken">
        <SectionHeading
          index={2}
          label={copy.vision.label[language]}
          title={copy.vision.title[language]}
          highlight={copy.vision.highlight[language]}
          lead={copy.vision.lead[language]}
          align="wide"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {copy.vision.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title.en}
              delay={i * 0.09}
              y={22}
              className="ed-card ed-card-lift group relative overflow-hidden p-8"
            >
              <span
                className="ed-display pointer-events-none absolute right-4 top-3 text-[4.5rem] leading-none text-ed-ink/[0.045] transition-colors duration-500 group-hover:text-ed-accent/10"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative text-[1.125rem] font-semibold tracking-tight text-ed-ink">
                {pillar.title[language]}
              </h3>
              <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-ed-ink-soft">
                {pillar.body[language]}
              </p>
            </Reveal>
          ))}
        </div>
      </EdSection>

      {/* ------------------------------------------------------------- Equipo */}
      <EdSection id="team" className="ed-columns">
        <SectionHeading
          index={3}
          label={copy.team.label[language]}
          title={copy.team.title[language]}
          highlight={copy.team.highlight[language]}
          lead={copy.team.lead[language]}
        />
        <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_TEAM.map((member, i) => (
            <Reveal
              as="li"
              key={member.name}
              id={member.anchor}
              delay={i * 0.08}
              y={24}
              className="ed-card ed-card-lift group overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectPosition: member.objectPosition }}
                  className="object-cover opacity-90 grayscale transition-[transform,filter,opacity] duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ed-ink">
                  {member.name}
                </h3>
                <p className="ed-label mt-2 normal-case tracking-[0.12em] text-ed-accent">
                  {member.role[language]}
                </p>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-ed-ink-soft">
                  {member.bio[language]}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </EdSection>

      {/* ------------------------------------------------------- Por qué nosotros */}
      <EdSection id="trust" tone="dark">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <SectionHeading
            index={4}
            label={copy.trust.label[language]}
            title={copy.trust.title[language]}
            highlight={copy.trust.highlight[language]}
            lead={copy.trust.lead[language]}
          />
          <ul className="space-y-5 lg:pt-4">
            {copy.trust.points[language].map((point, i) => (
              <Reveal
                as="li"
                key={point}
                delay={i * 0.07}
                y={16}
                className="flex gap-4 border-b border-ed-rule pb-5 last:border-0"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-ed-punch" aria-hidden />
                <span className="text-[1rem] leading-relaxed text-ed-ink-soft">{point}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </EdSection>

      {/* --------------------------------------------------------- Tecnología */}
      <EdSection id="technologies" className="bg-ed-canvas-sunken">
        <SectionHeading
          index={5}
          label={copy.tech.label[language]}
          title={copy.tech.title[language]}
          highlight={copy.tech.highlight[language]}
          align="wide"
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            {copy.tech.paragraphs[language].map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={i * 0.1} y={18}>
                <p className="text-pretty text-[1.0625rem] leading-relaxed text-ed-ink-soft">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
          <ul className="flex flex-wrap content-start gap-2.5">
            {copy.tech.chips.map((chip, i) => (
              <Reveal as="li" key={chip} delay={i * 0.04} y={12}>
                <span className="ed-card inline-flex items-center gap-2.5 px-5 py-3 text-[0.9375rem] font-medium tracking-tight text-ed-ink transition-colors duration-300 hover:border-ed-accent hover:text-ed-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-ed-punch" aria-hidden />
                  {chip}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </EdSection>

      {/* ------------------------------------------------------------- Cierre */}
      <EdSection id="contact" tone="dark" className="ed-grain relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_18%,transparent),transparent_65%)] blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-[48rem] text-center">
          <Reveal y={14}>
            <span className="ed-label inline-flex items-center gap-3 rounded-full border border-ed-rule px-4 py-2">
              {copy.closing.label[language]}
            </span>
          </Reveal>
          <h2 className="ed-display mt-8 text-[clamp(2.25rem,5.5vw,4.25rem)] text-ed-ink">
            <WordReveal
              text={copy.closing.title[language]}
              accentWords={copy.closing.highlight[language]}
            />
          </h2>
          <Reveal delay={0.15} y={18}>
            <p className="mx-auto mt-7 max-w-[46ch] text-pretty text-base leading-relaxed text-ed-ink-soft">
              {copy.closing.lead[language]}
            </p>
          </Reveal>
          <Reveal delay={0.25} y={18}>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-punch-btn group mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight"
            >
              {copy.closing.cta[language]}
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
