import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site"

// Crawlers de motores generativos: se listan explícitamente (permitidos,
// igual que "*") para que quede documentado que el acceso es intencional —
// GEO depende de que estos bots puedan leer el sitio.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot-Extended",
]

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl()
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/admin/"],
      })),
    ],
    sitemap: `${site}/sitemap.xml`,
  }
}
