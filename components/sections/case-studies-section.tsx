"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Code, Megaphone, Cpu } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const cases = [
  {
    category: "AI Development",
    icon: Code,
    title: "Plataforma E-commerce con IA",
    description: "Sistema de recomendación inteligente que aumentó las ventas en un 45%",
    metrics: ["+45% Ventas", "-30% Abandono"],
    image: "/images/case-ecommerce.jpg",
    color: "from-accent/40 to-accent/10",
  },
  {
    category: "AI Fintech",
    icon: Megaphone,
    title: "Dashboard Financiero Inteligente",
    description: "Plataforma de análisis predictivo para inversiones con IA",
    metrics: ["500+ Usuarios", "3x ROI"],
    image: "/images/case-fintech.jpg",
    color: "from-chart-2/40 to-chart-2/10",
  },
  {
    category: "AI Healthcare",
    icon: Cpu,
    title: "Sistema de Diagnóstico AI",
    description: "Reducción del 60% en tiempo de diagnóstico con ML",
    metrics: ["-60% Tiempo", "98% Precisión"],
    image: "/images/case-healthcare.jpg",
    color: "from-chart-4/40 to-chart-4/10",
  },
]

export function CaseStudiesSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("cases.title")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl text-pretty">
              {t("cases.subtitle")}
            </p>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
          >
            {t("cases.viewAll")}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Cases grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cases.map((caseStudy, index) => {
            const Icon = caseStudy.icon
            return (
              <Link
                key={caseStudy.title}
                href="/services"
                className={`group relative rounded-2xl overflow-hidden transition-all duration-700 hover-lift ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Image Background */}
                <div className="relative aspect-[4/5] sm:aspect-[4/5]">
                  <Image
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${caseStudy.color} opacity-60`} />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent flex flex-col justify-end p-5 md:p-6">
                  {/* Category badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm w-fit mb-3 md:mb-4">
                    <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" />
                    <span className="text-xs font-medium text-accent">{caseStudy.category}</span>
                  </div>

                  {/* Title & description */}
                  <h3
                    className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {caseStudy.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 md:mb-4 leading-relaxed line-clamp-2">
                    {caseStudy.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="px-2.5 py-1 rounded-full bg-foreground/10 backdrop-blur-sm text-xs font-medium text-foreground/90"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/40 rounded-2xl transition-colors duration-500" />
                
                {/* Hover glow */}
                <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
