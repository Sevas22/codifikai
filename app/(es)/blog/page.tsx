import type { Metadata } from "next"

import { BlogIndexPage } from "@/components/pages/blog-index-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("blog", "es")

export default function Page() {
  return <BlogIndexPage locale="es" />
}
