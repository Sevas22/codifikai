import type { Metadata } from "next"

import { FaqPage } from "@/components/pages/faq-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("faq", "es")

export default function Page() {
  return <FaqPage locale="es" />
}
