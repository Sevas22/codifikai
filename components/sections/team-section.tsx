"use client"

import { Linkedin, Twitter } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const team = [
  {
    name: "Alejandro Ruiz",
    role: "CEO & Founder",
    avatar: "AR",
    bio: "15+ años en transformación digital",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sofia Chen",
    role: "CTO",
    avatar: "SC",
    bio: "Ex-Google, especialista en ML",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Miguel Torres",
    role: "Head of AI",
    avatar: "MT",
    bio: "PhD en Inteligencia Artificial",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Laura Mendez",
    role: "Head of Design",
    avatar: "LM",
    bio: "Award-winning UX designer",
    linkedin: "#",
    twitter: "#",
  },
]

export function TeamSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`group relative p-6 rounded-2xl glass-card border-glow text-center transition-all duration-700 hover-lift ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-accent group-hover:scale-110 transition-transform duration-500">
                {member.avatar}
              </div>

              {/* Info */}
              <h3
                className="text-lg font-semibold text-foreground mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {member.name}
              </h3>
              <p className="text-accent text-sm font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

              {/* Social links */}
              <div className="flex justify-center gap-3">
                <a
                  href={member.linkedin}
                  className="p-2 rounded-lg bg-foreground/5 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={member.twitter}
                  className="p-2 rounded-lg bg-foreground/5 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
                  aria-label={`${member.name} Twitter`}
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
