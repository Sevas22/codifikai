"use client"

import { CapabilitiesSection } from "@/components/home/capabilities-section"
import { ClosingSection } from "@/components/home/closing-section"
import { FaqSection } from "@/components/home/faq-section"
import { Hero } from "@/components/home/hero"
import { NumbersSection } from "@/components/home/numbers-section"
import { ProcessSection } from "@/components/home/process-section"
import { SectionIndex } from "@/components/home/section-index"
import { StackSection } from "@/components/home/stack-section"
import { TeamSection } from "@/components/home/team-section"
import { WorkSection } from "@/components/home/work-section"
import { useLanguage } from "@/components/providers/language-provider"
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/contact"
import { homeCopy } from "@/lib/home-copy"
import { successCases } from "@/lib/success-cases"

export function HomeExperience() {
  const { language } = useLanguage()
  const copy = homeCopy[language]

  // Sin calendario configurado, la conversión cae en la página de contacto en
  // vez de en un enlace muerto.
  const bookingHref = BOOKING_URL || "/contact"

  return (
    <div className="relative bg-ed-canvas text-ed-ink">
      <SectionIndex labels={copy.sectionIndex} title={copy.indexLabel} />

      <Hero copy={copy} bookingHref={bookingHref} />
      <NumbersSection copy={copy} caseCount={successCases.length} />
      <CapabilitiesSection copy={copy} />
      <ProcessSection copy={copy} />
      <WorkSection copy={copy} language={language} />
      <StackSection copy={copy} />
      <TeamSection copy={copy} language={language} />
      <FaqSection copy={copy} />
      <ClosingSection
        copy={copy}
        bookingHref={bookingHref}
        whatsappHref={WHATSAPP_URL}
      />
    </div>
  )
}
