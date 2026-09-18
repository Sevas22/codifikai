import { ServicesPageView } from "@/components/services/services-page-view"
import { SERVICES } from "@/lib/services"
import { getSiteUrl, siteName } from "@/lib/site"

/**
 * Catálogo de servicios en datos estructurados, alimentado por `lib/services`.
 *
 * Vive en la página índice y no en el layout: el layout envuelve también a las
 * subpáginas, y allí el catálogo completo se duplicaba encima del `Service`
 * específico de cada una.
 */
function ServicesCatalogJsonLd() {
  const site = getSiteUrl()
  const provider = { "@type": "Organization", name: siteName, url: site }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Servicios de ${siteName}`,
    itemListElement: SERVICES.map((service) => ({
      "@type": "ListItem",
      position: service.order,
      item: {
        "@type": "Service",
        name: service.title.es,
        description: service.seo.description.es,
        url: `${site}/services/${service.slug}`,
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

export default function ServicesPage() {
  return (
    <>
      <ServicesCatalogJsonLd />
      <ServicesPageView />
    </>
  )
}
