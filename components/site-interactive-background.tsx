"use client"

import { usePathname } from "next/navigation"

import { Lightfall } from "@/components/effects/lightfall"

/**
 * Fondo global fijo: efecto "Lightfall" (destellos de luz) sobre el mismo
 * negro azulado del sitio, con la paleta de marca (cian, violeta, magenta)
 * en vez de colores genéricos.
 */
export function SiteInteractiveBackground() {
  const pathname = usePathname()

  // La portada tiene fondo claro y opaco: el efecto quedaría tapado, pero su
  // canvas seguiría animándose y gastando CPU en cada frame. Se desmonta ahí.
  if (pathname === "/") return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <Lightfall
        colors={["#67e8f9", "#7c3aed", "#f0abfc"]}
        backgroundColor="#0a0a0f"
        backgroundGlowColor="34,211,238"
        speed={0.5}
        streakCount={2}
        streakWidth={1}
        streakLength={1}
        density={0.6}
        twinkle={1}
        glow={1}
        backgroundGlow={0.35}
        zoom={3}
        opacity={0.9}
        mouseInteraction
        mouseStrength={0.5}
        mouseRadius={1}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}
