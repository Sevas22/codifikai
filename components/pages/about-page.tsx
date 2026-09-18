import { AboutView } from "@/components/about/about-view"
import { Footer } from "@/components/sections/footer"
import { ABOUT_TEAM } from "@/lib/about-copy"
import type { Locale } from "@/lib/i18n"
import { localePath } from "@/lib/i18n"
import { getSiteUrl, siteName } from "@/lib/site"

/**
 * "Sobre nosotros" — rediseño 2026.
 *
 * La versión anterior vive en el historial de git; el contenido (historia,
 * visión, liderazgo y tecnología) se conservó y ahora reside en
 * `lib/about-copy.ts`, fuera del diccionario global.
 */
function AboutJsonLd({ locale }: { locale: Locale }) {
  const site = getSiteUrl()
  const url = `${site}${localePath(locale, "/about")}`

  const graph = [
    {
      "@type": "AboutPage",
      "@id": `${url}#page`,
      url,
      name: `${locale === "es" ? "Sobre nosotros" : "About us"} | ${siteName}`,
      // El equipo en datos estructurados ayuda a que un buscador entienda
      // quién está detrás, que es parte de lo que evalúa como confianza.
      inLanguage: locale === "es" ? "es-CO" : "en",
      about: {
        "@type": "Organization",
        "@id": `${site}#organization`,
        name: siteName,
        url: site,
        employee: ABOUT_TEAM.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.role[locale],
          image: `${site}${member.image}`,
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
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "es" ? "Sobre nosotros" : "About us",
          item: url,
        },
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

export function AboutPage({ locale }: { locale: Locale }) {
  return (
    <>
      <AboutJsonLd locale={locale} />
      <main className="relative min-h-screen overflow-x-hidden">
        <AboutView />
        {/* Fuera de ed-light-scope: el footer tiene colores oscuros fijos. */}
        <Footer />
      </main>
    </>
  )
}
