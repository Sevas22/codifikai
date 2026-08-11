"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { DailyTraffic } from "@/lib/google/analytics"

export function TrafficChart({ data }: { data: DailyTraffic[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-white/50">Sin datos de tráfico en este período.</p>
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <XAxis
            dataKey="date"
            stroke="rgba(255,255,255,0.4)"
            fontSize={11}
            tickFormatter={(value: string) => value.slice(5)}
            minTickGap={24}
          />
          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "#0a0a0f",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "rgba(255,255,255,0.6)" }}
          />
          <Line type="monotone" dataKey="sessions" name="Sesiones" stroke="#22d3ee" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="users" name="Usuarios" stroke="#a78bfa" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
