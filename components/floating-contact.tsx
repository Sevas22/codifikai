"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
        
        {/* Pulse ring animation */}
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
        
        {/* Main button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-110 active:scale-95">
          <div className={`transition-transform duration-300 ${isOpen ? "rotate-180 scale-0" : "rotate-0 scale-100"}`}>
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div className={`absolute transition-transform duration-300 ${isOpen ? "rotate-0 scale-100" : "-rotate-180 scale-0"}`}>
            <X className="w-6 h-6 md:w-7 md:h-7" />
          </div>
        </div>
      </button>

      {/* Contact Modal/Panel */}
      <div
        className={`fixed bottom-24 md:bottom-28 right-6 z-50 transition-all duration-500 ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="relative w-80 md:w-96 rounded-2xl overflow-hidden">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-card/90 backdrop-blur-2xl border border-border/50" />
          
          {/* Border glow */}
          <div className="absolute inset-0 rounded-2xl border border-accent/20" />
          
          {/* Content */}
          <div className="relative p-6">
            {/* Header */}
            <div className="mb-6">
              <h3 
                className="text-xl font-bold text-foreground mb-2"
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
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-foreground/5 hover:bg-accent/10 border border-transparent hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">{t("contact.whatsapp")}</div>
                </div>
                <Send className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* Email */}
              <a
                href="mailto:hello@codifikai.tech"
                className="group flex items-center gap-4 p-4 rounded-xl bg-foreground/5 hover:bg-accent/10 border border-transparent hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
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
                <div className="w-12 h-12 rounded-xl bg-chart-4/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-chart-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{t("contact.schedule")}</div>
                  <div className="text-sm text-muted-foreground">{t("contact.scheduleDesc")}</div>
                </div>
                <Send className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </div>

            {/* Quick action */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <Button
                asChild
                className="w-full group relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent"
              >
                <a href="/contact">
                  <span className="relative z-10 transition-colors duration-300">
                    {t("contact.cta")}
                  </span>
                  <span className="absolute inset-0 bg-foreground scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
