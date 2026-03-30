"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Target, Eye, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useMouseAmbient } from "@/components/providers/mouse-ambient-provider"
import { HeroSphereVisual } from "@/components/sections/hero-sphere-visual"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { WHATSAPP_URL } from "@/lib/contact"

const benefitsKeys = ["about.benefit1", "about.benefit2", "about.benefit3", "about.benefit4"]

const technologiesConfig = [
  { titleKey: "about.techFrontendTitle", score: "93%", descKey: "about.techFrontendDesc", stackKey: "about.techFrontendStack" },
  { titleKey: "about.techBackendTitle", score: "96%", descKey: "about.techBackendDesc", stackKey: "about.techBackendStack" },
  { titleKey: "about.techDataTitle", score: "82%", descKey: "about.techDataDesc", stackKey: "about.techDataStack" },
  { titleKey: "about.techCmsTitle", score: "86%", descKey: "about.techCmsDesc", stackKey: "about.techCmsStack" },
]

const founders = [
  {
    name: "Jhoan Gomez",
    role: "CEO & Founder",
    labelKey: "about.founder1Label",
    bioKey: "about.founder1Bio",
    quoteKey: "about.founder1Quote",
    image: "/images/team/jhoan-gomez.png",
    initials: "JG",
    objectPosition: "center",
    imageClassName: "object-cover",
  },
  {
    name: "Jhon Ariza",
    role: "Co-Founder & Strategy Director",
    labelKey: "about.founder2Label",
    bioKey: "about.founder2Bio",
    quoteKey: "about.founder2Quote",
    image: "/images/team/jhon-ariza.png",
    initials: "JA",
    objectPosition: "top center",
    imageClassName: "object-cover",
  },
  {
    name: "Victor Giron",
    role: "Business Development Manager",
    labelKey: "about.founder3Label",
    bioKey: "about.founder3Bio",
    quoteKey: "about.founder3Quote",
    image: "/images/team/victor-giron.png",
    initials: "VG",
    objectPosition: "top center",
    imageClassName: "object-cover",
  },
]

