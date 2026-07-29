import { createClient } from "@/lib/supabase/server"

const BUCKET = "blog-images"

export async function uploadBlogImage(file: File): Promise<string> {
  const supabase = await createClient()
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
