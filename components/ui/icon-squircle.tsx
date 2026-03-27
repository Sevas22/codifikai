import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

const squircleBase =
  "inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-700 from-[5%] via-teal-900 via-48% to-fuchsia-950 to-[100%] shadow-lg shadow-black/35 ring-1 ring-white/20 text-white transition-transform duration-300"

export const iconSquircleSizes = {
  xs: "h-7 w-7 [&>svg]:h-3.5 [&>svg]:w-3.5",
  sm: "h-9 w-9 [&>svg]:h-4 [&>svg]:w-4",
  md: "h-10 w-10 md:h-12 md:w-12 [&>svg]:h-5 [&>svg]:w-5 md:[&>svg]:h-6 md:[&>svg]:w-6",
  lg: "h-12 w-12 [&>svg]:h-6 [&>svg]:w-6",
  xl: "h-14 w-14 md:h-16 md:w-16 [&>svg]:h-7 [&>svg]:w-7 md:[&>svg]:h-8 md:[&>svg]:w-8",
  xxl: "h-16 w-16 [&>svg]:h-8 [&>svg]:w-8",
  /** Botón flotante principal */
  fab: "h-14 w-14 md:h-16 md:w-16 [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-7 md:[&>svg]:w-7",
} as const

export type IconSquircleSize = keyof typeof iconSquircleSizes

type IconSquircleProps = {
  icon: LucideIcon
  size?: IconSquircleSize
  className?: string
  strokeWidth?: number
  iconClassName?: string
}

/**
 * Icono en squircle con degradado cyan/teal → púrpura e icono blanco (marca Codifikai).
 */
export function IconSquircle({
  icon: Icon,
  size = "md",
  className,
  strokeWidth = 1.75,
  iconClassName,
}: IconSquircleProps) {
  return (
    <span className={cn(squircleBase, iconSquircleSizes[size], className)} aria-hidden>
      <Icon className={cn("text-white", iconClassName)} strokeWidth={strokeWidth} />
    </span>
  )
}
