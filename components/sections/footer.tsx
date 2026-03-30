"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { Tech3DAccent } from "@/components/tech/tech-3d-accent"
import { CodifikaiLogo } from "@/components/brand/codifikai-logo"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { Button } from "@/components/ui/button"
import { CONTACT_EMAIL, MAILTO_CONTACT, WHATSAPP_URL } from "@/lib/contact"

function TopoPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id="footer-topo" width="120" height="120" patternUnits="userSpaceOnUse">
          <path
            d="M0 60 Q30 45 60 60 T120 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-white/25"
          />
          <path
            d="M0 30 Q40 15 80 30 T120 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-white/15"
          />
          <path
            d="M0 90 Q35 75 70 90 T120 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-white/15"
          />
          <path
            d="M0 15 Q25 25 50 15 T120 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            className="text-white/10"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-topo)" />
    </svg>
  )
}

function HexPattern({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <pattern id="footer-hex" width="28" height="49" patternUnits="userSpaceOnUse">
          <path
            d="M14 0 L26 7 V21 L14 28 L2 21 V7 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-white/[0.06]"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-hex)" />
    </svg>
  )
}

function CtaPillStrip() {
  return (
    <div
      className="relative flex h-full min-h-[180px] max-h-[220px] w-[5.5rem] shrink-0 items-center justify-end gap-1.5 pr-2 sm:w-28 sm:gap-2 sm:pr-3"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="relative h-[78%] w-9 overflow-hidden rounded-full border border-white/10 shadow-lg sm:w-11"
          style={{
            transform: `rotate(${-6 + i * 0.5}deg) translateY(${i * 2}px)`,
            zIndex: 3 - i,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-accent/40 to-accent/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent" />
        </div>
      ))}
    </div>
  )
}

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61578173835571",
    label: "Facebook",
  },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  {
    icon: Youtube,
    href: "https://www.youtube.com/channel/UCO0SHacGKQSRw3eFu9HmzGA",
    label: "YouTube",
  },
]

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: t("footer.linkAbout"), href: "/about" },
    { label: t("footer.linkServices"), href: "/services" },
    { label: t("footer.linkBlog"), href: "/blog" },
    { label: t("footer.linkSecurity"), href: "/privacy" },
  ]

  return (
    <footer className="relative w-full overflow-x-hidden border-t border-border/40 bg-background">
      <div className="relative flex w-full flex-col gap-0 lg:flex-row lg:items-start lg:gap-0 lg:pt-8">
        {/* CTA — gradiente marca: ancho completo en móvil; desktop con sangría desde el borde izquierdo del viewport */}
        <div className="relative z-20 -mb-6 w-full shrink-0 px-0 sm:px-6 lg:mb-0 lg:w-[400px] lg:max-w-[400px] lg:flex-shrink-0 lg:pl-6 lg:pr-0 xl:pl-10 2xl:pl-14">
          <div className="relative h-[220px] w-full overflow-hidden rounded-b-2xl border-b border-white/10 bg-[oklch(0.36_0.14_275)] shadow-[0_20px_48px_-14px_oklch(0.28_0.10_270/0.4)] sm:h-[240px] sm:rounded-2xl sm:border sm:border-white/10 lg:h-[248px] lg:rounded-l-2xl lg:rounded-r-2xl">
              <TopoPattern className="pointer-events-none absolute inset-0 h-full w-full text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-black/20" />

              <div className="relative flex h-full flex-row items-stretch">
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 px-5 py-6 text-center sm:gap-5 sm:px-7 sm:py-8 lg:text-left">
                  <p
                    className="text-[0.65rem] font-bold uppercase leading-snug tracking-[0.16em] text-white sm:text-[0.7rem] sm:tracking-[0.18em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t("footer.ctaTitle")}
                  </p>
                  <Button asChild variant="cta" size="cta-sm" className="mx-auto w-fit shadow-lg lg:mx-0">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      {t("footer.ctaButton")}
                    </a>
                  </Button>
                </div>
                <CtaPillStrip />
              </div>
          </div>
        </div>

        {/* Dark panel — ocupa el resto del ancho hasta el borde derecho del viewport */}
        <div className="relative z-10 min-h-0 w-full min-w-0 flex-1 overflow-hidden rounded-t-3xl bg-[oklch(0.13_0.01_260)] pt-20 pb-10 sm:pt-24 sm:pb-12 lg:rounded-none lg:rounded-tr-3xl lg:pt-12 lg:pb-12 lg:pl-8 lg:pr-6 xl:pl-12 xl:pr-10 2xl:pr-14">
            <HexPattern className="pointer-events-none absolute inset-0 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-6 right-4 z-0 hidden h-28 w-28 sm:block sm:w-32 sm:opacity-25">
              <Tech3DAccent variant="prism" size="sm" />
            </div>

            <div className="relative grid gap-12 px-6 text-center sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-0 lg:text-left xl:gap-16">
              <div>
                <h3 className="mb-6 text-lg font-bold heading-brand-sm">{t("footer.linksHeading")}</h3>
                <ul className="space-y-3.5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-6 text-lg font-bold heading-brand-sm">{t("footer.writeUs")}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <a
                      href={MAILTO_CONTACT}
                      className="break-all transition-colors hover:text-accent"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                  <li>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t("footer.emailJobs")}
                    </span>
                    <br />
                    <a
                      href={MAILTO_CONTACT}
                      className="break-all transition-colors hover:text-accent"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    const isExternal = social.href.startsWith("http")
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        {...(isExternal
                          ? { target: "_blank" as const, rel: "noopener noreferrer" }
                          : {})}
                        className="transition-transform hover:scale-105"
                        aria-label={social.label}
                      >
                        <IconSquircle icon={Icon} size="sm" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="relative mt-12 border-t border-white/[0.06] px-6 pt-8 text-center sm:px-8 lg:px-0">
              <Link href="/" className="group mb-4 inline-flex items-center justify-center">
                <CodifikaiLogo size="sm" showCode />
              </Link>
              <p className="text-xs text-muted-foreground sm:text-sm">
                &copy; {currentYear} Codifikai. {t("footer.rights")}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  {t("footer.privacy")}
                </Link>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  {t("footer.terms")}
                </Link>
              </div>
            </div>
        </div>
      </div>
    </footer>
  )
}
