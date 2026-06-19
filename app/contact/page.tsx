"use client"

import { MessageCircle, Mail, Phone } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { ContactForm } from "@/components/contact/contact-form"
import { BookingEmbed } from "@/components/contact/booking-embed"
import {
  CONTACT_EMAIL,
  MAILTO_CONTACT,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  WHATSAPP_URL,
} from "@/lib/contact"

export default function ContactPage() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 })

  const directMethods = [
    {
      icon: MessageCircle,
      label: t("contactPage.directWhatsapp"),
      value: t("contact.whatsapp"),
      href: WHATSAPP_URL,
      external: true,
    },
    {
      icon: Mail,
      label: t("contactPage.directEmail"),
      value: CONTACT_EMAIL,
      href: MAILTO_CONTACT,
      external: false,
    },
    {
      icon: Phone,
      label: t("contactPage.directPhone"),
      value: PHONE_DISPLAY,
      href: PHONE_TEL_HREF,
      external: false,
    },
  ]

  return (
    <main className="relative min-h-screen bg-transparent text-foreground overflow-x-hidden">
      <Navigation />

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionEyebrow label={t("contactPage.eyebrow")} alwaysCentered className="justify-center" />
          <h1
            className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="heading-brand">{t("contactPage.title")}</span>{" "}
            <span className="text-gradient">{t("contactPage.titleHighlight")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("contactPage.subtitle")}
          </p>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div
          ref={ref}
          className={`mx-auto max-w-7xl px-4 transition-all duration-700 sm:px-6 lg:px-8 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <div className="mb-5">
                <h2
                  className="text-2xl font-bold heading-brand-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t("contactPage.formTitle")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("contactPage.formSubtitle")}
                </p>
              </div>
              <ContactForm />
            </div>

            <div className="flex h-full flex-col">
              <div className="mb-5">
                <h2
                  className="text-2xl font-bold heading-brand-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t("contactPage.bookingTitle")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("contactPage.bookingSubtitle")}
                </p>
              </div>
              <div className="flex-1">
                <BookingEmbed />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {directMethods.map((method) => {
              const Icon = method.icon
              return (
                <a
                  key={method.label}
                  href={method.href}
                  {...(method.external
                    ? { target: "_blank" as const, rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-background/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-accent/30"
                >
                  <IconSquircle icon={Icon} size="lg" className="group-hover:scale-105" />
                  <div className="min-w-0">
                    <div className="text-sm text-muted-foreground">{method.label}</div>
                    <div className="truncate font-medium text-foreground transition-colors group-hover:text-accent">
                      {method.value}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
