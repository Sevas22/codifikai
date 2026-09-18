import { Navigation } from "@/components/navigation"
import { HomeExperience } from "@/components/home/home-experience"
import { Footer } from "@/components/sections/footer"

/**
 * Portada rediseñada (2026).
 *
 * El footer queda deliberadamente FUERA de `ed-light-scope`: tiene colores
 * oscuros fijos y, si heredara los tokens claros, su texto secundario perdería
 * contraste sobre el propio fondo negro. Además el cierre de la página ya es
 * una sección oscura, así que la transición encaja.
 *
 * Las secciones anteriores siguen en `components/sections/*` y las usan el
 * resto de páginas, así que este cambio es reversible: basta con volver a
 * componer aquí `HeroSection`, `EnterprisePlatformSection`, etc.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="ed-light-scope bg-ed-canvas text-ed-ink">
        <Navigation />
        <HomeExperience />
      </div>
      <Footer />
    </main>
  )
}
