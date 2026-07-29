/**
 * Checklist de SEO on-page, estilo Rank Math/Yoast, calculado localmente
 * (sin depender de ningún servicio externo de datos de keywords).
 */

export type SeoCheck = {
  id: string
  label: string
  passed: boolean
}

export type SeoScoreInput = {
  title: string
  description: string
  keyword: string
  content: string
  slug: string
}

export type SeoScoreResult = {
  score: number
  checks: SeoCheck[]
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function firstParagraph(content: string): string {
  const withoutHeadings = content
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n")
  const paragraphs = withoutHeadings.split(/\n\s*\n/).map((p) => p.trim())
  return paragraphs.find((p) => p.length > 0) ?? ""
}

function headings(content: string): string[] {
  return content
    .split("\n")
    .filter((line) => /^#{2,3}\s/.test(line.trim()))
    .map((line) => line.replace(/^#{2,3}\s/, "").trim())
}

export function scoreSeo(input: SeoScoreInput): SeoScoreResult {
  const { title, description, keyword, content, slug } = input
  const nTitle = normalize(title)
  const nDescription = normalize(description)
  const nKeyword = normalize(keyword)
  const nContent = normalize(content)
  const nSlug = normalize(slug)
  const nFirstParagraph = normalize(firstParagraph(content))
  const nHeadings = headings(content).map(normalize)

  const checks: SeoCheck[] = [
    {
      id: "keywordInTitle",
      label: "Keyword principal en el título",
      passed: nKeyword.length > 0 && nTitle.includes(nKeyword),
    },
    {
      id: "keywordInDescription",
      label: "Keyword principal en la meta descripción",
      passed: nKeyword.length > 0 && nDescription.includes(nKeyword),
    },
    {
      id: "titleLength",
      label: "Título entre 30 y 65 caracteres",
      passed: title.length >= 30 && title.length <= 65,
    },
    {
      id: "descriptionLength",
      label: "Meta descripción entre 120 y 160 caracteres",
      passed: description.length >= 120 && description.length <= 160,
    },
    {
      id: "keywordInFirstParagraph",
      label: "Keyword aparece en el primer párrafo",
      passed: nKeyword.length > 0 && nFirstParagraph.includes(nKeyword),
    },
    {
      id: "keywordInHeading",
      label: "Keyword aparece en al menos un H2/H3",
      passed: nKeyword.length > 0 && nHeadings.some((h) => h.includes(nKeyword)),
    },
    {
      id: "minWordCount",
      label: "Al menos 600 palabras en el cuerpo",
      passed: wordCount(content) >= 600,
    },
    {
      id: "hasInternalLink",
      label: "Al menos 1 enlace interno (/contact, /services, /blog/...)",
      passed: /\]\((\/(contact|services|blog)[^)]*)\)/.test(content),
    },
    {
      id: "slugMatchesKeyword",
      label: "El slug refleja la keyword principal",
      passed:
        nKeyword.length > 0 &&
        nKeyword
          .split(/\s+/)
          .filter(Boolean)
          .some((word) => nSlug.includes(word)),
    },
    {
      id: "hasSubheadings",
      label: "Al menos 2 subtítulos (H2/H3)",
      passed: headings(content).length >= 2,
    },
  ]

  const score = Math.round((checks.filter((c) => c.passed).length / checks.length) * 100)
  return { score, checks }
}
