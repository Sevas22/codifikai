import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { LanguageProvider } from "@/components/providers/language-provider"
import { MouseAmbientProvider } from "@/components/providers/mouse-ambient-provider"
import { SiteInteractiveBackground } from "@/components/site-interactive-background"
import { CustomCursor } from "@/components/custom-cursor"
import { GoogleTagManager } from "@/components/google-tag-manager"
import { JsonLdRoot } from "@/components/seo/json-ld"
import { getSiteUrl, siteName } from "@/lib/site"
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Agencia de inteligencia artificial y desarrollo de software`,
    template: `%s | ${siteName}`,
  },
  description:
    "Codifikai: agencia de IA y desarrollo de software en Colombia y LATAM. Desarrollo web, apps, automatización, marketing digital y soluciones empresariales con inteligencia artificial.",
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
    title: `${siteName} | Agencia de inteligencia artificial`,
    description:
      "Transformamos ideas en soluciones digitales: desarrollo web, software, IA y automatización para empresas.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Agencia de inteligencia artificial`,
    description:
      "Desarrollo web, software e IA para empresas. Colombia y Latinoamérica.",
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <JsonLdRoot />
        <GoogleTagManager />
        <ThemeProvider defaultTheme="dark">
          <LanguageProvider defaultLanguage="es">
            <MouseAmbientProvider>
              <SiteInteractiveBackground />
              <CustomCursor />
              <div className="relative z-10 min-h-screen overflow-x-clip">{children}</div>
            </MouseAmbientProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
