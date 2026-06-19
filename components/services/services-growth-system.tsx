"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { useLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"

const GROWTH_SYSTEM_IMAGE = "/images/services/codifikai-growth-system.png"

/** Resolución nativa del PNG — evita upscale que difumina el texto del infográfico */
const IMAGE_WIDTH = 1024
const IMAGE_HEIGHT = 576

export function ServicesGrowthSystem() {
  const { t } = useLanguage()
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <section id="sistema-crecimiento" className="scroll-mt-28 border-t border-white/8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t("svc.growth.eyebrow")}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("svc.growth.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("svc.growth.subtitle")}
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12 md:mt-14">
          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            className="group relative mx-auto block w-full max-w-[1024px] cursor-zoom-in overflow-hidden rounded-2xl border border-white/12 bg-white shadow-[0_40px_100px_-48px_rgba(0,0,0,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label={t("svc.growth.zoomLabel")}
          >
            <Image
              src={GROWTH_SYSTEM_IMAGE}
              alt={t("svc.growth.imageAlt")}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              unoptimized
              className="h-auto w-full"
              sizes={`${IMAGE_WIDTH}px`}
              draggable={false}
            />
            <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-[11px] font-medium text-black/70 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
              <ZoomIn className="h-3.5 w-3.5" />
              {t("svc.growth.zoomHint")}
            </span>
          </button>
        </FadeIn>

        <FadeIn delay={0.12} className="mt-8 md:mt-10">
          <div className="rounded-xl border border-white/10 bg-black px-6 py-5 text-center md:px-10 md:py-6">
            <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
              {t("svc.growth.banner")}
            </p>
          </div>
        </FadeIn>
      </div>

      {isZoomed ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={t("svc.growth.zoomLabel")}
          onClick={() => setIsZoomed(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/80 p-2 text-white/80 transition-colors hover:text-white"
            onClick={() => setIsZoomed(false)}
            aria-label={t("svc.growth.closeZoom")}
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className={cn("max-h-[92vh] max-w-[min(1024px,96vw)] overflow-auto")}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GROWTH_SYSTEM_IMAGE}
              alt={t("svc.growth.imageAlt")}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className="h-auto w-full max-w-none"
              style={{ imageRendering: "auto" }}
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
