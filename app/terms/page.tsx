"use client"

import { LegalDocumentPage, type LegalSection } from "@/components/legal/legal-document-page"

const TERMS_SECTIONS: LegalSection[] = [
  { titleKey: "legal.terms.s1.title", bodyKey: "legal.terms.s1.body" },
  { titleKey: "legal.terms.s2.title", bodyKey: "legal.terms.s2.body" },
  { titleKey: "legal.terms.s3.title", bodyKey: "legal.terms.s3.body" },
  { titleKey: "legal.terms.s4.title", bodyKey: "legal.terms.s4.body" },
  { titleKey: "legal.terms.s5.title", bodyKey: "legal.terms.s5.body" },
  { titleKey: "legal.terms.s6.title", bodyKey: "legal.terms.s6.body" },
]

export default function TermsPage() {
  return (
    <LegalDocumentPage
      titleKey="legal.terms.title"
      updatedKey="legal.terms.updated"
      sections={TERMS_SECTIONS}
    />
  )
}
