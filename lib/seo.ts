import type { Metadata } from "next"

import {
  DEFAULT_LOCALE,
  OG_LOCALES,
  localeAlternates,
  localePath,
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
  titleDefault: {
    es: `${siteName} | Sistemas de IA y Automatización Empresarial`,
    en: `${siteName} | Enterprise AI Systems and Automation`,
  },
  description: {
    es: "Codifikai diseña sistemas de IA, automatización inteligente y workflows empresariales para equipos en Colombia y Latinoamérica. Plataformas web, apps y automatización de procesos de negocio.",
    en: "Codifikai designs AI systems, intelligent automation and enterprise workflows for teams in Colombia and Latin America. Web platforms, apps and business process automation.",
  },
  ogTitle: {
    es: `${siteName} | Sistemas de IA Empresarial`,
    en: `${siteName} | Enterprise AI Systems`,
  },
  keywords: {
    es: [
      "inteligencia artificial",
      "desarrollo de software",
      "desarrollo web Colombia",
      "automatización empresarial",
      "marketing digital",
      "SEO",
      "software a medida",
      "IA empresas",
    ],
    en: [
      "artificial intelligence",
      "software development",
      "web development Colombia",
      "business automation",
      "digital marketing",
      "SEO",
      "custom software",
      "AI for business",
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
    title: { es: "Sobre nosotros", en: "About us" },
    description: {
      es: "Quiénes somos en Codifikai: historia, visión, equipo fundador y el stack con el que construimos software, automatización con IA y presencia digital.",
      en: "Who we are at Codifikai: history, vision, founding team and the stack we use to build software, AI automation and digital presence.",
    },
    keywords: {
      es: ["agencia de IA", "equipo Codifikai", "desarrollo de software", "automatización empresarial"],
      en: ["AI agency", "Codifikai team", "software development", "business automation"],
    },
  },
  services: {
    path: "/services",
    title: { es: "Servicios", en: "Services" },
    description: {
      es: "Desarrollo web, software a la medida, automatización con IA, marketing digital y diseño de marca para empresas en Colombia y LATAM.",
      en: "Web development, custom software, AI automation, digital marketing and brand design for companies in Colombia and Latin America.",
    },
    keywords: {
      es: [
        "servicios de desarrollo de software",
        "automatización con inteligencia artificial",
        "desarrollo web para empresas",
        "software a la medida",
      ],
      en: [
        "software development services",
        "AI automation",
        "web development for business",
        "custom software",
      ],
    },
  },
  blog: {
    path: "/blog",
    title: { es: "Blog", en: "Blog" },
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
    title: { es: "Contacto", en: "Contact" },
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

/** Metadatos de un artículo del blog. */
export function articleMetadata(
  locale: Locale,
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

  return {
    title,
    description,
    keywords,
    alternates: localeAlternates(locale, path),
    openGraph: {
      type: "article",
      locale: OG_LOCALES[locale],
      url: localePath(locale, path),
      siteName,
      title: `${title} | ${siteName}`,
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
