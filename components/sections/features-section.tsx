"use client"

import { Lightbulb, Target, TrendingUp } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const features = [
  {
    icon: Lightbulb,
    titleKey: "Estrategia",
    descKey: "Diseñamos soluciones personalizadas basadas en análisis profundo de tu negocio y objetivos.",
  },
  {
    icon: Target,
    titleKey: "Planificación",
    descKey: "Metodologías ágiles y roadmaps claros para ejecutar proyectos de forma eficiente.",
  },
  {
    icon: TrendingUp,
    titleKey: "Crecimiento",
    descKey: "Soluciones escalables que evolucionan con tu empresa y generan resultados medibles.",
  },
]

export function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.titleKey}
                className={`group relative p-8 rounded-2xl glass-card border-glow transition-all duration-700 hover-lift ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                
                {/* Content */}
                <h3
                  className="text-xl font-semibold text-foreground mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {feature.titleKey}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.descKey}
                </p>

                {/* Hover line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
