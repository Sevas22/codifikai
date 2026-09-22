"use client"

import Link from "next/link"
import { m, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"

import { Marquee, WordReveal, useMagnetic } from "@/components/home/ed-primitives"
import { ParticleField } from "@/components/home/particle-field"
import type { HomeCopy } from "@/lib/home-copy"

/** Botón de golpe que se inclina hacia el cursor. */
function MagneticCta({
  href,
  children,
  external = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  const { ref, x, y } = useMagnetic(0.2)

  return (
    <m.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      style={{ x, y }}
      className="inline-block"
    >
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="ed-punch-btn group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-punch"
      >
        {children}
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </Link>
    </m.span>
  )
}

export function Hero({ copy, whatsappHref }: { copy: HomeCopy; whatsappHref: string }) {
  const reduced = useReducedMotion()

  return (
    <section
      id="top"
      className="ed-grain relative isolate flex min-h-svh flex-col justify-between overflow-hidden pt-32 pb-0 sm:pt-36"
    >
      {/* Columnas verticales tenues de fondo */}
      <div className="ed-columns pointer-events-none absolute inset-0 -z-20" aria-hidden />

      {/* Halos de marca detrás del titular */}
      <div
        className="pointer-events-none absolute -z-20 left-[-10%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-violet)_22%,transparent),transparent_68%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -z-20 right-[-8%] bottom-[6%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_20%,transparent),transparent_68%)] blur-3xl"
        aria-hidden
      />

      {/* Partículas: el gesto que hace que la página se sienta viva */}
      <ParticleField className="pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto flex w-full max-w-[80rem] flex-1 flex-col justify-center px-[var(--ed-gutter)]">
        <div className="max-w-[52rem]">
          {/* El kicker vive DENTRO del h1. Visualmente es la misma etiqueta
              pequeña de siempre, pero así el encabezado principal de la
              página contiene "agencia de inteligencia artificial": el término
              por el que queremos que nos encuentren. Antes el h1 era solo el
              copy creativo, sin ninguna palabra clave. */}
          <h1 className="text-ed-ink">
            <m.span
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="ed-label inline-flex items-center gap-3 rounded-full border border-ed-rule bg-ed-canvas-raised/80 px-4 py-2 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ed-punch opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ed-punch" />
              </span>
              {copy.hero.kicker}
            </m.span>

            <span className="ed-display mt-8 block text-[clamp(2.5rem,6.8vw,5.75rem)]">
            <span className="block">
              <WordReveal
                text={copy.hero.titleLead}
                delay={0.1}
                accentWords={copy.hero.highlight}
              />
            </span>
            <span className="block text-ed-accent">
              <WordReveal text={copy.hero.titleEmphasis} delay={0.26} />
            </span>
            <span className="block">
              <WordReveal
                text={copy.hero.titleTail}
                delay={0.38}
                accentWords={copy.hero.highlight}
              />
            </span>
            </span>
          </h1>

          {/* Bajada */}
          <m.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-[48ch] text-pretty text-base leading-relaxed text-ed-ink-soft sm:text-lg"
          >
            {copy.hero.lead}
          </m.p>

          {/* Cierre principal: WhatsApp */}
          <m.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4"
          >
            <MagneticCta href={whatsappHref} external>
              {copy.hero.ctaPrimary}
            </MagneticCta>
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-ed-rule-strong bg-ed-canvas-raised px-7 py-4 text-[0.9375rem] font-semibold tracking-tight text-ed-ink transition-colors duration-300 hover:border-ed-accent hover:text-ed-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
            >
              {copy.hero.ctaSecondary}
            </Link>
          </m.div>
        </div>
      </div>

      {/* Pie del hero: señal de scroll + marquesina */}
      <div className="relative mt-16 w-full">
        <div className="mx-auto mb-6 flex w-full max-w-[80rem] items-center px-[var(--ed-gutter)]">
          <m.span
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="ed-label flex items-center gap-3"
          >
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-ed-punch" aria-hidden />
            {copy.hero.scrollCue}
          </m.span>
        </div>
        <div className="border-y border-ed-rule bg-ed-canvas-raised/70 py-4 backdrop-blur-sm">
          <Marquee items={copy.hero.marquee} durationSeconds={52} />
        </div>
      </div>
    </section>
  )
}
