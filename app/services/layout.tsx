import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios Codifikai: desarrollo web y low code, software a medida, marketing digital, SEO, automatización e inteligencia artificial para empresas.",
  keywords: [
    "desarrollo web empresas",
    "software a medida",
    "marketing digital SEO",
    "automatización procesos",
    "inteligencia artificial empresas",
    "low code",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Servicios | Codifikai",
    description:
      "Desarrollo, IA, marketing y automatización: catálogo de soluciones para hacer crecer tu negocio.",
    url: "/services",
  },
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children
}
