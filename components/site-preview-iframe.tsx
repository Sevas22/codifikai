"use client"

import { useState, useEffect, useRef } from "react"

/**
 * Vista embebida del sitio: carga el iframe al acercarse al viewport (lazy).
 * El poster (Image debajo) solo se ve hasta que el iframe pinta.
 */
export function SitePreviewIframe({ url }: { url: string }) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true)
      },
      { threshold: 0.06, rootMargin: "0px 0px 180px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 z-[2] pointer-events-none">
      {shouldLoad && (
        <iframe
          src={url}
          title="Preview del sitio"
          referrerPolicy="no-referrer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          className="absolute top-0 left-0 h-[200%] w-[200%] origin-top-left scale-[0.5] border-0 opacity-[0.97] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </div>
  )
}
