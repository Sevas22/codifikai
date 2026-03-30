"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"

const team = [
  {
    name: "Jhoan Gomez",
    role: "CEO & Founder",
    image: "/images/team/jhoan-gomez.png",
    bioKey: "team.jhoanBio",
    href: "/about#jhoan-gomez",
    objectPosition: "center",
  },
  {
    name: "Jhon Ariza",
    role: "Co-Founder & Strategy Director",
    image: "/images/team/jhon-ariza.png",
    bioKey: "team.jhonBio",
    href: "/about#jhon-ariza",
    objectPosition: "top center",
  },
  {
    name: "Victor Giron",
    roleKey: "team.roleBDM",
    image: "/images/team/victor-giron.png",
    bioKey: "team.victorBio",
    href: "/about#victor-giron",
    objectPosition: "top center",
  },
]

function memberRole(member: (typeof team)[number], t: (key: string) => string) {
  return "roleKey" in member && member.roleKey ? t(member.roleKey) : member.role
}

export function TeamSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-8 z-0 hidden h-56 w-52 lg:block">
        <Tech3DAccent variant="prism" size="md" className="opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionEyebrow label={t("team.label")} />
          <h2
            className="text-3xl md:text-4xl font-bold heading-brand mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("team.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("team.subtitle")}
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Link
              key={member.name}
              href={member.href}
              className={`group relative overflow-hidden p-5 rounded-2xl glass-card border-glow text-center transition-all duration-700 hover-lift block ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-secondary/40 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: member.objectPosition ?? "center" }}
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent p-4 text-center sm:text-left">
                  <div className="text-xs font-medium text-accent">{memberRole(member, t)}</div>
                  <div
                    className="text-xl font-bold heading-brand-sm"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {member.name}
                  </div>
                </div>
              </div>

              {/* Info */}
              <h3
                className="text-lg font-semibold text-foreground mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {member.name}
              </h3>
              <p className="text-accent text-sm font-medium mb-2">{memberRole(member, t)}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(member.bioKey)}</p>
              <span className="inline-flex mt-4 text-sm font-medium text-accent group-hover:text-accent/80 transition-colors">
                {t("team.viewProfile")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
