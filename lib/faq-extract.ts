/**
 * Extrae pares pregunta/respuesta de una sección de FAQ en Markdown, para
 * generar schema FAQPage automáticamente. Convención: un H2 "Preguntas
 * frecuentes" / "FAQ" seguido de H3 (cada uno una pregunta) con su
 * respuesta en el/los párrafo(s) siguientes. El contenido es la única
 * fuente de verdad — no hay campos de FAQ separados que mantener sincronizados.
 */

export type Faq = { question: string; answer: string }

const FAQ_HEADING = /^##\s+(preguntas frecuentes|faq)\s*$/i

function stripMarkdownInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim()
}

export function extractFaqs(content: string): Faq[] {
  const lines = content.split("\n")
  const faqStart = lines.findIndex((line) => FAQ_HEADING.test(line.trim()))
  if (faqStart === -1) return []

  const faqs: Faq[] = []
  let question: string | null = null
  let answerLines: string[] = []

  function pushCurrent() {
    if (question) {
      const answer = stripMarkdownInline(answerLines.join(" ").replace(/\s+/g, " ").trim())
      if (answer.length > 0) faqs.push({ question: stripMarkdownInline(question), answer })
    }
    question = null
    answerLines = []
  }

  for (let i = faqStart + 1; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (/^##\s+/.test(trimmed)) break // siguiente sección H2: fin del bloque FAQ
    if (/^###\s+/.test(trimmed)) {
      pushCurrent()
      question = trimmed.replace(/^###\s+/, "")
      continue
    }
    if (question) answerLines.push(trimmed)
  }
  pushCurrent()

  return faqs
}
