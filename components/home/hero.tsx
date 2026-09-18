"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"

import { OrbitalCanvas } from "@/components/home/orbital-canvas"
import { Marquee, WordReveal, useMagnetic } from "@/components/home/ed-primitives"
import type { HomeCopy } from "@/lib/home-copy"
import { cn } from "@/lib/utils"

/** Botón principal que se inclina hacia el cursor. */
function MagneticCta({
  href,
  children,
  external = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  const { ref, x, y } = useMagnetic(0.22)

  return (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      style={{ x, y }}
      className="inline-block"
    >
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ed-ink px-7 py-4 text-[0.8125rem] font-medium tracking-tight text-ed-canvas transition-colors duration-300 hover:bg-ed-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
      >
        <span className="relative z-10">{children}</span>
        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </Link>
    </motion.span>
  )
}

export function Hero({ copy, bookingHref }: { copy: HomeCopy; bookingHref: string }) {
  const reduced = useReducedMotion()

  return (
    <section
      id="top"
      className="ed-grain relative isolate flex min-h-svh flex-col justify-between overflow-hidden pt-32 pb-0 sm:pt-36"
    >
      {/* Rejilla de reglas verticales: la referencia editorial del rediseño. */}
      <div
        className="ed-hairlines pointer-events-none absolute inset-0 -z-10 opacity-70"
        aria-hidden
      />

      {/* Pieza central. En móvil se centra detrás del texto y baja de opacidad
          para no pelear con la lectura. */}
      <OrbitalCanvas
        className={cn(
          "pointer-events-none absolute -z-10",
          "left-1/2 top-1/2 h-[min(120vw,42rem)] w-[min(120vw,42rem)] -translate-x-1/2 -translate-y-1/2 opacity-40",
          "lg:left-auto lg:right-[-6%] lg:h-[min(46rem,88vh)] lg:w-[min(46rem,60vw)] lg:translate-x-0 lg:opacity-100"
        )}
      />

      <div className="relative mx-auto flex w-full max-w-[80rem] flex-1 flex-col justify-center px-[var(--ed-gutter)]">
        <div className="max-w-[46rem]">
          {/* Kicker */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="ed-label flex items-center gap-3"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ed-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ed-accent" />
            </span>
            {copy.hero.kicker}
          </motion.p>

          {/* Titular */}
          <h1 className="ed-display mt-8 text-[clamp(2.75rem,7.4vw,6.75rem)] text-ed-ink">
            <span className="block">
              <WordReveal text={copy.hero.titleLead} delay={0.1} />
            </span>
            <span className="block italic text-ed-accent">
              <WordReveal text={copy.hero.titleEmphasis} delay={0.28} />
            </span>
            <span className="block">
              <WordReveal text={copy.hero.titleTail} delay={0.4} />
            </span>
          </h1>

          {/* Bajada */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-[46ch] text-pretty text-[0.975rem] leading-relaxed text-ed-ink-soft sm:text-base"
          >
            {copy.hero.lead}
          </motion.p>

          {/* Llamadas a la acción */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <MagneticCta href={bookingHref} external={bookingHref.startsWith("http")}>
              {copy.hero.ctaPrimary}
            </MagneticCta>
            <Link
              href="#work"
              className="ed-link text-[0.8125rem] font-medium tracking-tight text-ed-ink-soft transition-colors hover:text-ed-ink"
            >
              {copy.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Pie del hero: señal de scroll + marquesina */}
      <div className="relative mt-16 w-full">
        <div className="mx-auto mb-6 flex w-full max-w-[80rem] items-center px-[var(--ed-gutter)]">
          <motion.span
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="ed-label flex items-center gap-3 text-ed-ink-faint/80"
          >
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-ed-accent" aria-hidden />
            {copy.hero.scrollCue}
          </motion.span>
        </div>
        <div className="border-y border-ed-rule bg-ed-canvas-raised/40 py-4 backdrop-blur-sm">
          <Marquee items={copy.hero.marquee} durationSeconds={52} />
        </div>
      </div>
    </section>
  )
}
