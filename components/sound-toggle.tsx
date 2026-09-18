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
        "fixed z-50 grid h-8 w-8 place-items-center rounded-full",
        // Centrado sobre el botón de WhatsApp (h-14 → h-16 desde sm).
        "right-[calc(max(1rem,env(safe-area-inset-right,0px))+0.75rem)]",
        "sm:right-[calc(max(1rem,env(safe-area-inset-right,0px))+1rem)]",
        "bottom-[calc(max(1.25rem,env(safe-area-inset-bottom,0px))+4.1rem)]",
        "sm:bottom-[calc(max(1.25rem,env(safe-area-inset-bottom,0px))+4.6rem)]",
        // Discreto: vidrio casi transparente que solo se enciende al pasar
        // el cursor o al recibir el foco. Legible sobre fondos claros y oscuros.
        "bg-black/30 text-white/70 backdrop-blur-sm",
        "transition-[background-color,color,opacity] duration-300",
        "opacity-60 hover:bg-black/70 hover:text-white hover:opacity-100 focus-visible:opacity-100",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-violet)]",
        "motion-reduce:transition-none"
      )}
    >
      {enabled ? (
        <Volume2 className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <VolumeX className="h-3.5 w-3.5" aria-hidden />
      )}
    </button>
  )
}
