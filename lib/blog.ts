import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { marked } from "marked"
import { isSupabaseConfigured } from "@/lib/supabase/server"
import { createPublicClient } from "@/lib/supabase/public"
import { extractFaqs, type Faq } from "@/lib/faq-extract"

const BLOG_DIR = path.join(process.cwd(), "content", "blog", "posts")

export type BlogDepartment = "Cundinamarca" | "Boyacá"

export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  date: string
  department: BlogDepartment
  city: string
  keywords: string[]
  author: string
  coverImage?: string
  draft: boolean
}

export type BlogPost = BlogPostMeta & {
  html: string
  faqs: Faq[]
}

function readPostFile(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx?$/, "")
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    department: (data.department as BlogDepartment) ?? "Cundinamarca",
    city: data.city ?? "",
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    author: data.author ?? "Equipo Codifikai",
    coverImage: data.coverImage || undefined,
    draft: Boolean(data.draft),
    html: marked.parse(content, { async: false }) as string,
    faqs: extractFaqs(content),
  }
}

function listPostFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
}

/** Posts "legacy" materializados como archivo Markdown en el repo. */
function getFilePosts(): BlogPost[] {
  const includeDrafts = process.env.NODE_ENV !== "production"

  return listPostFiles()
    .map(readPostFile)
    .filter((post) => includeDrafts || !post.draft)
}

type DbPostRow = {
  slug: string
  title: string
  description: string
  content: string
  city: string
  department: BlogDepartment
  keywords: string[]
  author: string
  cover_image: string | null
  published_at: string | null
}

/**
 * Posts creados/publicados desde el panel admin: viven en Supabase
 * (`blog_posts`, status = 'published') — nunca se escriben a disco en
 * runtime, porque en producción (Vercel) el filesystem es de solo lectura.
 */
async function getDbPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return []

  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, title, description, content, city, department, keywords, author, cover_image, published_at")
      .eq("status", "published")

    if (error) {
      console.error("[blog] Error leyendo posts publicados de Supabase:", error.message)
      return []
    }

    return (data as DbPostRow[]).map((row) => ({
      slug: row.slug,
      title: row.title,
      description: row.description,
      date: row.published_at ? new Date(row.published_at).toISOString() : new Date().toISOString(),
      department: row.department,
      city: row.city,
      keywords: row.keywords ?? [],
      author: row.author || "Equipo Codifikai",
      coverImage: row.cover_image || undefined,
      draft: false,
      html: marked.parse(row.content, { async: false }) as string,
      faqs: extractFaqs(row.content),
    }))
  } catch (err) {
    console.error("[blog] Error inesperado leyendo posts de Supabase:", err)
    return []
  }
}

function mergePosts(filePosts: BlogPost[], dbPosts: BlogPost[]): BlogPost[] {
  const bySlug = new Map<string, BlogPost>()
  for (const post of filePosts) bySlug.set(post.slug, post)
  // Los posts de Supabase tienen prioridad si un slug coincide (no debería pasar).
  for (const post of dbPosts) bySlug.set(post.slug, post)
  return Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/** Todos los posts publicados (sin draft), ordenados del más reciente al más antiguo. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const [filePosts, dbPosts] = await Promise.all([getFilePosts(), getDbPosts()])
  return mergePosts(filePosts, dbPosts)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fileName = listPostFiles().find((file) => file.replace(/\.mdx?$/, "") === slug)
  if (fileName) {
    const post = readPostFile(fileName)
    if (post.draft && process.env.NODE_ENV === "production") return null
    return post
  }

  const dbPosts = await getDbPosts()
  return dbPosts.find((post) => post.slug === slug) ?? null
}

export async function getAllPostSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((post) => post.slug)
}
