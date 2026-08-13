import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce Codifikai: equipo, stack tecnológico y visión. Sistemas de IA, automatización y software empresarial construidos para escalar operaciones.",
  keywords: [
    "agencia de IA",
    "automatización empresarial",
    "equipo Codifikai",
    "desarrollo de software",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Nosotros | Codifikai",
    description:
      "Equipo, stack tecnológico y valores: soluciones digitales impulsadas por inteligencia artificial.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Codifikai",
    description:
      "Equipo, stack tecnológico y valores: soluciones digitales impulsadas por inteligencia artificial.",
  },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
