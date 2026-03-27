"use client"

import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Check,
  Code,
  Database,
  Globe,
  Layers,
  Layout,
  Megaphone,
  Server,
  Smartphone,
  Sparkles,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { useLanguage } from "@/components/providers/language-provider"
import { useMouseAmbient } from "@/components/providers/mouse-ambient-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { HeroSphereVisual } from "@/components/sections/hero-sphere-visual"
import { IconSquircle } from "@/components/ui/icon-squircle"
import { cn } from "@/lib/utils"

/** Misma línea divisoria cyan que el hero: etiqueta + gradiente + punto */
function ServicesBlueDivider({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("flex w-full items-center gap-4 md:gap-6", className)}>
      <span className="max-w-[min(100%,14rem)] shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-accent sm:max-w-[min(100%,20rem)] md:text-sm">
        {label}
      </span>
      <div className="h-px min-w-0 flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
      <div
        className="h-2.5 w-2.5 shrink-0 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.76_0.18_195/0.35)]"
        aria-hidden
      />
    </div>
  )
}

/** Título junto al icono: blanco en dark; hover lavanda (#D1C4E9). En tema claro, texto oscuro + hover violeta. */
const serviceTitleNextToIcon = (group: "group" | "group/cat") =>
  group === "group"
    ? "text-zinc-950 transition-colors duration-200 group-hover:text-violet-700 dark:text-white dark:group-hover:text-[#D1C4E9]"
    : "text-white transition-colors duration-200 group-hover/cat:text-[#D1C4E9] drop-shadow-[0_1px_2px_oklch(0_0_0/0.45)]"

type ServiceItemDef = {
  id: string
  icon: LucideIcon
  titleKey: string
  detailPrefix: string
  tech: string[]
}

type CategoryDef = {
  id: string
  icon: LucideIcon
  titleKey: string
  descKey: string
  accent: string
  services: ServiceItemDef[]
}

const serviceCategories: CategoryDef[] = [
  {
    id: "development",
    icon: Code,
    titleKey: "services.development.title",
    descKey: "services.development.desc",
    accent: "from-accent/25 via-cyan-500/10 to-violet-950/20",
    services: [
      {
        id: "web",
        icon: Code,
        titleKey: "services.development.web",
        detailPrefix: "services.devWeb",
        tech: ["Next.js", "React", "OpenAI", "Vercel"],
      },
      {
        id: "apps",
        icon: Smartphone,
        titleKey: "services.development.apps",
        detailPrefix: "services.devApps",
        tech: ["React Native", "Flutter", "TensorFlow", "Core ML"],
      },
      {
        id: "software",
        icon: Server,
        titleKey: "services.development.software",
        detailPrefix: "services.devSoft",
        tech: ["Python", "Node.js", "AWS", "Kubernetes"],
      },
    ],
  },
  {
    id: "lowcode",
    icon: Layers,
    titleKey: "services.lowcode.title",
    descKey: "services.lowcode.desc",
    accent: "from-violet-600/25 via-fuchsia-600/12 to-chart-4/10",
    services: [
      {
        id: "corporate",
        icon: Globe,
        titleKey: "services.lowcode.corporate",
        detailPrefix: "services.lcCorp",
        tech: ["WordPress", "Webflow", "Framer", "Shopify"],
      },
      {
        id: "landing",
        icon: Layout,
        titleKey: "services.lowcode.landing",
        detailPrefix: "services.lcLand",
        tech: ["Framer", "Webflow", "Unbounce", "Analytics"],
      },
      {
        id: "integrations",
        icon: Zap,
        titleKey: "services.lowcode.integrations",
        detailPrefix: "services.lcInt",
        tech: ["Zapier", "Make", "n8n", "Airtable"],
      },
    ],
  },
  {
    id: "marketing",
    icon: Megaphone,
    titleKey: "services.marketing.title",
    descKey: "services.marketing.desc",
    accent: "from-violet-500/25 via-purple-600/15 to-chart-2/10",
    services: [
      {
        id: "prospecting",
        icon: TrendingUp,
        titleKey: "services.marketing.prospecting",
        detailPrefix: "services.mktPros",
        tech: ["HubSpot", "Salesforce", "LinkedIn", "Custom AI"],
      },
      {
        id: "sales",
        icon: TrendingUp,
        titleKey: "services.marketing.sales",
        detailPrefix: "services.mktSales",
        tech: ["Gong", "Chorus", "Custom ML", "GPT-4"],
      },
    ],
  },
  {
    id: "automation",
    icon: Bot,
    titleKey: "services.automation.title",
    descKey: "services.automation.desc",
    accent: "from-fuchsia-600/22 via-violet-600/14 to-chart-5/10",
    services: [
      {
        id: "agents",
        icon: Bot,
        titleKey: "services.automation.agents",
        detailPrefix: "services.autoAgents",
        tech: ["LangChain", "AutoGPT", "Anthropic", "Custom agents"],
      },
      {
        id: "data",
        icon: Database,
        titleKey: "services.automation.data",
        detailPrefix: "services.autoData",
        tech: ["Snowflake", "dbt", "MLflow", "Custom models"],
      },
    ],
  },
]

