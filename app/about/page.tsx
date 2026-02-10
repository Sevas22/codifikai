"use client"

import Link from "next/link"
import { ArrowRight, Target, Eye, Heart, Zap, Shield, Users, Globe, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const values = [
  {
    icon: Zap,
    titleKey: "about.values.innovation",
    description: "Exploramos constantemente nuevas tecnologías y metodologías para mantenernos a la vanguardia.",
  },
  {
    icon: Award,
    titleKey: "about.values.excellence",
    description: "Cada proyecto refleja nuestro compromiso con la calidad y la atención al detalle.",
  },
  {
    icon: Shield,
    titleKey: "about.values.transparency",
    description: "Comunicación clara y honesta en cada etapa del proceso.",
  },
  {
    icon: Target,
    titleKey: "about.values.commitment",
    description: "Nos enfocamos en métricas y KPIs que generan impacto real en tu negocio.",
  },
]

const benefits = [
  "Equipo multidisciplinario con +50 años de experiencia combinada",
  "Metodologías ágiles adaptadas a cada proyecto",
  "Soporte continuo 24/7 post-implementación",
  "Garantía de satisfacción en todos los proyectos",
]

const partners = [
  { name: "Google Cloud Partner", logo: "GCP" },
  { name: "AWS Partner", logo: "AWS" },
  { name: "Microsoft Partner", logo: "MS" },
  { name: "OpenAI Partner", logo: "OAI" },
]

export default function AboutPage() {
  const { t } = useLanguage()
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: partnersRef, isVisible: partnersVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
              {t("about.title")}
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("about.subtitle")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("about.description")}
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div
              className={`p-8 rounded-2xl glass-card border-glow transition-all duration-700 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3
                className="text-xl font-semibold text-foreground mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t("about.mission.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.mission.desc")}
              </p>
            </div>

            <div
              className={`p-8 rounded-2xl glass-card border-glow transition-all duration-700 delay-300 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3
                className="text-xl font-semibold text-foreground mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t("about.vision.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.vision.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 md:py-32 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("about.values.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Los principios que guían cada decisión y cada línea de código
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={value.titleKey}
                  className={`group p-6 rounded-2xl glass-card border-glow text-center hover-lift transition-all duration-700 ${
                    valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-foreground mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits & Competitive Advantage */}
      <section ref={benefitsRef} className="py-24 md:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                benefitsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
                Por qué elegirnos
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Experiencia de Confianza
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Más de una década de experiencia nos respalda. Hemos ayudado a empresas de todos
                los tamaños a transformar sus operaciones con inteligencia artificial.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li
                    key={benefit}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      benefitsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-foreground/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats card */}
            <div
              className={`relative transition-all duration-700 delay-300 ${
                benefitsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="p-8 rounded-3xl glass-card border-glow">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                
                <h3
                  className="text-2xl font-bold text-foreground mb-8 relative"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Análisis Competitivo
                </h3>

                <div className="space-y-6 relative">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                    <span className="text-muted-foreground">Tiempo de entrega</span>
                    <span className="text-accent font-semibold">2x más rápido</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                    <span className="text-muted-foreground">Costo vs. agencias tradicionales</span>
                    <span className="text-accent font-semibold">-40% promedio</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                    <span className="text-muted-foreground">Tasa de retención de clientes</span>
                    <span className="text-accent font-semibold">94%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                    <span className="text-muted-foreground">NPS Score</span>
                    <span className="text-accent font-semibold">78</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Partners */}
      <section ref={partnersRef} className="py-20 border-y border-border/50 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              partnersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-accent" />
              <span className="text-lg font-medium text-foreground">Socios Globales</span>
            </div>
            <p className="text-muted-foreground">
              Certificaciones y alianzas que garantizan calidad mundial
            </p>
          </div>

          <div
            className={`flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-700 delay-200 ${
              partnersVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="group text-center"
                style={{
                  opacity: partnersVisible ? 1 : 0,
                  transform: partnersVisible ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${index * 100 + 300}ms`,
                  transitionDuration: "500ms",
                }}
              >
                <div className="px-8 py-4 rounded-xl bg-foreground/5 text-muted-foreground/60 font-bold text-2xl tracking-wider hover:bg-accent/10 hover:text-accent transition-all duration-300">
                  {partner.logo}
                </div>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Users className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Somos la Agencia IA para las Empresas
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Conecta con un asesor especializado y descubre cómo podemos transformar tu negocio
              con soluciones de inteligencia artificial a medida.
            </p>
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground px-10 py-7 text-lg font-medium hover-lift hover-glow"
            >
              <Link href="/contact">
                <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-accent-foreground">
                  {t("about.cta")}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
