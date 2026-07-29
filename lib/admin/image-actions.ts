"use server"

import { uploadBlogImage } from "@/lib/admin/images"

export type UploadImageState = { error?: string; url?: string }

const MAX_SIZE = 5 * 1024 * 1024

export async function uploadImageAction(
  _prevState: UploadImageState,
  formData: FormData
): Promise<UploadImageState> {
  const file = formData.get("file")

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Selecciona una imagen." }
  }
  if (!file.type.startsWith("image/")) {
    return { error: "El archivo debe ser una imagen." }
  }
  if (file.size > MAX_SIZE) {
    return { error: "La imagen no debe superar 5MB." }
  }

  try {
    const url = await uploadBlogImage(file)
    return { url }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "No se pudo subir la imagen." }
  }
}
