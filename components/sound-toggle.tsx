"use client"

/**
 * Botón flotante para silenciar el tecleo de los titulares.
 *
 * Va apilado sobre el de WhatsApp, más pequeño y centrado con él, para que
 * los controles flotantes queden juntos y no tapen contenido. También es
 * quien habilita el audio en la primera interacción del visitante.
 */

import * as React from "react"
import { usePathname } from "next/navigation"
import { Volume2, VolumeX } from "lucide-react"

import { useLanguage } from "@/components/providers/language-provider"
import {
  installAudioUnlock,
  isTypingSoundEnabled,
  playConfirmation,
  setTypingSoundEnabled,
  subscribeTypingSound,
} from "@/lib/typing-sound"
import { cn } from "@/lib/utils"

const LABELS = {
  es: { mute: "Silenciar el sonido de tecleo", unmute: "Activar el sonido de tecleo" },
  en: { mute: "Mute the typing sound", unmute: "Turn on the typing sound" },
} as const

export function SoundToggle() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const enabled = React.useSyncExternalStore(
    subscribeTypingSound,
    isTypingSoundEnabled,
    () => true
  )

  React.useEffect(() => installAudioUnlock(), [])

  // Igual que el botón de WhatsApp: el panel administrativo es interno.
  if (pathname.startsWith("/admin")) return null

  const labels = LABELS[language] ?? LABELS.es
  const label = enabled ? labels.mute : labels.unmute

  return (
    <button
      type="button"
      onClick={() => {
        const next = !enabled
        setTypingSoundEnabled(next)
        if (next) playConfirmation()
      }}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      className={cn(
        "fixed z-50 grid h-10 w-10 place-items-center rounded-full",
        // Centrado sobre el botón de WhatsApp (h-14 → h-16 desde sm).
        "right-[calc(max(1rem,env(safe-area-inset-right,0px))+0.5rem)]",
        "sm:right-[calc(max(1rem,env(safe-area-inset-right,0px))+0.75rem)]",
        "bottom-[calc(max(1.25rem,env(safe-area-inset-bottom,0px))+4.25rem)]",
        "sm:bottom-[calc(max(1.25rem,env(safe-area-inset-bottom,0px))+4.75rem)]",
        // Vidrio oscuro: se lee igual sobre secciones claras y oscuras.
        "bg-black/70 text-white ring-1 ring-white/15 backdrop-blur-md",
        "shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]",
        "transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-black/85",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-violet)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      )}
    >
      {enabled ? (
        <Volume2 className="h-[1.1rem] w-[1.1rem]" aria-hidden />
      ) : (
        <VolumeX className="h-[1.1rem] w-[1.1rem] opacity-70" aria-hidden />
      )}
    </button>
  )
}
