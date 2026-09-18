import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Footer } from "@/components/sections/footer"
import { ServiceDetailView } from "@/components/services/service-detail-view"
import { getSiteUrl, siteName } from "@/lib/site"
import { SERVICES, getServiceBySlug, type Service } from "@/lib/services"

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
export function generateStaticParams(): Params[] {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  const path = `/services/${service.slug}`
  const title = service.seo.title.es
  const description = service.seo.description.es

  return {
    // `absolute` evita que la plantilla añada un segundo "| Codifikai".
    title: { absolute: title },
    description,
    keywords: service.seo.keywords.es,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  }
}

function ServiceJsonLd({ service }: { service: Service }) {
  const site = getSiteUrl()
  const url = `${site}/services/${service.slug}`
  const provider = { "@type": "Organization", name: siteName, url: site }

  const graph = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title.es,
      description: service.seo.description.es,
      serviceType: service.title.es,
      provider,
      areaServed: ["CO", "LATAM"],
      url,
      // Lo que incluye el servicio, para que el buscador pueda enumerarlo.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.title.es,
        itemListElement: service.includes.es.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item, provider },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site },
        { "@type": "ListItem", position: 2, name: "Servicios", item: `${site}/services` },
        { "@type": "ListItem", position: 3, name: service.title.es, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q.es,
        acceptedAnswer: { "@type": "Answer", text: faq.a.es },
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

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      <ServiceJsonLd service={service} />
      <main className="relative min-h-screen overflow-x-hidden">
        <ServiceDetailView service={service} />
        {/* Fuera de ed-light-scope: el footer tiene colores oscuros fijos. */}
        <Footer />
      </main>
    </>
  )
}
