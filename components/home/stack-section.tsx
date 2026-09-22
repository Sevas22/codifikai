"use client"

import { EdSection, Marquee, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import type { HomeCopy } from "@/lib/home-copy"

/**
 * Grupo de fichas. Se prefieren a la lista numerada anterior porque estas
 * etiquetas son un vistazo de reconocimiento — "¿está lo que yo uso?" — y no
 * una secuencia que se lea en orden.
 */
function ChipGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="ed-label border-b border-ed-rule pb-4">{label}</p>
      <ul className="mt-6 flex flex-wrap gap-2.5">
        {items.map((item, i) => (
          <Reveal as="li" key={item} delay={i * 0.06} y={14}>
            <span className="ed-card inline-flex items-center gap-2.5 px-5 py-3 text-[0.9375rem] font-medium tracking-tight text-ed-ink transition-colors duration-300 hover:border-ed-accent hover:text-ed-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-ed-punch" aria-hidden />
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
        highlight={copy.highlights.stack}
        lead={copy.stack.lead}
      />

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
        <ChipGroup label={copy.stack.integrationsLabel} items={copy.stack.integrations} />
        <ChipGroup label={copy.stack.industriesLabel} items={copy.stack.industries} />
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
