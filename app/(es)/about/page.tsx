import type { Metadata } from "next"

import { AboutPage } from "@/components/pages/about-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("about", "es")

export default function Page() {
  return <AboutPage locale="es" />
}
