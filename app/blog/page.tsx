import type { Metadata } from "next"
import { BlogPageView } from "@/components/blog/blog-page-view"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guías prácticas de inteligencia artificial, automatización y software a medida para empresas de Cundinamarca y Boyacá.",
  keywords: [
    "blog IA Colombia",
    "automatización Cundinamarca",
    "software Boyacá",
    "inteligencia artificial pymes",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Codifikai",
    description:
      "Ideas y guías prácticas de IA y automatización para empresas de Cundinamarca y Boyacá.",
    url: "/blog",
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <BlogPageView posts={posts} />
}
