import { cn } from "@/lib/utils"

type MockupVariant = "ops" | "crm" | "workflow"

export function EnterpriseMockup({
  variant,
  className,
}: {
  variant: MockupVariant
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-white/10 bg-[#0b0d12] text-[10px] text-white/70 shadow-inner",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-white/40">
          {variant === "ops" && "ops.codifikai"}
          {variant === "crm" && "crm.codifikai"}
          {variant === "workflow" && "flow.codifikai"}
        </span>
      </div>

      {variant === "ops" && <OpsDashboard />}
      {variant === "crm" && <CrmPipeline />}
      {variant === "workflow" && <WorkflowMap />}
    </div>
  )
}

function OpsDashboard() {
  const bars = [42, 68, 55, 82, 48, 74, 61]
  return (
    <div className="flex min-h-[200px]">
      <aside className="w-[22%] border-r border-white/8 bg-black/40 p-2">
        {["Overview", "Agents", "Pipelines", "Logs"].map((item, i) => (
          <div
            key={item}
            className={cn(
              "mb-1 rounded px-2 py-1",
              i === 0 ? "bg-accent/15 text-accent" : "text-white/45"
            )}
          >
            {item}
          </div>
        ))}
      </aside>
      <div className="flex-1 p-3">
        <div className="mb-3 flex gap-2">
          {["Active runs", "SLA", "Cost"].map((k, i) => (
            <div key={k} className="flex-1 rounded border border-white/8 bg-white/[0.03] px-2 py-1.5">
              <p className="text-[8px] text-white/40">{k}</p>
              <p className="font-semibold text-white/90">{["128", "99.2%", "$4.2k"][i]}</p>
            </div>
          ))}
        </div>
        <div className="mb-3 flex h-20 items-end gap-1 rounded border border-white/8 bg-white/[0.02] px-2 pb-2 pt-3">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-accent/80 to-accent/30"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="space-y-1">
          {["Lead routed → AI Agent", "CRM sync completed", "Workflow #2841 deployed"].map((row) => (
            <div key={row} className="flex items-center gap-2 rounded border border-white/6 bg-black/30 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              <span className="truncate text-white/55">{row}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CrmPipeline() {
  const cols = [
    { name: "Lead", count: 24, tone: "border-white/15" },
    { name: "Qualified", count: 12, tone: "border-accent/30" },
    { name: "Proposal", count: 7, tone: "border-violet-500/30" },
    { name: "Won", count: 4, tone: "border-emerald-500/30" },
  ]
  return (
    <div className="grid min-h-[200px] grid-cols-4 gap-2 p-3">
      {cols.map((col) => (
        <div key={col.name} className={cn("rounded border bg-black/30 p-2", col.tone)}>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-white/75">{col.name}</span>
            <span className="rounded bg-white/10 px-1 text-[8px]">{col.count}</span>
          </div>
          <div className="space-y-1.5">
            {Array.from({ length: Math.min(col.count, 3) }).map((_, i) => (
              <div key={i} className="rounded border border-white/8 bg-white/[0.04] px-2 py-2">
                <p className="text-[9px] font-medium text-white/80">Acme Corp</p>
                <p className="text-[8px] text-white/40">$12.4k · AI scored</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function WorkflowMap() {
  const nodes = ["Trigger", "AI Agent", "CRM", "Notify", "Analytics"]
  return (
    <div className="flex min-h-[200px] flex-col justify-center p-4">
      <div className="relative flex items-center justify-between gap-1">
        <div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        {nodes.map((node, i) => (
          <div key={node} className="relative z-10 flex flex-col items-center gap-1">
            <div
              className={cn(
                "rounded-md border px-2 py-1.5 text-center text-[9px] font-medium",
                i === 1
                  ? "border-accent/50 bg-accent/15 text-accent"
                  : "border-white/12 bg-white/[0.04] text-white/70"
              )}
            >
              {node}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          { label: "Latency", value: "84ms" },
          { label: "Success", value: "99.1%" },
          { label: "Runs / hr", value: "1.2k" },
        ].map((m) => (
          <div key={m.label} className="rounded border border-white/8 bg-black/35 px-2 py-1.5 text-center">
            <p className="text-[8px] text-white/40">{m.label}</p>
            <p className="font-semibold text-white/85">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
