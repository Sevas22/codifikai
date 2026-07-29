import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { EnterprisePlatformSection } from "@/components/sections/enterprise-platform-section"
import { ServicesPreviewSection } from "@/components/sections/services-preview-section"
import { CTASection } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"

const CaseStudiesSection = dynamic(
  () =>
    import("@/components/sections/case-studies-section").then((m) => m.CaseStudiesSection),
  { loading: () => <div className="min-h-[48rem] md:min-h-[52rem]" aria-hidden /> }
)

const TechnologiesPreviewSection = dynamic(
  () =>
    import("@/components/sections/technologies-preview-section").then(
      (m) => m.TechnologiesPreviewSection
    ),
  { loading: () => <div className="min-h-[24rem]" aria-hidden /> }
)

const TeamSection = dynamic(
  () => import("@/components/sections/team-section").then((m) => m.TeamSection),
  { loading: () => <div className="min-h-[28rem]" aria-hidden /> }
)

const StatsSection = dynamic(
  () => import("@/components/sections/stats-section").then((m) => m.StatsSection),
  { loading: () => <div className="min-h-[16rem]" aria-hidden /> }
)

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <EnterprisePlatformSection />
      <ServicesPreviewSection />
      <CaseStudiesSection />
      <TechnologiesPreviewSection />
      <TeamSection />
      <StatsSection />
      <CTASection />
      <Footer />
      <FloatingContact />
    </main>
  )
}
