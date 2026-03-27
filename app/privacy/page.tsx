"use client"

import { LegalDocumentPage, type LegalSection } from "@/components/legal/legal-document-page"

const PRIVACY_SECTIONS: LegalSection[] = [
  { titleKey: "legal.privacy.s1.title", bodyKey: "legal.privacy.s1.body" },
  { titleKey: "legal.privacy.s2.title", bodyKey: "legal.privacy.s2.body" },
  { titleKey: "legal.privacy.s3.title", bodyKey: "legal.privacy.s3.body" },
  { titleKey: "legal.privacy.s4.title", bodyKey: "legal.privacy.s4.body" },
  { titleKey: "legal.privacy.s5.title", bodyKey: "legal.privacy.s5.body" },
  { titleKey: "legal.privacy.s6.title", bodyKey: "legal.privacy.s6.body" },
]

export default function PrivacyPage() {
  return (
    <LegalDocumentPage
      titleKey="legal.privacy.title"
      updatedKey="legal.privacy.updated"
      sections={PRIVACY_SECTIONS}
    />
  )
}
