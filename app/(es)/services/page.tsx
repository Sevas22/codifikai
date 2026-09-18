import type { Metadata } from "next"

import { ServicesIndexPage } from "@/components/pages/services-index-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("services", "es")

export default function Page() {
  return <ServicesIndexPage locale="es" />
}
