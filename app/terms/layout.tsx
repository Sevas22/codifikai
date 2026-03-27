import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Términos y condiciones | Codifikai",
  description:
    "Condiciones generales de uso del sitio web y de los servicios de Codifikai.",
}

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children
}
