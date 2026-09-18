import type { Metadata } from "next"

import { AboutPage } from "@/components/pages/about-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("about", "en")

export default function Page() {
  return <AboutPage locale="en" />
}
