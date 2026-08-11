import { google } from "googleapis"
import { getGoogleAuth, isGoogleApiConfigured } from "@/lib/google/auth"

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]

export type DailyTraffic = { date: string; sessions: number; users: number; pageViews: number }
export type TopPage = { path: string; sessions: number; pageViews: number }
export type TrafficTotals = { sessions: number; users: number; pageViews: number; avgEngagementSec: number }

function propertyId(): string | null {
  return process.env.GA4_PROPERTY_ID?.trim() || null
}

export function isAnalyticsConfigured(): boolean {
  return isGoogleApiConfigured() && Boolean(propertyId())
}

function client() {
  const auth = getGoogleAuth(SCOPES)
  return google.analyticsdata({ version: "v1beta", auth })
}

/** Formatea "20260115" (formato GA4) a fecha ISO legible. */
function formatGaDate(value: string): string {
  if (!/^\d{8}$/.test(value)) return value
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
}

export async function getTrafficTotals(startDate: string, endDate: string): Promise<TrafficTotals | null> {
  if (!isAnalyticsConfigured()) return null

  const res = await client().properties.runReport({
    property: `properties/${propertyId()}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
      ],
    },
  })

  const row = res.data.rows?.[0]
  if (!row) return { sessions: 0, users: 0, pageViews: 0, avgEngagementSec: 0 }

  const values = row.metricValues ?? []
  return {
    sessions: Number(values[0]?.value ?? 0),
    users: Number(values[1]?.value ?? 0),
    pageViews: Number(values[2]?.value ?? 0),
    avgEngagementSec: Number(values[3]?.value ?? 0),
  }
}

export async function getDailyTraffic(startDate: string, endDate: string): Promise<DailyTraffic[]> {
  if (!isAnalyticsConfigured()) return []

  const res = await client().properties.runReport({
    property: `properties/${propertyId()}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    },
  })

  return (res.data.rows ?? []).map((row) => ({
    date: formatGaDate(row.dimensionValues?.[0]?.value ?? ""),
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
    users: Number(row.metricValues?.[1]?.value ?? 0),
    pageViews: Number(row.metricValues?.[2]?.value ?? 0),
  }))
}

export async function getTopPages(startDate: string, endDate: string, limit = 20): Promise<TopPage[]> {
  if (!isAnalyticsConfigured()) return []

  const res = await client().properties.runReport({
    property: `properties/${propertyId()}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "sessions" }, { name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: String(limit),
    },
  })

  return (res.data.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? "",
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
    pageViews: Number(row.metricValues?.[1]?.value ?? 0),
  }))
}
