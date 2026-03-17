"use client"

import dynamic from "next/dynamic"

export const ExportGlobeSection = dynamic(
  () => import("./export-globe-section").then((m) => m.ExportGlobeSection),
  { ssr: false }
)
