"use client"

import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  Server, 
  Megaphone, 
  TrendingUp, 
  Bot, 
  Database,
  Check,
  Sparkles,
  Layout,
  Layers,
  Zap,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"
import { FloatingContact } from "@/components/floating-contact"
import { useLanguage } from "@/components/providers/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const serviceCategories = [
  {
    id: "development",
    icon: Code,
    titleKey: "services.development.title",
    descKey: "services.development.desc",
    image: "/images/ai-development.jpg",
    color: "from-accent/20 to-accent/5",
    services: [
      {
        id: "web",
        icon: Code,
        title: "Webs AI",
        titleKey: "services.development.web",
        description: "Sitios web inteligentes con personalización dinámica, chatbots integrados y optimización SEO automatizada por IA.",
        features: [
          "Diseño UX/UI adaptativo",
          "Chatbots conversacionales",
          "SEO automatizado con IA",
          "Analytics predictivo",
          "CMS con IA generativa",
        ],
        tech: ["Next.js", "React", "OpenAI", "Vercel"],
      },
      {
        id: "apps",
        icon: Smartphone,
        title: "Apps AI",
        titleKey: "services.development.apps",
        description: "Aplicaciones móviles nativas e híbridas con funcionalidades de machine learning y experiencias personalizadas.",
        features: [
          "iOS & Android nativo",
          "Reconocimiento de voz e imagen",
          "Notificaciones inteligentes",
          "Personalización por usuario",
          "Offline AI capabilities",
        ],
        tech: ["React Native", "Flutter", "TensorFlow", "Core ML"],
      },
      {
        id: "software",
        icon: Server,
        title: "Software AI",
        titleKey: "services.development.software",
        description: "Soluciones empresariales a medida con automatización inteligente, procesamiento de datos y APIs robustas.",
        features: [
          "Arquitectura escalable",
          "Integración con sistemas legacy",
          "APIs RESTful & GraphQL",
          "Procesamiento de big data",
          "Seguridad enterprise",
        ],
        tech: ["Python", "Node.js", "AWS", "Kubernetes"],
      },
    ],
  },
  {
    id: "lowcode",
    icon: Layers,
    titleKey: "services.lowcode.title",
    descKey: "services.lowcode.desc",
    image: "/images/lowcode-development.jpg",
    color: "from-chart-4/20 to-chart-4/5",
    services: [
      {
        id: "corporate",
        icon: Globe,
        title: "Sitios Web Corporativos",
        titleKey: "services.lowcode.corporate",
        description: "Desarrollo de sitios web corporativos profesionales con diseño premium, optimizados para conversión y SEO.",
        features: [
          "Diseño premium personalizado",
          "Optimizado para SEO",
          "Velocidad de carga superior",
          "Panel de administración intuitivo",
          "Integraciones con CRM",
        ],
        tech: ["WordPress", "Webflow", "Framer", "Shopify"],
      },
      {
        id: "landing",
        icon: Layout,
        title: "Landing Pages",
        titleKey: "services.lowcode.landing",
        description: "Landing pages de alta conversión con A/B testing integrado, analytics avanzado y optimización continua.",
        features: [
          "Diseño orientado a conversión",
          "A/B testing integrado",
          "Formularios inteligentes",
          "Velocidad optimizada",
          "Integraciones de marketing",
        ],
        tech: ["Framer", "Webflow", "Unbounce", "Analytics"],
      },
      {
        id: "integrations",
        icon: Zap,
        title: "Integraciones Low-Code",
        titleKey: "services.lowcode.integrations",
        description: "Automatización de flujos y conexiones entre herramientas usando plataformas low-code para máxima eficiencia.",
        features: [
          "Zapier & Make automations",
          "Airtable & Notion integrations",
          "Custom workflows",
          "API connections",
          "Data synchronization",
        ],
        tech: ["Zapier", "Make", "n8n", "Airtable"],
      },
    ],
  },
  {
    id: "marketing",
    icon: Megaphone,
    titleKey: "services.marketing.title",
    descKey: "services.marketing.desc",
    image: "/images/ai-marketing.jpg",
    color: "from-chart-2/20 to-chart-2/5",
    services: [
      {
        id: "prospecting",
        icon: TrendingUp,
        title: "AI Marketing Prospecting B2B",
        titleKey: "services.marketing.prospecting",
        description: "Sistema de prospección automatizada que identifica, califica y nurtura leads B2B de alto valor.",
        features: [
          "Identificación de leads ideal",
          "Scoring predictivo",
          "Secuencias automatizadas",
          "Integración CRM",
          "Reportes de conversión",
        ],
        tech: ["HubSpot", "Salesforce", "LinkedIn", "Custom AI"],
      },
      {
        id: "sales",
        icon: TrendingUp,
        title: "AI Sales System",
        titleKey: "services.marketing.sales",
        description: "Plataforma de ventas inteligente con asistentes virtuales, forecasting y optimización de pipeline.",
        features: [
          "Asistentes de ventas AI",
          "Forecasting predictivo",
          "Optimización de precios",
          "Análisis de conversaciones",
          "Automatización de propuestas",
        ],
        tech: ["Gong", "Chorus", "Custom ML", "GPT-4"],
      },
    ],
  },
  {
    id: "automation",
    icon: Bot,
    titleKey: "services.automation.title",
    descKey: "services.automation.desc",
    image: "/images/ai-automation.jpg",
    color: "from-chart-5/20 to-chart-5/5",
    services: [
      {
        id: "agents",
        icon: Bot,
        title: "Agentes IA Autónomos",
        titleKey: "services.automation.agents",
        description: "Agentes inteligentes que ejecutan tareas complejas de forma autónoma, desde atención al cliente hasta operaciones.",
        features: [
          "Atención 24/7 multicanal",
          "Procesamiento de documentos",
          "Toma de decisiones autónoma",
          "Escalamiento inteligente",
          "Aprendizaje continuo",
        ],
        tech: ["LangChain", "AutoGPT", "Anthropic", "Custom Agents"],
      },
      {
        id: "data",
        icon: Database,
        title: "Datos y Modelos AI",
        titleKey: "services.automation.data",
        description: "Infraestructura de datos y modelos de IA personalizados para ventas, marketing y servicio al cliente.",
        features: [
          "Data pipelines automatizados",
          "Modelos ML personalizados",
          "Análisis predictivo",
          "Dashboards en tiempo real",
          "Data governance",
        ],
        tech: ["Snowflake", "dbt", "MLflow", "Custom Models"],
      },
    ],
  },
]