export default function AboutPage() {
  const { t } = useLanguage()
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: foundersRef, isVisible: foundersVisible } = useScrollReveal({ threshold: 0.15 })
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: technologiesRef, isVisible: technologiesVisible } = useScrollReveal({ threshold: 0.12 })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.2 })

  const { x: aboutMouseX, y: aboutMouseY, isMobile: aboutHeroMobile } = useMouseAmbient()

  return (
    <main className="relative min-h-screen bg-transparent text-foreground">
      <Navigation />
      
      {/* Hero: mismo lenguaje visual que el home (esfera HUD) */}
      <section
        ref={heroRef}
        className="relative min-h-[min(100svh,1080px)] overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16"
      >
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="absolute -right-[12%] top-[8%] h-[min(440px,48vh)] w-[min(92vw,480px)] opacity-[0.38] sm:top-[10%] sm:opacity-45 md:-right-[6%] md:top-[12%] lg:h-[min(460px,50vh)] lg:w-[min(520px,44vw)] lg:opacity-[0.48]">
            <HeroSphereVisual mouseX={aboutMouseX} mouseY={aboutMouseY} isMobile={aboutHeroMobile} />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`mx-auto max-w-5xl text-center transition-all duration-700 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              {t("about.heroBadge")}
            </div>
            <h1
              className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="heading-brand">{t("about.heroTitle")}</span>{" "}
              <span className="text-gradient">{t("about.heroTitleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-muted-foreground">
              {t("about.heroDesc")}
            </p>
          </div>

          <div
            className={`mt-14 md:mt-16 mb-8 transition-all duration-700 delay-150 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionEyebrow label={t("about.essence")} />
          </div>

          <div className="relative mt-20 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="pointer-events-none absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-px -translate-x-1/2 lg:block">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent opacity-90" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 bg-background shadow-[0_0_18px_oklch(0.76_0.18_195/0.35)]" />
            </div>
            <div
              className={`rounded-3xl border border-border/50 bg-background/60 p-8 text-center md:p-10 md:text-left backdrop-blur-xl transition-all duration-700 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center md:justify-start">
                <IconSquircle icon={Target} size="lg" />
                <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  <span className="text-gradient">{t("about.history")}</span>
                </h2>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-accent/40 via-border to-transparent mb-6" />
              <div className="space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p>{t("about.historyP1")}</p>
                <p>{t("about.historyP2")}</p>
                <p>{t("about.historyP3")}</p>
              </div>
            </div>

            <div
              className={`rounded-3xl border border-border/50 bg-background/60 p-8 text-center md:p-10 md:text-left backdrop-blur-xl transition-all duration-700 delay-300 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center md:justify-start">
                <IconSquircle icon={Eye} size="lg" />
                <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  <span className="text-gradient">{t("about.vision")}</span>
                </h2>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-accent/40 via-border to-transparent mb-6" />
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                {t("about.visionDesc")}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                {["about.innovation", "about.premium", "about.scalable", "about.purpose"].map((key) => (
                  <span
                    key={key}
                    className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex justify-center md:justify-start">
                <Button asChild variant="cta" size="cta" className="group">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    {t("about.learnMore")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div
            className={`mt-14 md:mt-18 transition-all duration-700 delay-500 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionEyebrow label={t("about.brandTransition")} dot={false} />
            <div className="mt-5 flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground">
                {t("about.brandDesc")}
              </p>
              <span className="inline-flex w-fit rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                {t("about.founderLeadership")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section ref={foundersRef} className="pt-10 pb-12 md:pt-12 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-4xl mx-auto mb-12 md:mb-14 transition-all duration-700 ${
              foundersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionEyebrow label={t("about.founderLeadership")} dot={false} />
            <div className="mt-6 text-center">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold heading-brand text-balance"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t("about.leadershipTitle")}
              </h2>
            </div>
          </div>

          <div className="space-y-10">
            {founders.map((founder, index) => (
              <article
                key={founder.name}
                id={founder.name.toLowerCase().replace(/\s+/g, "-")}
                className={`group rounded-3xl border border-border/50 bg-background/60 p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-accent/30 ${
                  foundersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="grid gap-8 md:gap-10 lg:grid-cols-[320px_1fr] lg:items-center">
                  <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-secondary/40 aspect-[4/5]">
                    {founder.image ? (
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className={founder.imageClassName}
                        style={{ objectPosition: founder.objectPosition }}
                        sizes="(max-width: 768px) 100vw, 280px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/20 via-accent/10 to-transparent">
                        <div className="text-center">
                          <div
                            className="text-5xl font-bold text-accent"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {founder.initials}
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">{t("about.institutionalProfile")}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5 text-center sm:text-left">
                      <div className="text-sm font-medium text-accent">{founder.role}</div>
                      <div
                        className="text-2xl font-bold heading-brand"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {founder.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent mx-auto md:mx-0">
                      {t(founder.labelKey)}
                    </div>
                    <h3
                      className="mt-6 text-3xl md:text-4xl font-bold heading-brand"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {founder.name}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-accent">
                      {founder.role}
                    </p>
                    <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                      {t(founder.bioKey)}
                    </p>
                    <div className="mt-6 rounded-2xl border border-border/50 bg-secondary/30 p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                        {t("about.founderMessage")}
                      </p>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-foreground">
                        &ldquo;{t(founder.quoteKey)}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Competitive Advantage */}
      <section ref={benefitsRef} className="pt-8 pb-24 md:pt-10 md:pb-28 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`mb-10 md:mb-12 transition-all duration-700 ${
              benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionEyebrow label={t("about.competitiveAdvantage")} />
          </div>
          <div className="relative grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="pointer-events-none absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 lg:block">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent opacity-80" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 bg-background shadow-[0_0_18px_oklch(0.76_0.18_195/0.35)]" />
            </div>
            <div
              className={`rounded-3xl border border-border/50 bg-background/40 p-8 text-center backdrop-blur-xl transition-all duration-700 md:p-10 md:text-left ${
                benefitsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block md:inline-block">
                {t("about.whyChoose")}
              </span>
              <div className="mb-6 flex items-center justify-center gap-4 md:justify-start">
                <div className="h-px w-16 bg-gradient-to-r from-accent via-accent/40 to-transparent md:w-auto md:flex-1" />
                <div className="h-2.5 w-2.5 shrink-0 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.76_0.18_195/0.35)]" />
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold heading-brand mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t("about.experience")} <span className="text-gradient">{t("about.trust")}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t("about.experienceDesc")}
              </p>

              <div className="h-px w-full bg-gradient-to-r from-accent/50 via-border to-transparent mb-8" />

              <ul className="space-y-4">
                {benefitsKeys.map((benefitKey, index) => (
                  <li
                    key={benefitKey}
                    className={`flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-secondary/20 px-4 py-4 text-center transition-all duration-500 hover:border-accent/30 hover:bg-accent/5 sm:flex-row sm:items-start sm:text-left ${
                      benefitsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <IconSquircle icon={Check} size="xs" className="mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{t(benefitKey)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats card */}
            <div
              className={`relative transition-all duration-700 delay-300 ${
                benefitsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 p-8 text-center backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:p-10 md:text-left">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                
                <h3
                  className="text-2xl font-bold heading-brand mb-8 relative"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t("about.competitiveAnalysis")}
                </h3>

                <div className="space-y-4 relative">
                  <div className="flex flex-col items-center gap-2 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left rounded-2xl border border-border/40 bg-background/50 transition-colors duration-300 hover:border-accent/20">
                    <span className="text-muted-foreground">{t("about.deliveryTime")}</span>
                    <span className="text-accent font-semibold">{t("about.deliveryValue")}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left rounded-2xl border border-border/40 bg-background/50 transition-colors duration-300 hover:border-accent/20">
                    <span className="text-muted-foreground">{t("about.costVsAgencies")}</span>
                    <span className="text-accent font-semibold">{t("about.costValue")}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left rounded-2xl border border-border/40 bg-background/50 transition-colors duration-300 hover:border-accent/20">
                    <span className="text-muted-foreground">{t("about.retention")}</span>
                    <span className="text-accent font-semibold">{t("about.retentionValue")}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left rounded-2xl border border-border/40 bg-background/50 transition-colors duration-300 hover:border-accent/20">
                    <span className="text-muted-foreground">{t("about.nps")}</span>
                    <span className="text-accent font-semibold">{t("about.npsValue")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" ref={technologiesRef} className="pt-8 pb-24 md:pt-10 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`mb-10 md:mb-12 transition-all duration-700 ${
              technologiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionEyebrow label={t("about.techCapability")} />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div
              className={`rounded-3xl border border-border/50 bg-background/40 p-8 text-center backdrop-blur-xl transition-all duration-700 md:p-10 md:text-left ${
                technologiesVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold heading-brand mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t("about.techTitle")}
              </h2>
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p>{t("about.techIntro1")}</p>
                <p>{t("about.techIntro2")}</p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-accent/50 via-border to-transparent my-8" />

              <ul className="space-y-4">
                {["about.techPerf", "about.techSecurity", "about.techFlex", "about.techSelect"].map((key, index) => (
                  <li
                    key={key}
                    className={`flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-secondary/20 px-4 py-4 text-center transition-all duration-500 sm:flex-row sm:items-start sm:text-left ${
                      technologiesVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${index * 90 + 120}ms` }}
                  >
                    <IconSquircle icon={Check} size="xs" className="mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`space-y-8 transition-all duration-700 delay-200 ${
                technologiesVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              {technologiesConfig.map((item, index) => (
                <article
                  key={item.titleKey}
                  className="rounded-3xl border border-border/50 bg-background/50 p-6 text-center backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:p-8 md:text-left"
                  style={{ transitionDelay: `${index * 100 + 180}ms` }}
                >
                  <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                    <h3
                      className="text-2xl md:text-3xl font-bold heading-brand"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {t(item.titleKey)}
                    </h3>
                    <span className="text-2xl md:text-3xl font-bold text-accent">{item.score}</span>
                  </div>

                  <div className="relative mb-5">
                    <div className="h-px w-full bg-border" />
                    <div
                      className="absolute top-1/2 h-px -translate-y-1/2 bg-accent"
                      style={{ width: item.score }}
                    />
                    <div
                      className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-accent/70 bg-background shadow-[0_0_16px_oklch(0.76_0.18_195/0.35)]"
                      style={{ left: `calc(${item.score} - 7px)` }}
                    />
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {t(item.descKey)}
                  </p>

                  <div className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
                    {t(item.stackKey)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="pt-10 pb-24 md:pt-12 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`mb-10 md:mb-12 transition-all duration-700 ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionEyebrow label={t("about.ctaSectionLabel")} />
          </div>
          <div
            className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-6 flex justify-center">
              <IconSquircle icon={Users} size="lg" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold heading-brand mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("about.ctaTitle")}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {t("about.ctaDesc")}
            </p>
            <Button asChild variant="cta" size="cta-lg" className="group hover-lift hover-glow">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("about.cta")}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}
