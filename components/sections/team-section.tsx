"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

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
]

export function TeamSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 md:gap-6 mb-5">
            <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {t("team.label")}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
            <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("team.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("team.subtitle")}
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent p-4 text-left">
                  <div className="text-xs font-medium text-accent">{member.role}</div>
                  <div
                    className="text-xl font-bold text-foreground"
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
              <p className="text-accent text-sm font-medium mb-2">{member.role}</p>
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
