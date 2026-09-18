import type { Metadata } from "next"

import { ServiceDetailPage } from "@/components/pages/service-detail-page"
import { SERVICES, getServiceBySlug } from "@/lib/services"
import { serviceMetadata } from "@/lib/seo"

type Params = { slug: string }

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

  return serviceMetadata(
    "en",
    service.slug,
    service.seo.title.en,
    service.seo.description.en,
    service.seo.keywords.en
  )
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  return <ServiceDetailPage slug={slug} locale="en" />
}
