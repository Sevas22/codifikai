"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { MAILTO_CONTACT, WHATSAPP_URL } from "@/lib/contact"

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 group right-[max(1rem,env(safe-area-inset-right,0px))] bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))]"
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
        
        {/* Pulse ring animation */}
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
        
        {/* Main button — mismo squircle degradado que el resto del sitio */}
        <div className="relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95">
          <div className={`transition-all duration-300 ${isOpen ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
            <IconSquircle icon={MessageCircle} size="fab" className="shadow-2xl shadow-black/40" />
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"}`}
          >
            <IconSquircle icon={X} size="fab" className="shadow-2xl shadow-black/40" />
          </div>
        </div>
      </button>

      {/* Contact Modal/Panel — ancho fluido en móvil; ancla derecha en tablet+ */}
      <div
        className={`fixed z-50 transition-all duration-500 inset-x-4 bottom-[max(6.25rem,env(safe-area-inset-bottom,0px))] sm:inset-x-auto sm:left-auto sm:right-[max(1.25rem,env(safe-area-inset-right,0px))] sm:bottom-28 md:bottom-32 ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="relative ml-auto max-h-[min(70vh,520px)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl sm:w-80 md:w-96">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-card/90 backdrop-blur-2xl border border-border/50" />
          
          {/* Border glow */}
          <div className="absolute inset-0 rounded-2xl border border-accent/20" />
          
          {/* Content */}
          <div className="relative p-6">
            {/* Header */}
            <div className="mb-6 text-center sm:text-left">
              <h3 
                className="text-xl font-bold heading-brand-sm mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t("contact.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("contact.subtitle")}
              </p>
            </div>

            {/* Contact Options */}
            <div className="space-y-3">
              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-foreground/5 hover:bg-accent/10 border border-transparent hover:border-accent/30 transition-all duration-300"
              >
                <IconSquircle icon={MessageCircle} size="lg" className="group-hover:scale-110" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">{t("contact.whatsapp")}</div>
                </div>
                <Send className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* Email */}
              <a
                href={MAILTO_CONTACT}
                className="group flex items-center gap-4 p-4 rounded-xl bg-foreground/5 hover:bg-accent/10 border border-transparent hover:border-accent/30 transition-all duration-300"
              >
                <IconSquircle icon={Mail} size="lg" className="group-hover:scale-110" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">{t("contact.email")}</div>
                </div>
                <Send className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* Schedule Call */}
              <a
                href="/contact"
                className="group flex items-center gap-4 p-4 rounded-xl bg-foreground/5 hover:bg-accent/10 border border-transparent hover:border-accent/30 transition-all duration-300"
              >
                <IconSquircle icon={Phone} size="lg" className="group-hover:scale-110" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{t("contact.schedule")}</div>
                  <div className="text-sm text-muted-foreground">{t("contact.scheduleDesc")}</div>
                </div>
                <Send className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
