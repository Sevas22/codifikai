import { notFound } from "next/navigation"

import { Footer } from "@/components/sections/footer"
import { ServiceDetailView } from "@/components/services/service-detail-view"
import { localePath, type Locale } from "@/lib/i18n"
import { getSiteUrl, siteName } from "@/lib/site"
import { getServiceBySlug, type Service } from "@/lib/services"

type Params = { slug: string }

/**
 * Una subpágina por servicio, prerenderizada en el build.
 *
 * Cada una existe para ser encontrada: título y descripción propios, datos
 * estructurados de `Service`, migas de pan y `FAQPage`. Ese marcado es lo que
 * permite que un buscador —o un asistente de IA, que cita fuentes en vez de
 * listar enlaces— entienda qué se ofrece y pueda citarlo.
 *
 * Los metadatos van en español porque el sitio sirve `<html lang="es">` y
 * arranca en español; el inglés se resuelve en cliente (ver commit 3054ecc).
 */
function ServiceJsonLd({ service, locale }: { service: Service; locale: Locale }) {
  const site = getSiteUrl()
  const url = `${site}${localePath(locale, `/services/${service.slug}`)}`
  const provider = { "@type": "Organization", name: siteName, url: site }

  const graph = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title[locale],
      description: service.seo.description[locale],
      serviceType: service.title[locale],
      provider,
      areaServed: ["CO", "LATAM"],
      url,
      // Lo que incluye el servicio, para que el buscador pueda enumerarlo.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.title[locale],
        itemListElement: service.includes[locale].map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item, provider },
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
          name: locale === "es" ? "Servicios" : "Services",
          item: `${site}${localePath(locale, "/services")}`,
        },
        { "@type": "ListItem", position: 3, name: service.title[locale], item: url },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q[locale],
        acceptedAnswer: { "@type": "Answer", text: faq.a[locale] },
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

export function ServiceDetailPage({ slug, locale }: { slug: string; locale: Locale }) {
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      <ServiceJsonLd service={service} locale={locale} />
      <main className="relative min-h-screen overflow-x-hidden">
        <ServiceDetailView service={service} />
        {/* Fuera de ed-light-scope: el footer tiene colores oscuros fijos. */}
        <Footer />
      </main>
    </>
  )
}
