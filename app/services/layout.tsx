import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getSiteUrl, siteName } from "@/lib/site"

const SERVICES = [
  {
    name: "Sistemas de Ventas con IA",
    description: "CRM, pipeline intelligence y orquestación comercial impulsados por IA.",
  },
  {
    name: "Automatización Empresarial",
    description: "Automatización de flujos entre equipos, herramientas y datos.",
  },
  {
    name: "Inteligencia de Procesos",
    description: "Diseño y ejecución de procesos de negocio con IA integrada.",
  },
  {
    name: "Operaciones con IA",
    description: "Monitoreo, agentes de IA y control operativo en tiempo real.",
  },
  {
    name: "Soporte al Cliente con IA",
    description: "Asistencia al cliente multicanal con escalamiento inteligente.",
  },
  {
    name: "Desarrollo de software a medida",
    description: "Plataformas web y aplicaciones empresariales construidas desde cero para el negocio del cliente.",
  },
]

function ServicesJsonLd() {
  const site = getSiteUrl()
  const provider = { "@type": "Organization", name: siteName, url: site }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Desarrollo de software y automatización con IA",
    provider,
    areaServed: ["CO", "LATAM"],
    url: `${site}/services`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Soluciones Codifikai",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider,
        },
      })),
    },
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  )
}

export const metadata: Metadata = {
  title: "Soluciones",
  description:
    "Infraestructura de IA empresarial: sistemas de ventas, automatización de workflows, operaciones con IA y sistemas de negocio escalables para equipos modernos.",
  keywords: [
    "IA empresarial",
    "automatización inteligente",
    "sistemas de ventas con IA",
    "software a medida",
    "automatización de negocio",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Soluciones | Codifikai",
    description:
      "Sistemas de IA, automatización y workflows empresariales diseñados para acelerar el crecimiento del negocio.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soluciones | Codifikai",
    description:
      "Sistemas de IA, automatización y workflows empresariales diseñados para acelerar el crecimiento del negocio.",
  },
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ServicesJsonLd />
      {children}
    </>
  )
}
