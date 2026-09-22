import type { Localized, LocalizedList } from "@/lib/services"

export type PricingPlan = {
  id: string
  order: number
  name: Localized
  subtitle: Localized
  price: number
  currency: string
  includes: LocalizedList
  benefits: LocalizedList
  bonus: LocalizedList
  cta: Localized
}

/** Planes de Posicionamiento SEO y GEO (/services/seo-geo). */
export const SEO_PLANS: PricingPlan[] = [
  {
    id: "seo-essential",
    order: 1,
    name: {
      es: "SEO Esencial",
      en: "Essential SEO",
    },
    subtitle: {
      es: "Visibilidad orgánica para empezar a crecer.",
      en: "Organic visibility to start growing.",
    },
    price: 1990000,
    currency: "COP",
    includes: {
      es: [
        "Auditoría SEO",
        "Investigación de palabras clave",
        "SEO On-Page",
        "SEO técnico básico",
        "Optimización de Google Business Profile",
        "Informes y métricas",
      ],
      en: [
        "SEO audit",
        "Keyword research",
        "On-page SEO",
        "Basic technical SEO",
        "Google Business Profile optimisation",
        "Reports and metrics",
      ],
    },
    benefits: {
      es: [
        "Más visibilidad en Google",
        "Mejor estructura web",
        "Base sólida para crecer",
      ],
      en: [
        "More visibility on Google",
        "Better website structure",
        "A solid base to grow on",
      ],
    },
    bonus: { es: [], en: [] },
    cta: {
      es: "Escríbenos por WhatsApp",
      en: "Message us on WhatsApp",
    },
  },
  {
    id: "seo-geo-pro",
    order: 2,
    name: {
      es: "SEO + GEO Pro",
      en: "SEO + GEO Pro",
    },
    subtitle: {
      es: "Optimización para Google y motores de respuesta con IA.",
      en: "Optimisation for Google and AI answer engines.",
    },
    price: 2490000,
    currency: "COP",
    includes: {
      es: [
        "Todo lo del plan SEO Esencial",
        "Optimización de contenido para IA",
        "Datos estructurados y schema",
        "FAQs y contenido clave",
        "Estrategia de E-E-A-T y autoridad",
        "Optimización para ChatGPT, Gemini y Perplexity",
        "Medición de visibilidad orgánica y en IA",
      ],
      en: [
        "Everything in the Essential SEO plan",
        "Content optimisation for AI",
        "Structured data and schema",
        "FAQs and key content",
        "E-E-A-T and authority strategy",
        "Optimisation for ChatGPT, Gemini and Perplexity",
        "Organic and AI visibility measurement",
      ],
    },
    benefits: {
      es: [
        "Mayor presencia en búsquedas tradicionales y generativas",
        "Más confianza y autoridad",
        "Más oportunidades de negocio",
      ],
      en: [
        "Greater presence in traditional and generative search",
        "More trust and authority",
        "More business opportunities",
      ],
    },
    bonus: { es: [], en: [] },
    cta: {
      es: "Escríbenos por WhatsApp",
      en: "Message us on WhatsApp",
    },
  },
  {
    id: "digital-dominance",
    order: 3,
    name: {
      es: "Dominio Digital",
      en: "Digital Dominance",
    },
    subtitle: {
      es: "Estrategia avanzada para máxima expansión.",
      en: "Advanced strategy for maximum expansion.",
    },
    price: 2900000,
    currency: "COP",
    includes: {
      es: [
        "Todo lo del plan SEO + GEO Pro",
        "SEO local avanzado",
        "Link building y menciones",
        "Estrategia de contenidos",
        "Landing pages orientadas a conversión",
        "Optimización de conversión",
        "Reportes estratégicos mensuales",
      ],
      en: [
        "Everything in the SEO + GEO Pro plan",
        "Advanced local SEO",
        "Link building and mentions",
        "Content strategy",
        "Conversion-focused landing pages",
        "Conversion optimisation",
        "Monthly strategic reports",
      ],
    },
    benefits: {
      es: [
        "Máxima visibilidad",
        "Más leads calificados",
        "Crecimiento escalable",
      ],
      en: [
        "Maximum visibility",
        "More qualified leads",
        "Scalable growth",
      ],
    },
    bonus: { es: [], en: [] },
    cta: {
      es: "Escríbenos por WhatsApp",
      en: "Message us on WhatsApp",
    },
  },
]

