import type { Metadata } from "next"

import { BlogArticlePage } from "@/components/pages/blog-article-page"
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog"
import { articleMetadata } from "@/lib/seo"

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return (await getAllPostSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return articleMetadata(
    post.slug,
    post.title,
    post.description,
    post.keywords,
    post.date,
    post.updatedAt,
    post.coverImage
  )
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  return <BlogArticlePage slug={slug} />
}
