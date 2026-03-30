"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"

const testimonialsData = [
  { quoteKey: "stats.testimonial1", author: "Carlos Mendoza", role: "CEO, TechVentures", avatar: "CM" },
  { quoteKey: "stats.testimonial2", author: "Mar\u00eda Garc\u00eda", role: "COO, InnovateLab", avatar: "MG" },
  { quoteKey: "stats.testimonial3", author: "Roberto Silva", role: "CTO, DataFlow", avatar: "RS" },
]

export function StatsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-24 relative overflow-hidden bg-secondary/30">
      <div className="pointer-events-none absolute left-0 top-28 z-0 hidden w-48 lg:block lg:opacity-30">
        <Tech3DAccent variant="stack" size="sm" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionEyebrow label={t("stats.label")} />
          <h2
            className="text-3xl md:text-4xl font-bold heading-brand mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`p-6 rounded-2xl glass-card border-glow transition-all duration-700 hover-lift ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Quote */}
              <p className="text-muted-foreground mb-6 text-center leading-relaxed md:text-left">
                &ldquo;{t(testimonial.quoteKey)}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center justify-center gap-4 md:justify-start">
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
