import { google } from "googleapis"

type ServiceAccountCredentials = {
  client_email: string
  private_key: string
}

function getCredentials(): ServiceAccountCredentials | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as Partial<ServiceAccountCredentials>
    if (!parsed.client_email || !parsed.private_key) return null
    // Vercel/entornos que escapan saltos de línea en env vars.
    return { client_email: parsed.client_email, private_key: parsed.private_key.replace(/\\n/g, "\n") }
  } catch {
    return null
  }
}

export function isGoogleApiConfigured(): boolean {
  return Boolean(getCredentials())
}

/** Cliente JWT autenticado como service account, para Search Console y GA4. */
export function getGoogleAuth(scopes: string[]) {
  const credentials = getCredentials()
  if (!credentials) {
    throw new Error("Falta configurar GOOGLE_SERVICE_ACCOUNT_KEY en el entorno.")
  }
  return new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes,
  })
}
