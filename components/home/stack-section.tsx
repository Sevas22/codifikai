"use client"

import { EdSection, Marquee, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import type { HomeCopy } from "@/lib/home-copy"

function Column({
  label,
  items,
  startIndex,
}: {
  label: string
  items: string[]
  startIndex: number
}) {
  return (
    <div>
      <p className="ed-label border-b border-ed-rule pb-4">{label}</p>
      <ul>
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item}
            delay={i * 0.07}
            y={16}
            className="group flex items-baseline gap-5 border-b border-ed-rule py-5"
          >
            <span className="ed-label shrink-0 text-ed-ink-faint/60 tabular-nums">
              {String(startIndex + i).padStart(2, "0")}
            </span>
            <span className="text-[1.0625rem] tracking-tight text-ed-ink-soft transition-colors duration-300 group-hover:text-ed-ink sm:text-[1.125rem]">
              {item}
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}

export function StackSection({ copy }: { copy: HomeCopy }) {
  return (
    <EdSection id="stack" className="ed-columns border-y border-ed-rule">
      <SectionHeading
        index={5}
        label={copy.stack.label}
        title={copy.stack.title}
        lead={copy.stack.lead}
      />

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
        <Column label={copy.stack.integrationsLabel} items={copy.stack.integrations} startIndex={1} />
        <Column label={copy.stack.industriesLabel} items={copy.stack.industries} startIndex={1} />
      </div>

      <div className="mt-16 -mx-[var(--ed-gutter)] border-y border-ed-rule py-4">
        <Marquee
          items={[...copy.stack.integrations, ...copy.stack.industries]}
          durationSeconds={38}
          reverse
        />
      </div>
    </EdSection>
  )
}
