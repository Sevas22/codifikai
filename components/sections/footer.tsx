"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

const getFooterLinks = (t: (key: string) => string) => ({
  services: [
    { label: t("footer.servicesWeb"), href: "/services#web" },
    { label: t("footer.servicesApps"), href: "/services#apps" },
    { label: t("footer.servicesSoftware"), href: "/services#software" },
    { label: t("footer.servicesMarketing"), href: "/services#marketing" },
    { label: t("footer.servicesAutomation"), href: "/services#automation" },
  ],
  company: [
    { label: t("footer.companyAbout"), href: "/about" },
    { label: t("footer.companyCases"), href: "/casos-de-exito" },
    { label: t("footer.companyBlog"), href: "/blog" },
    { label: t("footer.companyCareers"), href: "/careers" },
    { label: t("footer.companyContact"), href: "/contact" },
  ],
})

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const footerLinks = getFooterLinks(t)

  return (
    <footer className="relative border-t border-border/50 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-0.5 mb-4">
              <span 
                className="text-xl font-bold text-foreground" 
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {"<"}Codifik
              </span>
              <span 
                className="text-xl font-bold text-gradient" 
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ai
              </span>
              <span 
                className="text-xl font-light text-muted-foreground" 
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {"/>"}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {t("footer.description")}
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-lg bg-foreground/5 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hello@codifikai.tech" className="hover:text-accent transition-colors">
                  hello@codifikai.tech
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-accent transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li>Miami, FL</li>
              <li>Bogotá, Colombia</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Codifikai. {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
