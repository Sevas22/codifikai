import type { Metadata } from "next"

import { TermsPage } from "@/components/pages/terms-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("terms", "en")

export default function Page() {
  return <TermsPage />
}
