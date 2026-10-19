"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { EdSection, Reveal, WordReveal } from "@/components/home/ed-primitives"
import { useLocalePath } from "@/hooks/use-locale-path"
import type { HomeLang } from "@/lib/home-copy"
import { successCases } from "@/lib/success-cases"

const TEXT = {
  es: {
    label: "Casos de éxito",
    title: "Negocios que ya confían en nosotros.",
    accent: ["confían"],
    count: (n: number) => `${n} proyectos con sitio público en vivo`,
    cta: "Ver los proyectos",
    listLabel: "Proyectos de Codifikai",
  },
  en: {
    label: "Success cases",
    title: "Businesses that already trust us.",
    accent: ["trust"],
    count: (n: number) => `${n} projects with a live public site`,
    cta: "See the projects",
    listLabel: "Codifikai projects",
  },
} as const

/**
 * Una fila de la marquesina. El carril se anima a -50%, así que cada mitad
 * tiene que cubrir el ancho de la pantalla por sí sola: se repite la fila hasta
 * que lo hace, y la segunda mitad es copia exacta de la primera.
 */
function LogoRow({
  names,
  reverse,
  durationSeconds,
}: {
  names: string[]
  reverse?: boolean
  durationSeconds: number
}) {
  const half = [...names, ...names]
  const lane = [...half, ...half]

  return (
    <div
      className="ed-marquee relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
      aria-hidden
    >
      <div
        className="ed-marquee-track flex w-max shrink-0 items-center"
        data-direction={reverse ? "reverse" : "forward"}
        style={{ ["--ed-marquee-duration" as string]: `${durationSeconds}s` }}
      >
        {lane.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="ed-display whitespace-nowrap px-8 text-[clamp(1.375rem,2.4vw,2rem)] text-ed-ink-faint transition-colors duration-300 hover:text-ed-ink sm:px-12"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Prueba social: los proyectos del portafolio en dos filas que corren en
 * sentidos contrarios. Los nombres salen de `successCases` —la misma fuente de
 * /projects—, así que no hay lista aparte que mantener ni cifras escritas a mano.
 * Mientras no haya logos limpios, cada marca va como texto.
 */
export function ClientsSection({ language }: { language: HomeLang }) {
  const path = useLocalePath()
  const t = TEXT[language]
  const names = successCases.map((item) => item.title)
  const middle = Math.ceil(names.length / 2)

  return (
    <EdSection id="clients" tone="dark" className="pt-0">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <Reveal y={16}>
            <p className="ed-label flex items-center gap-2.5 text-ed-accent">
              <span className="h-2 w-2 rounded-full bg-ed-accent" aria-hidden />
              {t.label}
            </p>
          </Reveal>
          <h2 className="ed-display mt-6 max-w-[20ch] text-ed-ink text-[clamp(2rem,4.6vw,3.75rem)]">
            <WordReveal text={t.title} accentWords={[...t.accent]} />
          </h2>
        </div>

        <Reveal delay={0.12} y={14} className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
          <p className="text-[0.875rem] text-ed-ink-soft">{t.count(names.length)}</p>
          <Link
            href={path("/projects")}
            className="group inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ed-ink transition-colors hover:text-ed-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent"
          >
            {t.cta}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>

      {/* Lector de pantalla: la lista una sola vez; la marquesina es decorativa. */}
      <ul className="sr-only" aria-label={t.listLabel}>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <div className="-mx-[var(--ed-gutter)] mt-12 flex flex-col gap-6 sm:mt-14 sm:gap-8">
        <LogoRow names={names.slice(0, middle)} durationSeconds={70} />
        <LogoRow names={names.slice(middle)} durationSeconds={78} reverse />
      </div>
    </EdSection>
  )
}
