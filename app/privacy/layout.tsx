import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Información sobre el tratamiento de datos personales en Codifikai: finalidades, derechos ARCO y contacto.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Política de privacidad | Codifikai",
    description: "Tratamiento de datos personales, bases legales y derechos del titular.",
    url: "/privacy",
  },
}

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children
}
