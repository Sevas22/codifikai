import React from "react"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { GoogleTagManager } from "@/components/google-tag-manager"
import { LanguageProvider } from "@/components/providers/language-provider"
import { MouseAmbientProvider } from "@/components/providers/mouse-ambient-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { JsonLdRoot } from "@/components/seo/json-ld"
import { SiteInteractiveBackground } from "@/components/site-interactive-background"
import { SoundToggle } from "@/components/sound-toggle"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { LOCALE_TAGS, type Locale } from "@/lib/i18n"

/**
 * Carcasa común de las dos raíces del sitio.
 *
 * El sitio tiene dos layouts raíz —uno por idioma— para poder emitir el
 * `lang` correcto en el `<html>` desde el servidor. Todo lo demás (fuentes,
 * proveedores, scripts) vive aquí una sola vez, así que cada layout se queda
 * en cinco líneas y no hay riesgo de que se desincronicen.
 */

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export function RootShell({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <html lang={LOCALE_TAGS[locale]} className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <JsonLdRoot />
        <GoogleTagManager />
        <ThemeProvider>
          {/* El idioma lo fija la ruta, no un estado del navegador. */}
          <LanguageProvider language={locale}>
            <MouseAmbientProvider>
              <SiteInteractiveBackground />
              <div className="relative z-10 min-h-screen overflow-x-clip">{children}</div>
            </MouseAmbientProvider>
            {/* Dentro del proveedor de idioma: fuera de él, en /en anunciaban
                sus etiquetas en español. */}
            <SoundToggle />
            <WhatsAppFloat />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
