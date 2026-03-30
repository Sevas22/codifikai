"use client"

import { useState, useEffect, useRef } from "react"

/**
 * Vista embebida del sitio (lazy al entrar en el viewport).
 * Usar solo donde haga falta preview en vivo; en la home conviene solo imagen + enlace.
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
      { threshold: 0.12, rootMargin: "0px 0px 100px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-[1]">
      {shouldLoad && (
        <iframe
          src={url}
          title="Preview del sitio"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-[0.5] border-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
    </div>
  )
}
