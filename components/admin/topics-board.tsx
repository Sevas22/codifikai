"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import {
  createTopicAction,
  markTopicUsedAction,
  deleteTopicAction,
  generateTopicsAction,
  type TopicFormState,
  type GenerateTopicsState,
} from "@/lib/admin/topics-actions"
import type { AdminTopic } from "@/lib/admin/topics"

const STATUS_LABEL: Record<string, string> = {
  pendiente: "Pendiente",
  en_uso: "En uso",
  publicado: "Publicado",
}

const STATUS_STYLE: Record<string, string> = {
  pendiente: "bg-white/10 text-white/70",
  en_uso: "bg-amber-500/15 text-amber-300",
  publicado: "bg-emerald-500/15 text-emerald-300",
}

const initialState: TopicFormState = {}
const initialGenerateState: GenerateTopicsState = {}

export function TopicsBoard({ topics }: { topics: AdminTopic[] }) {
  const [state, formAction, isPending] = useActionState(createTopicAction, initialState)
  const [department, setDepartment] = useState<"Cundinamarca" | "Boyacá">("Cundinamarca")
  const [generateState, generateAction, isGenerating] = useActionState(
    generateTopicsAction,
    initialGenerateState
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
        <div>
          <p className="text-sm font-medium text-white">¿Se está acabando el banco?</p>
          <p className="mt-0.5 text-xs text-white/50">
            La IA propone temas nuevos cruzando municipios de Cundinamarca/Boyacá con los servicios de Codifikai.
          </p>
        </div>
        <form action={generateAction}>
          <button
            type="submit"
            disabled={isGenerating}
            className="shrink-0 rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 disabled:opacity-50"
          >
            {isGenerating ? "Generando…" : "Generar más temas con IA"}
          </button>
        </form>
      </div>
      {generateState.error && <p className="text-xs text-red-300">{generateState.error}</p>}
      {generateState.added !== undefined && (
        <p className="text-xs text-emerald-300">
          Se agregaron {generateState.added} temas nuevos al banco.
        </p>
      )}

      <form
        action={formAction}
        className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <input
          name="topic"
          placeholder="Tema del artículo"
          className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60 lg:col-span-2"
        />
        <input
          name="city"
          placeholder="Ciudad/zona"
          className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
        />
        <select
          name="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value as typeof department)}
          className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
        >
          <option value="Cundinamarca">Cundinamarca</option>
          <option value="Boyacá">Boyacá</option>
        </select>
        <input
          name="keyword"
          placeholder="Palabra clave principal"
          className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60 lg:col-span-2"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 disabled:opacity-50 lg:col-span-2"
        >
          {isPending ? "Agregando…" : "Agregar tema"}
        </button>
        {state.error && (
          <p className="text-xs text-red-300 sm:col-span-2 lg:col-span-4">{state.error}</p>
        )}
      </form>

      <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between gap-4 bg-white/[0.02] px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{topic.topic}</p>
              <p className="mt-0.5 truncate text-xs text-white/50">
                {topic.city} · {topic.keyword}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[topic.status]}`}>
                {STATUS_LABEL[topic.status]}
              </span>
              {topic.status === "pendiente" && (
                <>
                  <Link
                    href={`/admin/posts/new?topic=${encodeURIComponent(topic.topic)}&city=${encodeURIComponent(topic.city)}&department=${encodeURIComponent(topic.department)}&keyword=${encodeURIComponent(topic.keyword)}`}
                    className="rounded-md border border-cyan-400/30 px-2.5 py-1 text-xs font-medium text-cyan-300 transition-colors hover:bg-cyan-400/10"
                  >
                    Usar
                  </Link>
                  <form action={markTopicUsedAction.bind(null, topic.id)}>
                    <button
                      type="submit"
                      className="rounded-md border border-white/15 px-2.5 py-1 text-xs text-white/60 transition-colors hover:bg-white/5"
                    >
                      Marcar en uso
                    </button>
                  </form>
                </>
              )}
              <form action={deleteTopicAction.bind(null, topic.id)}>
                <button
                  type="submit"
                  className="rounded-md border border-red-500/20 px-2.5 py-1 text-xs text-red-300/80 transition-colors hover:bg-red-500/10"
                >
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
