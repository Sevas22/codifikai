import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { CaseStudiesSection } from "@/components/sections/case-studies-section"
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
      <FeaturesSection />
      <StatsSection />
      <CaseStudiesSection />
      <StrategySection />
      <TeamSection />
      <PartnersSection />
      <CTASection />
      <Footer />
      <FloatingContact />
    </main>
  )
}
