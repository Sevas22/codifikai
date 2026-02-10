"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function HeroSection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isMobile, setIsMobile] = useState(false)
  const { ref: contentRef, isVisible } = useScrollReveal({ threshold: 0.1 })

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse tracking only on desktop
  useEffect(() => {
    if (isMobile) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => container?.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  const stats = [
    { value: "150+", label: t("hero.stats.projects") },
    { value: "50+", label: t("hero.stats.clients") },
    { value: "98%", label: t("hero.stats.satisfaction") },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Dynamic gradient background - simplified on mobile */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: isMobile 
            ? 'radial-gradient(circle at 50% 30%, oklch(0.70 0.15 180 / 0.12) 0%, transparent 60%)'
            : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, oklch(0.70 0.15 180 / 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Grid pattern overlay - hidden on mobile for performance */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.98_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.98_0_0/0.03)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(to_right,oklch(0.98_0_0/0.02)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.98_0_0/0.02)_1px,transparent_1px)] hidden md:block" />

      {/* Floating orbs - simplified on mobile */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl md:animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-accent/5 rounded-full blur-3xl hidden md:block md:animate-float md:delay-300" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
        <div
          ref={contentRef}
          className={`flex flex-col items-center text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Tagline badge */}
          <div className="group inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 md:mb-8 hover-glow transition-all duration-500">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            <span className="text-xs sm:text-sm font-medium text-accent">
              {t("hero.tagline")}
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance max-w-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t("hero.title")}{" "}
            <span className="text-gradient">{t("hero.titleHighlight")}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed px-2">
            {t("hero.subtitle")}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium hover-lift w-full sm:w-auto"
            >
              <Link href="/contact">
                <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-accent-foreground">
                  {t("hero.cta.primary")}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 bg-transparent w-full sm:w-auto"
            >
              <Link href="/about">
                <span>{t("hero.cta.secondary")}</span>
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 md:mt-20 grid grid-cols-3 gap-4 sm:gap-8 md:gap-16 w-full max-w-xl">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.7s ease-out ${(index + 1) * 200}ms`,
                }}
              >
                <div
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
