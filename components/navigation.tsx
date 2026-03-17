"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/providers/theme-provider"
import { useLanguage } from "@/components/providers/language-provider"

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/casos-de-exito", label: t("nav.cases") },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo - Futuristic Wordmark */}
          <Link href="/" className="group flex items-center gap-0.5 relative z-50">
            <div className="absolute -inset-4 bg-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <span 
              className="relative text-xl md:text-2xl font-bold tracking-tight text-foreground transition-all duration-500 group-hover:tracking-wider" 
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {"<"}
            </span>
            <span 
              className="relative text-xl md:text-2xl font-bold tracking-tight text-foreground transition-all duration-500 group-hover:tracking-wider" 
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Codifik
            </span>
            <span 
              className="relative text-xl md:text-2xl font-bold tracking-tight text-gradient transition-all duration-500" 
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ai
            </span>
            <span 
              className="relative text-xl md:text-2xl font-light tracking-tight text-muted-foreground transition-all duration-500 group-hover:text-accent" 
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {"/>"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  isActive(link.href)
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Hover background */}
                <span className="absolute inset-0 bg-accent/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                {/* Active indicator */}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex md:items-center md:gap-2">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="group relative p-2.5 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300"
              aria-label="Change language"
            >
              <span className="absolute inset-0 bg-accent/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              <Globe className="h-5 w-5 relative z-10" />
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold text-accent uppercase">
                {language}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="group relative p-2.5 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300"
              aria-label="Toggle theme"
            >
              <span className="absolute inset-0 bg-accent/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              {theme === "dark" ? (
                <Sun className="h-5 w-5 relative z-10 transition-transform duration-500 group-hover:rotate-180" />
              ) : (
                <Moon className="h-5 w-5 relative z-10 transition-transform duration-500 group-hover:-rotate-12" />
              )}
            </button>

            {/* CTA Button */}
            <Button
              asChild
              className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground ml-2 border-0"
            >
              <Link href="/contact">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-accent-foreground">
                  {t("nav.getStarted")}
                </span>
                <span className="absolute inset-0 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-1">
            <button
              type="button"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Change language"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="relative z-50 p-2.5 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 -translate-y-1/2" : "-translate-y-1.5"}`} />
                <span className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transition-all duration-300 -translate-y-1/2 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1/2" : "translate-y-1"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <div
          className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col justify-center px-6 pt-20">
            <nav className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-3xl font-bold py-3 transition-all duration-500 ${
                    isActive(link.href) ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                  style={{
                    fontFamily: 'var(--font-display)',
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

            {/* Mobile CTA */}
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
                size="lg"
                className="w-full group relative overflow-hidden bg-foreground text-background hover:bg-foreground py-6 text-lg"
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-accent-foreground">
                    {t("nav.getStarted")}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <span className="absolute inset-0 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </Button>
            </div>

            {/* Language indicator */}
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
      </nav>
    </header>
  )
}
