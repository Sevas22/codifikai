"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Check } from "lucide-react"

import { EdSection, Reveal, WordReveal, useMagnetic } from "@/components/home/ed-primitives"
import type { HomeCopy } from "@/lib/home-copy"

export function ClosingSection({
  copy,
  bookingHref,
  whatsappHref,
}: {
  copy: HomeCopy
  bookingHref: string
  whatsappHref: string
}) {
  const { ref, x, y } = useMagnetic(0.2)

  return (
    <EdSection id="contact" className="ed-grain relative overflow-hidden">
      {/* Resplandor de cierre: única concesión de color en toda la página. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,226,245,0.10),transparent_65%)] blur-2xl"
        aria-hidden
      />

      <div className="mx-auto max-w-[52rem] text-center">
        <Reveal y={16}>
          <span className="ed-label inline-flex items-center gap-3">
            <span className="h-px w-6 bg-ed-rule-strong" aria-hidden />
            {copy.closing.label}
            <span className="h-px w-6 bg-ed-rule-strong" aria-hidden />
          </span>
        </Reveal>

        <h2 className="ed-display mt-8 text-[clamp(2.5rem,6.4vw,5.25rem)] text-ed-ink">
          <WordReveal text={copy.closing.title} />
        </h2>

        <Reveal delay={0.15} y={18}>
          <p className="mx-auto mt-8 max-w-[46ch] text-pretty text-[0.975rem] leading-relaxed text-ed-ink-soft sm:text-base">
            {copy.closing.lead}
          </p>
        </Reveal>

        <Reveal delay={0.25} y={18}>
          <div className="mt-12 flex flex-col items-center justify-center gap-x-8 gap-y-5 sm:flex-row">
            <motion.span
              ref={ref as React.RefObject<HTMLSpanElement>}
              style={{ x, y }}
              className="inline-block"
            >
              <Link
                href={bookingHref}
                {...(bookingHref.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group inline-flex items-center gap-3 rounded-full bg-ed-ink px-8 py-4 text-[0.8125rem] font-medium tracking-tight text-ed-canvas transition-colors duration-300 hover:bg-ed-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
              >
                {copy.closing.ctaPrimary}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </motion.span>

            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-link text-[0.8125rem] font-medium tracking-tight text-ed-ink-soft transition-colors hover:text-ed-ink"
            >
              {copy.closing.ctaSecondary}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.35} y={14}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {copy.closing.reassurance.map((item) => (
              <li key={item} className="ed-label flex items-center gap-2 text-ed-ink-faint">
                <Check className="h-3 w-3 text-ed-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </EdSection>
  )
}
