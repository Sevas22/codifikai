import { localePath, type Locale } from "@/lib/i18n"

/**
 * Los artículos se escriben en español, para empresas de Colombia, y tienen
 * una única URL. La versión en inglés del sitio los enlaza tal cual, marcados
 * como contenido en español, en vez de servir una copia sin traducir bajo /en.
 *
 * Vive aparte de `lib/blog.ts` porque aquel lee del disco y no puede entrar en
 * componentes de cliente.
 */
export const BLOG_LOCALE: Locale = "es"

export function blogPostPath(slug: string): string {
  return localePath(BLOG_LOCALE, `/blog/${slug}`)
}

/** Ruta de un artículo, sin prefijo de idioma. */
export function isBlogPostPath(neutralPath: string): boolean {
  return /^\/blog\/[^/]+\/?$/.test(neutralPath)
}
