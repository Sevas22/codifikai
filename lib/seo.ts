import type { Metadata } from "next"

import { BLOG_LOCALE } from "@/lib/blog-paths"
import {
  DEFAULT_LOCALE,
  OG_LOCALES,
  localeAlternates,
  localePath,
  singleLocaleAlternates,
  type Locale,
} from "@/lib/i18n"
import { getSiteUrl, siteName } from "@/lib/site"

/**
 * Metadatos por idioma, en un solo sitio.
 *
 * Cada página existe en dos URLs indexables y cada una necesita su título,
 * su descripción y su bloque `alternates` con las etiquetas `hreflang`. Tener
 * los dos idiomas juntos evita que uno se quede atrás cuando se edita el otro.
 */

type Bilingual = { es: string; en: string }
type BilingualList = { es: string[]; en: string[] }

const siteUrl = getSiteUrl()

/**
 * Imagen social por defecto.
 *
 * Se declara explícitamente en vez de confiar en que Next resuelva
 * `app/opengraph-image.tsx` por convención: con dos layouts raíz esa
 * resolución dejó de aplicarse y las páginas salían sin `og:image`, así que
 * cualquier enlace compartido aparecía sin tarjeta.
 */
const OG_IMAGE = {
  url: `${siteUrl}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: siteName,
}

/** Bloque común a todas las páginas: canónico, hreflang y Open Graph. */
function common(locale: Locale, path: string, title: string, description: string) {
  return {
    description,
    alternates: localeAlternates(locale, path),
    openGraph: {
      type: "website" as const,
      locale: OG_LOCALES[locale],
      alternateLocale: [OG_LOCALES[locale === "es" ? "en" : "es"]],
      url: localePath(locale, path),
      siteName,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [OG_IMAGE.url],
    },
  }
}

/* -------------------------------------------------------------------------- */
/* Raíz                                                                        */
/* -------------------------------------------------------------------------- */

const ROOT: {
  titleDefault: Bilingual
  description: Bilingual
  ogTitle: Bilingual
  keywords: BilingualList
} = {
  // La identidad va en el título: el término por el que queremos que nos
  // encuentren es "agencia de inteligencia artificial", no uno genérico de
  // desarrollo. El resto de servicios se nombra en la descripción.
  titleDefault: {
    es: `${siteName} | Agencia de Inteligencia Artificial para Empresas`,
    en: `${siteName} | Artificial Intelligence Agency for Businesses`,
  },
  description: {
    es: "Agencia de inteligencia artificial en Colombia. Automatizamos procesos con agentes de IA y creamos software a la medida para crecer sin multiplicar el equipo.",
    en: "Artificial intelligence agency in Colombia. We automate processes with AI agents and build custom software so you grow without growing headcount.",
  },
  ogTitle: {
    es: `${siteName} | Agencia de Inteligencia Artificial`,
    en: `${siteName} | Artificial Intelligence Agency`,
  },
  // Ordenadas por prioridad: núcleo de IA, luego desarrollo, luego servicios.
  keywords: {
    es: [
      "agencia de inteligencia artificial",
      "inteligencia artificial para empresas",
      "automatización con inteligencia artificial",
      "agentes de IA para empresas",
      "automatización de procesos",
      "desarrollo de software a la medida",
      "desarrollo web para empresas",
      "servicios tecnológicos Colombia",
    ],
    en: [
      "artificial intelligence agency",
      "AI for business",
      "AI automation",
      "AI agents for business",
      "business process automation",
      "custom software development",
      "web development for business",
      "technology services Colombia",
    ],
  },
}

export function rootMetadata(locale: Locale): Metadata {
  const description = ROOT.description[locale]

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: ROOT.titleDefault[locale],
      template: `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    generator: "Next.js",
    keywords: ROOT.keywords[locale],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    formatDetection: { email: false, address: false, telephone: false },
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
    alternates: localeAlternates(locale, "/"),
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale],
      alternateLocale: [OG_LOCALES[locale === "es" ? "en" : "es"]],
      url: localePath(locale, "/"),
      siteName,
      title: ROOT.ogTitle[locale],
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ROOT.ogTitle[locale],
      description,
      images: [OG_IMAGE.url],
    },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
  }
}

/* -------------------------------------------------------------------------- */
/* Páginas estáticas                                                           */
/* -------------------------------------------------------------------------- */

type PageSeo = {
  path: string
  title: Bilingual
  description: Bilingual
  keywords?: BilingualList
}

