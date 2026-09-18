"use client"

import Link from "next/link"
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react"

import { BookingEmbed } from "@/components/contact/booking-embed"
import { ContactForm } from "@/components/contact/contact-form"
import { EdSection, Reveal, WordReveal } from "@/components/home/ed-primitives"
import { ParticleField } from "@/components/home/particle-field"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/components/providers/language-provider"
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  MAILTO_CONTACT,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  WHATSAPP_URL,
} from "@/lib/contact"

const LABELS = {
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbContact: "Contacto",
    headline: "Cuéntanos qué necesitas.",
    highlight: ["necesitas."],
    whatsappTitle: "La vía más rápida",
    whatsappLead:
      "Escríbenos por WhatsApp con el mensaje ya redactado. Es por donde respondemos más rápido.",
    whatsappCta: "Abrir WhatsApp",
    orForm: "O déjanos los detalles",
    directTitle: "Otras formas de llegar a nosotros",
    responseNote: "Respondemos en menos de 24 horas hábiles.",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbContact: "Contact",
    headline: "Tell us what you need.",
    highlight: ["need."],
    whatsappTitle: "The fastest route",
    whatsappLead:
      "Message us on WhatsApp with the text already written. It's where we reply fastest.",
    whatsappCta: "Open WhatsApp",
    orForm: "Or leave us the details",
    directTitle: "Other ways to reach us",
    responseNote: "We reply within 24 business hours.",
  },
} as const

export function ContactView() {
  const { language, t } = useLanguage()
  const labels = LABELS[language] ?? LABELS.es

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
    <div className="ed-light-scope relative bg-ed-canvas text-ed-ink">
      <Navigation />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="ed-grain relative isolate overflow-hidden pt-36 pb-12 sm:pt-40">
        <div className="ed-columns pointer-events-none absolute inset-0 -z-20" aria-hidden />
        <div
          className="pointer-events-none absolute -z-20 left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-violet)_18%,transparent),transparent_68%)] blur-3xl"
          aria-hidden
        />
        <ParticleField className="pointer-events-none absolute inset-0 -z-10" density={3} />

        <div className="relative mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)]">
          <nav aria-label="breadcrumb">
            <ol className="ed-label flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-ed-accent">
                  {labels.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ed-ink">{labels.breadcrumbContact}</li>
            </ol>
          </nav>

          <div className="mt-9 max-w-[46rem]">
            <Reveal y={14}>
              <span className="ed-label inline-flex items-center gap-3 rounded-full border border-ed-rule bg-ed-canvas-raised/80 px-4 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-ed-punch" aria-hidden />
                {t("contactPage.eyebrow")}
              </span>
            </Reveal>

            <h1 className="ed-display mt-8 text-[clamp(2.25rem,6vw,4.75rem)] text-ed-ink">
              <WordReveal text={labels.headline} accentWords={[...labels.highlight]} />
            </h1>

            <Reveal delay={0.15} y={18}>
              <p className="mt-7 max-w-[52ch] text-pretty text-base leading-relaxed text-ed-ink-soft sm:text-lg">
                {t("contactPage.subtitle")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- WhatsApp destacado */}
      <EdSection id="whatsapp" className="!pt-6 !pb-0">
        <Reveal y={22}>
          {/* El cierre principal del sitio va primero y con el peso visual más
              alto; el formulario queda para quien prefiera dejar detalles. */}
          <div className="ed-card relative overflow-hidden p-8 sm:p-10">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_26%,transparent),transparent_70%)] blur-2xl"
              aria-hidden
            />
            <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-[46ch]">
                <span className="ed-label text-ed-punch">{labels.whatsappTitle}</span>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ed-ink sm:text-[1.125rem]">
                  {labels.whatsappLead}
                </p>
                <p className="ed-label mt-4">{labels.responseNote}</p>
              </div>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-punch-btn group inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight"
              >
                {labels.whatsappCta}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </EdSection>

      {/* ------------------------------------------------------------ Formulario */}
      <EdSection id="form">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <Reveal y={16}>
              <h2 className="ed-display text-[clamp(1.5rem,3vw,2.25rem)] text-ed-ink">
                {labels.orForm}
              </h2>
              <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ed-ink-soft">
                {t("contactPage.formSubtitle")}
              </p>
            </Reveal>
            <Reveal delay={0.1} y={20} className="mt-8">
              <ContactForm />
            </Reveal>
          </div>

          <div className="flex flex-col gap-8">
            {/* Vías directas */}
            <div>
              <Reveal y={16}>
                <h2 className="ed-display text-[clamp(1.5rem,3vw,2.25rem)] text-ed-ink">
                  {labels.directTitle}
                </h2>
              </Reveal>
              <ul className="mt-7 space-y-3">
                {directMethods.map((method, i) => {
                  const Icon = method.icon
                  return (
                    <Reveal as="li" key={method.label} delay={i * 0.07} y={16}>
                      <a
                        href={method.href}
                        {...(method.external
                          ? { target: "_blank" as const, rel: "noopener noreferrer" }
                          : {})}
                        className="ed-card ed-card-lift group flex items-center gap-4 p-5"
                      >
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ed-rule bg-ed-canvas-sunken text-ed-accent transition-colors duration-300 group-hover:border-ed-punch group-hover:text-ed-punch"
                          aria-hidden
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="ed-label block">{method.label}</span>
                          <span className="mt-1 block truncate text-[0.9375rem] font-semibold text-ed-ink transition-colors group-hover:text-ed-accent">
                            {method.value}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-ed-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ed-punch"
                          aria-hidden
                        />
                      </a>
                    </Reveal>
                  )
                })}
              </ul>
            </div>

            {/* El calendario solo se muestra si hay uno configurado: su versión
                de respaldo es otro botón de WhatsApp, y ya hay uno arriba. */}
            {BOOKING_URL ? (
              <div>
                <Reveal y={16}>
                  <h2 className="ed-display text-[clamp(1.5rem,3vw,2.25rem)] text-ed-ink">
                    {t("contactPage.bookingTitle")}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ed-ink-soft">
                    {t("contactPage.bookingSubtitle")}
                  </p>
                </Reveal>
                <Reveal delay={0.1} y={20} className="mt-6">
                  <BookingEmbed />
                </Reveal>
              </div>
            ) : null}
          </div>
        </div>
      </EdSection>
    </div>
  )
}