function featureKeys(prefix: string) {
  return [`${prefix}.f1`, `${prefix}.f2`, `${prefix}.f3`, `${prefix}.f4`] as const
}

export default function ServicesPage() {
  const { t } = useLanguage()
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: bridgeRef, isVisible: bridgeVisible } = useScrollReveal({ threshold: 0.12 })
  const { x: mouseX, y: mouseY, isMobile: heroMobile } = useMouseAmbient()

  return (
    <main className="relative min-h-screen bg-transparent text-foreground">
      <Navigation />

      <section
        ref={heroRef}
        className="relative min-h-[min(88svh,920px)] overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20"
      >
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="absolute -right-[10%] top-[6%] h-[min(400px,46vh)] w-[min(92vw,460px)] opacity-[0.38] sm:top-[8%] sm:opacity-45 md:-right-[5%] md:top-[10%] lg:h-[min(440px,48vh)] lg:w-[min(500px,42vw)] lg:opacity-[0.48]">
            <HeroSphereVisual mouseX={mouseX} mouseY={mouseY} isMobile={heroMobile} />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`mx-auto max-w-4xl text-center transition-all duration-700 ${
              heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-gradient-to-r from-accent/12 to-violet-600/15 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 shrink-0 text-violet-400" />
              <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                {t("services.heroBadge")}
              </span>
            </div>
            <h1
              className="mt-8 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="heading-brand">{t("services.heroTitle")}</span>{" "}
              <span className="text-gradient">{t("services.heroTitleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t("services.heroSubtitle")}
            </p>
          </div>

          <div
            className={`mt-14 transition-all duration-700 delay-100 md:mt-16 ${
              heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-accent md:text-sm">
                {t("services.bridgeLabel")}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <div className="h-2.5 w-2.5 shrink-0 rounded-full border border-accent/60 bg-background shadow-[0_0_14px_oklch(0.76_0.18_195/0.35)]" />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={bridgeRef}
        className="relative border-t border-border/40 bg-gradient-to-b from-background via-accent/[0.03] to-background py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
              bridgeVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2
              className="text-2xl font-bold tracking-tight text-balance md:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient">{t("services.bridgeTitle")}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("services.bridgeDesc")}
            </p>
          </div>

          <div
            className={`mt-10 transition-all duration-700 delay-100 ${
              bridgeVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <ServicesBlueDivider label={t("services.bridgeDivider")} />
          </div>

          <div
            className={`mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${
              bridgeVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } transition-all duration-700 delay-150`}
          >
            {[
              { title: "services.pillar1Title", desc: "services.pillar1Desc" },
              { title: "services.pillar2Title", desc: "services.pillar2Desc" },
              { title: "services.pillar3Title", desc: "services.pillar3Desc" },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border/50 bg-background/70 p-6 text-left backdrop-blur-xl md:p-7"
              >
                <div className="mb-3 h-px w-12 bg-gradient-to-r from-accent to-transparent" />
                <h3 className="text-lg font-semibold text-foreground md:text-xl" style={{ fontFamily: "var(--font-display)" }}>
                  {t(p.title)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{t(p.desc)}</p>
              </div>
            ))}
          </div>

          <div
            className={`mt-12 flex flex-col items-stretch gap-3 transition-all duration-700 delay-200 sm:flex-row sm:items-center sm:justify-between ${
              bridgeVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-left">
              {t("services.navLabel")}
            </p>
            <nav
              className="flex flex-wrap items-center justify-center gap-2 sm:justify-end"
              aria-label={t("services.navLabel")}
            >
              {serviceCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
                >
                  {t(cat.titleKey)}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {serviceCategories.map((category, categoryIndex) => (
        <ServiceCategory key={category.id} category={category} categoryIndex={categoryIndex} t={t} />
      ))}

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/[0.06] to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-gradient-to-br from-accent/10 to-violet-600/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServicesBlueDivider label={t("services.divider.cta")} className="mb-12 md:mb-16" />
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-2xl font-bold text-balance sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="heading-brand">{t("services.ctaTitle")}</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">{t("services.ctaSubtitle")}</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-foreground px-8 py-6 text-base font-medium text-background hover:bg-foreground hover-lift hover-glow"
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center justify-center gap-3 transition-colors duration-300 group-hover:text-accent-foreground">
                    {t("services.ctaPrimary")}
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border/50 bg-transparent px-8 py-6 text-base font-medium hover:border-accent/50 hover:bg-accent/5"
              >
                <Link href="/about">{t("services.learnMore")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  )
}

function ServiceCategory({
  category,
  categoryIndex,
  t,
}: {
  category: CategoryDef
  categoryIndex: number
  t: (key: string) => string
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.06 })
  const CategoryIcon = category.icon
  const isEven = categoryIndex % 2 === 0

  return (
    <section
      ref={ref}
      id={category.id}
      className={`scroll-mt-28 py-16 md:py-24 ${isEven ? "" : "bg-secondary/25"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-10 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <ServicesBlueDivider label={t(`services.divider.${category.id}`)} />
        </div>

        <div
          className={`mb-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12 md:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } transition-all duration-700`}
        >
          <div
            className={`relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br p-8 md:p-10 lg:min-h-[220px] ${category.accent} ${
              isEven ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="group/cat relative flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
              <IconSquircle
                icon={CategoryIcon}
                size="xl"
                className="shrink-0 group-hover/cat:scale-105"
              />
              <div className="min-w-0">
                <h2
                  className={`text-2xl font-bold tracking-tight text-balance md:text-3xl lg:text-4xl ${serviceTitleNextToIcon("group/cat")}`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t(category.titleKey)}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {t(category.descKey)}
                </p>
              </div>
            </div>
          </div>

          <div className={`${isEven ? "lg:order-2" : "lg:order-1"} hidden lg:block`}>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("about.techSelect")}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("about.techIntro1")}</p>
          </div>
        </div>

        <div
          className={
            category.services.length >= 3
              ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
              : "grid gap-4 sm:grid-cols-2"
          }
        >
          {category.services.map((service, serviceIndex) => {
            const ServiceIcon = service.icon
            const fk = featureKeys(service.detailPrefix)
            return (
              <div
                key={service.id}
                id={service.id}
                className={`group relative rounded-2xl border border-border/50 bg-background/60 p-5 backdrop-blur-xl transition-all duration-700 glass-card border-glow hover-lift md:p-6 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${serviceIndex * 80 + 80}ms` }}
              >
                <div className="mb-4 flex items-center gap-3 md:gap-4">
                  <IconSquircle
                    icon={ServiceIcon}
                    size="md"
                    className="shrink-0 group-hover:scale-105"
                  />
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-lg font-semibold md:text-xl ${serviceTitleNextToIcon("group")}`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t(service.titleKey)}
                    </h3>
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{t(`${service.detailPrefix}.desc`)}</p>

                <ul className="mb-5 space-y-2">
                  {fk.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-500/90 dark:text-violet-400" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 border-t border-border/50 pt-4">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-foreground/5 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-0 left-5 right-5 h-px scale-x-0 bg-gradient-to-r from-transparent via-violet-500/55 to-fuchsia-500/40 transition-transform duration-500 group-hover:scale-x-100 md:left-6 md:right-6" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
