"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Language = "es" | "en"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Diccionario de traducciones
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Nosotros",
    "nav.services": "Servicios",
    "nav.contact": "Contacto",
    "nav.getStarted": "Comenzar",
    
    // Hero
    "hero.tagline": "Agencia de Inteligencia Artificial",
    "hero.title": "Transformamos ideas en",
    "hero.titleHighlight": "soluciones digitales",
    "hero.subtitle": "Automatización inteligente, desarrollo de software y estrategias de marketing potenciadas por IA para empresas que buscan liderar en la era digital.",
    "hero.cta.primary": "Iniciar Proyecto",
    "hero.cta.secondary": "Conocer Más",
    "hero.stats.projects": "Proyectos Exitosos",
    "hero.stats.clients": "Clientes Globales",
    "hero.stats.satisfaction": "Satisfacción",
    
    // Services
    "services.title": "Nuestros Servicios",
    "services.subtitle": "Soluciones integrales de IA para cada etapa de tu transformación digital",
    "services.development.title": "Desarrollo AI",
    "services.development.desc": "Creamos aplicaciones web, móviles y software a medida potenciados por inteligencia artificial.",
    "services.development.web": "Webs AI",
    "services.development.apps": "Apps AI",
    "services.development.software": "Software AI",
    "services.marketing.title": "Marketing & Ventas AI",
    "services.marketing.desc": "Estrategias de prospección B2B y sistemas de ventas automatizados con IA.",
    "services.marketing.prospecting": "AI Marketing Prospecting B2B",
    "services.marketing.sales": "AI Sales System",
    "services.automation.title": "Automatización Empresarial AI",
    "services.automation.desc": "Agentes autónomos de IA para automatizar procesos y optimizar operaciones.",
    "services.automation.agents": "Agentes IA Autónomos",
    "services.automation.data": "Datos y Modelos AI",
    "services.learnMore": "Conocer más",
    
    // About
    "about.title": "Sobre Nosotros",
    "about.subtitle": "Somos la Agencia de IA para Empresas",
    "about.description": "Combinamos experiencia técnica con visión estratégica para crear soluciones de inteligencia artificial que generan resultados medibles.",
    "about.mission.title": "Nuestra Misión",
    "about.mission.desc": "Democratizar el acceso a la inteligencia artificial para empresas de todos los tamaños.",
    "about.vision.title": "Nuestra Visión",
    "about.vision.desc": "Ser el socio tecnológico de referencia en transformación digital mediante IA.",
    "about.values.title": "Valores",
    "about.values.innovation": "Innovación Continua",
    "about.values.excellence": "Excelencia Técnica",
    "about.values.transparency": "Transparencia Total",
    "about.values.commitment": "Compromiso con Resultados",
    "about.cta": "Habla con un Asesor",
    
    // CTA
    "cta.title": "Transforma tu negocio con IA",
    "cta.subtitle": "Agenda una consultoría gratuita y descubre cómo la inteligencia artificial puede impulsar tu empresa.",
    "cta.button": "Agendar Consultoría",
    "cta.available": "Disponible ahora",
    
    // Footer
    "footer.description": "Agencia de Inteligencia Artificial especializada en desarrollo, marketing y automatización empresarial.",
    "footer.services": "Servicios",
    "footer.company": "Empresa",
    "footer.contact": "Contacto",
    "footer.legal": "Legal",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.rights": "Todos los derechos reservados.",
    
    // Process
    "process.title": "Nuestro Proceso",
    "process.subtitle": "Metodología ágil para resultados extraordinarios",
    "process.step1.title": "Descubrimiento",
    "process.step1.desc": "Analizamos tu negocio, objetivos y desafíos para crear una estrategia personalizada.",
    "process.step2.title": "Estrategia",
    "process.step2.desc": "Diseñamos la arquitectura de solución y definimos el roadmap de implementación.",
    "process.step3.title": "Desarrollo",
    "process.step3.desc": "Construimos la solución con tecnología de vanguardia y metodologías ágiles.",
    "process.step4.title": "Lanzamiento",
    "process.step4.desc": "Desplegamos, monitoreamos y optimizamos para asegurar el éxito continuo.",
    
    // Testimonials
    "testimonials.title": "Lo Que Dicen Nuestros Clientes",
    "testimonials.subtitle": "Resultados que hablan por sí mismos",
    
    // Team
    "team.title": "Nuestro Equipo",
    "team.subtitle": "Expertos en tecnología e innovación",
    
    // Partners
    "partners.title": "Marcas que Confían en Nosotros",
    "partners.subtitle": "Representaciones comerciales y alianzas estratégicas",
    
    // Case Studies
    "cases.title": "Casos de Éxito",
    "cases.subtitle": "Proyectos que generan impacto real",
    "cases.viewAll": "Ver todos los casos",
    
    // Contact floating
    "contact.title": "¿Hablamos?",
    "contact.subtitle": "Estamos listos para ayudarte a transformar tu negocio",
    "contact.whatsapp": "Respuesta inmediata",
    "contact.email": "hello@codifikai.tech",
    "contact.schedule": "Agendar Llamada",
    "contact.scheduleDesc": "Consultoría gratuita",
    "contact.cta": "Ver más opciones",
    
    // Low-Code Services
    "services.lowcode.title": "Low-Code / No-Code",
    "services.lowcode.desc": "Desarrollo rápido de sitios web corporativos y landing pages optimizadas.",
    "services.lowcode.corporate": "Sitios Web Corporativos",
    "services.lowcode.landing": "Landing Pages",
    "services.lowcode.integrations": "Integraciones Low-Code",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",
    
    // Hero
    "hero.tagline": "Artificial Intelligence Agency",
    "hero.title": "We transform ideas into",
    "hero.titleHighlight": "digital solutions",
    "hero.subtitle": "Intelligent automation, software development, and AI-powered marketing strategies for companies looking to lead in the digital era.",
    "hero.cta.primary": "Start Project",
    "hero.cta.secondary": "Learn More",
    "hero.stats.projects": "Successful Projects",
    "hero.stats.clients": "Global Clients",
    "hero.stats.satisfaction": "Satisfaction",
    
    // Services
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive AI solutions for every stage of your digital transformation",
    "services.development.title": "AI Development",
    "services.development.desc": "We create web applications, mobile apps, and custom software powered by artificial intelligence.",
    "services.development.web": "AI Websites",
    "services.development.apps": "AI Apps",
    "services.development.software": "AI Software",
    "services.marketing.title": "AI Marketing & Sales",
    "services.marketing.desc": "B2B prospecting strategies and automated sales systems with AI.",
    "services.marketing.prospecting": "AI Marketing Prospecting B2B",
    "services.marketing.sales": "AI Sales System",
    "services.automation.title": "AI Business Automation",
    "services.automation.desc": "Autonomous AI agents to automate processes and optimize operations.",
    "services.automation.agents": "Autonomous AI Agents",
    "services.automation.data": "AI Data & Models",
    "services.learnMore": "Learn more",
    
    // About
    "about.title": "About Us",
    "about.subtitle": "We Are the AI Agency for Enterprises",
    "about.description": "We combine technical expertise with strategic vision to create artificial intelligence solutions that generate measurable results.",
    "about.mission.title": "Our Mission",
    "about.mission.desc": "Democratize access to artificial intelligence for businesses of all sizes.",
    "about.vision.title": "Our Vision",
    "about.vision.desc": "Be the leading technology partner in digital transformation through AI.",
    "about.values.title": "Values",
    "about.values.innovation": "Continuous Innovation",
    "about.values.excellence": "Technical Excellence",
    "about.values.transparency": "Total Transparency",
    "about.values.commitment": "Commitment to Results",
    "about.cta": "Talk to an Advisor",
    
    // CTA
    "cta.title": "Transform your business with AI",
    "cta.subtitle": "Schedule a free consultation and discover how artificial intelligence can boost your company.",
    "cta.button": "Schedule Consultation",
    "cta.available": "Available now",
    
    // Footer
    "footer.description": "Artificial Intelligence Agency specialized in development, marketing, and business automation.",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.contact": "Contact",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.rights": "All rights reserved.",
    
    // Process
    "process.title": "Our Process",
    "process.subtitle": "Agile methodology for extraordinary results",
    "process.step1.title": "Discovery",
    "process.step1.desc": "We analyze your business, objectives, and challenges to create a personalized strategy.",
    "process.step2.title": "Strategy",
    "process.step2.desc": "We design the solution architecture and define the implementation roadmap.",
    "process.step3.title": "Development",
    "process.step3.desc": "We build the solution with cutting-edge technology and agile methodologies.",
    "process.step4.title": "Launch",
    "process.step4.desc": "We deploy, monitor, and optimize to ensure continuous success.",
    
    // Testimonials
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle": "Results that speak for themselves",
    
    // Team
    "team.title": "Our Team",
    "team.subtitle": "Experts in technology and innovation",
    
    // Partners
    "partners.title": "Brands That Trust Us",
    "partners.subtitle": "Commercial representations and strategic alliances",
    
    // Case Studies
    "cases.title": "Case Studies",
    "cases.subtitle": "Projects that generate real impact",
    "cases.viewAll": "View all cases",
    
    // Contact floating
    "contact.title": "Let's Talk",
    "contact.subtitle": "We're ready to help transform your business",
    "contact.whatsapp": "Instant response",
    "contact.email": "hello@codifikai.tech",
    "contact.schedule": "Schedule Call",
    "contact.scheduleDesc": "Free consultation",
    "contact.cta": "See more options",
    
    // Low-Code Services
    "services.lowcode.title": "Low-Code / No-Code",
    "services.lowcode.desc": "Rapid development of corporate websites and optimized landing pages.",
    "services.lowcode.corporate": "Corporate Websites",
    "services.lowcode.landing": "Landing Pages",
    "services.lowcode.integrations": "Low-Code Integrations",
  },
}

const initialState: LanguageProviderState = {
  language: "es",
  setLanguage: () => null,
  t: () => "",
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "es",
  storageKey = "codifikai-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Language | null
    if (stored) {
      setLanguage(stored)
    }
  }, [storageKey])

  useEffect(() => {
    localStorage.setItem(storageKey, language)
    document.documentElement.lang = language
  }, [language, storageKey])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const value = {
    language,
    setLanguage,
    t,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