/** Planes de gestión de Redes sociales (/services/social-media). */
export const SOCIAL_PLANS: PricingPlan[] = [
  {
    id: "visibility-journey",
    order: 1,
    name: {
      es: "Viaje a la Visibilidad",
      en: "Visibility Journey",
    },
    subtitle: {
      es: "Haz que tu negocio B2B sea visto, conectado y confiable en redes sociales.",
      en: "Make your B2B business visible, connected and trustworthy on social networks.",
    },
    price: 1990000,
    currency: "COP",
    includes: {
      es: [
        "Construcción de la promesa del negocio",
        "Poner la casa bonita",
        "Construcción de la oferta",
        "Tráfico orgánico",
        "Tráfico pago en redes sociales",
        "Interacción con seguidores",
        "Tráfico pago en Google",
        "Sistemas de conversión y aterrizaje de leads",
        "Comercio electrónico",
        "Informes y optimización de métricas",
      ],
      en: [
        "Building your business promise",
        "Making your house look nice",
        "Building your offer",
        "Organic traffic",
        "Paid social media traffic",
        "Follower interaction",
        "Paid Google traffic",
        "Conversion systems and lead landing",
        "E-commerce",
        "Reports and metrics optimisation",
      ],
    },
    benefits: {
      es: [
        "Atrae compradores listos para pagar",
        "Automatiza tu proceso comercial",
        "Recupera tu inversión rápidamente",
      ],
      en: [
        "Attract ready-to-buy customers",
        "Automate your sales process",
        "Recover your investment quickly",
      ],
    },
    bonus: {
      es: ["Creación / rebranding de logo", "Descuento por contratación de 3 meses"],
      en: ["Logo creation / rebranding", "Discount for a 3-month contract"],
    },
    cta: {
      es: "Escríbenos por WhatsApp",
      en: "Message us on WhatsApp",
    },
  },
  {
    id: "expansion-route",
    order: 2,
    name: {
      es: "Ruta de Expansión",
      en: "Expansion Route",
    },
    subtitle: {
      es: "Más contenido, más canales, más oportunidades de negocio.",
      en: "More content, more channels, more business opportunities.",
    },
    price: 2490000,
    currency: "COP",
    includes: {
      es: [
        "Construcción de la promesa del negocio",
        "Poner la casa bonita",
        "Construcción de la oferta",
        "Tráfico orgánico",
        "Tráfico pago en redes sociales",
        "Interacción con seguidores",
        "Tráfico pago en Google",
        "Sistemas de conversión y aterrizaje de leads",
        "Comercio electrónico",
        "Informes y optimización de métricas",
      ],
      en: [
        "Building your business promise",
        "Making your house look nice",
        "Building your offer",
        "Organic traffic",
        "Paid social media traffic",
        "Follower interaction",
        "Paid Google traffic",
        "Conversion systems and lead landing",
        "E-commerce",
        "Reports and metrics optimisation",
      ],
    },
    benefits: {
      es: [
        "Branding sólido",
        "Mayor interacción",
        "Conversión eficiente",
      ],
      en: [
        "Solid branding",
        "More interaction",
        "Efficient conversion",
      ],
    },
    bonus: {
      es: [
        "Creación / rebranding de logo",
        "Descuento por contratación de 3 meses",
        "Creación de cliente ideal",
      ],
      en: [
        "Logo creation / rebranding",
        "Discount for a 3-month contract",
        "Ideal client creation",
      ],
    },
    cta: {
      es: "Escríbenos por WhatsApp",
      en: "Message us on WhatsApp",
    },
  },
  {
    id: "success-circuit",
    order: 3,
    name: {
      es: "Circuito de Éxito",
      en: "Success Circuit",
    },
    subtitle: {
      es: "Más visibilidad, más clientes, más crecimiento.",
      en: "More visibility, more clients, more growth.",
    },
    price: 2900000,
    currency: "COP",
    includes: {
      es: [
        "Construcción de la promesa del negocio",
        "Poner la casa bonita",
        "Construcción de la oferta",
        "Tráfico orgánico",
        "Tráfico pago en redes sociales",
        "Interacción con seguidores",
        "Tráfico pago en Google",
        "Sistemas de conversión y aterrizaje de leads",
        "Comercio electrónico",
        "Informes y optimización de métricas",
      ],
      en: [
        "Building your business promise",
        "Making your house look nice",
        "Building your offer",
        "Organic traffic",
        "Paid social media traffic",
        "Follower interaction",
        "Paid Google traffic",
        "Conversion systems and lead landing",
        "E-commerce",
        "Reports and metrics optimisation",
      ],
    },
    benefits: {
      es: [
        "Máxima visibilidad",
        "Estrategia avanzada",
        "Optimización continua",
      ],
      en: [
        "Maximum visibility",
        "Advanced strategy",
        "Continuous optimisation",
      ],
    },
    bonus: {
      es: [
        "Creación / rebranding de logo",
        "Descuento por contratación de 3 meses",
        "Creación de cliente ideal",
        "Investigación de mercado",
      ],
      en: [
        "Logo creation / rebranding",
        "Discount for a 3-month contract",
        "Ideal client creation",
        "Market research",
      ],
    },
    cta: {
      es: "Escríbenos por WhatsApp",
      en: "Message us on WhatsApp",
    },
  },
]
