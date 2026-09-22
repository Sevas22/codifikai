import Link from "next/link"
import { ExternalLink, FileText, Plus } from "lucide-react"

import { listPosts } from "@/lib/admin/posts"
import { getAllPosts } from "@/lib/blog"
import { isSupabaseConfigured } from "@/lib/supabase/server"

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

/**
 * Listado de contenido del blog.
 *
 * El blog se alimenta de dos sitios: los posts que se crean desde este panel
 * (Supabase) y los que viven como Markdown en el repositorio. El panel solo
 * mostraba los primeros, así que los artículos ya publicados eran invisibles
 * aquí y parecía que no había nada. Ahora se listan ambos, separados, porque
 * los de archivo no se pueden editar desde la web.
 */
export default async function AdminPostsPage() {
  const supabaseReady = isSupabaseConfigured()
  const dbPosts = supabaseReady ? await listPosts() : []

  // Los del repositorio se identifican por no tener id de base de datos.
  const filePosts = (await getAllPosts()).filter(
    (post) => !dbPosts.some((db) => db.slug === post.slug)
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="admin-title text-2xl">Contenido del blog</h1>
          <p className="mt-1.5 text-sm text-white/50">
            {dbPosts.length + filePosts.length} publicaciones en total
          </p>
        </div>
        <Link href="/admin/posts/new" className="admin-btn-primary">
          <Plus className="h-4 w-4" aria-hidden />
          Nuevo post
        </Link>
      </div>

      {!supabaseReady ? (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-4">
          <p className="text-sm font-medium text-amber-200">
            Supabase no está configurado
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-amber-200/70">
            Sin <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> no se
            pueden crear ni editar posts desde el panel. Los artículos del repositorio sí
            se listan abajo.
          </p>
        </div>
      ) : null}

      {/* ------------------------------------------------- Editables (Supabase) */}
      {dbPosts.length > 0 ? (
        <section>
          <h2 className="admin-eyebrow">Creados desde el panel</h2>
          <div className="admin-list mt-4">
            {dbPosts.map((post) => (
              <Link key={post.id} href={`/admin/posts/${post.id}`} className="admin-row">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {post.title || "(sin título)"}
                  </p>
                  <p className="mt-1 truncate text-xs text-white/45">
                    /{post.slug} · {post.city || "sin ciudad"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-white/45">{formatDate(post.updatedAt)}</span>
                  <span
                    className={
                      post.status === "published" ? "admin-chip-live" : "admin-chip-draft"
                    }
                  >
                    {STATUS_LABEL[post.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------- Solo lectura (repositorio) */}
      {filePosts.length > 0 ? (
        <section>
          <h2 className="admin-eyebrow">
            <FileText className="h-3.5 w-3.5" aria-hidden />
            En el repositorio · solo lectura
          </h2>
          <p className="mt-2 max-w-[62ch] text-xs leading-relaxed text-white/45">
            Son archivos Markdown dentro del proyecto. Están publicados y visibles en el
            sitio, pero se editan en el código, no desde aquí.
          </p>
          <div className="admin-list mt-4">
            {filePosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-row"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{post.title}</p>
                  <p className="mt-1 truncate text-xs text-white/45">
                    /{post.slug} · {post.city || post.department}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-white/45">{formatDate(post.date)}</span>
                  <span className="admin-chip-file">
                    Ver
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {dbPosts.length === 0 && filePosts.length === 0 ? (
        <p className="text-sm text-white/50">
          Todavía no hay publicaciones. Crea la primera o ve a{" "}
          <Link href="/admin/topics" className="text-[--admin-accent] hover:underline">
            Temas
          </Link>{" "}
          para elegir una del banco.
        </p>
      ) : null}
    </div>
  )
}
