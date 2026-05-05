"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { SitePreviewIframe } from "@/components/site-preview-iframe"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/providers/language-provider"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"
import { Button } from "@/components/ui/button"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { WHATSAPP_URL } from "@/lib/contact"
import { successCases, isLogoPosterPath } from "@/lib/success-cases"
import { cn } from "@/lib/utils"

export default function CasosDeExitoPage() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 })
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  const activeCase = successCases[activeIndex]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable
      ) {
        return
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % successCases.length)
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + successCases.length) % successCases.length)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % successCases.length)
    }, 5000)
    return () => window.clearInterval(intervalId)
  }, [])

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + successCases.length) % successCases.length)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % successCases.length)

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
            className={`mb-16 text-center md:mb-20 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionEyebrow label={t("casesPage.label")} alwaysCentered />
            <h1
              className="mx-auto max-w-4xl text-4xl font-bold heading-brand mb-6 text-balance md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("casesPage.title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
              {t("casesPage.subtitle")}
            </p>
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative rounded-3xl border border-white/10 bg-card/25 p-4 shadow-2xl backdrop-blur-xl md:p-6">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={goPrev}
                className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border-white/20 bg-background/55 backdrop-blur-md lg:flex"
                aria-label="Proyecto anterior"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={goNext}
                className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border-white/20 bg-background/55 backdrop-blur-md lg:flex"
                aria-label="Siguiente proyecto"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/10 bg-background/45 px-2 py-8 md:px-10 md:py-10",
                  "min-h-[420px] md:min-h-[520px]"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0",
                    isLogoPosterPath(activeCase.image)
                      ? "bg-white/95"
                      : "bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),rgba(2,8,18,0.78))]"
                  )}
                >
                  <Image
                    src={activeCase.image}
                    alt={`Preview de ${activeCase.title}`}
                    fill
                    className={cn(
                      isLogoPosterPath(activeCase.image)
                        ? "object-contain p-10"
                        : "object-cover",
                      "opacity-62"
                    )}
                    sizes="100vw"
                  />
                  {activeCase.embedSitePreview !== false && (
                    <SitePreviewIframe url={activeCase.url} interactive />
                  )}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0",
                      "bg-[radial-gradient(circle_at_50%_42%,rgba(0,0,0,0.18)_0%,rgba(1,7,17,0.58)_56%,rgba(1,7,17,0.86)_100%)]"
                    )}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(217,70,239,0.18),transparent_40%)]" />
                <div className="pointer-events-none absolute -left-20 top-8 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 bottom-10 h-44 w-44 rounded-full bg-fuchsia-500/15 blur-3xl" />
                <div className="pointer-events-none relative z-10 mx-auto min-h-[420px] md:min-h-[520px]" />

                <div className="relative z-10 mt-2 flex items-center justify-center gap-3 lg:hidden">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={goPrev}
                    className="rounded-full border-white/20 bg-background/55 backdrop-blur-md"
                    aria-label="Proyecto anterior"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-xs text-muted-foreground sm:text-sm">
                    {activeIndex + 1} / {successCases.length}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={goNext}
                    className="rounded-full border-white/20 bg-background/55 backdrop-blur-md"
                    aria-label="Siguiente proyecto"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-background/55 p-4 md:p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Proyectos</p>
                    <p className="text-xs text-muted-foreground/80">Selecciona uno para ver sus detalles</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {successCases.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          "group relative aspect-[4/3] overflow-hidden rounded-lg border transition-all",
                          index === activeIndex
                            ? "border-accent/70 ring-1 ring-accent/45 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
                            : "border-white/15 hover:border-accent/35"
                        )}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className={cn(isLogoPosterPath(item.image) ? "object-contain bg-white p-2" : "object-cover")}
                          sizes="(max-width: 768px) 45vw, (max-width: 1280px) 28vw, 220px"
                        />
                        {item.embedSitePreview !== false && (
                          <div className="absolute inset-0 opacity-90">
                            <SitePreviewIframe url={item.url} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/15" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-2">
                          <p className="line-clamp-1 text-[11px] font-medium text-white sm:text-xs">{item.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-background/55 p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{activeCase.category}</p>
                  <h2
                    className="mt-2 text-2xl font-bold heading-brand md:text-3xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {activeCase.title}
                  </h2>
                  <p className="mt-1 text-sm text-accent/90 md:text-base">{activeCase.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {activeCase.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button asChild variant="cta" size="cta" className="group">
                      <a href={activeCase.url} target="_blank" rel="noopener noreferrer">
                        {t("casesPage.visitSite")}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Button>
                    <a
                      href={activeCase.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all hover:gap-3"
                    >
                      Abrir proyecto en vivo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-16 md:mt-20 text-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-muted-foreground mb-6">
              {t("casesPage.ctaTitle")}
            </p>
            <Button asChild variant="cta" size="cta" className="group">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("casesPage.ctaButton")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
