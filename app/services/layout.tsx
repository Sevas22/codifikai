import type { Metadata } from "next"
import type { ReactNode } from "react"

import { siteName } from "@/lib/site"

/**
 * Este layout envuelve tanto a /services como a /services/[slug], así que aquí
 * solo van los metadatos por defecto: el JSON-LD del catálogo vive en la página
 * índice, y cada subpágina emite el suyo. Antes estaba aquí y se duplicaba en
 * todas las subpáginas.
 */
export const metadata: Metadata = {
  // Se redeclara la plantilla del layout raíz: fijar `title` como texto plano
  // aquí la anulaba para /services/[slug], que salía sin "| Codifikai".
  title: { default: "Servicios", template: `%s | ${siteName}` },
  description:
    "Desarrollo web, software a la medida, automatización con IA, marketing digital y diseño de marca para empresas en Colombia y LATAM.",
  keywords: [
    "servicios de desarrollo de software",
    "automatización con inteligencia artificial",
    "desarrollo web para empresas",
    "software a la medida",
    "marketing digital y SEO",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Servicios | Codifikai",
    description:
      "Desarrollo web, software a la medida, automatización con IA, marketing digital y diseño de marca para empresas.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios | Codifikai",
    description:
      "Desarrollo web, software a la medida, automatización con IA, marketing digital y diseño de marca para empresas.",
  },
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
