"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/providers/theme-provider"
import { useLanguage } from "@/components/providers/language-provider"
import { CodifikaiLogo } from "@/components/brand/codifikai-logo"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { WHATSAPP_URL } from "@/lib/contact"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: "/", label: t("nav.home"), highlight: false },
    { href: "/about", label: t("nav.about"), highlight: false },
    { href: "/services", label: t("nav.services"), highlight: true },
    { href: "/casos-de-exito", label: t("nav.cases"), highlight: false },
  ] as const

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const pillSurface =
    "rounded-full border border-border/60 bg-card/95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.14),0_4px_20px_-4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl dark:border-white/[0.18] dark:bg-zinc-800/90 dark:shadow-[0_16px_44px_-14px_rgba(0,0,0,0.42),0_0_0_1px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.07)]"

  return (
    <header className="relative z-50">
      {/* Desktop: barra flotante centrada (solo lg+) */}
      <div
        className={cn(
          "pointer-events-none fixed left-0 right-0 top-0 z-50 hidden justify-center pt-[max(1rem,env(safe-area-inset-top,0px))] lg:flex",
          isScrolled && "pt-3"
        )}
      >
        <nav
          className={cn(
            "pointer-events-auto flex max-w-[min(100%,56rem)] items-center gap-1 px-2 py-2 pl-3 sm:gap-1.5 sm:pl-4",
            pillSurface,
            isScrolled && "scale-[0.99] transition-transform duration-300"
          )}
          aria-label="Principal"
        >
          <Link
            href="/"
            className="group relative flex shrink-0 items-center rounded-lg px-1 py-0.5 outline-none ring-offset-background transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent"
          >
            <CodifikaiLogo size="sm" showCode className="relative" />
          </Link>

          <span
            className="mx-0.5 hidden h-6 w-px shrink-0 bg-border/80 sm:mx-1 sm:block"
            aria-hidden
          />

          <div className="flex flex-1 flex-wrap items-center justify-center gap-0.5 sm:gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              if (link.highlight) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all sm:px-4 sm:text-sm",
                      active
                        ? "border border-cyan-500/45 bg-gradient-to-r from-cyan-500/25 via-teal-500/15 to-cyan-400/20 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "border border-transparent bg-cyan-500/10 text-foreground hover:border-cyan-500 hover:bg-cyan-500 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                    active
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <span className="mx-0.5 hidden h-6 w-px shrink-0 bg-border/80 sm:mx-1 sm:block" aria-hidden />

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="rounded-lg px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
              aria-label="Change language"
            >
              {language}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <IconSquircle icon={Sun} size="sm" />
              ) : (
                <IconSquircle icon={Moon} size="sm" />
              )}
            </button>

            <Button asChild variant="cta" size="cta-sm" className="ml-0.5 shrink-0">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("nav.getStarted")}
              </a>
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile / tablet: header clásico */}
      <div
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500 lg:hidden",
          isScrolled
            ? "border-b border-border/50 bg-background/80 shadow-lg shadow-background/5 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 inset-safe-x sm:px-6 md:h-20">
          {/* Mismo ancho que los iconos a la derecha → logo centrado en viewport sin solaparse */}
          <div className="w-[7.75rem] shrink-0 sm:w-[8.25rem]" aria-hidden />
          <div className="flex min-w-0 flex-1 justify-center px-1">
            <Link
              href="/"
              className="group relative z-10 flex max-w-full items-center justify-center"
            >
              {/* -inset-4 en móvil empuja el glow encima de los iconos; solo desde md */}
              <div className="absolute -inset-4 hidden rounded-xl bg-accent/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 md:block" />
              <CodifikaiLogo
                size="sm"
                showCode
                className="relative max-w-full text-base !leading-tight min-[400px]:text-lg sm:text-xl group-hover:tracking-wider"
              />
            </Link>
          </div>

          <div className="flex w-[7.75rem] shrink-0 items-center justify-end gap-0.5 sm:w-[8.25rem] sm:gap-1">
            <button
              type="button"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Change language"
            >
              <IconSquircle icon={Globe} size="sm" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <IconSquircle icon={Sun} size="sm" />
              ) : (
                <IconSquircle icon={Moon} size="sm" />
              )}
            </button>
            <button
              type="button"
              className="relative z-50 p-2.5 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative h-6 w-6">
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? "translate-y-1/2 rotate-45" : "-translate-y-1.5"}`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? "translate-y-1/2 -rotate-45" : "translate-y-1"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className="relative flex h-full flex-col justify-center px-5 pb-safe pt-[max(5rem,env(safe-area-inset-top,0px))] sm:px-8">
          <nav className="space-y-1 text-center sm:space-y-2" aria-label="Móvil">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2.5 text-2xl font-bold transition-all duration-500 sm:py-3 sm:text-3xl ${
                  link.highlight
                    ? isActive(link.href)
                      ? "text-cyan-500"
                      : "text-foreground hover:text-cyan-500"
                    : isActive(link.href)
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                }`}
                style={{
                  fontFamily: "var(--font-display)",
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transitionDelay: `${index * 100 + 200}ms`,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            className="mt-8 transition-all duration-500"
            style={{
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionDelay: "400ms",
            }}
          >
            <Button
              asChild
              variant="cta"
              size="cta-lg"
              className="group w-full py-6 text-lg"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.getStarted")}
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div
            className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground transition-all duration-500"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionDelay: "500ms",
            }}
          >
            <span>Idioma: {language === "es" ? "Español" : "English"}</span>
            <span>•</span>
            <span>Tema: {theme === "dark" ? "Oscuro" : "Claro"}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
