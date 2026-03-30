"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type MouseAmbientState = {
  /** 0–100, posición X del puntero respecto al viewport */
  x: number
  /** 0–100, posición Y del puntero respecto al viewport */
  y: number
  isMobile: boolean
}

const MouseAmbientContext = createContext<MouseAmbientState>({
  x: 50,
  y: 50,
  isMobile: true,
})

export function MouseAmbientProvider({ children }: { children: React.ReactNode }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const r = () => setIsMobile(window.innerWidth < 768)
    r()
    window.addEventListener("resize", r)
    return () => window.removeEventListener("resize", r)
  }, [])

  useEffect(() => {
    if (isMobile) return
    let rafId: number | null = null
    const pending = { x: 50, y: 50 }
    const onMove = (e: MouseEvent) => {
      pending.x = (e.clientX / Math.max(window.innerWidth, 1)) * 100
      pending.y = (e.clientY / Math.max(window.innerHeight, 1)) * 100
      if (rafId != null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        setMouse({ x: pending.x, y: pending.y })
      })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (rafId != null) cancelAnimationFrame(rafId)
    }
  }, [isMobile])

  const value = React.useMemo(() => ({ x: mouse.x, y: mouse.y, isMobile }), [mouse.x, mouse.y, isMobile])

  return <MouseAmbientContext.Provider value={value}>{children}</MouseAmbientContext.Provider>
}

export function useMouseAmbient() {
  return useContext(MouseAmbientContext)
}
