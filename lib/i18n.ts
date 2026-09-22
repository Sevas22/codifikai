/**
 * Idiomas del sitio y construcción de rutas por idioma.
 *
 * Español vive en la raíz (`/services`) e inglés bajo prefijo (`/en/services`).
 * Se eligió así para no mover ni una sola de las URLs que Google ya tiene
 * indexadas: el inglés se añade encima sin redirigir nada.
 *
 * Esto sustituye al conmutador que traducía en el navegador. Aquel enfoque
 * dejaba una única URL por página: el buscador solo veía español y el
 * contenido en inglés no existía para nadie que no pulsara el botón.
 */

export const LOCALES = ["es", "en"] as const
export type Locale = (typeof LOCALES)[number]

/** El idioma que se sirve sin prefijo. */
export const DEFAULT_LOCALE: Locale = "es"

/** Códigos completos para `hreflang` y Open Graph. */
export const LOCALE_TAGS: Record<Locale, string> = {
  es: "es-CO",
  en: "en",
}

export const OG_LOCALES: Record<Locale, string> = {
  es: "es_CO",
  en: "en_US",
}

export const LOCALE_NAMES: Record<Locale, string> = {
  es: "Español",
  en: "English",
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "es" || value === "en"
}

/**
 * Ruta interna ya prefijada según el idioma.
 * `localePath("en", "/services")` → `/en/services`
 * `localePath("es", "/services")` → `/services`
 */
export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return normalized
  // La raíz en inglés es "/en", no "/en/".
  return normalized === "/" ? "/en" : `/en${normalized}`
}

/**
 * Quita el prefijo de idioma de una ruta para obtener la ruta "neutra".
 * `stripLocale("/en/services")` → `{ locale: "en", path: "/services" }`
 */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  if (pathname === "/en") return { locale: "en", path: "/" }
  if (pathname.startsWith("/en/")) return { locale: "en", path: pathname.slice(3) }
  return { locale: DEFAULT_LOCALE, path: pathname }
}

/** El otro idioma, para el conmutador de la navegación. */
export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es"
}

/**
 * Bloque `alternates` para `generateMetadata`.
 *
 * Emite el canónico del idioma actual y una etiqueta `hreflang` por idioma,
 * más `x-default` apuntando al español. Es lo que le dice a Google que ambas
 * páginas son la misma en dos idiomas y cuál servir a cada país, en vez de
 * tomarlas por contenido duplicado.
 */
export function localeAlternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      "es-CO": localePath("es", path),
      en: localePath("en", path),
      "x-default": localePath(DEFAULT_LOCALE, path),
    },
  }
}

/**
 * Bloque `alternates` para contenido que existe en un solo idioma.
 *
 * Declarar una versión en otro idioma que en realidad repite el mismo texto es
 * peor que no declararla: Google lo trata como duplicado y deja de confiar en
 * el resto de etiquetas `hreflang` del sitio.
 */
export function singleLocaleAlternates(locale: Locale, path: string) {
  const url = localePath(locale, path)
  return {
    canonical: url,
    languages: {
      [LOCALE_TAGS[locale]]: url,
      "x-default": url,
    },
  }
}
