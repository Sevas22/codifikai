/**
 * Checklist GEO (Generative Engine Optimization): señales que ayudan a que
 * respuestas de IA (ChatGPT, Perplexity, AI Overviews) citen o resuman el
 * artículo. Heurísticas locales sobre el Markdown fuente, sin servicios externos.
 */

import { extractFaqs } from "@/lib/faq-extract"

export type GeoCheck = {
  id: string
  label: string
  passed: boolean
}

export type GeoScoreInput = {
  content: string
  city: string
}

export type GeoScoreResult = {
  score: number
  checks: GeoCheck[]
}

const QUESTION_STARTS = ["qué", "cómo", "por qué", "cuándo", "dónde", "cuánto", "cuál"]

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

function countListBlocks(content: string): number {
  const lines = content.split("\n")
  let blocks = 0
  let inList = false
  for (const line of lines) {
    const isListLine = /^\s*([-*]|\d+\.)\s+/.test(line)
    if (isListLine && !inList) {
      blocks += 1
      inList = true
    } else if (!isListLine && line.trim() === "") {
      inList = false
    } else if (!isListLine) {
      inList = false
    }
  }
  return blocks
}

function averageSentenceLength(content: string): number {
  const plain = content.replace(/^#{1,6}\s.*$/gm, "").replace(/[*_`>#-]/g, "")
  const sentences = plain
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length > 2)
  if (sentences.length === 0) return 0
  const totalWords = sentences.reduce((sum, s) => sum + s.split(/\s+/).filter(Boolean).length, 0)
  return totalWords / sentences.length
}

function markdownLinks(content: string): string[] {
  const matches = content.matchAll(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g)
  return Array.from(matches, (m) => m[2].trim())
}

const SUMMARY_HEADING = /^##\s+(resumen|en resumen|tl;?dr|conclusi[oó]n)\s*$/i

export function scoreGeo(input: GeoScoreInput): GeoScoreResult {
  const { content, city } = input
  const firstP = firstParagraph(content)
  const heads = headings(content)
  const lowerHeads = heads.map((h) => h.toLowerCase())
  const lowerContent = content.toLowerCase()
  const avgSentenceLen = averageSentenceLength(content)
  const links = markdownLinks(content)

  const checks: GeoCheck[] = [
    {
      id: "directAnswerFirstParagraph",
      label: "Respuesta directa en el primer párrafo (breve y concreta)",
      passed: firstP.length > 0 && firstP.length <= 400,
    },
    {
      id: "questionHeading",
      label: "Al menos un encabezado en forma de pregunta",
      passed: lowerHeads.some((h) => QUESTION_STARTS.some((q) => h.startsWith(q))),
    },
    {
      id: "hasLists",
      label: "Al menos 2 listas (viñetas o numeradas)",
      passed: countListBlocks(content) >= 2,
    },
    {
      id: "mentionsCity",
      label: "Menciona la ciudad/zona objetivo en el cuerpo",
      passed: city.length > 0 && lowerContent.includes(city.toLowerCase().split(",")[0].trim()),
    },
    {
      id: "mentionsBrand",
      label: "Menciona a Codifikai como marca/entidad",
      passed: lowerContent.includes("codifikai"),
    },
    {
      id: "shortSentences",
      label: "Frases con longitud promedio ≤ 22 palabras",
      passed: avgSentenceLen > 0 && avgSentenceLen <= 22,
    },
    {
      id: "boldKeyIdeas",
      label: "Ideas clave resaltadas en negrita (**texto**)",
      passed: /\*\*[^*]+\*\*/.test(content),
    },
    {
      id: "hasSubheadings",
      label: "Al menos 3 subtítulos (H2/H3) para estructurar la respuesta",
      passed: heads.length >= 3,
    },
    {
      id: "recentYear",
      label: "Menciona un año reciente (2025 o 2026)",
      passed: /202[56]/.test(content),
    },
    {
      id: "hasFaqSection",
      label: "Incluye sección de Preguntas frecuentes (## Preguntas frecuentes)",
      passed: extractFaqs(content).length > 0,
    },
    {
      id: "hasCitation",
      label: "Cita al menos 1 fuente externa (enlace fuera de codifikai.com)",
      passed: links.some((url) => /^https?:\/\//.test(url) && !url.includes("codifikai.com")),
    },
    {
      id: "hasStatistic",
      label: "Incluye al menos un dato o estadística (%, cifra)",
      passed: /\d+([.,]\d+)?\s?%/.test(content) || /\b\d{2,}\b/.test(content.replace(/202[0-9]/g, "")),
    },
    {
      id: "hasSummary",
      label: "Incluye un resumen o conclusión explícita (## Resumen / ## Conclusión)",
      passed: content.split("\n").some((line) => SUMMARY_HEADING.test(line.trim())),
    },
  ]

  const score = Math.round((checks.filter((c) => c.passed).length / checks.length) * 100)
  return { score, checks }
}
