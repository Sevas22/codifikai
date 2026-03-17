"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Globe from "react-globe.gl"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// Colores de marca Codifikai (teal/cyan - accent oklch 0.70 0.15 180)
const BRAND_ORIGIN = "#3dd9c8" // Teal principal
const BRAND_DEST = "#5eead4"   // Teal claro
const BRAND_ARC = ["#3dd9c8", "#5eead4"] // Gradiente marca

// Coordenadas de mercados donde Codifikai tiene clientes/proyectos
const DESTINATIONS = [
  { id: "usa", nameKey: "globe.usa", lat: 39.8283, lng: -98.5795, flag: "🇺🇸", descKey: "globe.usaDesc", statusKey: "globe.statusActive" },
  { id: "mexico", nameKey: "globe.mexico", lat: 23.6345, lng: -102.5528, flag: "🇲🇽", descKey: "globe.mexicoDesc", statusKey: "globe.statusActive" },
  { id: "canada", nameKey: "globe.canada", lat: 56.1304, lng: -106.3468, flag: "🇨🇦", descKey: "globe.canadaDesc", statusKey: "globe.statusActive" },
  { id: "brasil", nameKey: "globe.brasil", lat: -14.235, lng: -51.9253, flag: "🇧🇷", descKey: "globe.brasilDesc", statusKey: "globe.statusActive" },
  { id: "argentina", nameKey: "globe.argentina", lat: -38.4161, lng: -63.6167, flag: "🇦🇷", descKey: "globe.argentinaDesc", statusKey: "globe.statusExpansion" },
  { id: "chile", nameKey: "globe.chile", lat: -35.6751, lng: -71.543, flag: "🇨🇱", descKey: "globe.chileDesc", statusKey: "globe.statusExpansion" },
  { id: "peru", nameKey: "globe.peru", lat: -9.19, lng: -75.0152, flag: "🇵🇪", descKey: "globe.peruDesc", statusKey: "globe.statusExpansion" },
  { id: "europa", nameKey: "globe.europa", lat: 50.0, lng: 10.0, flag: "🇪🇺", descKey: "globe.europaDesc", statusKey: "globe.statusExpansion" },
  { id: "uae", nameKey: "globe.uae", lat: 23.4241, lng: 53.8478, flag: "🇦🇪", descKey: "globe.uaeDesc", statusKey: "globe.statusStrategic" },
  { id: "india", nameKey: "globe.india", lat: 20.5937, lng: 78.9629, flag: "🇮🇳", descKey: "globe.indiaDesc", statusKey: "globe.statusGrowth" },
  { id: "china", nameKey: "globe.china", lat: 35.8617, lng: 104.1954, flag: "🇨🇳", descKey: "globe.chinaDesc", statusKey: "globe.statusGrowth" },
  { id: "japon", nameKey: "globe.japon", lat: 36.2048, lng: 138.2529, flag: "🇯🇵", descKey: "globe.japonDesc", statusKey: "globe.statusStrategic" },
  { id: "corea", nameKey: "globe.corea", lat: 35.9078, lng: 127.7669, flag: "🇰🇷", descKey: "globe.coreaDesc", statusKey: "globe.statusGrowth" },
  { id: "australia", nameKey: "globe.australia", lat: -25.2744, lng: 133.7751, flag: "🇦🇺", descKey: "globe.australiaDesc", statusKey: "globe.statusStrategic" },
] as const

const COLOMBIA = { lat: 4.5709, lng: -74.2973, name: "Colombia" }

