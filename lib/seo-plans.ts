import type { Localized, LocalizedList } from "@/lib/services"

export type SeoPlan = {
  id: string
  slug: string
  order: number
  name: Localized
  subtitle: Localized
  description: Localized
  price: number
  currency: string
  includes: LocalizedList
  benefits: LocalizedList
  bonus: LocalizedList
  cta: Localized
}

export const SEO_PLANS: SeoPlan[] = [
  {
    id: "visibility-journey",
    slug: "visibility-journey",
    order: 1,
    name: {
      es: "Viaje a la Visibilidad",
      en: "Visibility Journey",
    },
    subtitle: {
      es: "Haz que tu negocio B2B sea visto, conectado y confiable en redes sociales.",
      en: "Make your B2B business visible, connected and trustworthy on social networks.",
    },
    description: {
      es: "El primer paso para crecer es estar presente. Este plan está diseñado para que tu marca se vea profesional, genere confianza y atraiga nuevos clientes, sin complicaciones.",
      en: "The first step to grow is to be present. This plan is designed so your brand looks professional, builds trust and attracts new customers, without complications.",
    },
    price: 1990000,
    currency: "COP",
    includes: {
      es: [
        "Construcción de la promesa del negocio",
        "Poner la casa bonita",
        "Construcción de la oferta",
        "Tráfico Orgánico",
        "Tráfico Pago Redes Sociales",
        "Interacción con Seguidores",
        "Tráfico Pago Google",
        "Sistemas de Conversión y aterrizaje de Leads",
        "Comercio electrónico",
        "Informes y optimización de Métricas",
      ],
      en: [
        "Building your business promise",
        "Making your house look nice",
        "Building your offer",
        "Organic Traffic",
        "Paid Social Media Traffic",
        "Follower Interaction",
        "Paid Google Traffic",
        "Conversion Systems and Lead Landing",
        "E-commerce",
        "Reports and Metrics Optimization",
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
      es: [
        "Creación • Rebranding Logo",
        "Descuento por contratación 3 meses",
      ],
      en: [
        "Creation • Logo Rebranding",
        "Discount for 3-month contract",
      ],
    },
    cta: {
      es: "Escríbenos por WhatsApp",
      en: "Message us on WhatsApp",
    },
  },
  {
    id: "expansion-route",
    slug: "expansion-route",
    order: 2,
    name: {
      es: "Ruta de Expansión",
      en: "Expansion Route",
    },
    subtitle: {
      es: "Más contenido, más canales, más oportunidades de negocio.",
      en: "More content, more channels, more business opportunities.",
    },
    description: {
      es: "Llevamos tu marca al siguiente nivel con una estrategia integral de redes sociales, publicidad digital y sistemas de conversión diseñados para generar leads y aumentar tus ventas.",
      en: "We take your brand to the next level with an integrated strategy of social networks, digital advertising and conversion systems designed to generate leads and increase your sales.",
    },
    price: 2490000,
    currency: "COP",
    includes: {
      es: [
        "Construcción de la promesa del negocio",
        "Poner la casa bonita",
        "Construcción de la oferta",
        "Tráfico Orgánico",
        "Tráfico Pago Redes Sociales",
        "Interacción con Seguidores",
        "Tráfico Pago Google",
        "Sistemas de Conversión y aterrizaje de Leads",
        "Comercio electrónico",
        "Informes y optimización de Métricas",
      ],
      en: [
        "Building your business promise",
        "Making your house look nice",
        "Building your offer",
        "Organic Traffic",
        "Paid Social Media Traffic",
        "Follower Interaction",
        "Paid Google Traffic",
        "Conversion Systems and Lead Landing",
        "E-commerce",
        "Reports and Metrics Optimization",
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
        "Creación • Rebranding Logo",
        "Descuento por contratación 3 meses",
        "Creación Cliente Ideal",
      ],
      en: [
        "Creation • Logo Rebranding",
        "Discount for 3-month contract",
        "Ideal Client Creation",
      ],
    },
    cta: {
      es: "Escríbenos por WhatsApp",
      en: "Message us on WhatsApp",
    },
  },
  {
    id: "success-circuit",
    slug: "success-circuit",
    order: 3,
    name: {
      es: "Circuito de Éxito",
      en: "Success Circuit",
    },
    subtitle: {
      es: "Más visibilidad, más clientes, más crecimiento.",
      en: "More visibility, more clients, more growth.",
    },
    description: {
      es: "Llevamos tu marca al siguiente nivel con una estrategia integral de redes sociales, publicidad digital y sistemas de conversión diseñados para generar leads y aumentar tus ventas.",
      en: "We take your brand to the next level with an integrated strategy of social networks, digital advertising and conversion systems designed to generate leads and increase your sales.",
    },
    price: 2900000,
    currency: "COP",
    includes: {
      es: [
        "Construcción de la promesa del negocio",
        "Poner la casa bonita",
        "Construcción de la oferta",
        "Tráfico Orgánico",
        "Tráfico Pago Redes Sociales",
        "Interacción con Seguidores",
        "Tráfico Pago Google",
        "Sistemas de Conversión y aterrizaje de Leads",
        "Comercio electrónico",
        "Informes y optimización de Métricas",
      ],
      en: [
        "Building your business promise",
        "Making your house look nice",
        "Building your offer",
        "Organic Traffic",
        "Paid Social Media Traffic",
        "Follower Interaction",
        "Paid Google Traffic",
        "Conversion Systems and Lead Landing",
        "E-commerce",
        "Reports and Metrics Optimization",
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
        "Continuous optimization",
      ],
    },
    bonus: {
      es: [
        "Creación • Rebranding Logo",
        "Descuento por contratación 3 meses",
        "Creación Cliente Ideal",
        "Investigación de Mercado",
      ],
      en: [
        "Creation • Logo Rebranding",
        "Discount for 3-month contract",
        "Ideal Client Creation",
        "Market Research",
      ],
    },
    cta: {
      es: "Escríbenos por WhatsApp",
      en: "Message us on WhatsApp",
    },
  },
]
