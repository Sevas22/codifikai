import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionEyebrowProps = {
  label: ReactNode
  className?: string
  /** Full override for label styles (e.g. gradient text). */
  labelClassName?: string
  /** @default true — set false for label + line only (no end dot). */
  dot?: boolean
  /** Si es true, mantiene etiqueta + línea corta + punto centrados en todos los anchos. */
  alwaysCentered?: boolean
}

/** Label + decorative line: centered stack on mobile, horizontal row from md (salvo alwaysCentered). */
export function SectionEyebrow({
  label,
  className,
  labelClassName,
  dot = true,
  alwaysCentered = false,
}: SectionEyebrowProps) {
  const rowLayout =
    "mb-5 flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6"
  const centeredLayout = "mb-5 flex flex-col items-center gap-3"

  return (
    <div className={cn(alwaysCentered ? centeredLayout : rowLayout, className)}>
      <span
        className={cn(
          "max-w-[min(100%,20rem)] shrink-0 text-center text-xs font-semibold uppercase tracking-[0.22em] md:text-sm",
          !alwaysCentered && "md:max-w-none md:text-left",
          labelClassName ?? "text-accent"
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "h-px w-14 shrink-0 bg-gradient-to-r from-transparent via-accent/55 to-transparent",
          !alwaysCentered && "md:hidden"
        )}
        aria-hidden
      />
      <div
        className={cn(
          "h-px min-w-0 flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent",
          alwaysCentered ? "hidden" : "hidden md:block"
        )}
        aria-hidden
      />
      {dot ? (
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.76_0.18_195/0.35)]"
          aria-hidden
        />
      ) : null}
    </div>
  )
}
