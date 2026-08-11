import {
  isSearchConsoleConfigured,
  getSearchConsoleTotals,
  getTopQueries,
  getTopPages as getGscTopPages,
} from "@/lib/google/search-console"
import { isAnalyticsConfigured, getTrafficTotals, getDailyTraffic, getTopPages as getGaTopPages } from "@/lib/google/analytics"
import { TrafficChart } from "@/components/admin/traffic-chart"

export const dynamic = "force-dynamic"

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function dateRange(days: number) {
  const end = new Date()
  end.setDate(end.getDate() - 1) // ayer: hoy suele venir incompleto
  const start = new Date(end)
  start.setDate(start.getDate() - days)
  return { startDate: formatDate(start), endDate: formatDate(end) }
}

function Card({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold text-white">{value}</p>
      {hint && <p className="mt-1 text-[11px] text-white/40">{hint}</p>}
    </div>
  )
}

function SetupNotice({ title, envVars, docHref }: { title: string; envVars: string[]; docHref?: string }) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-amber-200/80">
        Falta configurar: <code className="text-amber-100">{envVars.join(", ")}</code>
      </p>
    </div>
  )
}

export default async function AdminAnalyticsPage() {
  const { startDate, endDate } = dateRange(28)
  const gscOn = isSearchConsoleConfigured()
  const gaOn = isAnalyticsConfigured()

  const [gscTotals, topQueries, gscTopPages, gaTotals, dailyTraffic, gaTopPages] = await Promise.all([
    gscOn ? getSearchConsoleTotals(startDate, endDate) : Promise.resolve(null),
    gscOn ? getTopQueries(startDate, endDate, 15) : Promise.resolve([]),
    gscOn ? getGscTopPages(startDate, endDate, 10) : Promise.resolve([]),
    gaOn ? getTrafficTotals(startDate, endDate) : Promise.resolve(null),
    gaOn ? getDailyTraffic(startDate, endDate) : Promise.resolve([]),
    gaOn ? getGaTopPages(startDate, endDate, 10) : Promise.resolve([]),
  ])

  const avgCtr = gscTotals ? (gscTotals.ctr * 100).toFixed(1) : "—"
  const avgPosition = gscTotals ? gscTotals.position.toFixed(1) : "—"

  // "Qué nos hace falta": keywords con impresiones pero mal posicionadas o con CTR bajo.
  const overallCtr = gscTotals && gscTotals.impressions > 0 ? gscTotals.clicks / gscTotals.impressions : 0
  const nearPageOne = topQueries
    .filter((q) => q.position > 10 && q.position <= 25 && q.impressions >= 5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 5)
  const lowCtrHighImpressions = topQueries
    .filter((q) => q.impressions >= 20 && q.ctr < overallCtr * 0.6)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 5)

  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold">Analytics</h1>
        <p className="mt-1 text-sm text-white/50">
          Últimos 28 días ({startDate} → {endDate}) · datos reales de Google Search Console y Google Analytics
        </p>
      </div>

      {!gscOn && (
        <div className="mt-6">
          <SetupNotice
            title="Google Search Console no está conectado — no se puede ver posición real en Google."
            envVars={["GOOGLE_SERVICE_ACCOUNT_KEY", "GOOGLE_SEARCH_CONSOLE_SITE_URL"]}
          />
        </div>
      )}
      {!gaOn && (
        <div className="mt-3">
          <SetupNotice
            title="Google Analytics 4 no está conectado — no se puede ver tráfico real."
            envVars={["GOOGLE_SERVICE_ACCOUNT_KEY", "GA4_PROPERTY_ID"]}
          />
        </div>
      )}

      {gscOn && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Posicionamiento en Google
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Card label="Clics" value={String(gscTotals?.clicks ?? 0)} />
            <Card label="Impresiones" value={String(gscTotals?.impressions ?? 0)} />
            <Card label="CTR promedio" value={`${avgCtr}%`} />
            <Card label="Posición promedio" value={avgPosition} hint="Más bajo = mejor (1 = primer resultado)" />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Top búsquedas por clics
              </h3>
              <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.03] text-white/50">
                    <tr>
                      <th className="px-3 py-2 font-medium">Búsqueda</th>
                      <th className="px-3 py-2 font-medium">Clics</th>
                      <th className="px-3 py-2 font-medium">Impr.</th>
                      <th className="px-3 py-2 font-medium">Pos.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {topQueries.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-3 py-4 text-center text-white/40">
                          Sin datos todavía.
                        </td>
                      </tr>
                    ) : (
                      topQueries.map((q) => (
                        <tr key={q.keys.join("|")}>
                          <td className="px-3 py-2 text-white/80">{q.keys[0]}</td>
                          <td className="px-3 py-2 text-white/60">{q.clicks}</td>
                          <td className="px-3 py-2 text-white/60">{q.impressions}</td>
                          <td className="px-3 py-2 text-white/60">{q.position.toFixed(1)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Top páginas por clics
              </h3>
              <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.03] text-white/50">
                    <tr>
                      <th className="px-3 py-2 font-medium">Página</th>
                      <th className="px-3 py-2 font-medium">Clics</th>
                      <th className="px-3 py-2 font-medium">Impr.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {gscTopPages.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-3 py-4 text-center text-white/40">
                          Sin datos todavía.
                        </td>
                      </tr>
                    ) : (
                      gscTopPages.map((p) => (
                        <tr key={p.keys.join("|")}>
                          <td className="max-w-[16rem] truncate px-3 py-2 text-white/80">
                            {p.keys[0]?.replace(/^https?:\/\/[^/]+/, "")}
                          </td>
                          <td className="px-3 py-2 text-white/60">{p.clicks}</td>
                          <td className="px-3 py-2 text-white/60">{p.impressions}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {(nearPageOne.length > 0 || lowCtrHighImpressions.length > 0) && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Qué nos hace falta
              </h3>
              <div className="mt-2 space-y-2">
                {nearPageOne.map((q) => (
                  <div
                    key={`near-${q.keys.join("|")}`}
                    className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2.5 text-xs"
                  >
                    <span className="font-medium text-cyan-300">Cerca de página 1: </span>
                    <span className="text-white/70">
                      "{q.keys[0]}" está en posición {q.position.toFixed(0)} con {q.impressions} impresiones —
                      un empujón de contenido/enlaces podría meterla en la primera página.
                    </span>
                  </div>
                ))}
                {lowCtrHighImpressions.map((q) => (
                  <div
                    key={`ctr-${q.keys.join("|")}`}
                    className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5 text-xs"
                  >
                    <span className="font-medium text-amber-300">CTR bajo: </span>
                    <span className="text-white/70">
                      "{q.keys[0]}" tiene {q.impressions} impresiones pero solo {(q.ctr * 100).toFixed(1)}% de
                      CTR — el título/meta descripción de esa página probablemente necesita mejorar.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {gaOn && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Tráfico del sitio</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Card label="Sesiones" value={String(gaTotals?.sessions ?? 0)} />
            <Card label="Usuarios" value={String(gaTotals?.users ?? 0)} />
            <Card label="Vistas de página" value={String(gaTotals?.pageViews ?? 0)} />
            <Card
              label="Duración media"
              value={gaTotals ? `${Math.round(gaTotals.avgEngagementSec)}s` : "—"}
            />
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <TrafficChart data={dailyTraffic} />
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Páginas más visitadas
            </h3>
            <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.03] text-white/50">
                  <tr>
                    <th className="px-3 py-2 font-medium">Página</th>
                    <th className="px-3 py-2 font-medium">Sesiones</th>
                    <th className="px-3 py-2 font-medium">Vistas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {gaTopPages.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-3 py-4 text-center text-white/40">
                        Sin datos todavía.
                      </td>
                    </tr>
                  ) : (
                    gaTopPages.map((p) => (
                      <tr key={p.path}>
                        <td className="max-w-[20rem] truncate px-3 py-2 text-white/80">{p.path}</td>
                        <td className="px-3 py-2 text-white/60">{p.sessions}</td>
                        <td className="px-3 py-2 text-white/60">{p.pageViews}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
