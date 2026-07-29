import { createClient } from "@/lib/supabase/server"
import type { BlogDepartment } from "@/lib/blog"

export type TopicStatus = "pendiente" | "en_uso" | "publicado"

export type AdminTopic = {
  id: string
  topic: string
  city: string
  department: BlogDepartment
  keyword: string
  status: TopicStatus
  createdAt: string
}

type TopicRow = {
  id: string
  topic: string
  city: string
  department: BlogDepartment
  keyword: string
  status: TopicStatus
  created_at: string
}

function mapRow(row: TopicRow): AdminTopic {
  return {
    id: row.id,
    topic: row.topic,
    city: row.city,
    department: row.department,
    keyword: row.keyword,
    status: row.status,
    createdAt: row.created_at,
  }
}

export async function listTopics(): Promise<AdminTopic[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_topics")
    .select("*")
    .order("status", { ascending: true })
    .order("created_at", { ascending: true })

  if (error) throw new Error(error.message)
  return (data as TopicRow[]).map(mapRow)
}

export type TopicInput = {
  topic: string
  city: string
  department: BlogDepartment
  keyword: string
}

export async function createTopic(input: TopicInput): Promise<AdminTopic> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_topics")
    .insert({ ...input, status: "pendiente" })
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  return mapRow(data as TopicRow)
}

export async function updateTopicStatus(id: string, status: TopicStatus): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from("blog_topics").update({ status }).eq("id", id)
  if (error) throw new Error(error.message)
}

export async function deleteTopic(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from("blog_topics").delete().eq("id", id)
  if (error) throw new Error(error.message)
}
