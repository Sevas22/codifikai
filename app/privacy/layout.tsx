import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Política de privacidad | Codifikai",
  description:
    "Información sobre el tratamiento de datos personales en Codifikai: finalidades, derechos y contacto.",
}

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children
}
