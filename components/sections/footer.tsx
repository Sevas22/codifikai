"use client"

import Link from "next/link"
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react"

import { CodifikaiLogo } from "@/components/brand/codifikai-logo"
import { useLanguage } from "@/components/providers/language-provider"
import {
  CONTACT_EMAIL,
  MAILTO_CONTACT,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  WHATSAPP_URL,
} from "@/lib/contact"
import { SERVICES } from "@/lib/services"
import { useLocalePath } from "@/hooks/use-locale-path"

/**
 * Pie de página.
 *
 * Se declara `ed-dark` en la raíz para que los tokens `ed-*` resuelvan en
 * oscuro venga de donde venga: las páginas ya rediseñadas lo montan fuera de
 * su ámbito claro, y las que siguen en oscuro lo montan tal cual.
 *
 * Los enlaces de servicios salen de `lib/services`, la misma fuente que la
 * navegación y la portada, así que publicar un servicio nuevo lo añade aquí
 * sin tocar este archivo.
 */

const SOCIAL = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61578173835571", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCO0SHacGKQSRw3eFu9HmzGA", label: "YouTube" },
  { icon: Linkedin, href: "", label: "LinkedIn" },
  { icon: Instagram, href: "", label: "Instagram" },
] as const

const LABELS = {
  es: {
    tagline:
      "Diseñamos sistemas de IA, automatización y presencia digital para empresas que quieren crecer sin multiplicar el equipo.",
    services: "Servicios",
    company: "Empresa",
    contact: "Contacto",
    whatsapp: "WhatsApp",
    ctaTitle: "¿Listos para trabajar juntos?",
    ctaButton: "Hablemos por WhatsApp",
    rights: "Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos",
    about: "Sobre nosotros",
    blog: "Blog",
    allServices: "Todos los servicios",
  },
  en: {
    tagline:
      "We design AI systems, automation and digital presence for companies that want to grow without growing headcount.",
    services: "Services",
    company: "Company",
    contact: "Contact",
    whatsapp: "WhatsApp",
    ctaTitle: "Ready to work together?",
    ctaButton: "Message us on WhatsApp",
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
    about: "About us",
    blog: "Blog",
    allServices: "All services",
  },
} as const

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="ed-label text-ed-ink">{title}</h3>
      <ul className="mt-6 space-y-3.5">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="ed-link text-[0.9375rem] text-ed-ink-soft transition-colors hover:text-ed-ink"
      >
        {children}
      </Link>
    </li>
  )
}

export function Footer() {
  const path = useLocalePath()
  const { language } = useLanguage()
  const labels = LABELS[language] ?? LABELS.es
  const currentYear = new Date().getFullYear()

  // Solo se pintan las redes con URL real: un icono que no lleva a ninguna
  // parte resta credibilidad justo en el cierre de la página.
  const social = SOCIAL.filter((item) => item.href)

  return (
    <footer className="ed-dark relative overflow-hidden border-t border-ed-rule">
      {/* Resplandor de marca, tenue: el pie cierra, no compite. */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-violet)_16%,transparent),transparent_70%)] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)]">
        {/* ------------------------------------------------------------- Cierre */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-ed-rule py-12 lg:flex-row lg:items-center">
          <p className="ed-display max-w-[18ch] text-[clamp(1.5rem,3vw,2.25rem)] text-ed-ink">
            {labels.ctaTitle}
          </p>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ed-punch-btn group inline-flex shrink-0 items-center gap-3 rounded-full px-7 py-3.5 text-[0.9375rem] font-semibold tracking-tight"
          >
            {labels.ctaButton}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>

        {/* ------------------------------------------------------------ Columnas */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          <div>
            <Link href={path("/")} className="inline-flex">
              <CodifikaiLogo size="sm" showCode />
            </Link>
            <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ed-ink-soft">
              {labels.tagline}
            </p>

            {social.length > 0 ? (
              <ul className="mt-8 flex gap-2.5">
                {social.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-ed-rule text-ed-ink-soft transition-colors duration-300 hover:border-ed-accent hover:text-ed-accent"
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>

          <FooterColumn title={labels.services}>
            {SERVICES.map((service) => (
              <FooterLink key={service.id} href={path(`/services/${service.slug}`)}>
                {service.title[language]}
              </FooterLink>
            ))}
            <FooterLink href={path("/services")}>{labels.allServices}</FooterLink>
          </FooterColumn>

          <FooterColumn title={labels.company}>
            <FooterLink href={path("/about")}>{labels.about}</FooterLink>
            <FooterLink href={path("/blog")}>{labels.blog}</FooterLink>
            <FooterLink href={path("/contact")}>{labels.contact}</FooterLink>
            <FooterLink href={path("/privacy")}>{labels.privacy}</FooterLink>
            <FooterLink href={path("/terms")}>{labels.terms}</FooterLink>
          </FooterColumn>

          <FooterColumn title={labels.contact}>
            <li>
              <a
                href={MAILTO_CONTACT}
                className="group flex items-start gap-3 text-[0.9375rem] text-ed-ink-soft transition-colors hover:text-ed-ink"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ed-accent" aria-hidden />
                <span className="break-all">{CONTACT_EMAIL}</span>
              </a>
            </li>
            <li>
              <a
                href={PHONE_TEL_HREF}
                className="group flex items-start gap-3 text-[0.9375rem] text-ed-ink-soft transition-colors hover:text-ed-ink"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ed-accent" aria-hidden />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-ed-punch transition-opacity hover:opacity-80"
              >
                {labels.whatsapp}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </li>
          </FooterColumn>
        </div>

        {/* --------------------------------------------------------- Línea final */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ed-rule py-8 sm:flex-row">
          <p className="ed-label">
            &copy; {currentYear} Codifikai. {labels.rights}
          </p>
          <div className="ed-label flex items-center gap-6">
            <Link href={path("/privacy")} className="transition-colors hover:text-ed-accent">
              {labels.privacy}
            </Link>
            <Link href={path("/terms")} className="transition-colors hover:text-ed-accent">
              {labels.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
