"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { ServicesHero } from "@/components/services/services-hero"
import { ServicesTrust } from "@/components/services/services-trust"
import { ServicesGrowthSystem } from "@/components/services/services-growth-system"
import { ServicesProblems } from "@/components/services/services-problems"
import { ServicesSolutions } from "@/components/services/services-solutions"
import { ServicesArchitecture } from "@/components/services/services-architecture"
import { ServicesCasesCompact } from "@/components/services/services-cases-compact"
import { ServicesProcess } from "@/components/services/services-process"
import { ServicesCta } from "@/components/services/services-cta"

export function ServicesPageView() {
  return (
    <main className="relative min-h-screen bg-transparent text-foreground overflow-x-hidden">
      <div className="relative z-10">
        <Navigation />
        <ServicesHero />
        <ServicesTrust />
        <ServicesGrowthSystem />
        <ServicesProblems />
        <ServicesSolutions />
        <ServicesArchitecture />
        <ServicesCasesCompact />
        <ServicesProcess />
        <ServicesCta />
        <Footer />
      </div>
    </main>
  )
}
