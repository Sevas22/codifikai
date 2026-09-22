import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

import { RootShell } from "@/components/root-shell"
import { rootMetadata } from "@/lib/seo"

import "../globals.css"

/**
 * Layout raíz del inglés, bajo el prefijo `/en`.
 *
 * Es un layout raíz propio —con su `<html>` y su `<body>`— para que el
 * atributo `lang` sea correcto ya en el HTML que sirve el servidor, sin
 * depender de que se ejecute JavaScript.
 */
export const metadata: Metadata = rootMetadata("en")

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>
}
