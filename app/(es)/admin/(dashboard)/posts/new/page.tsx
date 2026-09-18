import { PostEditor } from "@/components/admin/post-editor"
import type { BlogDepartment } from "@/lib/blog"

export const dynamic = "force-dynamic"

type Props = {
  searchParams: Promise<{ topic?: string; city?: string; department?: string; keyword?: string }>
}

export default async function NewPostPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Nuevo post</h1>
      <PostEditor
        post={null}
        prefill={{
          topic: params.topic ?? "",
          city: params.city ?? "",
          department: (params.department as BlogDepartment) ?? "Cundinamarca",
          keyword: params.keyword ?? "",
        }}
      />
    </div>
  )
}
