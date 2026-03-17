"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"

const testimonialsData = [
  { quoteKey: "stats.testimonial1", author: "Carlos Mendoza", role: "CEO, TechVentures", avatar: "CM" },
  { quoteKey: "stats.testimonial2", author: "María García", role: "COO, InnovateLab", avatar: "MG" },
  { quoteKey: "stats.testimonial3", author: "Roberto Silva", role: "CTO, DataFlow", avatar: "RS" },
]

const statsData = [
  { value: "$2.5M+", labelKey: "stats.generated" },
  { value: "40%", labelKey: "stats.reduction" },
  { value: "3x", labelKey: "stats.roi" },
  { value: "24/7", labelKey: "stats.support" },
]

export function StatsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-24 relative overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 md:gap-6 mb-5">
            <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {t("stats.label")}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
            <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Stats grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {statsData.map((stat, index) => (
            <div
              key={stat.labelKey}
              className="text-center p-6 rounded-2xl bg-background/50 hover-lift transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="text-2xl md:text-3xl font-bold text-gradient mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`p-6 rounded-2xl glass-card border-glow transition-all duration-700 hover-lift ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              {/* Quote */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                &ldquo;{t(testimonial.quoteKey)}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
