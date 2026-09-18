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
    <EdSection id="numbers">
      <SectionHeading
        index={1}
        label={copy.numbers.label}
        title={copy.numbers.title}
        lead={copy.numbers.lead}
      />

      <dl className="mt-20 grid grid-cols-1 border-t border-ed-rule sm:grid-cols-2 lg:grid-cols-4">
        {cells.map((cell, i) => (
          <Reveal
            key={cell.label}
            delay={i * 0.09}
            y={22}
            className="border-b border-ed-rule px-1 py-9 sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:pl-8 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-1"
          >
            <dd className="ed-display text-[clamp(3rem,6.5vw,5.5rem)] leading-none text-ed-ink">
              <Counter value={cell.value} />
            </dd>
            <dt className="mt-5 text-[0.9375rem] font-medium tracking-tight text-ed-ink">
              {cell.label}
            </dt>
            <p className="mt-2 max-w-[26ch] text-[0.8125rem] leading-relaxed text-ed-ink-faint">
              {cell.note}
            </p>
          </Reveal>
        ))}
      </dl>
    </EdSection>
  )
}
