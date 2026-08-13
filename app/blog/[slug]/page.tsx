import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { BlogCta } from "@/components/blog/blog-cta"
import { FadeIn } from "@/components/ui/fade-in"
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog"
import { getSiteUrl, siteName } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getAllPostSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const images = post.coverImage ? [{ url: post.coverImage }] : undefined

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${post.title} | ${siteName}`,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const siteUrl = getSiteUrl()
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt,
    inLanguage: "es-CO",
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    about: post.department,
    spatialCoverage: {
      "@type": "AdministrativeArea",
      name: post.city || post.department,
    },
  }
  if (post.coverImage) jsonLd.image = post.coverImage

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  }

  const faqJsonLd =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null

  return (
    <main className="relative min-h-screen bg-transparent text-foreground">
      <Navigation />
      <FloatingContact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(34,211,238,0.14),transparent)]" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <MapPin className="h-3.5 w-3.5" />
              {post.city || post.department}
            </div>

            <h1
              className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl lg:leading-[1.1]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="heading-brand">{post.title}</span>
            </h1>

            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </FadeIn>

          {post.coverImage && (
            <FadeIn delay={0.05}>
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.1}>
            <div
              className="blog-prose mt-12"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </FadeIn>

          <FadeIn delay={0.15} className="mt-16">
            <BlogCta />
          </FadeIn>
        </div>
      </article>

      <Footer />
    </main>
  )
}
