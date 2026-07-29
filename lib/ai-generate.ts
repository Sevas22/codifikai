import fs from "node:fs"
import path from "node:path"

const AGENT_INSTRUCTIONS = fs.readFileSync(
  path.join(process.cwd(), "content", "blog", "AGENT_INSTRUCTIONS.md"),
  "utf8"
)

// Modelo liviano por defecto: el free tier de Groq da mucho más cupo diario
// de tokens a los modelos "instant" que a los "versatile" de 70B.
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant"

export class DraftGenerationError extends Error {
  code: "refusal" | "empty_response" | "invalid_model_output" | "missing_api_key" | "rate_limit"
  constructor(code: DraftGenerationError["code"], message: string) {
    super(message)
    this.code = code
  }
}

/**
 * Llama al chat completions de Groq (API compatible con OpenAI) pidiendo
 * JSON. Menos robusto que el `output_config`/JSON Schema estricto de
 * Anthropic: aquí solo pedimos `response_format: json_object` y cada llamador
 * valida a mano los campos esperados.
 */
async function callGroqJson(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new DraftGenerationError(
      "missing_api_key",
      "Falta configurar GROQ_API_KEY en .env.local"
    )
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.6,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  })

  if (!response.ok) {
    const errText = await response.text().catch(() => "")

    if (response.status === 429) {
      throw new DraftGenerationError(
        "rate_limit",
        `Se agotó el cupo diario de Groq para el modelo "${GROQ_MODEL}". Prueba con otro modelo (variable GROQ_MODEL en .env.local) o espera a que se reinicie el cupo (~24h).`
      )
    }

    throw new DraftGenerationError(
      "empty_response",
      `Groq respondió con error (${response.status}): ${errText.slice(0, 200)}`
    )
  }

  const data = (await response.json()) as {
    choices?: { finish_reason?: string; message?: { content?: string } }[]
  }

  const choice = data.choices?.[0]
  if (choice?.finish_reason === "content_filter") {
    throw new DraftGenerationError("refusal", "El modelo rechazó generar este contenido")
  }

  const text = choice?.message?.content
  if (!text) {
    throw new DraftGenerationError("empty_response", "El modelo no devolvió contenido")
  }

  return text
}

function parseJson<T>(text: string): T {
  try {
    return JSON.parse(text) as T
  } catch {
    throw new DraftGenerationError("invalid_model_output", "No se pudo interpretar la respuesta del modelo")
  }
}

export type GenerateDraftInput = {
  topic: string
  city: string
  department: "Cundinamarca" | "Boyacá"
  keyword: string
}

export type GenerateDraftResult = {
  title: string
  description: string
  keywords: string[]
  content: string
}

export async function generateBlogDraft(
  input: GenerateDraftInput
): Promise<GenerateDraftResult> {
  const text = await callGroqJson(
    `${AGENT_INSTRUCTIONS}\n\nDevuelve el resultado únicamente en JSON con esta forma exacta: ` +
      `{"title": string, "description": string, "keywords": string[], "content": string}. ` +
      `El campo "content" es el cuerpo del artículo en Markdown (sin frontmatter, empezando directamente con el primer "##").`,
    `Escribe el siguiente artículo del blog:\n\nTema: ${input.topic}\nCiudad/zona: ${input.city}\nDepartamento: ${input.department}\nPalabra clave principal: ${input.keyword}`
  )

  const parsed = parseJson<Partial<GenerateDraftResult>>(text)
  if (!parsed.title || !parsed.content) {
    throw new DraftGenerationError("invalid_model_output", "La respuesta del modelo no trae título o contenido")
  }

  return {
    title: parsed.title,
    description: parsed.description ?? "",
    keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
    content: parsed.content,
  }
}

export type ImproveCheckInput = {
  title: string
  description: string
  content: string
  keyword: string
  city: string
  checkLabel: string
  area: "SEO" | "GEO"
}

export type ImproveCheckResult = {
  title: string
  description: string
  content: string
}

/**
 * Corrige puntualmente UN checklist item de SEO o GEO (ej. "agrega la
 * keyword en el título"), reescribiendo solo lo necesario y devolviendo el
 * artículo completo actualizado.
 */
export async function improveArticleForCheck(input: ImproveCheckInput): Promise<ImproveCheckResult> {
  const text = await callGroqJson(
    `Eres un editor SEO/GEO para el blog de Codifikai (automatización e IA para empresas de Cundinamarca y Boyacá). ` +
      `Te dan un artículo y UN problema puntual a corregir. Cambia SOLO lo mínimo necesario para resolver ese problema ` +
      `y deja el resto del artículo igual. Devuelve JSON con esta forma exacta: ` +
      `{"title": string, "description": string, "content": string} (content en Markdown, sin frontmatter).`,
    `Palabra clave principal: ${input.keyword}\nCiudad/zona: ${input.city}\n\n` +
      `Problema a corregir (checklist ${input.area}): "${input.checkLabel}"\n\n` +
      `Título actual: ${input.title}\nMeta descripción actual: ${input.description}\n\n` +
      `Contenido actual (Markdown):\n${input.content}`
  )

  const parsed = parseJson<Partial<ImproveCheckResult>>(text)
  if (!parsed.content) {
    throw new DraftGenerationError("invalid_model_output", "La respuesta del modelo no trae contenido")
  }

  return {
    title: parsed.title || input.title,
    description: parsed.description || input.description,
    content: parsed.content,
  }
}

export type TopicIdea = {
  topic: string
  city: string
  department: "Cundinamarca" | "Boyacá"
  keyword: string
}

/**
 * Propone nuevos temas para el banco editorial, evitando repetir los que ya
 * existen (publicados, en uso o pendientes).
 */
export async function generateMoreTopics(
  existingTopics: { topic: string; city: string }[],
  count = 8
): Promise<TopicIdea[]> {
  const existingList = existingTopics.map((t) => `- ${t.topic} (${t.city})`).join("\n")

  const text = await callGroqJson(
    `${AGENT_INSTRUCTIONS}\n\nTu tarea aquí es proponer temas NUEVOS para el calendario editorial (no escribir el artículo). ` +
      `Cruza municipios de Cundinamarca y Boyacá con los servicios de Codifikai (IA, automatización, desarrollo de software a medida, marketing digital). ` +
      `No repitas temas ni ciudades ya usados. Devuelve JSON con esta forma exacta: ` +
      `{"topics": [{"topic": string, "city": string, "department": "Cundinamarca" | "Boyacá", "keyword": string}]}.`,
    `Propón ${count} temas nuevos. Temas que ya existen (no repetir ciudad+ángulo):\n${existingList || "(ninguno todavía)"}`
  )

  const parsed = parseJson<{ topics?: Partial<TopicIdea>[] }>(text)
  const topics = Array.isArray(parsed.topics) ? parsed.topics : []

  return topics
    .filter((t): t is TopicIdea => Boolean(t.topic && t.city && t.keyword))
    .map((t) => ({
      topic: t.topic,
      city: t.city,
      department: t.department === "Boyacá" ? "Boyacá" : "Cundinamarca",
      keyword: t.keyword,
    }))
}
