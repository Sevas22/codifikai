import { notFound } from "next/navigation"

import { ArticleView } from "@/components/blog/article-view"
import { Footer } from "@/components/sections/footer"
import { estimateReadingMinutes, withHeadingIds } from "@/lib/blog-toc"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { LOCALE_TAGS, localePath, type Locale } from "@/lib/i18n"
import { getSiteUrl, siteName } from "@/lib/site"

/** Cuántos artículos se sugieren al final. */
const RELATED_COUNT = 3

export async function BlogArticlePage({ slug, locale }: { slug: string; locale: Locale }) {
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // Se procesa en el servidor: el artículo entero no debe reparsearse en el
  // navegador solo para pintar un índice.
  const { html, toc } = withHeadingIds(post.html)
  const readingMinutes = estimateReadingMinutes(post.html)

  // Se priorizan los artículos del mismo departamento: el blog es local y esa
  // es la relación más útil para el lector.
  const others = (await getAllPosts()).filter((p) => p.slug !== post.slug)
  const sameArea = others.filter((p) => p.department === post.department)
  const related = [...sameArea, ...others.filter((p) => !sameArea.includes(p))].slice(
    0,
    RELATED_COUNT
  )

  const siteUrl = getSiteUrl()
  const articleUrl = `${siteUrl}${localePath(locale, `/blog/${post.slug}`)}`

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt,
    inLanguage: LOCALE_TAGS[locale],
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
    mainEntityOfPage: articleUrl,
    about: post.department,
    // Minutos de lectura: los buscadores lo usan para previsualizar el esfuerzo.
    timeRequired: `PT${readingMinutes}M`,
    spatialCoverage: {
      "@type": "AdministrativeArea",
      name: post.city || post.department,
    },
  }
  if (post.coverImage) jsonLd.image = post.coverImage
  if (post.keywords.length > 0) jsonLd.keywords = post.keywords.join(", ")

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "es" ? "Inicio" : "Home",
        item: `${siteUrl}${localePath(locale, "/")}`,
      },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}${localePath(locale, "/blog")}` },
      { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
    ],
  }

  // Las preguntas se extraen del propio contenido, así que el marcado siempre
  // corresponde a texto visible en la página (requisito de Google).
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <main className="relative min-h-screen overflow-x-hidden">
        <ArticleView
          post={post}
          html={html}
          toc={toc}
          readingMinutes={readingMinutes}
          related={related}
        />
        {/* Fuera de ed-light-scope: el footer tiene colores oscuros fijos. */}
        <Footer />
      </main>
    </>
  )
}
