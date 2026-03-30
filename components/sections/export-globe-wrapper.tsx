"use client"

import dynamic from "next/dynamic"

export const ExportGlobeSection = dynamic(
  () => import("./export-globe-section").then((m) => m.ExportGlobeSection),
  {
    ssr: false,
    loading: () => (
      <section className="relative min-h-[min(90vh,640px)] w-full" aria-hidden>
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="mx-auto h-[min(70vh,520px)] max-w-3xl animate-pulse rounded-3xl bg-muted/20" />
        </div>
      </section>
    ),
  }
)
