import { Check, X } from "lucide-react"

type ScoreCheck = { id: string; label: string; passed: boolean }

export function ScorePanel({
  title,
  score,
  checks,
  area,
  improveAction,
  isImproving,
  pendingCheckId,
  onImproveClick,
}: {
  title: string
  score: number
  checks: ScoreCheck[]
  area?: "SEO" | "GEO"
  improveAction?: (formData: FormData) => void
  isImproving?: boolean
  pendingCheckId?: string
  onImproveClick?: (checkId: string) => void
}) {
  const color =
    score >= 80 ? "text-emerald-400" : score >= 50 ? "text-amber-400" : "text-red-400"
  const ring =
    score >= 80 ? "stroke-emerald-400" : score >= 50 ? "stroke-amber-400" : "stroke-red-400"

  const circumference = 2 * Math.PI * 26
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-3">
        <div className="relative h-[60px] w-[60px] shrink-0">
          <svg width="60" height="60" viewBox="0 0 60 60" className="-rotate-90">
            <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={ring}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-sm font-bold ${color}`}>{score}</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>

      <ul className="mt-4 space-y-2">
        {checks.map((check) => (
          <li key={check.id} className="flex items-start justify-between gap-2 text-xs">
            <div className="flex items-start gap-2">
              {check.passed ? (
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
              ) : (
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400/80" />
              )}
              <span className={check.passed ? "text-white/70" : "text-white/45"}>{check.label}</span>
            </div>

            {!check.passed && area && improveAction && (
              <button
                type="submit"
                formAction={(formData: FormData) => {
                  formData.set("checkPayload", JSON.stringify({ id: check.id, label: check.label, area }))
                  onImproveClick?.(check.id)
                  return improveAction(formData)
                }}
                disabled={isImproving}
                className="shrink-0 whitespace-nowrap text-[10px] font-medium text-cyan-400 hover:underline disabled:opacity-40"
              >
                {isImproving && pendingCheckId === check.id ? "Mejorando…" : "Mejorar con IA"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
