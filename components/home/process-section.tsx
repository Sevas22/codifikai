"use client"

import { DrawnRule, EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import type { HomeCopy } from "@/lib/home-copy"

export function ProcessSection({ copy }: { copy: HomeCopy }) {
  return (
    <EdSection id="process">
      <SectionHeading
        index={3}
        label={copy.process.label}
        title={copy.process.title}
        lead={copy.process.lead}
        align="wide"
      />

      <div className="mt-20">
        <DrawnRule />
        <ol className="grid grid-cols-1 gap-px bg-ed-rule sm:grid-cols-2 lg:grid-cols-4">
          {copy.process.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.1}
              y={24}
              className="group relative bg-ed-canvas px-1 pt-10 pb-12 transition-colors duration-500 hover:bg-ed-canvas-raised sm:px-7"
            >
              {/* Numeral gigante de fondo: ancla visual de cada paso */}
              <span
                className="ed-display pointer-events-none absolute right-4 top-4 text-[5.5rem] leading-none text-ed-ink/[0.045] transition-colors duration-500 group-hover:text-ed-accent/10"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="ed-label text-ed-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative mt-6 max-w-[16ch] text-[1.0625rem] font-medium tracking-tight text-ed-ink sm:text-[1.125rem]">
                {step.title}
              </h3>
              <p className="relative mt-3 max-w-[32ch] text-[0.875rem] leading-relaxed text-ed-ink-soft">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </EdSection>
  )
}
