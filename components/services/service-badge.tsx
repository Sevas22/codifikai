import { Flame } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Insignia comercial de un servicio ("Más solicitado"). Degradado de marca
 * magenta → violeta para que se distinga de la etiqueta del núcleo de IA,
 * que va en violeta plano.
 */
export function ServiceBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "ed-label inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.5625rem] text-white",
        "bg-[linear-gradient(90deg,var(--brand-magenta),var(--brand-violet))]",
        "shadow-[0_6px_18px_-6px_color-mix(in_oklch,var(--brand-magenta)_70%,transparent)]",
        className
      )}
    >
      <Flame className="h-3 w-3" aria-hidden />
      {label}
    </span>
  )
}
