"use client"

import { cn } from "@/lib/utils"

type CodifikaiLogoProps = {
  className?: string
  /** Nav / footer default */
  size?: "sm" | "md" | "lg"
  /** Muestra `<` y `/>` estilo código */
  showCode?: boolean
}

const sizeClasses = {
  sm: "text-lg gap-0",
  md: "text-xl md:text-2xl gap-0.5",
  lg: "text-3xl gap-0.5",
}

export function CodifikaiLogo({ className, size = "md", showCode = true }: CodifikaiLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-bold tracking-tight transition-all duration-500 group-hover:tracking-wide",
        sizeClasses[size],
        className
      )}
      style={{ fontFamily: "var(--font-display)" }}
      aria-label="CodifiKai"
    >
      {showCode && <span className="text-foreground">{"<"}</span>}
      <span className="text-foreground">Codifi</span>
      <span className="text-foreground">k</span>
      <span className="mx-px text-accent" aria-hidden>
        ·
      </span>
      <span className="codifikai-ai-lockup font-bold">ai</span>
      {showCode && <span className="font-light text-muted-foreground group-hover:text-accent">{"/>"}</span>}
    </span>
  )
}
