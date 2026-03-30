import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce Codifikai: equipo, tecnología y visión. Agencia de desarrollo de software, IA y automatización en Colombia y Latinoamérica.",
  keywords: [
    "agencia desarrollo software Colombia",
    "empresa tecnología IA",
    "equipo Codifikai",
    "desarrollo software LATAM",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Nosotros | Codifikai",
    description:
      "Equipo, stack tecnológico y valores: soluciones digitales con inteligencia artificial.",
    url: "/about",
  },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
