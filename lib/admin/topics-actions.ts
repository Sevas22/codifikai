"use server"

import { revalidatePath } from "next/cache"
import { createTopic, updateTopicStatus, deleteTopic, listTopics } from "@/lib/admin/topics"
import { generateMoreTopics, DraftGenerationError } from "@/lib/ai-generate"
import type { BlogDepartment } from "@/lib/blog"

export type TopicFormState = { error?: string }

export async function createTopicAction(
  _prevState: TopicFormState,
  formData: FormData
): Promise<TopicFormState> {
  const topic = String(formData.get("topic") ?? "").trim()
  const city = String(formData.get("city") ?? "").trim()
  const department = String(formData.get("department") ?? "Cundinamarca") as BlogDepartment
  const keyword = String(formData.get("keyword") ?? "").trim()

  if (!topic || !city || !keyword) {
    return { error: "Completa tema, ciudad y palabra clave." }
  }

  await createTopic({
    topic,
    city,
    department: department === "Boyacá" ? "Boyacá" : "Cundinamarca",
    keyword,
  })
  revalidatePath("/admin/topics")
  return {}
}

export async function markTopicUsedAction(id: string): Promise<void> {
  await updateTopicStatus(id, "en_uso")
  revalidatePath("/admin/topics")
}

export async function deleteTopicAction(id: string): Promise<void> {
  await deleteTopic(id)
  revalidatePath("/admin/topics")
}

export type GenerateTopicsState = { error?: string; added?: number }

export async function generateTopicsAction(
  _prevState: GenerateTopicsState,
  _formData: FormData
): Promise<GenerateTopicsState> {
  try {
    const existing = await listTopics()
    const ideas = await generateMoreTopics(
      existing.map((t) => ({ topic: t.topic, city: t.city })),
      8
    )

    if (ideas.length === 0) {
      return { error: "La IA no propuso temas nuevos, intenta de nuevo." }
    }

    for (const idea of ideas) {
      await createTopic(idea)
    }

    revalidatePath("/admin/topics")
    return { added: ideas.length }
  } catch (error) {
    if (error instanceof DraftGenerationError) {
      return { error: error.message }
    }
    return { error: "No se pudieron generar temas nuevos." }
  }
}
