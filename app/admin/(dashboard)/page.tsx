import Link from "next/link"
import { isSupabaseConfigured } from "@/lib/supabase/server"
import { listPosts } from "@/lib/admin/posts"

export const dynamic = "force-dynamic"

const STATUS_LABEL: Record<string, string> = {
  draft: "Borrador",
  published: "Publicado",
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function AdminPostsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <p className="rounded-md border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
        Falta configurar Supabase (NEXT_PUBLIC_SUPABASE_URL y
        NEXT_PUBLIC_SUPABASE_ANON_KEY) para activar el panel.
      </p>
    )
  }

  const posts = await listPosts()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Posts del blog</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300"
        >
          Nuevo post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-white/60">
          Todavía no hay posts. Crea el primero o ve a{" "}
          <Link href="/admin/topics" className="text-cyan-400 hover:underline">
            Temas
          </Link>{" "}
          para elegir uno del banco.
        </p>
      ) : (
        <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/posts/${post.id}`}
              className="flex items-center justify-between gap-4 bg-white/[0.02] px-4 py-4 transition-colors hover:bg-white/[0.06]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {post.title || "(sin título)"}
                </p>
                <p className="mt-1 truncate text-xs text-white/50">
                  /{post.slug} · {post.city || "sin ciudad"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-white/50">{formatDate(post.updatedAt)}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    post.status === "published"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {STATUS_LABEL[post.status]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
