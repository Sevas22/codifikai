"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogCta } from "@/components/blog/blog-cta"
import { FadeIn } from "@/components/ui/fade-in"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { useLanguage } from "@/components/providers/language-provider"
import type { BlogPostMeta } from "@/lib/blog"

export function BlogPageView({ posts }: { posts: BlogPostMeta[] }) {
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen bg-transparent text-foreground">
      <Navigation />

      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(34,211,238,0.14),transparent)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <SectionEyebrow label={t("blogPage.label")} alwaysCentered />
            <h1
              className="mt-2 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[3.25rem] lg:leading-[1.08]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="heading-brand">{t("blogPage.heroTitle")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("blogPage.heroSubtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <FadeIn className="text-center text-sm text-muted-foreground">
              {t("blogPage.empty")}
            </FadeIn>
          )}
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <BlogCta />
        </div>
      </section>

      <Footer />
    </main>
  )
}
