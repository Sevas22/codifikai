import { notFound } from "next/navigation"
import { getPost } from "@/lib/admin/posts"
import { PostEditor } from "@/components/admin/post-editor"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Editar post</h1>
        {post.status === "published" && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-cyan-400 hover:underline"
          >
            Ver en el sitio →
          </a>
        )}
      </div>
      <PostEditor post={post} />
    </div>
  )
}
