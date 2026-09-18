import { Navigation } from "@/components/navigation"
import { HomeExperience } from "@/components/home/home-experience"
import { Footer } from "@/components/sections/footer"

/**
 * Portada rediseñada (2026).
 *
 * Las secciones anteriores siguen en `components/sections/*` y las usan el
 * resto de páginas, así que este cambio es reversible: basta con volver a
 * componer aquí `HeroSection`, `EnterprisePlatformSection`, etc.
 */
export default function Home() {
  return (
    <main className="ed-light-scope relative min-h-screen overflow-x-hidden bg-ed-canvas text-ed-ink">
      <Navigation />
      <HomeExperience />
      <Footer />
    </main>
  )
}
