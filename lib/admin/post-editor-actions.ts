"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import {
  createPost,
  updatePost,
  publishPost,
  unpublishPost,
  deletePost,
  type PostInput,
} from "@/lib/admin/posts"
import {
  generateBlogDraft,
  improveArticleForCheck,
  DraftGenerationError,
  type GenerateDraftResult,
} from "@/lib/ai-generate"
import type { BlogDepartment } from "@/lib/blog"

export type SaveState = { error?: string; savedId?: string }

function parsePostInput(formData: FormData): PostInput {
  const department = String(formData.get("department") ?? "Cundinamarca")
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    content: String(formData.get("content") ?? ""),
    city: String(formData.get("city") ?? "").trim(),
    department: department === "Boyacá" ? "Boyacá" : "Cundinamarca",
    keyword: String(formData.get("keyword") ?? "").trim(),
    keywords: String(formData.get("keywords") ?? "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    coverImage: String(formData.get("coverImage") ?? "").trim() || undefined,
  }
}

export async function savePostAction(_prevState: SaveState, formData: FormData): Promise<SaveState> {
  const id = String(formData.get("id") ?? "").trim()
  const input = parsePostInput(formData)

  if (!input.title || !input.description || !input.content) {
    return { error: "Título, descripción y contenido son obligatorios." }
  }

  if (id) {
    try {
      await updatePost(id, input)
    } catch (error) {
      return { error: error instanceof Error ? error.message : "No se pudo guardar el post." }
    }
    revalidatePath(`/admin/posts/${id}`)
    revalidatePath("/admin")
    return { savedId: id }
  }

  let createdId: string
  try {
    const created = await createPost(input)
    createdId = created.id
  } catch (error) {
    return { error: error instanceof Error ? error.message : "No se pudo guardar el post." }
  }

  // redirect() lanza un throw especial que Next.js necesita ver sin que un
  // try/catch lo intercepte; por eso va fuera del bloque try de arriba.
  revalidatePath("/admin")
  redirect(`/admin/posts/${createdId}`)
}

export async function publishPostAction(id: string): Promise<void> {
  const post = await publishPost(id)
  revalidatePath(`/admin/posts/${id}`)
  revalidatePath("/admin")
  revalidatePath("/blog")
  revalidatePath(`/blog/${post.slug}`)
  revalidatePath("/sitemap.xml")
}

export async function unpublishPostAction(id: string): Promise<void> {
  const post = await unpublishPost(id)
  revalidatePath(`/admin/posts/${id}`)
  revalidatePath("/admin")
  revalidatePath("/blog")
  revalidatePath(`/blog/${post.slug}`)
  revalidatePath("/sitemap.xml")
}

export async function deletePostAction(id: string): Promise<void> {
  await deletePost(id)
  revalidatePath("/admin")
  redirect("/admin")
}

export type GenerateState = { error?: string; draft?: GenerateDraftResult }

export async function generateForEditorAction(
  _prevState: GenerateState,
  formData: FormData
): Promise<GenerateState> {
  const topic = String(formData.get("genTopic") ?? "").trim()
  const city = String(formData.get("city") ?? "").trim()
  const department = String(formData.get("department") ?? "Cundinamarca") as BlogDepartment
  const keyword = String(formData.get("keyword") ?? "").trim()

  if (!topic || !city || !keyword) {
    return { error: "Completa tema, ciudad y palabra clave antes de generar." }
  }

  try {
    const draft = await generateBlogDraft({
      topic,
      city,
      department: department === "Boyacá" ? "Boyacá" : "Cundinamarca",
      keyword,
    })
    return { draft }
  } catch (error) {
    if (error instanceof DraftGenerationError) {
      if (error.code === "missing_api_key") {
        return { error: "Falta configurar GROQ_API_KEY en .env.local (reinicia el servidor después de agregarla)." }
      }
      return { error: error.message }
    }
    return { error: "Ocurrió un error inesperado generando el artículo." }
  }
}

export type ImproveCheckState = {
  error?: string
  checkId?: string
  result?: { title: string; description: string; content: string }
}

export async function improveCheckAction(
  _prevState: ImproveCheckState,
  formData: FormData
): Promise<ImproveCheckState> {
  let payload: { id: string; label: string; area: "SEO" | "GEO" }
  try {
    payload = JSON.parse(String(formData.get("checkPayload") ?? "{}"))
  } catch {
    return { error: "Solicitud inválida." }
  }

  const title = String(formData.get("title") ?? "")
  const description = String(formData.get("description") ?? "")
  const content = String(formData.get("content") ?? "")
  const keyword = String(formData.get("keyword") ?? "")
  const city = String(formData.get("city") ?? "")

  try {
    const result = await improveArticleForCheck({
      title,
      description,
      content,
      keyword,
      city,
      checkLabel: payload.label,
      area: payload.area,
    })
    return { result, checkId: payload.id }
  } catch (error) {
    if (error instanceof DraftGenerationError) {
      if (error.code === "missing_api_key") {
        return { error: "Falta configurar GROQ_API_KEY en .env.local.", checkId: payload.id }
      }
      return { error: error.message, checkId: payload.id }
    }
    return { error: "No se pudo mejorar este punto con IA.", checkId: payload.id }
  }
}
