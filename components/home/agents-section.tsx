"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { EdSection, Reveal, WordReveal } from "@/components/home/ed-primitives"
import { ServiceBadge } from "@/components/services/service-badge"
import { useLocalePath } from "@/hooks/use-locale-path"
import { AGENTS } from "@/lib/agents"
import { DEMO_MESSAGE, whatsappUrl } from "@/lib/contact"
import type { HomeLang } from "@/lib/home-copy"

const TEXT = {
  es: {
    badge: "Nuevo",
    title: "Conoce a tu próximo equipo de agentes de IA.",
    accent: ["agentes", "de", "ia"],
    lead: "Seis agentes, cada uno con su trabajo: atención, ventas, agenda, cobranza, pedidos e inventarios. Elige uno o arma el equipo completo.",
    seeAgents: "Ver los agentes",
    demo: "Pedir demo",
    listLabel: "Agentes de IA de Codifikai",
  },
  en: {
    badge: "New",
    title: "Meet your next team of AI agents.",
    accent: ["ai", "agents"],
    lead: "Six agents, each with its own job: support, sales, scheduling, collections, orders and inventory. Pick one or build the full team.",
    seeAgents: "See the agents",
    demo: "Request a demo",
    listLabel: "Codifikai AI agents",
  },
} as const

/**
 * Franja de agentes de IA justo debajo del banner: que quien llega vea de
 * entrada que se ofrecen. Compacta a propósito (una fila de seis en pantalla
 * ancha) para no alargar la portada; el detalle vive en /services/ai-agents.
 */
export function AgentsSection({ language }: { language: HomeLang }) {
  const path = useLocalePath()
  const t = TEXT[language]
  const agentsHref = path("/services/ai-agents")

  return (
    <EdSection id="agents" className="bg-ed-canvas-sunken py-14 sm:py-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-[44rem]">
          <ServiceBadge label={t.badge} />
          <h2 className="ed-display mt-5 text-ed-ink text-[clamp(1.875rem,4vw,3.25rem)]">
            <WordReveal text={t.title} accentWords={[...t.accent]} />
          </h2>
          <Reveal delay={0.1} y={14}>
            <p className="mt-5 max-w-[54ch] text-pretty text-[0.9375rem] leading-relaxed text-ed-ink-soft sm:text-base">
              {t.lead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={14} className="flex shrink-0 flex-wrap items-center gap-3">
          <Link
            href={agentsHref}
            className="ed-punch-btn group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.875rem] font-semibold tracking-tight"
          >
            {t.seeAgents}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <Link
            href={whatsappUrl(DEMO_MESSAGE[language])}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ed-rule-strong bg-ed-canvas-raised px-6 py-3 text-[0.875rem] font-semibold tracking-tight text-ed-ink transition-colors duration-300 hover:border-ed-accent hover:text-ed-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
          >
            {t.demo}
          </Link>
        </Reveal>
      </div>

      <ul
        aria-label={t.listLabel}
        className="mt-10 grid grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-6 lg:gap-x-6"
      >
        {AGENTS.map((agent, i) => (
          <li key={agent.id}>
            <Reveal delay={i * 0.06} y={18}>
              <Link
                href={agentsHref}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-ed bg-ed-canvas-raised">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover object-[center_15%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-3 flex items-start gap-2 text-[0.8125rem] font-semibold leading-tight tracking-tight text-ed-ink sm:mt-3.5 sm:items-center sm:text-[0.9375rem]">
                  <span
                    className="mt-[5px] hidden h-2 w-2 shrink-0 rounded-full sm:mt-0 sm:block"
                    style={{ backgroundColor: agent.accent }}
                    aria-hidden
                  />
                  {agent.name}
                </h3>
                <p className="mt-1 hidden text-[0.75rem] leading-snug text-ed-ink-soft sm:block">
                  {agent.tagline[language]}
                </p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </EdSection>
  )
}
