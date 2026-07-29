import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { marked } from "marked"

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
  }
}

function listPostFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
}

/** Todos los posts publicados (sin draft), ordenados del más reciente al más antiguo. */
export function getAllPosts(): BlogPost[] {
  const includeDrafts = process.env.NODE_ENV !== "production"

  return listPostFiles()
    .map(readPostFile)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fileName = listPostFiles().find((file) => file.replace(/\.mdx?$/, "") === slug)
  if (!fileName) return null

  const post = readPostFile(fileName)
  if (post.draft && process.env.NODE_ENV === "production") return null
  return post
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug)
}
