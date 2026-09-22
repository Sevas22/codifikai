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
import { WHATSAPP_URL } from "@/lib/contact"
import { homeCopy } from "@/lib/home-copy"
import { successCases } from "@/lib/success-cases"

/**
 * Portada 2026.
 *
 * El ritmo alterna bloques claros y oscuros a propósito: cada cambio de fondo
 * marca un capítulo y evita que una página larga se lea como un solo muro.
 * WhatsApp es el cierre de negocio principal, así que todos los botones de
 * golpe apuntan ahí.
 */
export function HomeExperience() {
  const { language } = useLanguage()
  const copy = homeCopy[language]

  return (
    <div className="relative bg-ed-canvas text-ed-ink">
      <SectionIndex labels={copy.sectionIndex} title={copy.indexLabel} />

      <Hero copy={copy} whatsappHref={WHATSAPP_URL} />
      <NumbersSection copy={copy} caseCount={successCases.length} />
      <CapabilitiesSection copy={copy} language={language} whatsappHref={WHATSAPP_URL} />
      <ProcessSection copy={copy} />
      <WorkSection copy={copy} language={language} />
      <StackSection copy={copy} />
      <TeamSection copy={copy} language={language} />
      <FaqSection copy={copy} />
      <ClosingSection copy={copy} whatsappHref={WHATSAPP_URL} />
    </div>
  )
}
