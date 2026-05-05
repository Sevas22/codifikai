"use client"

import { type ReactNode, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Bot, Globe, MessageSquare, ShoppingCart, Sparkles, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useMouseAmbient } from "@/components/providers/mouse-ambient-provider"
import { HeroSphereVisual } from "@/components/sections/hero-sphere-visual"
import { WHATSAPP_URL } from "@/lib/contact"

function HeroHudFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-[42rem]">
      <div className="relative px-0 py-0.5 sm:py-1.5">
        <div className="pointer-events-none absolute -left-0.5 -top-0.5 h-7 w-7 border-l-2 border-t-2 border-accent sm:h-9 sm:w-9" />
        <div className="pointer-events-none absolute -right-0.5 -top-0.5 h-7 w-7 border-r-2 border-t-2 border-violet-400/50 sm:h-9 sm:w-9" />
        <div className="pointer-events-none absolute -bottom-0.5 -left-0.5 h-7 w-7 border-b-2 border-l-2 border-white/15 sm:h-9 sm:w-9" />
        <div className="pointer-events-none absolute -bottom-0.5 -right-0.5 h-7 w-7 border-b-2 border-r-2 border-fuchsia-500/45 sm:h-9 sm:w-9" />
        <div className="pointer-events-none absolute left-6 top-0 h-px w-20 bg-gradient-to-r from-accent/90 via-violet-400/50 to-transparent sm:left-10 sm:w-28" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-px w-16 bg-gradient-to-l from-white/35 to-transparent sm:right-14" />
        <div className="pointer-events-none absolute -right-1 top-1/2 h-8 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        {children}
      </div>
    </div>
  )
}

export function HeroSection() {
  const { t } = useLanguage()
  const { x: mouseX, y: mouseY, isMobile } = useMouseAmbient()
  const { ref: contentRef, isVisible } = useScrollReveal({ threshold: 0.1 })
  const [activeServiceId, setActiveServiceId] = useState("web")

  const stats = [
    { value: "150+", label: t("hero.stats.projects") },
    { value: "50+", label: t("hero.stats.clients") },
    { value: "98%", label: t("hero.stats.satisfaction") },
  ]

  const serviceNodes = useMemo(
    () => [
      {
        id: "web",
        icon: Globe,
        title: t("hero.services.web.title"),
        blurb: t("hero.services.web.blurb"),
      },
      {
        id: "ecommerce",
        icon: ShoppingCart,
        title: t("hero.services.ecommerce.title"),
        blurb: t("hero.services.ecommerce.blurb"),
      },
      {
        id: "automation",
        icon: Workflow,
        title: t("hero.services.automation.title"),
        blurb: t("hero.services.automation.blurb"),
      },
      {
        id: "chatbots",
        icon: Bot,
        title: t("hero.services.chatbots.title"),
        blurb: t("hero.services.chatbots.blurb"),
      },
    ],
    [t]
  )

  const activeService = serviceNodes.find((item) => item.id === activeServiceId) ?? serviceNodes[0]

  return (
    <section className="relative min-h-0 overflow-hidden pt-28 pb-8 md:min-h-[min(100svh,1080px)] md:pt-32 md:pb-16">
      {/* Esfera — mismo patrón que About / Servicios (fondo, no columna) */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -right-[12%] top-[8%] h-[min(440px,48vh)] w-[min(92vw,480px)] opacity-[0.38] sm:top-[10%] sm:opacity-45 md:-right-[6%] md:top-[12%] lg:h-[min(460px,50vh)] lg:w-[min(520px,44vw)] lg:opacity-[0.48]">
          <HeroSphereVisual mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className={`mx-auto max-w-5xl text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <HeroHudFrame>
            <h1 className="hero-title-gradient mx-auto max-w-xl font-sans text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl lg:max-w-4xl xl:text-[3.25rem] xl:leading-[1.1]">
              <span className="heading-brand">{t("hero.title")}</span>{" "}
              <span className="text-gradient">{t("hero.titleHighlight")}</span>
            </h1>
          </HeroHudFrame>

          <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Button asChild variant="cta" size="cta-lg" className="group hover-lift w-full max-w-sm sm:w-auto">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group w-full max-w-sm rounded-full border-white/15 bg-white/[0.04] px-6 py-5 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/45 hover:bg-accent/10 dark:border-white/12 dark:bg-transparent sm:w-auto sm:px-8 sm:py-6 sm:text-base"
            >
              <Link href="/about">
                <span>{t("hero.cta.secondary")}</span>
              </Link>
            </Button>
          </div>

          <div className="mx-auto mt-12 w-full max-w-5xl rounded-3xl border border-white/10 bg-card/30 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="relative min-h-[260px] rounded-2xl border border-white/10 bg-background/40 p-4">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(217,70,239,0.18),transparent_45%)]" />
                <div className="relative mx-auto mt-4 flex h-[190px] w-[190px] items-center justify-center rounded-full border border-accent/60 bg-background/70 shadow-[0_0_45px_rgba(34,211,238,0.25)]">
                  <div className="absolute inset-[-18px] rounded-full border border-fuchsia-400/30 animate-[spin_18s_linear_infinite]" />
                  <div className="absolute inset-[-34px] rounded-full border border-cyan-300/20 animate-[spin_24s_linear_infinite_reverse]" />
                  <Sparkles className="h-10 w-10 text-accent" />
                </div>

                <div className="relative mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                  {serviceNodes.map((node) => {
                    const Icon = node.icon
                    const isActive = node.id === activeService.id
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onMouseEnter={() => setActiveServiceId(node.id)}
                        onFocus={() => setActiveServiceId(node.id)}
                        onClick={() => setActiveServiceId(node.id)}
                        className={`group rounded-xl border px-3 py-2 text-left transition-all duration-300 ${
                          isActive
                            ? "border-accent/60 bg-accent/15 shadow-[0_0_20px_rgba(34,211,238,0.22)]"
                            : "border-white/12 bg-white/[0.03] hover:border-accent/35 hover:bg-accent/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-md p-1.5 ${
                              isActive ? "bg-accent/20 text-accent" : "bg-white/8 text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-xs font-medium sm:text-sm">{node.title}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-background/50 p-4 text-left sm:p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent sm:text-xs">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {t("hero.interactive.label")}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground sm:text-xl">{activeService.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {activeService.blurb}
                </p>

                <div className="mt-5 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-foreground sm:text-sm">
                    {t("hero.chat.user")}
                  </div>
                  <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md border border-accent/30 bg-accent/15 px-3 py-2 text-xs text-foreground sm:text-sm">
                    {t(`hero.chat.reply.${activeService.id}`)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 grid w-full max-w-xl grid-cols-3 gap-2 sm:mt-8 sm:gap-4 md:max-w-2xl">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/60 bg-card/35 px-2 py-3 text-center shadow-inner backdrop-blur-md sm:px-3 sm:py-4 dark:border-white/[0.08] dark:bg-white/[0.04]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `all 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 1) * 120}ms`,
                }}
              >
                <div className="font-sans text-xl font-bold text-gradient sm:text-2xl md:text-3xl lg:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[0.65rem] leading-tight text-muted-foreground sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground animate-float md:bottom-8 md:flex">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-current p-2">
          <div className="h-2 w-1 animate-bounce rounded-full bg-current" />
        </div>
      </div>
    </section>
  )
}
