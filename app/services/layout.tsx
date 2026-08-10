import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getSiteUrl, siteName } from "@/lib/site"

const SERVICES = [
  {
    name: "AI Sales Systems",
    description: "CRM, pipeline intelligence y orquestación comercial impulsados por IA.",
  },
  {
    name: "Enterprise Automation",
    description: "Automatización de flujos entre equipos, herramientas y datos.",
  },
  {
    name: "Workflow Intelligence",
    description: "Diseño y ejecución de procesos de negocio con IA integrada.",
  },
  {
    name: "AI Operations",
    description: "Monitoreo, agentes de IA y control operativo en tiempo real.",
  },
  {
    name: "Customer Support AI",
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
    serviceType: "Software development and AI automation",
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
  title: "Solutions",
  description:
    "Enterprise AI infrastructure: sales systems, workflow automation, AI operations, and scalable business systems built for modern teams.",
  keywords: [
    "enterprise AI",
    "intelligent automation",
    "AI sales systems",
    "custom software",
    "business automation",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Solutions | CodifikAI",
    description:
      "AI systems, automation, and enterprise workflows designed to accelerate business growth.",
    url: "/services",
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
