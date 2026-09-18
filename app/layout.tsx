import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { LanguageProvider } from "@/components/providers/language-provider"
import { MouseAmbientProvider } from "@/components/providers/mouse-ambient-provider"
import { SiteInteractiveBackground } from "@/components/site-interactive-background"
import { GoogleTagManager } from "@/components/google-tag-manager"
import { PushleadsAgentWidget } from "@/components/pushleads-agent-widget"
import { JsonLdRoot } from "@/components/seo/json-ld"
import { getSiteUrl, siteName } from "@/lib/site"
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Sistemas de IA y Automatización Empresarial`,
    template: `%s | ${siteName}`,
  },
  description:
    "Codifikai diseña sistemas de IA, automatización inteligente y workflows empresariales para equipos en Colombia y Latinoamérica. Plataformas web, apps y automatización de procesos de negocio.",
  applicationName: siteName,
  generator: "Next.js",
  keywords: [
    "inteligencia artificial",
    "desarrollo de software",
    "desarrollo web Colombia",
    "automatización empresarial",
    "marketing digital",
    "SEO",
    "low code",
    "agencia digital",
    "software a medida",
    "IA empresas",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName,
    title: `${siteName} | Sistemas de IA Empresarial`,
    description:
      "Sistemas de IA, automatización inteligente y workflows empresariales diseñados para escalar operaciones de negocio.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Sistemas de IA Empresarial`,
    description:
      "IA empresarial, infraestructura de automatización y workflows inteligentes para equipos modernos.",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <JsonLdRoot />
        <GoogleTagManager />
        <ThemeProvider>
          <LanguageProvider defaultLanguage="en">
            <MouseAmbientProvider>
              <SiteInteractiveBackground />
              <div className="relative z-10 min-h-screen overflow-x-clip">{children}</div>
            </MouseAmbientProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <PushleadsAgentWidget />
      </body>
    </html>
  )
}
