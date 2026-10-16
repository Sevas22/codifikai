import type { Metadata } from "next"

import { ProjectsPage } from "@/components/pages/projects-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("projects", "en")

export default function Page() {
  return <ProjectsPage locale="en" />
}
