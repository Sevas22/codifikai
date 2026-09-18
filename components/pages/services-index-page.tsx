import { ServicesPageView } from "@/components/services/services-page-view"
import { SERVICES } from "@/lib/services"
import { localePath, type Locale } from "@/lib/i18n"
import { getSiteUrl, siteName } from "@/lib/site"

/**
 * Catálogo de servicios en datos estructurados, alimentado por `lib/services`.
 *
 * Vive en la página índice y no en el layout: el layout envuelve también a las
 * subpáginas, y allí el catálogo completo se duplicaba encima del `Service`
 * específico de cada una.
 */
function ServicesCatalogJsonLd({ locale }: { locale: Locale }) {
  const site = getSiteUrl()
  const provider = { "@type": "Organization", name: siteName, url: site }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "es" ? `Servicios de ${siteName}` : `${siteName} services`,
    itemListElement: SERVICES.map((service) => ({
      "@type": "ListItem",
      position: service.order,
      item: {
        "@type": "Service",
        name: service.title[locale],
        description: service.seo.description[locale],
        url: `${site}${localePath(locale, `/services/${service.slug}`)}`,
        provider,
        areaServed: ["CO", "LATAM"],
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ServicesIndexPage({ locale }: { locale: Locale }) {
  return (
    <>
      <ServicesCatalogJsonLd locale={locale} />
      <ServicesPageView />
    </>
  )
}
