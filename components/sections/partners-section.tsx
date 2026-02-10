"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const partners = [
  { name: "Google Cloud", abbr: "GC" },
  { name: "AWS", abbr: "AWS" },
  { name: "Microsoft", abbr: "MS" },
  { name: "OpenAI", abbr: "OAI" },
  { name: "Stripe", abbr: "STR" },
  { name: "Vercel", abbr: "VCL" },
]

export function PartnersSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="py-20 relative overflow-hidden border-y border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-lg font-medium text-muted-foreground mb-2">
            {t("partners.title")}
          </h2>
          <p className="text-sm text-muted-foreground/70">
            {t("partners.subtitle")}
          </p>
        </div>

        {/* Partners logos */}
        <div
          className={`flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="group relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transitionDelay: `${index * 100 + 300}ms`,
                transitionDuration: "500ms",
              }}
            >
              {/* Logo placeholder - using text abbreviation styled as logo */}
              <div className="px-6 py-4 rounded-xl bg-foreground/5 text-muted-foreground/60 font-bold text-xl tracking-wider hover:bg-accent/10 hover:text-accent transition-all duration-300 group-hover:scale-110">
                {partner.abbr}
              </div>
              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
