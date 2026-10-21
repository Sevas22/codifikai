/**
 * Los tres temas sobre los que el blog construye autoridad. Cada artículo
 * declara uno en su frontmatter (`pillar`): sirve para agrupar el listado,
 * priorizar los artículos relacionados y enlazar al servicio que le
 * corresponde. Ver `content/blog/STRATEGY.md`.
 */
export const BLOG_PILLARS = {
  "seo-geo": { label: "SEO, GEO y AEO", serviceSlug: "seo-geo" },
  "agentes-ia": { label: "Agentes de IA", serviceSlug: "ai-agents" },
  automatizacion: { label: "Automatización con IA", serviceSlug: "ai-automation" },
} as const

export type BlogPillar = keyof typeof BLOG_PILLARS

export function isBlogPillar(value: unknown): value is BlogPillar {
  return typeof value === "string" && value in BLOG_PILLARS
}
