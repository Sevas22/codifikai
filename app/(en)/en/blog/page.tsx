import type { Metadata } from "next"

import { BlogIndexPage } from "@/components/pages/blog-index-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("blog", "en")

export default function Page() {
  return <BlogIndexPage locale="en" />
}