export default function ServicesPage() {
  const { t } = useLanguage()
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-3xl transition-all duration-700 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Soluciones AI Integrales</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t("services.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
              {t("services.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <ServiceCategory
          key={category.id}
          category={category}
          categoryIndex={categoryIndex}
          t={t}
        />
      ))}

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 text-pretty">
              Agenda una consultoría gratuita y descubre qué soluciones de IA son ideales para tus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground px-8 py-6 text-base font-medium hover-lift hover-glow"
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-accent-foreground">
                    Agendar Consultoría
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base font-medium border-border/50 hover:border-accent/50 hover:bg-accent/5 bg-transparent"
              >
                <Link href="/about">
                  Conocer más
                </Link>
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
  t 
}: { 
  category: typeof serviceCategories[0]
  categoryIndex: number
  t: (key: string) => string
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 })
  const CategoryIcon = category.icon
  const isEven = categoryIndex % 2 === 0

  return (
    <section
      ref={ref}
      id={category.id}
      className={`py-16 md:py-24 ${isEven ? "" : "bg-secondary/30"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Header with Image */}
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Image */}
          <div className={`relative group ${isEven ? "lg:order-1" : "lg:order-2"}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={t(category.titleKey)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br ${category.color} backdrop-blur-xl border border-accent/10`}>
                  <CategoryIcon className="w-6 h-6 text-accent" />
                  <span className="font-semibold text-foreground">{t(category.titleKey)}</span>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
          </div>

          {/* Text */}
          <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t(category.titleKey)}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-pretty">
              {t(category.descKey)}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {category.services.map((service, serviceIndex) => {
            const ServiceIcon = service.icon
            return (
              <div
                key={service.id}
                id={service.id}
                className={`group relative p-5 md:p-6 rounded-2xl glass-card border-glow hover-lift transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${serviceIndex * 100 + 100}ms` }}
              >
                {/* Service header */}
                <div className="flex items-start gap-3 md:gap-4 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <ServiceIcon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div>
                    <h3
                      className="text-lg md:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {service.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-foreground/5 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-5 right-5 md:left-6 md:right-6 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