export function ExportGlobeSection() {
  const { t } = useLanguage()
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 })
  const globeRef = useRef<{ pointOfView: (pov: object, duration?: number) => void } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<string>("usa")
  const [containerSize, setContainerSize] = useState({ width: 450, height: 450 })

  const selected = DESTINATIONS.find((d) => d.id === selectedId) ?? DESTINATIONS[0]

  const pointsData = [
    { ...COLOMBIA, color: BRAND_ORIGIN, altitude: 0.15, radius: 0.4 },
    {
      lat: selected.lat,
      lng: selected.lng,
      name: t(selected.nameKey),
      color: BRAND_DEST,
      altitude: 0.15,
      radius: 0.35,
    },
  ]

  const arcsData = [
    {
      startLat: COLOMBIA.lat,
      startLng: COLOMBIA.lng,
      endLat: selected.lat,
      endLng: selected.lng,
      color: BRAND_ARC,
    },
  ]

  const flyToCountry = useCallback(
    (dest: (typeof DESTINATIONS)[number]) => {
      setSelectedId(dest.id)
      // Siempre centralizar en Colombia: Colombia como hub de todas las conexiones
      globeRef.current?.pointOfView(
        { lat: COLOMBIA.lat, lng: COLOMBIA.lng, altitude: 2.5 },
        800
      )
    },
    []
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      globeRef.current?.pointOfView(
        { lat: COLOMBIA.lat, lng: COLOMBIA.lng, altitude: 2.5 },
        0
      )
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const updateSize = () => {
      const rect = el.getBoundingClientRect()
      const size = Math.min(rect.width, rect.height, 500)
      setContainerSize({ width: size, height: size })
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header de sección - estilo Codifikai */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 md:gap-6 mb-5">
            <span className="shrink-0 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {t("globe.label")}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
            <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.70_0.15_180/0.35)]" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            {t("globe.badge")}
          </span>

          <h2
            className="mt-6 max-w-3xl text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("globe.title")}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("globe.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Globo con colores de marca */}
          <div
            ref={containerRef}
            className={`relative w-full aspect-square max-w-[500px] mx-auto rounded-2xl overflow-hidden border border-accent/20 bg-background/80 backdrop-blur-xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe
                ref={globeRef}
                width={containerSize.width}
                height={containerSize.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                showAtmosphere={true}
                atmosphereColor="oklch(0.70 0.15 180 / 0.35)"
                atmosphereAltitude={0.15}
                pointsData={pointsData}
                pointColor="color"
                pointAltitude="altitude"
                pointRadius="radius"
                pointsMerge={false}
                arcsData={arcsData}
                arcColor="color"
                arcStroke={0.35}
                arcAltitude={0.4}
                arcAltitudeAutoScale={0.5}
                arcDashLength={0.08}
                arcDashGap={0.08}
                arcDashAnimateTime={2500}
                animateIn={true}
                onGlobeReady={() => {
                  globeRef.current?.pointOfView(
                    { lat: COLOMBIA.lat, lng: COLOMBIA.lng, altitude: 2.5 },
                    0
                  )
                }}
              />
            </div>
            <div className="absolute inset-0 rounded-2xl ring-2 ring-accent/20 pointer-events-none" />
          </div>

          {/* Panel de información */}
          <div
            className={`rounded-2xl border border-border/50 bg-background/60 p-6 md:p-8 backdrop-blur-xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span>{t("globe.fromColombia")}</span>
              <span className="text-accent">🇨🇴</span>
              <span className="text-accent">→</span>
              <span>{t("globe.towards")} {t(selected.nameKey)}</span>
              <span>{selected.flag}</span>
            </div>

            <div className="mb-8">
              <h3
                className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {selected.flag} {t(selected.nameKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t(selected.descKey)}
              </p>
              <p className="text-sm font-medium text-accent">{t(selected.statusKey)}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 max-h-[280px] overflow-y-auto pr-1">
              {DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => flyToCountry(dest)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-left transition-all duration-300 ${
                    selectedId === dest.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border/50 hover:border-accent/30 hover:bg-accent/5"
                  }`}
                >
                  <span className="text-xl">{dest.flag}</span>
                  <span className="text-sm font-medium truncate">{t(dest.nameKey)}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedId("usa")
                globeRef.current?.pointOfView(
                  { lat: COLOMBIA.lat, lng: COLOMBIA.lng, altitude: 2.5 },
                  1000
                )
              }}
              className="mt-6 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {t("globe.centerColombia")}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
