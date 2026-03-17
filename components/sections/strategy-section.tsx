"use client"

import { Check, Zap, Shield, Rocket, LineChart } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const strategies = [
  {
    icon: Zap,
    title: "Implementación Rápida",
    description: "Metodologías ágiles que permiten ver resultados en semanas, no meses.",
  },
  {
    icon: Shield,
    title: "Seguridad Empresarial",
    description: "Protocolos de seguridad de nivel enterprise para proteger tus datos.",
  },
  {
    icon: Rocket,
    title: "Escalabilidad",
    description: "Arquitecturas diseñadas para crecer con tu negocio sin límites.",
  },
  {
    icon: LineChart,
    title: "ROI Garantizado",
    description: "Medimos y optimizamos constantemente para maximizar tu retorno.",
  },
]

const metrics = [
  { value: "97%", label: "Proyectos entregados a tiempo" },
  { value: "4.9/5", label: "Satisfacción del cliente" },
  { value: "200+", label: "Integraciones realizadas" },
]

export function StrategySection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-24 relative overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-14 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6 mb-5">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                Nuestra estrategia
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Estrategia de negocio potenciada por IA
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Combinamos experiencia empresarial con tecnología de vanguardia para crear soluciones
              que transforman operaciones y generan crecimiento sostenible.
            </p>

            {/* Strategy list */}
            <div className="grid sm:grid-cols-2 gap-6">
              {strategies.map((strategy, index) => {
                const Icon = strategy.icon
                return (
                  <div
                    key={strategy.title}
                    className={`flex gap-4 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{strategy.title}</h4>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Metrics card */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative p-8 rounded-3xl glass-card border-glow">
              {/* Decorative gradient */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              
              <h3
                className="text-2xl font-bold text-foreground mb-8 relative"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Métricas de Éxito
              </h3>

              <div className="space-y-6 relative">
                {metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className={`flex items-center justify-between p-4 rounded-xl bg-background/50 transition-all duration-500 hover-lift ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 500}ms` }}
                  >
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span
                      className="text-2xl font-bold text-gradient"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Success indicators */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="flex items-center gap-2 text-accent">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">ISO 27001 Certificado</span>
                </div>
                <div className="flex items-center gap-2 text-accent mt-3">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Google Cloud Partner</span>
                </div>
                <div className="flex items-center gap-2 text-accent mt-3">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">AWS Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
