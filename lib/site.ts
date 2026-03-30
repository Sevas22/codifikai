/**
 * URL pública del sitio (sin barra final). Configura en producción:
 * `NEXT_PUBLIC_SITE_URL=https://tudominio.com`
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) return raw.replace(/\/$/, "")
  return "https://www.codifikai.com"
}

export const siteName = "Codifikai"

/** Perfiles públicos (mismo orden que enlaces reales en el sitio). */
export const socialProfileUrls = [
  "https://www.facebook.com/profile.php?id=61578173835571",
  "https://www.youtube.com/channel/UCO0SHacGKQSRw3eFu9HmzGA",
] as const
