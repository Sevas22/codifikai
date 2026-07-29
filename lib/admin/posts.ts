import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { createClient } from "@/lib/supabase/server"
import { slugify } from "@/lib/admin/slugify"
import type { BlogDepartment } from "@/lib/blog"

const POSTS_DIR = path.join(process.cwd(), "content", "blog", "posts")

export type AdminPostStatus = "draft" | "published"

export type AdminBlogPost = {
  id: string
  slug: string
  title: string
  description: string
  content: string
  city: string
  department: BlogDepartment
  keyword: string
  keywords: string[]
  author: string
  coverImage: string | null
  status: AdminPostStatus
  topicId: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export type PostInput = {
  title: string
  description: string
  content: string
  city: string
  department: BlogDepartment
  keyword: string
  keywords: string[]
  coverImage?: string
  topicId?: string | null
}

type PostRow = {
  id: string
  slug: string
  title: string
  description: string
  content: string
  city: string
  department: BlogDepartment
  keyword: string
  keywords: string[]
  author: string
  cover_image: string | null
  status: AdminPostStatus
  topic_id: string | null
  created_at: string
  updated_at: string
  published_at: string | null
}

function mapRow(row: PostRow): AdminBlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    content: row.content,
    city: row.city,
    department: row.department,
    keyword: row.keyword,
    keywords: row.keywords ?? [],
    author: row.author,
    coverImage: row.cover_image,
    status: row.status,
    topicId: row.topic_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  }
}

export async function listPosts(): Promise<AdminBlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false })

  if (error) throw new Error(error.message)
  return (data as PostRow[]).map(mapRow)
}

export async function getPost(id: string): Promise<AdminBlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data ? mapRow(data as PostRow) : null
}

async function uniqueSlug(supabase: Awaited<ReturnType<typeof createClient>>, base: string, excludeId?: string) {
  let candidate = base || "articulo"
  let attempt = 1
  for (;;) {
    let query = supabase.from("blog_posts").select("id").eq("slug", candidate)
    if (excludeId) query = query.neq("id", excludeId)
    const { data } = await query.maybeSingle()
    if (!data) return candidate
    attempt += 1
    candidate = `${base}-${attempt}`
  }
}

export async function createPost(input: PostInput): Promise<AdminBlogPost> {
  const supabase = await createClient()
  const slug = await uniqueSlug(supabase, slugify(input.title))

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      slug,
      title: input.title,
      description: input.description,
      content: input.content,
      city: input.city,
      department: input.department,
      keyword: input.keyword,
      keywords: input.keywords,
      cover_image: input.coverImage ?? null,
      topic_id: input.topicId ?? null,
      status: "draft",
    })
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  return mapRow(data as PostRow)
}

export async function updatePost(id: string, input: PostInput): Promise<AdminBlogPost> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      title: input.title,
      description: input.description,
      content: input.content,
      city: input.city,
      department: input.department,
      keyword: input.keyword,
      keywords: input.keywords,
      cover_image: input.coverImage ?? null,
      topic_id: input.topicId ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  return mapRow(data as PostRow)
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await createClient()
  const post = await getPost(id)
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)
  if (error) throw new Error(error.message)

  if (post) {
    const filePath = path.join(POSTS_DIR, `${post.slug}.md`)
    if (fs.existsSync(filePath)) fs.rmSync(filePath)
  }
}

/**
 * Publica el post: lo marca como `published` en Supabase y materializa el
 * archivo Markdown en content/blog/posts, que es lo que realmente sirve el
 * blog público (estático, sin dependencia de base de datos en producción).
 */
export async function publishPost(id: string): Promise<AdminBlogPost> {
  const supabase = await createClient()
  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from("blog_posts")
    .update({ status: "published", published_at: now, updated_at: now })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  const post = mapRow(data as PostRow)

  const frontmatter: Record<string, unknown> = {
    title: post.title,
    description: post.description,
    date: post.publishedAt,
    department: post.department,
    city: post.city,
    keywords: post.keywords,
    author: post.author,
    draft: false,
  }
  // js-yaml no puede serializar `undefined`: solo se incluye si hay valor.
  if (post.coverImage) frontmatter.coverImage = post.coverImage

  fs.mkdirSync(POSTS_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(POSTS_DIR, `${post.slug}.md`),
    matter.stringify(post.content, frontmatter),
    "utf8"
  )

  return post
}

/**
 * Vuelve el post a `draft`: lo quita del sitio público (borra el .md
 * materializado) pero conserva el registro y el contenido en Supabase.
 */
export async function unpublishPost(id: string): Promise<AdminBlogPost> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .update({ status: "draft", updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  const post = mapRow(data as PostRow)

  const filePath = path.join(POSTS_DIR, `${post.slug}.md`)
  if (fs.existsSync(filePath)) fs.rmSync(filePath)

  return post
}
