"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import Globe from "react-globe.gl"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// Colores de marca startup: cyan eléctrico → violeta / magenta
const BRAND_ORIGIN = "#22d3ee"
const BRAND_DEST = "#d946ef"
const BRAND_ARC = ["#22d3ee", "#8b5cf6", "#e879f9"]

/** ISO 3166-1 alpha-2 → regional indicator flag emoji (ASCII-safe source). */
function regionalFlagEmoji(iso: string): string {
  const code = iso.toUpperCase()
  if (code.length !== 2) return ""
  const base = 0x1f1e6
  const a = code.charCodeAt(0)
  const b = code.charCodeAt(1)
  if (a < 0x41 || a > 0x5a || b < 0x41 || b > 0x5a) return ""
  return String.fromCodePoint(base + (a - 0x41), base + (b - 0x41))
}

// Coordenadas de mercados donde Codifikai tiene clientes/proyectos
const DESTINATIONS = [
  { id: "usa", iso: "US", nameKey: "globe.usa", techMetaKey: "globe.techMetaUsa", lat: 39.8283, lng: -98.5795, descKey: "globe.usaDesc", statusKey: "globe.statusActive" },
  { id: "mexico", iso: "MX", nameKey: "globe.mexico", techMetaKey: "globe.techMetaMexico", lat: 23.6345, lng: -102.5528, descKey: "globe.mexicoDesc", statusKey: "globe.statusActive" },
  { id: "canada", iso: "CA", nameKey: "globe.canada", techMetaKey: "globe.techMetaCanada", lat: 56.1304, lng: -106.3468, descKey: "globe.canadaDesc", statusKey: "globe.statusActive" },
  { id: "brasil", iso: "BR", nameKey: "globe.brasil", techMetaKey: "globe.techMetaBrasil", lat: -14.235, lng: -51.9253, descKey: "globe.brasilDesc", statusKey: "globe.statusActive" },
  { id: "argentina", iso: "AR", nameKey: "globe.argentina", techMetaKey: "globe.techMetaArgentina", lat: -38.4161, lng: -63.6167, descKey: "globe.argentinaDesc", statusKey: "globe.statusExpansion" },
  { id: "chile", iso: "CL", nameKey: "globe.chile", techMetaKey: "globe.techMetaChile", lat: -35.6751, lng: -71.543, descKey: "globe.chileDesc", statusKey: "globe.statusExpansion" },
  { id: "peru", iso: "PE", nameKey: "globe.peru", techMetaKey: "globe.techMetaPeru", lat: -9.19, lng: -75.0152, descKey: "globe.peruDesc", statusKey: "globe.statusExpansion" },
  { id: "europa", iso: "EU", nameKey: "globe.europa", techMetaKey: "globe.techMetaEuropa", lat: 50.0, lng: 10.0, descKey: "globe.europaDesc", statusKey: "globe.statusExpansion" },
  { id: "uae", iso: "AE", nameKey: "globe.uae", techMetaKey: "globe.techMetaUae", lat: 23.4241, lng: 53.8478, descKey: "globe.uaeDesc", statusKey: "globe.statusStrategic" },
  { id: "india", iso: "IN", nameKey: "globe.india", techMetaKey: "globe.techMetaIndia", lat: 20.5937, lng: 78.9629, descKey: "globe.indiaDesc", statusKey: "globe.statusGrowth" },
  { id: "china", iso: "CN", nameKey: "globe.china", techMetaKey: "globe.techMetaChina", lat: 35.8617, lng: 104.1954, descKey: "globe.chinaDesc", statusKey: "globe.statusGrowth" },
  { id: "japon", iso: "JP", nameKey: "globe.japon", techMetaKey: "globe.techMetaJapon", lat: 36.2048, lng: 138.2529, descKey: "globe.japonDesc", statusKey: "globe.statusStrategic" },
  { id: "corea", iso: "KR", nameKey: "globe.corea", techMetaKey: "globe.techMetaCorea", lat: 35.9078, lng: 127.7669, descKey: "globe.coreaDesc", statusKey: "globe.statusGrowth" },
  { id: "australia", iso: "AU", nameKey: "globe.australia", techMetaKey: "globe.techMetaAustralia", lat: -25.2744, lng: 133.7751, descKey: "globe.australiaDesc", statusKey: "globe.statusStrategic" },
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

  // Hub Colombia + punto por mercado (seleccionado resalta) + meta para tooltip del globo
  const pointsData = useMemo(
    () => [
      {
        ...COLOMBIA,
        color: BRAND_ORIGIN,
        altitude: 0.16,
        radius: 0.42,
        techMeta: t("globe.techMetaColombia"),
      },
      ...DESTINATIONS.map((d) => ({
        lat: d.lat,
        lng: d.lng,
        color: selectedId === d.id ? BRAND_DEST : "rgba(94, 234, 212, 0.55)",
        altitude: 0.12,
        radius: selectedId === d.id ? 0.34 : 0.2,
        techMeta: t(d.techMetaKey),
      })),
    ],
    [selectedId, t]
  )

  // Etiquetas ISO + nombre sobre el globo
  const labelsData = useMemo(
    () => [
      {
        lat: COLOMBIA.lat,
        lng: COLOMBIA.lng,
        text: t("globe.colombiaGlobeLabel"),
        size: 0.62,
        color: BRAND_ORIGIN,
        altitude: 0.02,
      },
      ...DESTINATIONS.map((d) => ({
        lat: d.lat,
        lng: d.lng,
        text: `${d.iso} \u00b7 ${t(d.nameKey)}`,
        size: selectedId === d.id ? 0.52 : 0.38,
        color: selectedId === d.id ? BRAND_DEST : "rgba(200, 255, 248, 0.72)",
        altitude: 0.018,
      })),
    ],
    [selectedId, t]
  )

  // Arco por mercado hacia Colombia (todos visibles)
  const arcsData = useMemo(
    () =>
      DESTINATIONS.map((d) => ({
        startLat: d.lat,
        startLng: d.lng,
        endLat: COLOMBIA.lat,
        endLng: COLOMBIA.lng,
        color:
          selectedId === d.id
            ? (["#5eead4", "#3dd9c8"] as [string, string])
            : (BRAND_ARC as [string, string]),
      })),
    [selectedId]
  )

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
    <section ref={sectionRef} className="relative overflow-x-hidden overflow-y-visible py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header de seccion */}
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
            <div className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.76_0.18_195/0.35)]" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            {t("globe.badge")}
          </span>

          <h2
            className="mt-6 max-w-3xl text-3xl font-bold heading-brand md:text-4xl lg:text-5xl text-balance"
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
                atmosphereColor="oklch(0.76 0.18 195 / 0.35)"
                atmosphereAltitude={0.15}
                pointsData={pointsData}
                pointColor="color"
                pointAltitude="altitude"
                pointRadius="radius"
                pointLabel={(d: object) => (d as { techMeta?: string }).techMeta ?? ""}
                pointsMerge={false}
                labelsData={labelsData}
                labelLat="lat"
                labelLng="lng"
                labelText="text"
                labelSize="size"
                labelColor="color"
                labelAltitude="altitude"
                labelDotRadius={0.28}
                labelIncludeDot={true}
                labelDotOrientation="right"
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

          {/* Panel lateral */}
          <div
            className={`rounded-2xl border border-border/50 bg-background/60 p-6 md:p-8 backdrop-blur-xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-muted-foreground sm:text-sm">
              <span className="whitespace-nowrap">{t("globe.fromColombia")}</span>
              <span className="text-accent" aria-hidden>
                {regionalFlagEmoji("CO")}
              </span>
              <span className="text-accent" aria-hidden>
                {"\u2192"}
              </span>
              <span className="min-w-0 break-words">
                {t("globe.towards")} {t(selected.nameKey)}
              </span>
              <span aria-hidden className="shrink-0 text-lg leading-none">
                {regionalFlagEmoji(selected.iso)}
              </span>
            </div>

            <div className="mb-8">
              <h3
                className="text-2xl md:text-3xl font-bold heading-brand-sm flex items-center gap-3 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span aria-hidden>{regionalFlagEmoji(selected.iso)}</span>
                {t(selected.nameKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t(selected.descKey)}
              </p>
              <p className="text-sm font-medium text-accent">{t(selected.statusKey)}</p>
            </div>

            <div className="grid max-h-[min(260px,42svh)] grid-cols-2 gap-2 overflow-y-auto overscroll-contain pr-1 sm:max-h-[280px] sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
              {DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => flyToCountry(dest)}
                  className={`flex min-w-0 items-center gap-1.5 rounded-xl border px-2 py-2.5 text-left transition-all duration-300 sm:gap-2 sm:px-3 sm:py-3 ${
                    selectedId === dest.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border/50 hover:border-accent/30 hover:bg-accent/5"
                  }`}
                >
                  <span className="shrink-0 text-lg sm:text-xl" aria-hidden>
                    {regionalFlagEmoji(dest.iso)}
                  </span>
                  <span className="min-w-0 text-xs font-medium leading-tight sm:text-sm">{t(dest.nameKey)}</span>
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
