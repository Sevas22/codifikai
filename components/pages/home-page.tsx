import { Navigation } from "@/components/navigation"
import { HomeExperience } from "@/components/home/home-experience"
import { Footer } from "@/components/sections/footer"
import { homeCopy } from "@/lib/home-copy"
import { localePath, type Locale } from "@/lib/i18n"
import { getSiteUrl, siteName } from "@/lib/site"

/**
 * Datos estructurados de la portada.
 *
 * Incluye `FAQPage` con las mismas cinco preguntas que la página muestra en su
 * acordeón. El marcado solo es legítimo si el texto está en la página —lo
 * está—, y es la pieza que permite que un asistente de IA cite una respuesta
 * concreta en vez de resumir la web entera por encima.
 */
function HomeJsonLd({ locale }: { locale: Locale }) {
  const site = getSiteUrl()
  const url = `${site}${localePath(locale, "/")}`
  const copy = homeCopy[locale]

  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: `${siteName} | ${copy.hero.kicker}`,
      description: copy.hero.lead,
      inLanguage: locale === "es" ? "es-CO" : "en",
      isPartOf: { "@id": `${site}#website` },
      about: { "@id": `${site}#organization` },
      primaryImageOfPage: `${site}/opengraph-image`,
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      inLanguage: locale === "es" ? "es-CO" : "en",
      mainEntity: copy.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
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

/**
 * Portada rediseñada (2026).
 *
 * El footer queda deliberadamente FUERA de `ed-light-scope`: tiene colores
 * oscuros fijos y, si heredara los tokens claros, su texto secundario perdería
 * contraste sobre el propio fondo negro. Además el cierre de la página ya es
 * una sección oscura, así que la transición encaja.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <HomeJsonLd locale={locale} />
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="ed-light-scope bg-ed-canvas text-ed-ink">
          <Navigation />
          <HomeExperience />
        </div>
        <Footer />
      </main>
    </>
  )
}
