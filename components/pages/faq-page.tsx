import { FaqView } from "@/components/faq/faq-view"
import { Footer } from "@/components/sections/footer"
import { homeCopy } from "@/lib/home-copy"
import type { Locale } from "@/lib/i18n"
import { localePath } from "@/lib/i18n"
import { getSiteUrl, siteName } from "@/lib/site"

/**
 * Preguntas frecuentes.
 *
 * Antes vivían como acordeón en la portada; ahora tienen página propia. El
 * marcado `FAQPage` se movió con ellas: solo es legítimo en la página donde
 * el texto está a la vista, y es la pieza que deja a un asistente de IA citar
 * una respuesta concreta en vez de resumir la web entera.
 */
function FaqJsonLd({ locale }: { locale: Locale }) {
  const site = getSiteUrl()
  const url = `${site}${localePath(locale, "/faq")}`
  const copy = homeCopy[locale]
  const pageName = locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"

  const graph = [
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      name: `${pageName} | ${siteName}`,
      inLanguage: locale === "es" ? "es-CO" : "en",
      isPartOf: { "@id": `${site}#website` },
      mainEntity: copy.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
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
        { "@type": "ListItem", position: 2, name: "FAQ", item: url },
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

export function FaqPage({ locale }: { locale: Locale }) {
  return (
    <>
      <FaqJsonLd locale={locale} />
      <main className="relative min-h-screen overflow-x-hidden">
        <FaqView />
        {/* Fuera de ed-light-scope: el footer tiene colores oscuros fijos. */}
        <Footer />
      </main>
    </>
  )
}
