import type { MetadataRoute } from "next"

import { getAllPosts } from "@/lib/blog"
import { localePath } from "@/lib/i18n"
import { SERVICES } from "@/lib/services"
import { getSiteUrl } from "@/lib/site"

/**
 * Sitemap con alternancia de idioma.
 *
 * Cada página aparece dos veces —una por idioma— y ambas declaran el bloque
 * `alternates.languages`. Es la señal que necesita Google para entender que no
 * son contenido duplicado sino la misma página en dos idiomas, y para servir
 * la correcta según el país de quien busca.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date()

  const url = (locale: "es" | "en", path: string) => `${base}${localePath(locale, path)}`

  /** Cada ruta neutra se expande a sus dos versiones, enlazadas entre sí. */
  const withAlternates = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: number,
    lastModified: Date = now
  ): MetadataRoute.Sitemap =>
    (["es", "en"] as const).map((locale) => ({
      url: url(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          "es-CO": url("es", path),
          en: url("en", path),
          "x-default": url("es", path),
        },
      },
    }))

  const staticEntries = [
    ...withAlternates("/", "weekly", 1),
    ...withAlternates("/about", "monthly", 0.9),
    ...withAlternates("/services", "weekly", 0.95),
    ...withAlternates("/blog", "daily", 0.8),
    ...withAlternates("/contact", "monthly", 0.8),
    ...withAlternates("/privacy", "yearly", 0.4),
    ...withAlternates("/terms", "yearly", 0.4),
  ]

  // La prioridad refleja el posicionamiento: la IA es el núcleo y su página
  // pesa más que los servicios que la rodean. No garantiza nada por sí sola,
  // pero es coherente con el resto de señales en vez de contradecirlas.
  const TIER_PRIORITY = { ai: 0.95, build: 0.9, tech: 0.8 } as const

  const serviceEntries = SERVICES.flatMap((service) =>
    withAlternates(`/services/${service.slug}`, "monthly", TIER_PRIORITY[service.tier])
  )

  const posts = await getAllPosts()
  const postEntries = posts.flatMap((post) =>
    withAlternates(`/blog/${post.slug}`, "monthly", 0.6, new Date(post.updatedAt))
  )

  return [...staticEntries, ...serviceEntries, ...postEntries]
}
