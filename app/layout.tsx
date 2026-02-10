import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { LanguageProvider } from "@/components/providers/language-provider"
import { CustomCursor } from "@/components/custom-cursor"
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: 'Codifikai | Agencia de Inteligencia Artificial',
  description: 'Codifikai - Agencia de IA especializada en desarrollo web, apps, software, marketing y automatización empresarial con inteligencia artificial.',
  generator: 'Codifikai',
  keywords: ['IA', 'inteligencia artificial', 'desarrollo web', 'apps', 'automatización', 'marketing AI', 'agencia digital'],
  authors: [{ name: 'Codifikai' }],
  openGraph: {
    title: 'Codifikai | Agencia de Inteligencia Artificial',
    description: 'Transformamos ideas en soluciones digitales potenciadas por IA',
    type: 'website',
  },
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
        <ThemeProvider defaultTheme="dark">
          <LanguageProvider defaultLanguage="es">
            <CustomCursor />
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
