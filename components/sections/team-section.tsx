"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { cn } from "@/lib/utils"

const team = [
  {
    name: "Jhoan Gomez",
    role: "CEO & Founder",
    initials: "JG",
    image: "/images/team/jhoan-gomez.png",
    bioKey: "team.jhoanBio",
    href: "/about#jhoan-gomez",
    focusKeys: ["team.focus.vision", "team.focus.execution"],
    objectPosition: "center",
  },
  {
    name: "Jhon Ariza",
    role: "Co-Founder & Strategy Director",
    initials: "JA",
    image: "/images/team/jhon-ariza.png",
    bioKey: "team.jhonBio",
    href: "/about#jhon-ariza",
    focusKeys: ["team.focus.strategy", "team.focus.growth"],
    objectPosition: "top center",
  },
  {
    name: "Victor Giron",
    roleKey: "team.roleBDM",
    initials: "VG",
    image: "/images/team/victor-giron.png",
    bioKey: "team.victorBio",
    href: "/about#victor-giron",
    focusKeys: ["team.focus.alliances", "team.focus.growth"],
    objectPosition: "top center",
  },
  {
    name: "Fredy Velandia",
    roleKey: "team.roleSalesLead",
    initials: "FV",
    image: "/images/team/jairo-gomez-sales.png",
    bioKey: "team.jairoBio",
    href: "/about#jairo-gomez",
    focusKeys: ["team.focus.sales", "team.focus.execution"],
    objectPosition: "center",
  },
] as const

function memberRole(member: (typeof team)[number], t: (key: string) => string) {
  return "roleKey" in member && member.roleKey ? t(member.roleKey) : member.role
}

export function TeamSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-px max-w-4xl -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/15 to-transparent mx-auto" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <SectionEyebrow label={t("team.label")} alwaysCentered />
          <h2
            className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl heading-brand"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("team.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("team.subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {team.map((member, index) => {
            const role = memberRole(member, t)

            return (
              <Link
                key={member.name}
                href={member.href}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black transition-all duration-500",
                  "hover:border-accent/35 hover:shadow-[0_24px_64px_-24px_rgba(34,211,238,0.3)] hover:-translate-y-1",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden border-b border-white/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ objectPosition: member.objectPosition ?? "center" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-90" />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/50 text-[10px] font-semibold tracking-wide text-white/90 backdrop-blur-md"
                      aria-hidden
                    >
                      {member.initials}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-accent/90">
                      {role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3
                    className="text-lg font-semibold tracking-tight text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {member.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.focusKeys.map((key) => (
                      <span
                        key={key}
                        className="rounded-md border border-white/10 bg-black px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        {t(key)}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                    {t(member.bioKey)}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all duration-300 group-hover:gap-2.5">
                    {t("team.viewProfile")}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
