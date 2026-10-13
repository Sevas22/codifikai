"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, ChevronDown, Plus, X } from "lucide-react"

import { EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import { AGENTS, type Agent } from "@/lib/agents"
import { whatsappUrl } from "@/lib/contact"
import { cn } from "@/lib/utils"

type Lang = "es" | "en"

const LABELS = {
  es: {
    label: "Catálogo",
    title: "Conoce a tu próximo equipo.",
    highlight: ["equipo."],
    lead: "Seis agentes, cada uno con su trabajo. Cotiza uno o suma varios y arma tu equipo.",
    does: "Ver qué hace",
    connects: "Se conecta con",
    quote: "Cotizar",
    add: "Sumar a mi equipo",
    added: "En tu equipo",
    clear: "Vaciar",
    teamQuote: "Cotizar mi equipo",
    teamCount: (n: number) => (n === 1 ? "1 agente en tu equipo" : `${n} agentes en tu equipo`),
    singleMessage: (name: string) =>
      `¡Buen día! Quiero cotizar el agente ${name} para mi negocio.`,
    teamMessage: (names: string) =>
      `¡Buen día! Quiero cotizar este equipo de agentes de IA: ${names}.`,
  },
  en: {
    label: "Catalog",
    title: "Meet your next team.",
    highlight: ["team."],
    lead: "Six agents, each with its own job. Get a quote for one or add several and build your team.",
    does: "See what it does",
    connects: "Connects with",
    quote: "Get a quote",
    add: "Add to my team",
    added: "On your team",
    clear: "Clear",
    teamQuote: "Get a quote for my team",
    teamCount: (n: number) => (n === 1 ? "1 agent on your team" : `${n} agents on your team`),
    singleMessage: (name: string) =>
      `Hello! I'd like a quote for the ${name} agent for my business.`,
    teamMessage: (names: string) =>
      `Hello! I'd like a quote for this team of AI agents: ${names}.`,
  },
} as const

function AgentCard({
  agent,
  language,
  selected,
  onToggle,
}: {
  agent: Agent
  language: Lang
  selected: boolean
  onToggle: () => void
}) {
  const t = LABELS[language]

  return (
    <article
      style={{ "--agent": agent.accent } as React.CSSProperties}
      className={cn(
        "ed-card ed-card-lift group flex h-full flex-col overflow-hidden transition-shadow duration-300",
        selected && "shadow-[0_0_0_2px_var(--agent)]"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ed-canvas-sunken">
        <Image
          src={agent.image}
          alt={agent.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-[center_22%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.125rem] font-semibold tracking-tight text-ed-ink">{agent.name}</h3>
        <p className="mt-1 min-h-[2.25rem] text-[0.8125rem] leading-snug text-ed-ink-soft">
          {agent.tagline[language]}
        </p>

        <details className="group/details mt-4 border-t border-ed-rule pt-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-2 text-[0.8125rem] font-semibold tracking-tight text-ed-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-accent [&::-webkit-details-marker]:hidden">
            {t.does}
            <ChevronDown
              className="h-4 w-4 text-ed-ink-faint transition-transform duration-300 group-open/details:rotate-180"
              aria-hidden
            />
          </summary>
          <ul className="mt-2 space-y-2">
            {agent.does[language].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--agent)]"
                  aria-hidden
                />
                <span className="text-[0.78125rem] leading-snug text-ed-ink">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.6875rem] leading-relaxed text-ed-ink-faint">
            <span className="ed-label mr-1.5 text-ed-ink-faint">{t.connects}</span>
            {agent.connects[language].join(" · ")}
          </p>
        </details>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <Link
            href={whatsappUrl(t.singleMessage(agent.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="ed-punch-btn group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[0.8125rem] font-semibold tracking-tight"
          >
            {t.quote}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={selected}
            aria-label={selected ? t.added : t.add}
            title={selected ? t.added : t.add}
            className={cn(
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
              selected
                ? "border-[var(--agent)] bg-[color-mix(in_oklch,var(--agent)_14%,transparent)] text-ed-ink"
                : "border-ed-rule-strong text-ed-ink hover:border-[var(--agent)]"
            )}
          >
            {selected ? (
              <Check className="h-4 w-4" aria-hidden />
            ) : (
              <Plus className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export function AgentsSection({ language }: { language: Lang }) {
  const t = LABELS[language]
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])

  const toggle = (id: string) =>
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    )

  const selected = AGENTS.filter((agent) => selectedIds.includes(agent.id))
  const teamUrl = whatsappUrl(t.teamMessage(selected.map((agent) => agent.name).join(", ")))

  return (
    <EdSection id="agents" className="ed-columns">
      <SectionHeading
        index={1}
        label={t.label}
        title={t.title}
        highlight={[...t.highlight]}
        lead={t.lead}
      />

      <div className="mt-14 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((agent, i) => (
          <Reveal key={agent.id} delay={(i % 3) * 0.08} y={22}>
            <AgentCard
              agent={agent}
              language={language}
              selected={selectedIds.includes(agent.id)}
              onToggle={() => toggle(agent.id)}
            />
          </Reveal>
        ))}
      </div>

      {selected.length > 0 ? (
        // Fija al fondo de la pantalla y no "sticky": el <main> del sitio tiene
        // overflow-x-hidden, que impide que sticky se pegue al viewport.
        <div className="fixed inset-x-4 bottom-4 z-40 pr-16 sm:pr-0">
          <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-ed-rule-strong bg-ed-canvas-raised/95 p-3.5 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
            <div className="min-w-0">
              <p className="text-[0.9375rem] font-semibold tracking-tight text-ed-ink">
                {t.teamCount(selected.length)}
              </p>
              <p className="mt-1 truncate text-[0.8125rem] text-ed-ink-soft">
                {selected.map((agent) => agent.name).join(" · ")}
              </p>
            </div>
            <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                aria-label={t.clear}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold text-ed-ink-soft transition-colors hover:text-ed-ink sm:h-auto sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2.5"
              >
                <X className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden />
                <span className="hidden sm:inline">{t.clear}</span>
              </button>
              <Link
                href={teamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-punch-btn inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-[0.875rem] font-semibold tracking-tight sm:flex-none sm:px-6"
              >
                {t.teamQuote}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </EdSection>
  )
}
