"use client"

import { useEffect, useState, useRef, useCallback } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  // Detect mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isTouchDevice || isSmallScreen)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Don't run cursor logic on mobile
    if (isMobile) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)
      
      // Dot follows immediately with no delay
      cursorDot.style.left = `${mouseX}px`
      cursorDot.style.top = `${mouseY}px`
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Optimized smooth follow - faster easing for immediate feel
    const animate = () => {
      const ease = 0.25 // Increased from 0.15 for faster response
      cursorX += (mouseX - cursorX) * ease
      cursorY += (mouseY - cursorY) * ease
      
      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`
      
      rafId = requestAnimationFrame(animate)
    }
    animate()

    // Check for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest("[role='button']") ||
        target.closest("[data-cursor='pointer']")
      setIsHovering(!!isInteractive)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mousemove", handleElementHover, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousemove", handleElementHover)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isMobile])

  // Don't render anything on mobile
  if (isMobile) return null

  return (
    <>
      {/* Outer ring - smooth follow */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: 'left, top' }}
      >
        <div
          className={`w-10 h-10 rounded-full border-2 border-foreground/80 transition-all duration-200 ease-out ${
            isHovering ? "scale-[1.8] border-accent bg-accent/10" : ""
          } ${isClicking ? "scale-75" : ""}`}
        />
      </div>
      
      {/* Inner dot - immediate follow */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: 'left, top' }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-foreground transition-all duration-150 ease-out ${
            isHovering ? "scale-0" : "scale-100"
          } ${isClicking ? "scale-[3] bg-accent" : ""}`}
        />
      </div>

      {/* Hide default cursor globally - only on desktop */}
      <style jsx global>{`
        @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
