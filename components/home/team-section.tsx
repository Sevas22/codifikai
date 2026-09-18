"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import type { HomeCopy, HomeLang } from "@/lib/home-copy"

/**
 * Mismas personas, imágenes y perfiles que la sección de equipo original; solo
 * cambia la puesta en página. Los cargos que varían por idioma se resuelven
 * aquí para no depender del diccionario global.
 */
const TEAM = [
  {
    name: "Jhoan Gomez",
    role: { es: "CEO & Fundador", en: "CEO & Founder" },
    image: "/images/team/jhoan-gomez.png",
    href: "/about#jhoan-gomez",
    objectPosition: "center",
  },
  {
    name: "Jhon Ariza",
    role: { es: "Cofundador & Director de Estrategia", en: "Co-Founder & Strategy Director" },
    image: "/images/team/jhon-ariza.png",
    href: "/about#jhon-ariza",
    objectPosition: "top center",
  },
  {
    name: "Victor Giron",
    role: { es: "Gerente de Desarrollo de Negocios", en: "Business Development Manager" },
    image: "/images/team/victor-giron.png",
    href: "/about#victor-giron",
    objectPosition: "top center",
  },
  {
    name: "Fredy Velandia",
    role: { es: "Líder de Ventas", en: "Sales Lead" },
    image: "/images/team/jairo-gomez-sales.png",
    href: "/about#jairo-gomez",
    objectPosition: "center",
  },
] as const

export function TeamSection({ copy, language }: { copy: HomeCopy; language: HomeLang }) {
  return (
    <EdSection id="team">
      <SectionHeading
        index={6}
        label={copy.team.label}
        title={copy.team.title}
        lead={copy.team.lead}
      />

      <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
        {TEAM.map((member, i) => (
          <Reveal as="li" key={member.name} delay={i * 0.09} y={26}>
            <Link href={member.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-ed-canvas-raised">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  style={{ objectPosition: member.objectPosition }}
                  className="object-cover opacity-85 grayscale transition-[transform,filter,opacity] duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ed-canvas/70 to-transparent"
                  aria-hidden
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3 border-t border-ed-rule pt-4">
                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-medium tracking-tight text-ed-ink">
                    {member.name}
                  </h3>
                  <p className="ed-label mt-1.5 normal-case tracking-[0.12em] text-ed-ink-faint">
                    {member.role[language]}
                  </p>
                </div>
                <ArrowUpRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-ed-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ed-accent"
                  aria-hidden
                />
              </div>
              <span className="sr-only">{copy.team.viewProfile}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </EdSection>
  )
}
