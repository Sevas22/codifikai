"use client"

import { CalendarClock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/contact"

export function BookingEmbed() {
  const { t } = useLanguage()

  if (!BOOKING_URL) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border/50 bg-background/60 p-8 text-center backdrop-blur-xl">
        <div className="mb-5 flex justify-center">
          <IconSquircle icon={CalendarClock} size="xxl" />
        </div>
        <h3
          className="mb-3 text-xl font-bold heading-brand-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("contactPage.bookingFallbackTitle")}
        </h3>
        <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t("contactPage.bookingFallbackDesc")}
        </p>
        <Button asChild variant="cta" size="cta" className="group">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            {t("contactPage.bookingFallbackCta")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl">
      <iframe
        src={BOOKING_URL}
        title={t("contactPage.bookingTitle")}
        className="h-[640px] w-full"
        style={{ border: 0 }}
        loading="lazy"
      />
    </div>
  )
}
