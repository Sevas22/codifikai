type Check = { id: string; label: string; passed: boolean }

function impactLabel(score: number): { label: string; className: string } {
  if (score >= 80) return { label: "Alto impacto", className: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" }
  if (score >= 50) return { label: "Impacto medio", className: "text-amber-400 border-amber-400/30 bg-amber-400/10" }
  return { label: "Bajo impacto", className: "text-red-400 border-red-400/30 bg-red-400/10" }
}

export function ImpactPanel({
  seoScore,
  geoScore,
  seoChecks,
  geoChecks,
}: {
  seoScore: number
  geoScore: number
  seoChecks: Check[]
  geoChecks: Check[]
}) {
  const overall = Math.round((seoScore + geoScore) / 2)
  const { label, className } = impactLabel(overall)

  const pending = [
    ...seoChecks.filter((c) => !c.passed).map((c) => ({ ...c, area: "SEO" })),
    ...geoChecks.filter((c) => !c.passed).map((c) => ({ ...c, area: "GEO" })),
  ].slice(0, 3)

  return (
    <div className={`rounded-xl border p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-lg font-bold">{overall}%</span>
      </div>
      <p className="mt-1 text-xs text-white/50">
        Combina qué tan bien indexará Google (SEO) y qué tan citable es para IA (GEO).
      </p>

      {pending.length > 0 && (
        <div className="mt-3 border-t border-white/10 pt-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-white/40">
            Para subir el impacto
          </p>
          <ul className="mt-1.5 space-y-1">
            {pending.map((check) => (
              <li key={`${check.area}-${check.id}`} className="text-xs text-white/60">
                <span className="text-white/35">[{check.area}]</span> {check.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
