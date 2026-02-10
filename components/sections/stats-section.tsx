"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"

const testimonials = [
  {
    quote: "Codifikai transformó nuestra operación de ventas con IA. Los resultados superaron nuestras expectativas.",
    author: "Carlos Mendoza",
    role: "CEO, TechVentures",
    avatar: "CM",
  },
  {
    quote: "La automatización implementada nos ahorró más de 200 horas mensuales en tareas repetitivas.",
    author: "María García",
    role: "COO, InnovateLab",
    avatar: "MG",
  },
  {
    quote: "Un equipo excepcional que entiende tanto la tecnología como las necesidades del negocio.",
    author: "Roberto Silva",
    role: "CTO, DataFlow",
    avatar: "RS",
  },
]

const stats = [
  { value: "$2.5M+", label: "Generados para clientes" },
  { value: "40%", label: "Reducción de costos promedio" },
  { value: "3x", label: "ROI promedio en 6 meses" },
  { value: "24/7", label: "Soporte continuo" },
]

export function StatsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-secondary/30">
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
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Stats grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-background/50 hover-lift transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="text-2xl md:text-3xl font-bold text-gradient mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`p-6 rounded-2xl glass-card border-glow transition-all duration-700 hover-lift ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              {/* Quote */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
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
