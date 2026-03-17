"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Target, Eye, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const benefits = [
  "Equipo multidisciplinario con +50 años de experiencia combinada",
  "Metodologías ágiles adaptadas a cada proyecto",
  "Soporte continuo 24/7 post-implementación",
  "Garantía de satisfacción en todos los proyectos",
]

const technologies = [
  {
    title: "Tecnologías Frontend",
    score: "93%",
    description:
      "Diseñamos interfaces digitales modernas, rápidas y orientadas a conversión. Desde experiencias web corporativas hasta productos interactivos, trabajamos el frontend con foco en rendimiento, claridad visual y experiencia de usuario.",
    stack: "React.js - Next.js - Angular - Flutter",
  },
  {
    title: "Tecnologías Backend",
    score: "96%",
    description:
      "Construimos bases sólidas para productos escalables y seguros. Desarrollamos arquitecturas backend preparadas para integraciones, automatización de procesos y operación estable en entornos empresariales.",
    stack: "Node.js - PHP - .NET - APIs REST",
  },
  {
    title: "Ciencia de Datos",
    score: "82%",
    description:
      "Convertimos datos en decisiones más inteligentes. Diseñamos flujos de análisis, limpieza y explotación de información que permiten descubrir oportunidades, optimizar procesos y respaldar estrategias con evidencia.",
    stack: "Python - Pandas - ETL - Analítica predictiva",
  },
  {
    title: "Gestores de Contenido",
    score: "86%",
    description:
      "Implementamos plataformas de contenido pensadas para equipos que necesitan autonomía, organización y escalabilidad. Optimizamos la administración digital para que la operación diaria sea más eficiente y profesional.",
    stack: "WordPress - Headless CMS - Webflow - Shopify",
  },
]

const founders = [
  {
    name: "Jhoan Gomez",
    role: "CEO & Founder",
    label: "Visión, estrategia y crecimiento",
    bio: "Como CEO & Founder de Codifikai, lidero una visión enfocada en construir soluciones digitales que conecten innovación, ejecución y resultados de negocio. Creo firmemente que la tecnología debe sentirse cercana, útil y capaz de impulsar una evolución real para cada empresa que confía en nosotros.",
    quote: "No construimos solo software: construimos confianza, evolución y oportunidades reales de crecimiento.",
    image: "/images/team/jhoan-gomez.png",
    initials: "JG",
    imageSide: "left",
    objectPosition: "center",
    imageClassName: "object-cover",
  },
  {
    name: "Jhon Ariza",
    role: "Co-Founder & Strategy Director",
    label: "Estrategia, expansión y dirección comercial",
    bio: "Como Co-Founder & Strategy Director de Codifikai, impulso una visión enfocada en el crecimiento sostenible, la claridad estratégica y la construcción de relaciones sólidas con cada cliente. Mi enfoque está en alinear negocio, posicionamiento y ejecución para que cada solución genere impacto real y fortalezca la evolución de la marca.",
    quote: "Una estrategia bien dirigida convierte las ideas en oportunidades y las oportunidades en crecimiento real.",
    image: "/images/team/jhon-ariza.png",
    initials: "JA",
    imageSide: "left",
    objectPosition: "center",
    imageClassName: "object-cover",
  },
]

