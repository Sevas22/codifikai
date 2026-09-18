import type { Metadata } from "next"

import { BlogIndexView } from "@/components/blog/blog-index-view"
import { Footer } from "@/components/sections/footer"
import { getAllPosts } from "@/lib/blog"
import { getSiteUrl, siteName } from "@/lib/site"

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
  const site = getSiteUrl()

  // El listado en datos estructurados deja claro que esto es un blog y qué
  // artículos contiene, en vez de una página suelta más.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog | ${siteName}`,
    url: `${site}/blog`,
    blogPost: posts.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updatedAt,
      url: `${site}/blog/${post.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative min-h-screen overflow-x-hidden">
        <BlogIndexView posts={posts} />
        {/* Fuera de ed-light-scope: el footer tiene colores oscuros fijos. */}
        <Footer />
      </main>
    </>
  )
}
