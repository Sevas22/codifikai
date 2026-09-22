"use client"

import { Counter, EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import type { HomeCopy } from "@/lib/home-copy"

export function NumbersSection({ copy, caseCount }: { copy: HomeCopy; caseCount: number }) {
  // El conteo de casos no se escribe a mano: sale del propio dataset, así que
  // no puede quedar desactualizado cuando se publique uno nuevo.
  const cells = [
    ...copy.numbers.metrics,
    {
      value: String(caseCount),
      label: copy.numbers.casesLabel,
      note: copy.numbers.casesNote,
    },
  ]

  return (
    <EdSection id="numbers" tone="dark">
      <SectionHeading
        index={1}
        label={copy.numbers.label}
        title={copy.numbers.title}
        highlight={copy.highlights.numbers}
        lead={copy.numbers.lead}
        className="text-center sm:text-left"
      />

      <dl className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cells.map((cell, i) => (
          <Reveal
            key={cell.label}
            delay={i * 0.09}
            y={22}
            className="ed-card ed-card-lift group relative flex flex-col items-center overflow-hidden px-7 py-9 text-center sm:items-start sm:py-8 sm:text-left"
          >
            {/* Destello de marca que aparece al acercarse a la tarjeta */}
            <span
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-ed-accent/0 blur-2xl transition-colors duration-700 group-hover:bg-ed-accent/25"
              aria-hidden
            />
            <dd className="ed-display relative text-[clamp(2.75rem,5.5vw,4.25rem)] leading-none text-ed-accent">
              <Counter value={cell.value} />
            </dd>
            <dt className="relative mt-5 text-[0.9375rem] font-semibold tracking-tight text-ed-ink">
              {cell.label}
            </dt>
            <p className="relative mt-2 max-w-[26ch] text-[0.8125rem] leading-relaxed text-ed-ink-faint">
              {cell.note}
            </p>
          </Reveal>
        ))}
      </dl>
    </EdSection>
  )
}
