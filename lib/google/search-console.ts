import { google } from "googleapis"
import { getGoogleAuth, isGoogleApiConfigured } from "@/lib/google/auth"

const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

export type SearchAnalyticsRow = {
  keys: string[]
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export type SearchConsoleTotals = {
  clicks: number
  impressions: number
  ctr: number
  position: number
}

function siteUrl(): string | null {
  return process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL?.trim() || null
}

export function isSearchConsoleConfigured(): boolean {
  return isGoogleApiConfigured() && Boolean(siteUrl())
}

async function queryAnalytics(params: {
  startDate: string
  endDate: string
  dimensions: ("query" | "page" | "date" | "country" | "device")[]
  rowLimit?: number
}): Promise<SearchAnalyticsRow[]> {
  if (!isSearchConsoleConfigured()) return []

  const auth = getGoogleAuth(SCOPES)
  const searchconsole = google.searchconsole({ version: "v1", auth })

  const res = await searchconsole.searchanalytics.query({
    siteUrl: siteUrl()!,
    requestBody: {
      startDate: params.startDate,
      endDate: params.endDate,
      dimensions: params.dimensions,
      rowLimit: params.rowLimit ?? 25,
    },
  })

  return (res.data.rows ?? []).map((row) => ({
    keys: row.keys ?? [],
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }))
}

/** Totales del período (clicks, impresiones, CTR y posición promedio). */
export async function getSearchConsoleTotals(startDate: string, endDate: string): Promise<SearchConsoleTotals | null> {
  if (!isSearchConsoleConfigured()) return null
  const rows = await queryAnalytics({ startDate, endDate, dimensions: ["date"], rowLimit: 1000 })
  if (rows.length === 0) return { clicks: 0, impressions: 0, ctr: 0, position: 0 }

  const clicks = rows.reduce((sum, r) => sum + r.clicks, 0)
  const impressions = rows.reduce((sum, r) => sum + r.impressions, 0)
  const weightedPosition = rows.reduce((sum, r) => sum + r.position * r.impressions, 0)

  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? clicks / impressions : 0,
    position: impressions > 0 ? weightedPosition / impressions : 0,
  }
}

/** Top queries por clics — para ver con qué términos ya te encuentran. */
export function getTopQueries(startDate: string, endDate: string, limit = 20) {
  return queryAnalytics({ startDate, endDate, dimensions: ["query"], rowLimit: limit })
}

/** Top páginas por clics. */
export function getTopPages(startDate: string, endDate: string, limit = 20) {
  return queryAnalytics({ startDate, endDate, dimensions: ["page"], rowLimit: limit })
}

/** Serie diaria (clicks/impresiones/posición) para graficar la tendencia. */
export function getDailySeries(startDate: string, endDate: string) {
  return queryAnalytics({ startDate, endDate, dimensions: ["date"], rowLimit: 1000 })
}
