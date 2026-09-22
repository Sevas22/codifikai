import type { Metadata } from "next"

import { PrivacyPage } from "@/components/pages/privacy-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("privacy", "es")

export default function Page() {
  return <PrivacyPage />
}
