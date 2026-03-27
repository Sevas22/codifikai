"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"
import { IconSquircle } from "@/components/ui/icon-squircle"

function SitePreviewIframe({ url }: { url: string }) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true)
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-[1]">
      {shouldLoad && (
        <iframe
          src={url}
          title="Preview del sitio"
          className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-[0.5] border-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
    </div>
  )
}

const cases = [
  {
    title: "Jibala Trading",
    subtitle: "Middle East Trade & Supply",
    description:
      "Empresa de comercio enfocada en mercados del Golfo. Sourcing premium, programas FCL/LCL y coordinaci\u00f3n log\u00edstica para distribuidores y retail en UAE, Arabia Saudita y Qatar.",
    url: "https://www.jibalamericastrading.com/",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    category: "Comercio \u00b7 GCC",
    tags: ["Next.js", "React", "Tailwind", "SEO"],
  },
  {
    title: "MusheTrading",
    subtitle: "China-Focused Export & Sourcing",
    description:
      "Soluciones de exportaci\u00f3n y sourcing para el mercado chino. Sourcing con certificaciones, cumplimiento normativo y log\u00edstica de extremo a extremo.",
    url: "https://mushetrading.vercel.app/",
    image: "https://images.unsplash.com/photo-1508807526341-e3b5c71e8c7?w=800&q=80",
    category: "Export \u00b7 China",
    tags: ["Next.js", "React", "Vercel", "TypeScript"],
  },
  {
    title: "Agencia Contraste",
    subtitle: "BTL Experiencial \u00b7 Activaciones de Marca",
    description:
      "Sitio web corporativo para agencia de marketing y publicidad. Dise\u00f1o moderno con animaciones fluidas y experiencia de usuario optimizada.",
    url: "https://www.contrasteagencia.com/",
    image: "/images/cases/contrasteagencia.png",
    category: "Agencia de Publicidad",
    tags: ["React", "Next.js", "Tailwind CSS", "Animaciones"],
  },
  {
    title: "TH Global",
    subtitle: "Telehealth \u00b7 Teleradiolog\u00eda",
    description:
      "Plataforma de teleradiolog\u00eda que revoluciona los diagn\u00f3sticos con tecnolog\u00eda avanzada. Estudios de teleradiolog\u00eda, telecardiolog\u00eda y medicina nuclear con presencia nacional e internacional.",
    url: "https://thglobal.com.co/",
    image: "/images/cases/thglobal.png",
    category: "Salud \u00b7 Telemedicina",
    tags: ["Next.js", "React", "TypeScript", "SEO"],
  },
  {
    title: "Fibraca",
    subtitle: "Soluciones PRFV \u00b7 Industria",
    description:
      "Sitio corporativo y tienda para productos PRFV (pol\u00edmero reforzado con fibra de vidrio): barras, mallas, perfiles, rejillas, tuber\u00eda y montaje solar. Ingenier\u00eda para construcci\u00f3n, energ\u00eda e infraestructura.",
    url: "https://www.fibraca.com/",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    category: "Industrial \u00b7 E-commerce",
    tags: ["Next.js", "React", "E-commerce", "SEO"],
  },
  {
    title: "Trader Marketer",
    subtitle: "Export Trading Company",
    description:
      "Plataforma para export trading: conecta proveedores latinoamericanos con compradores internacionales, servicios de internacionalizaci\u00f3n y segmentos agroindustrial, textil, muebles y m\u00e1s.",
    url: "https://www.tradermarketer.online/",
    image: "https://images.unsplash.com/photo-1494412519320-aa613ded778b?w=800&q=80",
    category: "Comercio internacional \u00b7 B2B",
    tags: ["Next.js", "React", "Trading", "SEO"],
  },
]

export function CaseStudiesSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute right-0 top-20 z-0 hidden w-48 lg:block lg:w-56">
        <Tech3DAccent variant="rings" size="md" className="opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="flex items-center gap-4 md:gap-6 mb-5">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                {t("cases.label")}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.76_0.18_195/0.35)]" />
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold heading-brand mb-3 md:mb-4 text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("cases.title")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl text-pretty">
              {t("cases.subtitle")}
            </p>
          </div>
          <Link
            href="/casos-de-exito"
            className="group inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
          >
            {t("cases.viewAll")}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Cases grid - mismo estilo que casos de Ã©xito */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {cases.map((item, index) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block rounded-2xl overflow-hidden border border-border/50 bg-card transition-all duration-700 hover:border-accent/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                <Image
                  src={item.image}
                  alt={`Preview de ${item.title}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <SitePreviewIframe url={item.url} />
                <div className="absolute top-4 right-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <IconSquircle icon={ExternalLink} size="sm" />
                </div>
              </div>

              <div className="border-t border-border/50 bg-card p-5 md:p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  {item.category}
                </p>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2
                    className="text-xl md:text-2xl font-bold heading-brand-sm"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h2>
                  <ExternalLink className="h-5 w-5 shrink-0 text-accent opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all duration-300">
                  {t("casesPage.visitSite")}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA - Ver mÃ¡s casos */}
        <div
          className={`mt-12 md:mt-16 text-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/casos-de-exito"
            className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-medium text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            {t("cases.viewAll")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
