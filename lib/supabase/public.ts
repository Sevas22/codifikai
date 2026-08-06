import { createClient } from "@supabase/supabase-js"

/**
 * Cliente de Supabase para lecturas públicas (sin cookies/sesión), usado por
 * el blog público. No requiere sesión: depende de la policy RLS que expone
 * las filas con status = 'published' a `anon`.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  )
}
