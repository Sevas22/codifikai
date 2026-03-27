"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"

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

const successCases = [
  {
    title: "Jibala Trading",
    subtitle: "Middle East Trade & Supply",
    description: "Empresa de comercio enfocada en mercados del Golfo. Sourcing premium, programas FCL/LCL y coordinaciÃ³n logÃ­stica para distribuidores y retail en UAE, Arabia Saudita y Qatar.",
    url: "https://www.jibalamericastrading.com/",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    category: "Comercio Â· GCC",
    tags: ["Next.js", "React", "Tailwind", "SEO"],
  },
  {
    title: "MusheTrading",
    subtitle: "China-Focused Export & Sourcing",
    description: "Soluciones de exportaciÃ³n y sourcing para el mercado chino. Sourcing con certificaciones, cumplimiento normativo y logÃ­stica de extremo a extremo para importadores y plataformas.",
    url: "https://mushetrading.vercel.app/",
    image: "https://images.unsplash.com/photo-1508807526341-e3b5c71e8c7?w=800&q=80",
    category: "Export Â· China",
    tags: ["Next.js", "React", "Vercel", "TypeScript"],
  },
  {
    title: "Agencia Contraste",
    subtitle: "BTL Experiencial Â· Activaciones de Marca",
    description: "Sitio web corporativo para agencia de marketing y publicidad. DiseÃ±o moderno con animaciones fluidas y experiencia de usuario optimizada.",
    url: "https://www.contrasteagencia.com/",
    image: "/images/cases/contrasteagencia.png",
    category: "Agencia de Publicidad",
    tags: ["React", "Next.js", "Tailwind CSS", "Animaciones"],
  },
  {
    title: "TH Global",
    subtitle: "Telehealth Â· TeleradiologÃ­a",
    description: "Plataforma de teleradiologÃ­a que revoluciona los diagnÃ³sticos con tecnologÃ­a avanzada. Estudios de tele radiologÃ­a, tele cardiologÃ­a y medicina nuclear con presencia nacional e internacional.",
    url: "https://thglobal.com.co/",
    image: "/images/cases/thglobal.png",
    category: "Salud Â· Telemedicina",
    tags: ["Next.js", "React", "TypeScript", "SEO"],
  },
  {
    title: "Mercaderus Trading",
    subtitle: "Food Export Logistics",
    description: "Plataforma de logÃ­stica y exportaciÃ³n de alimentos enfocada en el mercado estadounidense. ConexiÃ³n entre proveedores, importadores y distribuidores con programas de contenedores y coordinaciÃ³n operativa.",
    url: "https://www.mercaderustrading.com/",
    image: "/images/cases/mercaderus.png",
    category: "E-commerce Â· LogÃ­stica",
    tags: ["Next.js", "React", "TypeScript", "SEO"],
  },
  {
    title: "venextrading",
    subtitle: "Mercado Venezolano",
    description: "Marketplace que conecta vendedores y compradores con productos de calidad en Venezuela. Soluciones de sourcing, control de calidad y logÃ­stica para comercio internacional.",
    url: "https://www.venextrading.shop/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category: "Marketplace Â· E-commerce",
    tags: ["Next.js", "React", "E-commerce", "UI/UX"],
  },
  {
    title: "Logysan",
    subtitle: "Soluciones LogÃ­sticas Integrales",
    description: "Plataforma web para empresa de logÃ­stica y transporte. Sistema completo con gestiÃ³n de servicios y contacto directo con clientes.",
    url: "https://logysan.com.co/",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    category: "LogÃ­stica y Transporte",
    tags: ["Next.js", "React", "TypeScript", "SEO"],
  },
  {
    title: "Jin Global Trading",
    subtitle: "Importaciones y Exportaciones",
    description: "Integrador estratÃ©gico: importaciones productivas, comercializaciÃ³n internacional, financiamiento y logÃ­stica para pymes y exportadoras latinas hacia Estados Unidos, Europa, Medio Oriente y Asia.",
    url: "https://jinglobaltrading.com/",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
    category: "Importaciones Â· Exportaciones",
    tags: ["Next.js", "React", "Comercio Internacional", "SEO"],
  },
  {
    title: "Fibraca",
    subtitle: "Soluciones PRFV Â· Industria",
    description: "Sitio corporativo y tienda para productos PRFV (polÃ­mero reforzado con fibra de vidrio): barras, mallas, perfiles, rejillas, tuberÃ­a y montaje solar. IngenierÃ­a para construcciÃ³n, energÃ­a e infraestructura.",
    url: "https://www.fibraca.com/",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    category: "Industrial Â· E-commerce",
    tags: ["Next.js", "React", "E-commerce", "SEO"],
  },
  {
    title: "Trader Marketer",
    subtitle: "Export Trading Company",
    description: "Plataforma para export trading: conecta proveedores latinoamericanos con compradores internacionales, servicios de internacionalizaciÃ³n y segmentos agroindustrial, textil, muebles y mÃ¡s.",
    url: "https://www.tradermarketer.online/",
    image: "https://images.unsplash.com/photo-1494412519320-aa613ded778b?w=800&q=80",
    category: "Comercio internacional Â· B2B",
    tags: ["Next.js", "React", "Trading", "SEO"],
  },
]

export default function CasosDeExitoPage() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 })
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen bg-transparent text-foreground">
      <Navigation />
      <FloatingContact />

      <section ref={ref} className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-0 top-20 z-0 hidden w-52 lg:block lg:opacity-40">
          <Tech3DAccent variant="chip" size="md" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`mb-16 md:mb-20 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6 mb-5">
              <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                {t("casesPage.label")}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.76_0.18_195/0.35)]" />
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold heading-brand mb-6 text-balance max-w-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("casesPage.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {t("casesPage.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {successCases.map((item, index) => (
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
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-background/90 backdrop-blur-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>

                <div className="border-t border-border/50 bg-card p-5 md:p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    {item.category}
                  </p>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2
                      className="text-xl md:text-2xl font-bold heading-brand"
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

          <div
            className={`mt-16 md:mt-20 text-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-muted-foreground mb-6">
              {t("casesPage.ctaTitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-medium text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              {t("casesPage.ctaButton")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
