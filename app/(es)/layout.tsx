import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

import { RootShell } from "@/components/root-shell"
import { rootMetadata } from "@/lib/seo"

import "../globals.css"

/**
 * Layout raíz del español, que vive en la raíz del dominio.
 *
 * El sitio tiene un layout raíz por idioma para poder emitir el `lang`
 * correcto en el `<html>` desde el servidor. Todo lo compartido está en
 * `RootShell`.
 */
export const metadata: Metadata = rootMetadata("es")

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

export default function SpanishRootLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="es">{children}</RootShell>
}