export default function AboutPage() {
  const { t } = useLanguage()
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: foundersRef, isVisible: foundersVisible } = useScrollReveal({ threshold: 0.15 })
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: technologiesRef, isVisible: technologiesVisible } = useScrollReveal({ threshold: 0.12 })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.7_0.15_180/0.08),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`mx-auto max-w-5xl text-center transition-all duration-700 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              Agencia de desarrollo de software e IA en Colombia
            </div>
            <h1
              className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Una fábrica de{" "}
              <span className="text-gradient">transformación digital</span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-muted-foreground">
              En Codifikai entendemos que las empresas necesitan algo más que tecnología: necesitan
              visión, ejecución y soluciones que impulsen crecimiento real. Diseñamos experiencias
              digitales que conectan estrategia, producto y resultados.
            </p>
          </div>

          <div
            className={`mt-14 md:mt-16 mb-8 transition-all duration-700 delay-150 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                Nuestra esencia
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
            </div>
          </div>

          <div className="relative mt-20 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="pointer-events-none absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-px -translate-x-1/2 lg:block">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent opacity-90" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 bg-background shadow-[0_0_18px_oklch(0.70_0.15_180/0.35)]" />
            </div>
            <div
              className={`rounded-3xl border border-border/50 bg-background/60 p-8 md:p-10 backdrop-blur-xl transition-all duration-700 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="text-gradient">Historia</span>
                </h2>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-accent/40 via-border to-transparent mb-6" />
              <div className="space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p>
                  Todo comenzó con una idea clara: las personas y las empresas necesitan socios
                  tecnológicos capaces de evolucionar al ritmo del mercado y convertir los retos en
                  oportunidades reales.
                </p>
                <p>
                  Así nació Codifikai, con la intención de crear software, automatizaciones y
                  soluciones digitales que no solo resuelvan una necesidad puntual, sino que también
                  fortalezcan la visión de negocio de cada cliente.
                </p>
                <p>
                  Nuestro enfoque combina estrategia, diseño y tecnología para construir experiencias
                  modernas, funcionales y preparadas para escalar.
                </p>
              </div>
            </div>

            <div
              className={`rounded-3xl border border-border/50 bg-background/60 p-8 md:p-10 backdrop-blur-xl transition-all duration-700 delay-300 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="text-gradient">Nuestra visión</span>
                </h2>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-accent/40 via-border to-transparent mb-6" />
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Creemos en una tecnología que vaya más allá de lo funcional. Por eso construimos
                soluciones con mentalidad de crecimiento, enfoque empresarial y una estética capaz de
                transmitir innovación, confianza y alto nivel profesional.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Innovación estratégica",
                  "Experiencias premium",
                  "Soluciones escalables",
                  "Tecnología con propósito",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-10">
                <Button
                  asChild
                  variant="outline"
                  className="group border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ¿Quieres saber más?
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div
            className={`mt-14 md:mt-18 transition-all duration-700 delay-500 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 md:gap-5">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Transición de marca
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/35 to-transparent" />
            </div>
            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground">
                De la visión estratégica pasamos al rostro que lidera la ejecución, la confianza y
                la construcción de la marca.
              </p>
              <span className="inline-flex w-fit rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                Liderazgo fundador
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section ref={foundersRef} className="pt-10 pb-12 md:pt-12 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`max-w-4xl mx-auto mb-12 md:mb-14 transition-all duration-700 ${
              foundersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                Liderazgo fundador
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/70 via-accent/20 to-transparent" />
            </div>
            <div className="mt-6 text-center">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                El liderazgo que convierte visión en resultados reales
              </h2>
            </div>
          </div>

          <div className="space-y-10">
            {founders.map((founder, index) => (
              <article
                key={founder.name}
                id={founder.name.toLowerCase().replace(/\s+/g, "-")}
                className={`group rounded-3xl border border-border/50 bg-background/60 p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-accent/30 ${
                  foundersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={`grid gap-8 md:gap-10 lg:grid-cols-[320px_1fr] lg:items-center ${founder.imageSide === "right" ? "lg:grid-flow-dense" : ""}`}>
                  <div className={`relative overflow-hidden rounded-2xl border border-border/50 bg-secondary/40 aspect-[4/5] ${founder.imageSide === "right" ? "lg:col-start-2" : ""}`}>
                    {founder.image ? (
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className={founder.imageClassName}
                        style={{ objectPosition: founder.objectPosition }}
                        sizes="(max-width: 768px) 100vw, 280px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/20 via-accent/10 to-transparent">
                        <div className="text-center">
                          <div
                            className="text-5xl font-bold text-accent"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {founder.initials}
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">Perfil institucional</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5">
                      <div className="text-sm font-medium text-accent">{founder.role}</div>
                      <div
                        className="text-2xl font-bold text-foreground"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {founder.name}
                      </div>
                    </div>
                  </div>

                  <div className={founder.imageSide === "right" ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                      {founder.label}
                    </div>
                    <h3
                      className="mt-6 text-3xl md:text-4xl font-bold text-foreground"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {founder.name}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-accent">
                      {founder.role}
                    </p>
                    <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground/90">
                      {founder.bio}
                    </p>
                    <div className="mt-6 rounded-2xl border border-border/50 bg-secondary/30 p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                        Mensaje del fundador
                      </p>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-foreground">
                        &ldquo;{founder.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Competitive Advantage */}
      <section ref={benefitsRef} className="pt-8 pb-24 md:pt-10 md:pb-28 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`mb-10 md:mb-12 transition-all duration-700 ${
              benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                Ventaja competitiva
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
            </div>
          </div>
          <div className="relative grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="pointer-events-none absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 lg:block">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent opacity-80" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 bg-background shadow-[0_0_18px_oklch(0.70_0.15_180/0.35)]" />
            </div>
            <div
              className={`rounded-3xl border border-border/50 bg-background/40 p-8 md:p-10 backdrop-blur-xl transition-all duration-700 ${
                benefitsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
                Por qué elegirnos
              </span>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-accent via-accent/40 to-transparent" />
                <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Experiencia de <span className="text-gradient">Confianza</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Más de una década de experiencia nos respalda. Hemos ayudado a empresas de todos
                los tamaños a transformar sus operaciones con inteligencia artificial.
              </p>

              <div className="h-px w-full bg-gradient-to-r from-accent/50 via-border to-transparent mb-8" />

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li
                    key={benefit}
                    className={`flex items-start gap-4 rounded-2xl border border-border/40 bg-secondary/20 px-4 py-4 transition-all duration-500 hover:border-accent/30 hover:bg-accent/5 ${
                      benefitsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 shadow-[0_0_14px_oklch(0.70_0.15_180/0.18)]">
                      <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                    </div>
                    <span className="text-foreground/90 leading-relaxed">{benefit}</span>
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
              <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 p-8 md:p-10 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                
                <h3
                  className="text-2xl font-bold text-foreground mb-8 relative"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Análisis Competitivo
                </h3>

                <div className="space-y-4 relative">
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-background/50 transition-colors duration-300 hover:border-accent/20">
                    <span className="text-muted-foreground">Tiempo de entrega</span>
                    <span className="text-accent font-semibold">2x más rápido</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-background/50 transition-colors duration-300 hover:border-accent/20">
                    <span className="text-muted-foreground">Costo vs. agencias tradicionales</span>
                    <span className="text-accent font-semibold">-40% promedio</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-background/50 transition-colors duration-300 hover:border-accent/20">
                    <span className="text-muted-foreground">Tasa de retención de clientes</span>
                    <span className="text-accent font-semibold">94%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-background/50 transition-colors duration-300 hover:border-accent/20">
                    <span className="text-muted-foreground">NPS Score</span>
                    <span className="text-accent font-semibold">78</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" ref={technologiesRef} className="pt-8 pb-24 md:pt-10 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`mb-10 md:mb-12 transition-all duration-700 ${
              technologiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                Capacidad tecnológica
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div
              className={`rounded-3xl border border-border/50 bg-background/40 p-8 md:p-10 backdrop-blur-xl transition-all duration-700 ${
                technologiesVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Tecnologías
              </h2>
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p>
                  En Codifikai combinamos herramientas consolidadas del ecosistema digital con
                  tecnologías modernas orientadas a rendimiento, seguridad y escalabilidad.
                </p>
                <p>
                  Elegimos cada stack en función del contexto del proyecto, la madurez técnica y los
                  objetivos del negocio. Eso nos permite construir soluciones más sólidas, más
                  mantenibles y mejor preparadas para crecer.
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-accent/50 via-border to-transparent my-8" />

              <ul className="space-y-4">
                {[
                  "Rendimiento optimizado desde la arquitectura hasta la experiencia final del usuario.",
                  "Seguridad y estabilidad como base para productos confiables y escalables.",
                  "Flexibilidad tecnológica para adaptarnos a distintos tamaños de empresa y etapas de crecimiento.",
                  "Selección estratégica de herramientas para equilibrar velocidad, calidad y sostenibilidad.",
                ].map((item, index) => (
                  <li
                    key={item}
                    className={`flex items-start gap-4 rounded-2xl border border-border/40 bg-secondary/20 px-4 py-4 transition-all duration-500 ${
                      technologiesVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${index * 90 + 120}ms` }}
                  >
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 shadow-[0_0_14px_oklch(0.70_0.15_180/0.18)]">
                      <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                    </div>
                    <span className="text-foreground/90 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`space-y-8 transition-all duration-700 delay-200 ${
                technologiesVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              {technologies.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-border/50 bg-background/50 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                  style={{ transitionDelay: `${index * 100 + 180}ms` }}
                >
                  <div className="flex items-end justify-between gap-4 mb-5">
                    <h3
                      className="text-2xl md:text-3xl font-bold text-foreground"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </h3>
                    <span className="text-2xl md:text-3xl font-bold text-accent">{item.score}</span>
                  </div>

                  <div className="relative mb-5">
                    <div className="h-px w-full bg-border" />
                    <div
                      className="absolute top-1/2 h-px -translate-y-1/2 bg-accent"
                      style={{ width: item.score }}
                    />
                    <div
                      className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-accent/70 bg-background shadow-[0_0_16px_oklch(0.70_0.15_180/0.35)]"
                      style={{ left: `calc(${item.score} - 7px)` }}
                    />
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {item.description}
                  </p>

                  <div className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
                    {item.stack}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="pt-10 pb-24 md:pt-12 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`mb-10 md:mb-12 transition-all duration-700 ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                Cierre estratégico
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
            </div>
          </div>
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
