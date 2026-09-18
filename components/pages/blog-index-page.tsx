import { BlogIndexView } from "@/components/blog/blog-index-view"
import { Footer } from "@/components/sections/footer"
import { getAllPosts } from "@/lib/blog"
import { BLOG_LOCALE, blogPostPath } from "@/lib/blog-paths"
import { LOCALE_TAGS, localePath, type Locale } from "@/lib/i18n"
import { getSiteUrl, siteName } from "@/lib/site"

export async function BlogIndexPage({ locale }: { locale: Locale }) {
  const posts = await getAllPosts()
  const site = getSiteUrl()

  // El listado en datos estructurados deja claro que esto es un blog y qué
  // artículos contiene, en vez de una página suelta más.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    inLanguage: locale === "es" ? "es-CO" : "en",
    publisher: { "@id": `${site}#organization` },
    name: `Blog | ${siteName}`,
    url: `${site}${localePath(locale, "/blog")}`,
    blogPost: posts.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updatedAt,
      // Cada artículo declara su propio idioma: en /en/blog se listan los
      // mismos artículos, que siguen estando en español.
      inLanguage: LOCALE_TAGS[BLOG_LOCALE],
      url: `${site}${blogPostPath(post.slug)}`,
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