const PAGES = {
  about: {
    path: "/about",
    title: {
      es: "Quiénes somos: agencia de inteligencia artificial",
      en: "About us: an artificial intelligence agency",
    },
    description: {
      es: "Codifikai es una agencia de inteligencia artificial en Colombia. Conoce al equipo fundador, cómo trabajamos y con qué tecnologías construimos IA y software.",
      en: "Codifikai is an artificial intelligence agency in Colombia. Meet the founding team, how we work and the technologies we use to build AI and software.",
    },
    keywords: {
      es: ["agencia de inteligencia artificial Colombia", "equipo Codifikai", "empresa de IA", "desarrollo de software a la medida"],
      en: ["artificial intelligence agency Colombia", "Codifikai team", "AI company", "custom software development"],
    },
  },
  services: {
    path: "/services",
    title: {
      es: "Servicios de IA y desarrollo de software a la medida",
      en: "AI services and custom software development",
    },
    description: {
      es: "Inteligencia artificial como núcleo, software a la medida para construirla y servicios tecnológicos que la hacen crecer: desarrollo web, marketing y marca.",
      en: "AI automation at the core, custom software development to build it, and the technology services that help it grow: web, marketing and brand.",
    },
    keywords: {
      es: [
        "servicios de inteligencia artificial",
        "automatización con inteligencia artificial",
        "desarrollo de software a la medida",
        "servicios tecnológicos para empresas",
      ],
      en: [
        "artificial intelligence services",
        "AI automation",
        "custom software development",
        "technology services for business",
      ],
    },
  },
  blog: {
    path: "/blog",
    title: {
      es: "Blog de inteligencia artificial para empresas",
      en: "Artificial intelligence blog for businesses",
    },
    description: {
      es: "Guías prácticas de inteligencia artificial, automatización y software a medida para empresas de Cundinamarca y Boyacá.",
      en: "Practical guides on artificial intelligence, automation and custom software for companies in Colombia.",
    },
    keywords: {
      es: ["blog IA Colombia", "automatización Cundinamarca", "inteligencia artificial pymes"],
      en: ["AI blog", "business automation", "AI for small business"],
    },
  },
  contact: {
    path: "/contact",
    title: {
      es: "Contacto: agencia de inteligencia artificial",
      en: "Contact an artificial intelligence agency",
    },
    description: {
      es: "Cuéntanos tu reto y te decimos si hay algo que se pueda automatizar. Respondemos por WhatsApp, correo o teléfono.",
      en: "Tell us your challenge and we'll tell you whether there's something worth automating. Reach us on WhatsApp, email or phone.",
    },
  },
  privacy: {
    path: "/privacy",
    title: { es: "Política de privacidad", en: "Privacy policy" },
    description: {
      es: "Tratamiento de datos personales, bases legales y derechos de los titulares.",
      en: "Personal data processing, legal bases and data subject rights.",
    },
  },
  terms: {
    path: "/terms",
    title: { es: "Términos y condiciones", en: "Terms and conditions" },
    description: {
      es: "Condiciones de uso del sitio y de la contratación de servicios.",
      en: "Terms of use for the site and for engaging our services.",
    },
  },
} satisfies Record<string, PageSeo>

export type PageKey = keyof typeof PAGES

export function pageMetadata(key: PageKey, locale: Locale): Metadata {
  const page = PAGES[key]
  const title = page.title[locale]
  const description = page.description[locale]
  const ogTitle = `${title} | ${siteName}`

  return {
    title,
    ...common(locale, page.path, ogTitle, description),
    ...("keywords" in page && page.keywords
      ? { keywords: page.keywords[locale] }
      : {}),
  }
}

/* -------------------------------------------------------------------------- */
/* Páginas dinámicas                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Metadatos de una subpágina de servicio. El título viene ya con la marca, así
 * que se marca `absolute` para que la plantilla no la añada dos veces.
 */
export function serviceMetadata(
  locale: Locale,
  slug: string,
  seoTitle: string,
  description: string,
  keywords: string[]
): Metadata {
  return {
    title: { absolute: seoTitle },
    keywords,
    ...common(locale, `/services/${slug}`, seoTitle, description),
  }
}

/** Largo a partir del cual Google corta el título en resultados. */
export const TITLE_DISPLAY_LIMIT = 60

/**
 * Metadatos de un artículo del blog. Existen solo en `BLOG_LOCALE`: sin
 * alternativa en inglés.
 */
export function articleMetadata(
  slug: string,
  title: string,
  description: string,
  keywords: string[],
  publishedTime: string,
  modifiedTime: string,
  image?: string
): Metadata {
  const images = image ? [{ url: image }] : [OG_IMAGE]
  const path = `/blog/${slug}`
  // El sufijo de marca solo se agrega si cabe: en un título largo empuja la
  // palabra clave fuera de lo que Google muestra.
  const branded = `${title} | ${siteName}`
  const fullTitle = branded.length <= TITLE_DISPLAY_LIMIT ? branded : title

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: singleLocaleAlternates(BLOG_LOCALE, path),
    openGraph: {
      type: "article",
      locale: OG_LOCALES[BLOG_LOCALE],
      url: localePath(BLOG_LOCALE, path),
      siteName,
      title: fullTitle,
      description,
      publishedTime,
      modifiedTime,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [OG_IMAGE.url],
    },
  }
}

export { DEFAULT_LOCALE }
