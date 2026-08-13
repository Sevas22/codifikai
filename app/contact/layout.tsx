import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Hablemos de tu proyecto. Cuéntanos tu reto o agenda una llamada estratégica con Codifikai — sistemas de IA, automatización y software a medida.",
  keywords: [
    "contacto Codifikai",
    "agendar llamada IA",
    "consultoría inteligencia artificial",
    "desarrollo de software Colombia",
    "automatización empresarial",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contacto | CodifikAI",
    description:
      "Cuéntanos tu reto o agenda una llamada estratégica. Respondemos en menos de 24 horas hábiles.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Codifikai",
    description:
      "Cuéntanos tu reto o agenda una llamada estratégica. Respondemos en menos de 24 horas hábiles.",
  },
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
