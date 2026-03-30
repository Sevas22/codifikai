import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones generales de uso del sitio web y de los servicios de Codifikai.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Términos y condiciones | Codifikai",
    description: "Condiciones de uso del sitio y contratación de servicios.",
    url: "/terms",
  },
}

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children
}
