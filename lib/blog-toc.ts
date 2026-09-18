/**
 * Utilidades de lectura sobre el HTML ya renderizado del artículo.
 *
 * `marked` genera los encabezados sin `id`, así que no hay dónde anclar un
 * índice ni se puede enlazar a una sección concreta desde fuera. Aquí se les
 * añade el ancla y se extrae la tabla de contenidos de una sola pasada, en el
 * servidor, para no cargar el cliente con un parseo del artículo entero.
 */

export type TocEntry = { id: string; text: string; level: 2 | 3 }

/** Palabras por minuto de lectura en español para un texto divulgativo. */
const WORDS_PER_MINUTE = 200

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    // Quita diacríticos: "automatización" → "automatizacion".
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60)
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "")
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
}

/**
 * Devuelve el HTML con `id` en cada h2/h3 y la tabla de contenidos.
 * Los encabezados que ya traen `id` se respetan.
 */
export function withHeadingIds(html: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = []
  const used = new Set<string>()

  const out = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g,
    (match, levelRaw: string, attrs: string, inner: string) => {
      const level = Number(levelRaw) as 2 | 3
      const text = decodeEntities(stripTags(inner)).replace(/\s+/g, " ").trim()
      if (!text) return match

      const existing = attrs.match(/\sid="([^"]+)"/)
      let id = existing ? existing[1] : slugify(text)
      if (!id) return match

      // Dos secciones pueden llamarse igual; el ancla tiene que ser única.
      if (!existing) {
        let suffix = 2
        const base = id
        while (used.has(id)) id = `${base}-${suffix++}`
      }
      used.add(id)
      toc.push({ id, text, level })

      const nextAttrs = existing ? attrs : `${attrs} id="${id}"`
      return `<h${level}${nextAttrs}>${inner}</h${level}>`
    }
  )

  return { html: out, toc }
}

/** Minutos estimados de lectura, mínimo 1. */
export function estimateReadingMinutes(html: string): number {
  const words = stripTags(html).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
