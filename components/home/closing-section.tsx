"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Check } from "lucide-react"

import { EdSection, KineticTitle, Reveal, useMagnetic } from "@/components/home/ed-primitives"
import { ParticleField } from "@/components/home/particle-field"
import type { HomeCopy } from "@/lib/home-copy"
import { useLocalePath } from "@/hooks/use-locale-path"

export function ClosingSection({
  copy,
  whatsappHref,
}: {
  copy: HomeCopy
  whatsappHref: string
}) {
  const { ref, x, y } = useMagnetic(0.18)
  const path = useLocalePath()

  return (
    <EdSection id="contact" tone="dark" className="ed-grain relative overflow-hidden">
      <ParticleField
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        density={3}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_18%,transparent),transparent_65%)] blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-[54rem] text-center">
        <Reveal y={16}>
          <span className="ed-label inline-flex items-center gap-3 rounded-full border border-ed-rule px-4 py-2">
            {copy.closing.label}
          </span>
        </Reveal>

        <h2 className="mt-8 text-ed-ink">
          <KineticTitle
            lines={copy.closing.titleLines}
            className="ed-display text-[clamp(2.5rem,7vw,6rem)]"
          />
        </h2>

        <Reveal delay={0.15} y={18}>
          <p className="mx-auto mt-7 max-w-[48ch] text-pretty text-base leading-relaxed text-ed-ink-soft sm:text-lg">
            {copy.closing.lead}
          </p>
        </Reveal>

        <Reveal delay={0.25} y={18}>
          <div className="mt-11 flex flex-col items-center justify-center gap-x-5 gap-y-4 sm:flex-row">
            <motion.span
              ref={ref as React.RefObject<HTMLSpanElement>}
              style={{ x, y }}
              className="inline-block"
            >
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-punch-btn group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-punch"
              >
                {copy.closing.ctaPrimary}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </motion.span>

            <Link
              href={path("/contact")}
              className="ed-link text-[0.9375rem] font-semibold tracking-tight text-ed-ink-soft transition-colors hover:text-ed-ink"
            >
              {copy.closing.ctaSecondary}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.35} y={14}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {copy.closing.reassurance.map((item) => (
              <li key={item} className="ed-label flex items-center gap-2">
                <Check className="h-3 w-3 text-ed-punch" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </EdSection>
  )
}
