"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const contactOptions = [
  {
    icon: MessageCircle,
    label: "Chat en vivo",
    value: "Respuesta inmediata",
    href: "#",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@codifikai.tech",
    href: "mailto:hello@codifikai.tech",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
]

export function CTASection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-glow-pulse delay-500" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 md:gap-6 mb-6">
            <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Hablemos
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
            <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
          </div>
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-7">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-sm font-medium text-accent">{t("cta.available")}</span>
          </div>

          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("cta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("cta.subtitle")}
          </p>

          {/* CTA button */}
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground px-10 py-7 text-lg font-medium hover-lift hover-glow"
          >
            <Link href="/contact">
              <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-accent-foreground">
                {t("cta.button")}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </Button>
        </div>

        {/* Contact options */}
        <div
          className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {contactOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <a
                key={option.label}
                href={option.href}
                className="group p-6 rounded-2xl glass-card border-glow text-center hover-lift transition-all duration-500"
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">{option.label}</div>
                <div className="font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                  {option.value}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
