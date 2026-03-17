"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, BadgeCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const highlights = [
  { value: "150+", label: "proyectos digitales ejecutados" },
  { value: "50+", label: "clientes acompanados" },
  { value: "98%", label: "satisfaccion en la entrega" },
]

const pillars = [
  "Desarrollo de software a medida",
  "Automatizacion y soluciones con IA",
  "Estrategia digital enfocada en crecimiento",
]

export function CompanyIntroSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 })

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 md:gap-6 mb-5">
            <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Quienes somos
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
            <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            <Sparkles className="h-4 w-4" />
            Socios tecnologicos para marcas en evolucion
          </span>

          <h2
            className="mt-6 max-w-3xl text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            En Codifikai transformamos ideas, procesos y vision de negocio en soluciones digitales con
            impacto real.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Somos una empresa enfocada en desarrollo de software, automatizacion e inteligencia
            artificial aplicada al crecimiento empresarial. Acompanamos a cada cliente desde la
            estrategia hasta la ejecucion para construir productos utiles, modernos y preparados para
            escalar.
          </p>

          <div className="mt-7 grid gap-3">
            {pillars.map((pillar, index) => (
              <div
                key={pillar}
                className={`flex items-center gap-3 rounded-2xl border border-border/50 bg-background/60 px-4 py-3 backdrop-blur-xl transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 120 + 120}ms` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <BadgeCheck className="h-5 w-5 text-accent" />
                </div>
                <p className="text-sm font-medium text-foreground md:text-base">{pillar}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 h-px w-full max-w-2xl bg-gradient-to-r from-border via-accent/40 to-transparent" />

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 140 + 250}ms` }}
              >
                <div
                  className="text-3xl font-bold text-foreground md:text-4xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.value}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button
              asChild
              variant="outline"
              className="group border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Link href="/about">
                Conocer la empresa
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative mx-auto max-w-md">
            <div className="absolute left-10 right-0 top-14 bottom-12 rounded-[2rem] bg-accent" />
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-background/80 p-4 shadow-[0_20px_80px_oklch(0_0_0/0.18)] backdrop-blur-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-secondary/40">
                <Image
                  src="/images/team/jhoan-gomez.png"
                  alt="Fundador de Codifikai"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/65 to-transparent p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Liderazgo y ejecucion
                  </p>
                  <p
                    className="mt-2 text-2xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Codifikai
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Construimos soluciones que conectan tecnologia, experiencia de usuario y crecimiento
                    comercial.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -left-8 bottom-8 max-w-[220px] rounded-2xl border border-border/50 bg-background/90 p-4 shadow-xl backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Enfoque
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                Software, automatizacion e IA para empresas que quieren crecer con estructura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
