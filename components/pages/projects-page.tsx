import { ProjectsView } from "@/components/projects/projects-view"
import { Footer } from "@/components/sections/footer"
import type { Locale } from "@/lib/i18n"
import { localePath } from "@/lib/i18n"
import { getSiteUrl, siteName } from "@/lib/site"
import { successCases } from "@/lib/success-cases"

/**
 * Proyectos en producción.
 *
 * Antes vivían en la portada; ahora tienen página propia. El listado en datos
 * estructurados (ItemList) deja que un buscador vea cuántos proyectos hay y
 * cuáles son sin tener que renderizar las tarjetas.
 */
function ProjectsJsonLd({ locale }: { locale: Locale }) {
  const site = getSiteUrl()
  const url = `${site}${localePath(locale, "/projects")}`
  const pageName = locale === "es" ? "Proyectos" : "Projects"

  const graph = [
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: `${pageName} | ${siteName}`,
      inLanguage: locale === "es" ? "es-CO" : "en",
      isPartOf: { "@id": `${site}#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: successCases.length,
        itemListElement: successCases.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: item.url,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "es" ? "Inicio" : "Home",
          item: `${site}${localePath(locale, "/")}`,
        },
        { "@type": "ListItem", position: 2, name: pageName, item: url },
      ],
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  )
}

export function ProjectsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <ProjectsJsonLd locale={locale} />
      <main className="relative min-h-screen overflow-x-hidden">
        <ProjectsView />
        {/* Fuera de ed-light-scope: el footer tiene colores oscuros fijos. */}
        <Footer />
      </main>
    </>
  )
}
