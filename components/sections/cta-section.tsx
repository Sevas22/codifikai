"use client"

import { ArrowRight, MessageCircle, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { CONTACT_EMAIL, MAILTO_CONTACT, PHONE_DISPLAY, PHONE_TEL_HREF, WHATSAPP_URL } from "@/lib/contact"

const contactOptions = [
  {
    icon: MessageCircle,
    label: "Chat en vivo",
    value: "Respuesta inmediata",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: MAILTO_CONTACT,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: PHONE_DISPLAY,
    href: PHONE_TEL_HREF,
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionEyebrow label="Hablemos" className="mb-6" />
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold heading-brand mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("cta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("cta.subtitle")}
          </p>

          {/* CTA button */}
          <Button asChild variant="cta" size="cta-lg" className="group hover-lift hover-glow">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              {t("cta.button")}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
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
                {...("external" in option && option.external
                  ? { target: "_blank" as const, rel: "noopener noreferrer" }
                  : {})}
                className="group p-6 rounded-2xl glass-card border-glow text-center hover-lift transition-all duration-500"
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <div className="mx-auto mb-4 flex justify-center">
                  <IconSquircle icon={Icon} size="lg" className="group-hover:scale-105" />
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
