import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { CompanyIntroSection } from "@/components/sections/company-intro-section"
import { StatsSection } from "@/components/sections/stats-section"
import { CaseStudiesSection } from "@/components/sections/case-studies-section"
import { ServicesPreviewSection } from "@/components/sections/services-preview-section"
import { TechnologiesPreviewSection } from "@/components/sections/technologies-preview-section"
import { StrategySection } from "@/components/sections/strategy-section"
import { TeamSection } from "@/components/sections/team-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { CTASection } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <CompanyIntroSection />
      <ServicesPreviewSection />
      <CaseStudiesSection />
      <TechnologiesPreviewSection />
      <StrategySection />
      <TeamSection />
      <PartnersSection />
      <StatsSection />
      <CTASection />
      <Footer />
      <FloatingContact />
    </main>
  )
}
