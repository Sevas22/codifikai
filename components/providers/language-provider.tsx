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
    "nav.cases": "Casos de éxito",
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
    "about.heroBadge": "Agencia de desarrollo de software e IA en Colombia",
    "about.heroTitle": "Una fábrica de",
    "about.heroTitleHighlight": "transformación digital",
    "about.heroDesc": "En Codifikai entendemos que las empresas necesitan algo más que tecnología: necesitan visión, ejecución y soluciones que impulsen crecimiento real. Diseñamos experiencias digitales que conectan estrategia, producto y resultados.",
    "about.essence": "Nuestra esencia",
    "about.history": "Historia",
    "about.historyP1": "Todo comenzó con una idea clara: las personas y las empresas necesitan socios tecnológicos capaces de evolucionar al ritmo del mercado y convertir los retos en oportunidades reales.",
    "about.historyP2": "Así nació Codifikai, con la intención de crear software, automatizaciones y soluciones digitales que no solo resuelvan una necesidad puntual, sino que también fortalezcan la visión de negocio de cada cliente.",
    "about.historyP3": "Nuestro enfoque combina estrategia, diseño y tecnología para construir experiencias modernas, funcionales y preparadas para escalar.",
    "about.vision": "Nuestra visión",
    "about.visionDesc": "Creemos en una tecnología que vaya más allá de lo funcional. Por eso construimos soluciones con mentalidad de crecimiento, enfoque empresarial y una estética capaz de transmitir innovación, confianza y alto nivel profesional.",
    "about.innovation": "Innovación estratégica",
    "about.premium": "Experiencias premium",
    "about.scalable": "Soluciones escalables",
    "about.purpose": "Tecnología con propósito",
    "about.learnMore": "¿Quieres saber más?",
    "about.brandTransition": "Transición de marca",
    "about.brandDesc": "De la visión estratégica pasamos al rostro que lidera la ejecución, la confianza y la construcción de la marca.",
    "about.founderLeadership": "Liderazgo fundador",
    "about.leadershipTitle": "El liderazgo que convierte visión en resultados reales",
    "about.founderMessage": "Mensaje del fundador",
    "about.benefit1": "Equipo multidisciplinario con +50 años de experiencia combinada",
    "about.benefit2": "Metodologías ágiles adaptadas a cada proyecto",
    "about.benefit3": "Soporte continuo 24/7 post-implementación",
    "about.benefit4": "Garantía de satisfacción en todos los proyectos",
    "about.whyChoose": "Por qué elegirnos",
    "about.experience": "Experiencia de",
    "about.trust": "Confianza",
    "about.experienceDesc": "Más de una década de experiencia nos respalda. Hemos ayudado a empresas de todos los tamaños a transformar sus operaciones con inteligencia artificial.",
    "about.competitiveAnalysis": "Análisis Competitivo",
    "about.deliveryTime": "Tiempo de entrega",
    "about.deliveryValue": "2x más rápido",
    "about.costVsAgencies": "Costo vs. agencias tradicionales",
    "about.costValue": "-40% promedio",
    "about.retention": "Tasa de retención de clientes",
    "about.retentionValue": "94%",
    "about.nps": "NPS Score",
    "about.npsValue": "78",
    "about.techTitle": "Tecnologías",
    "about.techIntro1": "En Codifikai combinamos herramientas consolidadas del ecosistema digital con tecnologías modernas orientadas a rendimiento, seguridad y escalabilidad.",
    "about.techIntro2": "Elegimos cada stack en función del contexto del proyecto, la madurez técnica y los objetivos del negocio. Eso nos permite construir soluciones más sólidas, más mantenibles y mejor preparadas para crecer.",
    "about.techPerf": "Rendimiento optimizado desde la arquitectura hasta la experiencia final del usuario.",
    "about.techSecurity": "Seguridad y estabilidad como base para productos confiables y escalables.",
    "about.techFlex": "Flexibilidad tecnológica para adaptarnos a distintos tamaños de empresa y etapas de crecimiento.",
    "about.techSelect": "Selección estratégica de herramientas para equilibrar velocidad, calidad y sostenibilidad.",
    "about.techFrontendTitle": "Tecnologías Frontend",
    "about.techFrontendDesc": "Diseñamos interfaces digitales modernas, rápidas y orientadas a conversión. Desde experiencias web corporativas hasta productos interactivos, trabajamos el frontend con foco en rendimiento, claridad visual y experiencia de usuario.",
    "about.techFrontendStack": "React.js - Next.js - Angular - Flutter",
    "about.techBackendTitle": "Tecnologías Backend",
    "about.techBackendDesc": "Construimos bases sólidas para productos escalables y seguros. Desarrollamos arquitecturas backend preparadas para integraciones, automatización de procesos y operación estable en entornos empresariales.",
    "about.techBackendStack": "Node.js - PHP - .NET - APIs REST",
    "about.techDataTitle": "Ciencia de Datos",
    "about.techDataDesc": "Convertimos datos en decisiones más inteligentes. Diseñamos flujos de análisis, limpieza y explotación de información que permiten descubrir oportunidades, optimizar procesos y respaldar estrategias con evidencia.",
    "about.techDataStack": "Python - Pandas - ETL - Analítica predictiva",
    "about.techCmsTitle": "Gestores de Contenido",
    "about.techCmsDesc": "Implementamos plataformas de contenido pensadas para equipos que necesitan autonomía, organización y escalabilidad. Optimizamos la administración digital para que la operación diaria sea más eficiente y profesional.",
    "about.techCmsStack": "WordPress - Headless CMS - Webflow - Shopify",
    "about.ctaSectionLabel": "Cierre estratégico",
    "about.ctaTitle": "Somos la Agencia IA para las Empresas",
    "about.ctaDesc": "Conecta con un asesor especializado y descubre cómo podemos transformar tu negocio con soluciones de inteligencia artificial a medida.",
    "about.techCapability": "Capacidad tecnológica",
    "about.institutionalProfile": "Perfil institucional",
    "about.competitiveAdvantage": "Ventaja competitiva",
    "about.founder1Label": "Visión, estrategia y crecimiento",
    "about.founder1Bio": "Como CEO & Founder de Codifikai, lidero una visión enfocada en construir soluciones digitales que conecten innovación, ejecución y resultados de negocio. Creo firmemente que la tecnología debe sentirse cercana, útil y capaz de impulsar una evolución real para cada empresa que confía en nosotros.",
    "about.founder1Quote": "No construimos solo software: construimos confianza, evolución y oportunidades reales de crecimiento.",
    "about.founder2Label": "Estrategia, expansión y dirección comercial",
    "about.founder2Bio": "Como Co-Founder & Strategy Director de Codifikai, impulso una visión enfocada en el crecimiento sostenible, la claridad estratégica y la construcción de relaciones sólidas con cada cliente. Mi enfoque está en alinear negocio, posicionamiento y ejecución para que cada solución genere impacto real y fortalezca la evolución de la marca.",
    "about.founder2Quote": "Una estrategia bien dirigida convierte las ideas en oportunidades y las oportunidades en crecimiento real.",
    
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
    "team.label": "Liderazgo",
    "team.title": "Nuestro Equipo",
    "team.subtitle": "Expertos en tecnología e innovación",
    "team.viewProfile": "Ver perfil",
    "team.jhoanBio": "Lidera la visión de Codifikai con foco en crecimiento, ejecución y soluciones digitales alineadas al negocio.",
    "team.jhonBio": "Impulsa la estrategia, la expansión comercial y la dirección de iniciativas con impacto real y sostenible.",
    
    // Partners
    "partners.title": "Marcas que Confían en Nosotros",
    "partners.subtitle": "Representaciones comerciales y alianzas estratégicas",
    
    // Case Studies
    "cases.label": "Casos destacados",
    "cases.title": "Casos de Éxito",
    "cases.subtitle": "Proyectos que generan impacto real",
    "cases.viewAll": "Ver todos los casos",

    // Globe / Alcance global
    "globe.label": "Alcance global",
    "globe.badge": "Desde Colombia hacia el mundo",
    "globe.title": "Proyectos y clientes en múltiples continentes",
    "globe.subtitle": "Desarrollamos software, automatizaciones y soluciones IA para empresas en Estados Unidos, Europa, Asia y más. Conectamos visión tecnológica con ejecución global.",
    "globe.fromColombia": "Desde Colombia",
    "globe.towards": "hacia",
    "globe.usaDesc": "Proyectos de software, e-commerce y automatización para clientes en Estados Unidos. Desarrollo web, apps y soluciones IA.",
    "globe.europaDesc": "Plataformas digitales y estrategias de marketing para el mercado europeo. Cumplimiento normativo y escalabilidad.",
    "globe.japonDesc": "Soluciones tecnológicas y sourcing digital para el mercado asiático. Enfoque en calidad y precisión.",
    "globe.chinaDesc": "Desarrollo de software y soluciones de comercio internacional. Integración con ecosistemas digitales asiáticos.",
    "globe.canadaDesc": "Proyectos de software y transformación digital para clientes en Norteamérica. Plataformas escalables.",
    "globe.mexicoDesc": "Desarrollo de software y soluciones digitales para el mercado mexicano. E-commerce, apps y automatización.",
    "globe.brasilDesc": "Plataformas y software para el mercado brasileño. Integración con ecosistemas latinoamericanos.",
    "globe.argentinaDesc": "Soluciones de software y transformación digital para empresas en el Cono Sur.",
    "globe.chileDesc": "Desarrollo tecnológico y soluciones IA para el mercado chileno. Minería, retail y servicios.",
    "globe.peruDesc": "Proyectos digitales y software para empresas peruanas. Comercio y logística.",
    "globe.uaeDesc": "Soluciones tecnológicas para el Golfo. E-commerce, fintech y plataformas B2B.",
    "globe.indiaDesc": "Desarrollo de software y outsourcing tecnológico. Integración con equipos globales.",
    "globe.coreaDesc": "Tecnología y soluciones digitales para el mercado coreano. Innovación y precisión.",
    "globe.australiaDesc": "Software y soluciones IA para el mercado australiano. Comercio y servicios.",
    "globe.statusActive": "Mercado activo",
    "globe.statusExpansion": "En expansión",
    "globe.statusStrategic": "Mercado estratégico",
    "globe.statusGrowth": "En crecimiento",
    "globe.centerColombia": "Centrar en Colombia",
    "globe.usa": "Estados Unidos",
    "globe.europa": "Europa",
    "globe.japon": "Japón",
    "globe.china": "China",
    "globe.canada": "Canadá",
    "globe.mexico": "México",
    "globe.brasil": "Brasil",
    "globe.argentina": "Argentina",
    "globe.chile": "Chile",
    "globe.peru": "Perú",
    "globe.uae": "Emiratos Árabes",
    "globe.india": "India",
    "globe.corea": "Corea del Sur",
    "globe.australia": "Australia",

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

    // Services Preview
    "servicesPreview.label": "Servicios",
    "servicesPreview.title": "Soluciones diseñadas para crecer contigo",
    "servicesPreview.subtitle": "Combinamos velocidad, estrategia y ejecución tecnológica para construir soluciones digitales que mejoran procesos, fortalecen marcas y generan crecimiento sostenible.",
    "servicesPreview.lowcode": "Low Code",
    "servicesPreview.lowcodeDesc": "Desarrollamos soluciones digitales ágiles para empresas que necesitan lanzar, validar y optimizar con velocidad, sin sacrificar calidad visual ni estructura profesional.",
    "servicesPreview.software": "Desarrollo de Software",
    "servicesPreview.softwareDesc": "Creamos plataformas, sistemas y productos a medida con arquitectura sólida, enfoque escalable y una implementación alineada con los procesos reales de tu negocio.",
    "servicesPreview.marketing": "Marketing Digital (SEO)",
    "servicesPreview.marketingDesc": "Diseñamos estrategias de posicionamiento y visibilidad digital para atraer tráfico de calidad, fortalecer tu presencia online y generar oportunidades comerciales sostenibles.",
    "servicesPreview.contactLabel": "Contáctanos",
    "servicesPreview.contactTitle": "¿Requieres alguno de estos servicios?",
    "servicesPreview.viewServices": "Ver servicios",

    // Technologies Preview
    "techPreview.label": "Herramientas y stack",
    "techPreview.title": "La tecnología adecuada para construir soluciones sólidas",
    "techPreview.subtitle": "Trabajamos con un stack moderno y estratégico para desarrollar productos digitales, automatizaciones y plataformas preparadas para crecer con tu negocio.",
    "techPreview.viewTools": "Ver herramientas",
    "techPreview.frontend": "Frontend",
    "techPreview.frontendDesc": "Interfaces modernas, rápidas y orientadas a experiencia de usuario.",
    "techPreview.backend": "Backend",
    "techPreview.backendDesc": "Arquitecturas estables, seguras y listas para escalar.",
    "techPreview.datascience": "Ciencia de Datos",
    "techPreview.datascienceDesc": "Modelos, análisis y automatización basados en información útil.",
    "techPreview.cms": "Gestores de Contenido",
    "techPreview.cmsDesc": "Plataformas flexibles para administrar y evolucionar productos digitales.",

    // Company Intro
    "companyIntro.label": "Quiénes somos",
    "companyIntro.badge": "Socios tecnológicos para marcas en evolución",
    "companyIntro.title": "En Codifikai transformamos ideas, procesos y visión de negocio en soluciones digitales con impacto real.",
    "companyIntro.subtitle": "Somos una empresa enfocada en desarrollo de software, automatización e inteligencia artificial aplicada al crecimiento empresarial. Acompañamos a cada cliente desde la estrategia hasta la ejecución para construir productos útiles, modernos y preparados para escalar.",
    "companyIntro.pillar1": "Desarrollo de software a medida",
    "companyIntro.pillar2": "Automatización y soluciones con IA",
    "companyIntro.pillar3": "Estrategia digital enfocada en crecimiento",
    "companyIntro.stats1": "proyectos digitales ejecutados",
    "companyIntro.stats2": "clientes acompañados",
    "companyIntro.stats3": "satisfacción en la entrega",
    "companyIntro.cta": "Conocer la empresa",
    "companyIntro.leadership": "Liderazgo y ejecución",
    "companyIntro.cardTag": "Construimos soluciones que conectan tecnología, experiencia de usuario y crecimiento comercial.",
    "companyIntro.focusLabel": "Enfoque",
    "companyIntro.focus": "Software, automatización e IA para empresas que quieren crecer con estructura.",

    // Strategy
    "strategy.label": "Nuestra estrategia",
    "strategy.title": "Estrategia de negocio potenciada por IA",
    "strategy.subtitle": "Combinamos experiencia empresarial con tecnología de vanguardia para crear soluciones que transforman operaciones y generan crecimiento sostenible.",
    "strategy.fast": "Implementación Rápida",
    "strategy.fastDesc": "Metodologías ágiles que permiten ver resultados en semanas, no meses.",
    "strategy.security": "Seguridad Empresarial",
    "strategy.securityDesc": "Protocolos de seguridad de nivel enterprise para proteger tus datos.",
    "strategy.scale": "Escalabilidad",
    "strategy.scaleDesc": "Arquitecturas diseñadas para crecer con tu negocio sin límites.",
    "strategy.roi": "ROI Garantizado",
    "strategy.roiDesc": "Medimos y optimizamos constantemente para maximizar tu retorno.",
    "strategy.metricsTitle": "Métricas de Éxito",
    "strategy.metrics1": "Proyectos entregados a tiempo",
    "strategy.metrics2": "Satisfacción del cliente",
    "strategy.metrics3": "Integraciones realizadas",
    "strategy.iso": "ISO 27001 Certificado",
    "strategy.gcp": "Google Cloud Partner",
    "strategy.aws": "AWS Certified",

    // Stats
    "stats.label": "Resultados y confianza",
    "stats.generated": "Generados para clientes",
    "stats.reduction": "Reducción de costos promedio",
    "stats.roi": "ROI promedio en 6 meses",
    "stats.support": "Soporte continuo",
    "stats.testimonial1": "Codifikai transformó nuestra operación de ventas con IA. Los resultados superaron nuestras expectativas.",
    "stats.testimonial2": "La automatización implementada nos ahorró más de 200 horas mensuales en tareas repetitivas.",
    "stats.testimonial3": "Un equipo excepcional que entiende tanto la tecnología como las necesidades del negocio.",

    // Footer links
    "footer.servicesWeb": "Webs AI",
    "footer.servicesApps": "Apps AI",
    "footer.servicesSoftware": "Software AI",
    "footer.servicesMarketing": "Marketing AI",
    "footer.servicesAutomation": "Automatización",
    "footer.companyAbout": "Nosotros",
    "footer.companyCases": "Casos de éxito",
    "footer.companyBlog": "Blog",
    "footer.companyCareers": "Carreras",
    "footer.companyContact": "Contacto",

    // Casos de éxito
    "casesPage.label": "Portafolio",
    "casesPage.title": "Casos de éxito",
    "casesPage.subtitle": "Proyectos que hemos entregado para clientes en comercio internacional, marketplaces, logística y marketing experiencial. Haz clic en cada tarjeta para visitar el sitio.",
    "casesPage.visitSite": "Ver sitio en vivo",
    "casesPage.ctaTitle": "¿Quieres que tu proyecto sea el próximo caso de éxito?",
    "casesPage.ctaButton": "Hablemos de tu proyecto",

    // Features
    "features.strategy": "Estrategia",
    "features.strategyDesc": "Diseñamos soluciones personalizadas basadas en análisis profundo de tu negocio y objetivos.",
    "features.planning": "Planificación",
    "features.planningDesc": "Metodologías ágiles y roadmaps claros para ejecutar proyectos de forma eficiente.",
    "features.growth": "Crecimiento",
    "features.growthDesc": "Soluciones escalables que evolucionan con tu empresa y generan resultados medibles.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.cases": "Case Studies",
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
    "about.heroBadge": "Software development and AI agency in Colombia",
    "about.heroTitle": "A factory of",
    "about.heroTitleHighlight": "digital transformation",
    "about.heroDesc": "At Codifikai we understand that companies need more than technology: they need vision, execution and solutions that drive real growth. We design digital experiences that connect strategy, product and results.",
    "about.essence": "Our essence",
    "about.history": "History",
    "about.historyP1": "It all started with a clear idea: people and companies need technology partners capable of evolving at the pace of the market and turning challenges into real opportunities.",
    "about.historyP2": "Thus Codifikai was born, with the intention of creating software, automations and digital solutions that not only solve a specific need, but also strengthen the business vision of each client.",
    "about.historyP3": "Our approach combines strategy, design and technology to build modern, functional experiences ready to scale.",
    "about.vision": "Our vision",
    "about.visionDesc": "We believe in technology that goes beyond the functional. That's why we build solutions with a growth mindset, business focus and an aesthetic capable of conveying innovation, trust and high professional level.",
    "about.innovation": "Strategic innovation",
    "about.premium": "Premium experiences",
    "about.scalable": "Scalable solutions",
    "about.purpose": "Technology with purpose",
    "about.learnMore": "Want to know more?",
    "about.brandTransition": "Brand transition",
    "about.brandDesc": "From strategic vision we move to the face that leads execution, trust and brand building.",
    "about.founderLeadership": "Founder leadership",
    "about.leadershipTitle": "The leadership that turns vision into real results",
    "about.founderMessage": "Founder's message",
    "about.benefit1": "Multidisciplinary team with +50 years of combined experience",
    "about.benefit2": "Agile methodologies adapted to each project",
    "about.benefit3": "24/7 continuous support post-implementation",
    "about.benefit4": "Satisfaction guarantee on all projects",
    "about.whyChoose": "Why choose us",
    "about.experience": "Experience of",
    "about.trust": "Trust",
    "about.experienceDesc": "Over a decade of experience backs us. We have helped companies of all sizes transform their operations with artificial intelligence.",
    "about.competitiveAnalysis": "Competitive Analysis",
    "about.deliveryTime": "Delivery time",
    "about.deliveryValue": "2x faster",
    "about.costVsAgencies": "Cost vs. traditional agencies",
    "about.costValue": "-40% average",
    "about.retention": "Client retention rate",
    "about.retentionValue": "94%",
    "about.nps": "NPS Score",
    "about.npsValue": "78",
    "about.techTitle": "Technologies",
    "about.techIntro1": "At Codifikai we combine proven tools from the digital ecosystem with modern technologies focused on performance, security and scalability.",
    "about.techIntro2": "We choose each stack based on project context, technical maturity and business objectives. This allows us to build more solid, maintainable solutions better prepared to grow.",
    "about.techPerf": "Optimized performance from architecture to end-user experience.",
    "about.techSecurity": "Security and stability as the foundation for reliable and scalable products.",
    "about.techFlex": "Technological flexibility to adapt to different company sizes and growth stages.",
    "about.techSelect": "Strategic tool selection to balance speed, quality and sustainability.",
    "about.techFrontendTitle": "Frontend Technologies",
    "about.techFrontendDesc": "We design modern, fast, conversion-oriented digital interfaces. From corporate web experiences to interactive products, we work on the frontend with a focus on performance, visual clarity and user experience.",
    "about.techFrontendStack": "React.js - Next.js - Angular - Flutter",
    "about.techBackendTitle": "Backend Technologies",
    "about.techBackendDesc": "We build solid foundations for scalable and secure products. We develop backend architectures ready for integrations, process automation and stable operation in enterprise environments.",
    "about.techBackendStack": "Node.js - PHP - .NET - REST APIs",
    "about.techDataTitle": "Data Science",
    "about.techDataDesc": "We turn data into smarter decisions. We design analysis, cleaning and information exploitation flows that enable discovering opportunities, optimizing processes and supporting strategies with evidence.",
    "about.techDataStack": "Python - Pandas - ETL - Predictive analytics",
    "about.techCmsTitle": "Content Management Systems",
    "about.techCmsDesc": "We implement content platforms designed for teams that need autonomy, organization and scalability. We optimize digital administration so that daily operations are more efficient and professional.",
    "about.techCmsStack": "WordPress - Headless CMS - Webflow - Shopify",
    "about.ctaSectionLabel": "Strategic closing",
    "about.ctaTitle": "We Are the AI Agency for Enterprises",
    "about.ctaDesc": "Connect with a specialized advisor and discover how we can transform your business with custom artificial intelligence solutions.",
    "about.techCapability": "Technological capability",
    "about.institutionalProfile": "Institutional profile",
    "about.competitiveAdvantage": "Competitive advantage",
    "about.founder1Label": "Vision, strategy and growth",
    "about.founder1Bio": "As CEO & Founder of Codifikai, I lead a vision focused on building digital solutions that connect innovation, execution and business results. I firmly believe that technology should feel close, useful and capable of driving real evolution for every company that trusts us.",
    "about.founder1Quote": "We don't just build software: we build trust, evolution and real growth opportunities.",
    "about.founder2Label": "Strategy, expansion and commercial direction",
    "about.founder2Bio": "As Co-Founder & Strategy Director of Codifikai, I drive a vision focused on sustainable growth, strategic clarity and building solid relationships with each client. My focus is on aligning business, positioning and execution so that each solution generates real impact and strengthens brand evolution.",
    "about.founder2Quote": "A well-directed strategy turns ideas into opportunities and opportunities into real growth.",
    
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
    "team.label": "Leadership",
    "team.title": "Our Team",
    "team.subtitle": "Experts in technology and innovation",
    "team.viewProfile": "View profile",
    "team.jhoanBio": "Leads Codifikai's vision with focus on growth, execution and digital solutions aligned with business.",
    "team.jhonBio": "Drives strategy, commercial expansion and direction of initiatives with real and sustainable impact.",
    
    // Partners
    "partners.title": "Brands That Trust Us",
    "partners.subtitle": "Commercial representations and strategic alliances",
    
    // Case Studies
    "cases.label": "Featured cases",
    "cases.title": "Case Studies",
    "cases.subtitle": "Projects that generate real impact",
    "cases.viewAll": "View all cases",

    // Globe / Global reach
    "globe.label": "Global reach",
    "globe.badge": "From Colombia to the world",
    "globe.title": "Projects and clients across multiple continents",
    "globe.subtitle": "We develop software, automation and AI solutions for companies in the United States, Europe, Asia and beyond. Connecting technological vision with global execution.",
    "globe.fromColombia": "From Colombia",
    "globe.towards": "to",
    "globe.usaDesc": "Software projects, e-commerce and automation for clients in the United States. Web development, apps and AI solutions.",
    "globe.europaDesc": "Digital platforms and marketing strategies for the European market. Regulatory compliance and scalability.",
    "globe.japonDesc": "Technology solutions and digital sourcing for the Asian market. Focus on quality and precision.",
    "globe.chinaDesc": "Software development and international trade solutions. Integration with Asian digital ecosystems.",
    "globe.canadaDesc": "Software projects and digital transformation for clients in North America. Scalable platforms.",
    "globe.mexicoDesc": "Software development and digital solutions for the Mexican market. E-commerce, apps and automation.",
    "globe.brasilDesc": "Platforms and software for the Brazilian market. Integration with Latin American ecosystems.",
    "globe.argentinaDesc": "Software solutions and digital transformation for companies in the Southern Cone.",
    "globe.chileDesc": "Technology development and AI solutions for the Chilean market. Mining, retail and services.",
    "globe.peruDesc": "Digital projects and software for Peruvian companies. Commerce and logistics.",
    "globe.uaeDesc": "Technology solutions for the Gulf. E-commerce, fintech and B2B platforms.",
    "globe.indiaDesc": "Software development and technology outsourcing. Integration with global teams.",
    "globe.coreaDesc": "Technology and digital solutions for the Korean market. Innovation and precision.",
    "globe.australiaDesc": "Software and AI solutions for the Australian market. Commerce and services.",
    "globe.statusActive": "Active market",
    "globe.statusExpansion": "Expanding",
    "globe.statusStrategic": "Strategic market",
    "globe.statusGrowth": "Growing",
    "globe.centerColombia": "Center on Colombia",
    "globe.usa": "United States",
    "globe.europa": "Europe",
    "globe.japon": "Japan",
    "globe.china": "China",
    "globe.canada": "Canada",
    "globe.mexico": "Mexico",
    "globe.brasil": "Brazil",
    "globe.argentina": "Argentina",
    "globe.chile": "Chile",
    "globe.peru": "Peru",
    "globe.uae": "UAE",
    "globe.india": "India",
    "globe.corea": "South Korea",
    "globe.australia": "Australia",

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

    // Services Preview
    "servicesPreview.label": "Services",
    "servicesPreview.title": "Solutions designed to grow with you",
    "servicesPreview.subtitle": "We combine speed, strategy and technological execution to build digital solutions that improve processes, strengthen brands and generate sustainable growth.",
    "servicesPreview.lowcode": "Low Code",
    "servicesPreview.lowcodeDesc": "We develop agile digital solutions for companies that need to launch, validate and optimize quickly, without sacrificing visual quality or professional structure.",
    "servicesPreview.software": "Software Development",
    "servicesPreview.softwareDesc": "We create platforms, systems and custom products with solid architecture, scalable approach and implementation aligned with your business processes.",
    "servicesPreview.marketing": "Digital Marketing (SEO)",
    "servicesPreview.marketingDesc": "We design positioning and digital visibility strategies to attract quality traffic, strengthen your online presence and generate sustainable business opportunities.",
    "servicesPreview.contactLabel": "Contact us",
    "servicesPreview.contactTitle": "Do you need any of these services?",
    "servicesPreview.viewServices": "View services",

    // Technologies Preview
    "techPreview.label": "Tools and stack",
    "techPreview.title": "The right technology to build solid solutions",
    "techPreview.subtitle": "We work with a modern and strategic stack to develop digital products, automations and platforms ready to grow with your business.",
    "techPreview.viewTools": "View tools",
    "techPreview.frontend": "Frontend",
    "techPreview.frontendDesc": "Modern, fast interfaces focused on user experience.",
    "techPreview.backend": "Backend",
    "techPreview.backendDesc": "Stable, secure architectures ready to scale.",
    "techPreview.datascience": "Data Science",
    "techPreview.datascienceDesc": "Models, analysis and automation based on useful information.",
    "techPreview.cms": "Content Management",
    "techPreview.cmsDesc": "Flexible platforms to manage and evolve digital products.",

    // Company Intro
    "companyIntro.label": "Who we are",
    "companyIntro.badge": "Technology partners for evolving brands",
    "companyIntro.title": "At Codifikai we transform ideas, processes and business vision into digital solutions with real impact.",
    "companyIntro.subtitle": "We are a company focused on software development, automation and artificial intelligence applied to business growth. We accompany each client from strategy to execution to build useful, modern products ready to scale.",
    "companyIntro.pillar1": "Custom software development",
    "companyIntro.pillar2": "Automation and AI solutions",
    "companyIntro.pillar3": "Digital strategy focused on growth",
    "companyIntro.stats1": "digital projects delivered",
    "companyIntro.stats2": "clients accompanied",
    "companyIntro.stats3": "delivery satisfaction",
    "companyIntro.cta": "Learn about the company",
    "companyIntro.leadership": "Leadership and execution",
    "companyIntro.cardTag": "We build solutions that connect technology, user experience and business growth.",
    "companyIntro.focusLabel": "Focus",
    "companyIntro.focus": "Software, automation and AI for companies that want to grow with structure.",

    // Strategy
    "strategy.label": "Our strategy",
    "strategy.title": "Business strategy powered by AI",
    "strategy.subtitle": "We combine business experience with cutting-edge technology to create solutions that transform operations and generate sustainable growth.",
    "strategy.fast": "Fast Implementation",
    "strategy.fastDesc": "Agile methodologies that deliver results in weeks, not months.",
    "strategy.security": "Enterprise Security",
    "strategy.securityDesc": "Enterprise-level security protocols to protect your data.",
    "strategy.scale": "Scalability",
    "strategy.scaleDesc": "Architectures designed to grow with your business without limits.",
    "strategy.roi": "Guaranteed ROI",
    "strategy.roiDesc": "We constantly measure and optimize to maximize your return.",
    "strategy.metricsTitle": "Success Metrics",
    "strategy.metrics1": "Projects delivered on time",
    "strategy.metrics2": "Client satisfaction",
    "strategy.metrics3": "Integrations completed",
    "strategy.iso": "ISO 27001 Certified",
    "strategy.gcp": "Google Cloud Partner",
    "strategy.aws": "AWS Certified",

    // Stats
    "stats.label": "Results and trust",
    "stats.generated": "Generated for clients",
    "stats.reduction": "Average cost reduction",
    "stats.roi": "Average ROI in 6 months",
    "stats.support": "Continuous support",
    "stats.testimonial1": "Codifikai transformed our sales operation with AI. The results exceeded our expectations.",
    "stats.testimonial2": "The automation implemented saved us over 200 hours monthly on repetitive tasks.",
    "stats.testimonial3": "An exceptional team that understands both technology and business needs.",

    // Footer links
    "footer.servicesWeb": "AI Websites",
    "footer.servicesApps": "AI Apps",
    "footer.servicesSoftware": "AI Software",
    "footer.servicesMarketing": "AI Marketing",
    "footer.servicesAutomation": "Automation",
    "footer.companyAbout": "About",
    "footer.companyCases": "Case Studies",
    "footer.companyBlog": "Blog",
    "footer.companyCareers": "Careers",
    "footer.companyContact": "Contact",

    // Casos de éxito
    "casesPage.label": "Portfolio",
    "casesPage.title": "Case Studies",
    "casesPage.subtitle": "Projects we have delivered for clients in international trade, marketplaces, logistics and experiential marketing. Click each card to visit the site.",
    "casesPage.visitSite": "View live site",
    "casesPage.ctaTitle": "Want your project to be the next success story?",
    "casesPage.ctaButton": "Let's talk about your project",

    // Features
    "features.strategy": "Strategy",
    "features.strategyDesc": "We design customized solutions based on deep analysis of your business and objectives.",
    "features.planning": "Planning",
    "features.planningDesc": "Agile methodologies and clear roadmaps to execute projects efficiently.",
    "features.growth": "Growth",
    "features.growthDesc": "Scalable solutions that evolve with your company and generate measurable results.",
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
