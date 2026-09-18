/**
 * Copy de "Sobre nosotros" (ES/EN).
 *
 * Autocontenido, como `home-copy.ts`: no toca el diccionario global, así que
 * el rediseño de esta página es reversible sin afectar al resto del sitio.
 *
 * Todo el texto viene del que la página ya publicaba bajo las claves
 * `about.*` — historia, visión, liderazgo, tecnología y cierre —, reordenado
 * y en algunos casos acortado. Los cargos y biografías del equipo son los
 * mismos que ya figuraban. No se añaden cifras ni afirmaciones nuevas
 * (ver commit 9f65cd3).
 */

export type AboutLang = "es" | "en"

type Localized = { es: string; en: string }
type LocalizedList = { es: string[]; en: string[] }

export type TeamMember = {
  name: string
  /** Ancla estable: la portada enlaza a /about#<anchor> desde antes. */
  anchor: string
  role: Localized
  bio: Localized
  image: string
  /** Encuadre del retrato; varias fotos están descentradas. */
  objectPosition: string
}

export const ABOUT_TEAM: TeamMember[] = [
  {
    name: "Jhoan Gomez",
    anchor: "jhoan-gomez",
    role: { es: "CEO y fundador", en: "CEO & Founder" },
    bio: {
      es: "Lidera la visión de Codifikai con foco en crecimiento, ejecución y soluciones digitales alineadas al negocio.",
      en: "Leads Codifikai's vision with a focus on growth, execution and digital solutions aligned with the business.",
    },
    image: "/images/team/jhoan-gomez.png",
    objectPosition: "center",
  },
  {
    name: "Jhon Ariza",
    anchor: "jhon-ariza",
    role: { es: "Cofundador y director de estrategia", en: "Co-Founder & Strategy Director" },
    bio: {
      es: "Impulsa la estrategia, la expansión comercial y la dirección de iniciativas con impacto real y sostenible.",
      en: "Drives strategy, commercial expansion and the direction of initiatives with real, sustainable impact.",
    },
    image: "/images/team/jhon-ariza.png",
    objectPosition: "top center",
  },
  {
    name: "Victor Giron",
    anchor: "victor-giron",
    role: { es: "Gerente de desarrollo de negocios", en: "Business Development Manager" },
    bio: {
      es: "Impulsa alianzas estratégicas y la expansión de Codifikai en mercados clave, alineando la relación con clientes y la visión de producto.",
      en: "Drives strategic alliances and Codifikai's expansion into key markets, aligning client relationships with product vision.",
    },
    image: "/images/team/victor-giron.png",
    objectPosition: "top center",
  },
  {
    name: "Fredy Velandia",
    anchor: "jairo-gomez",
    role: { es: "Líder de ventas", en: "Sales Lead" },
    bio: {
      es: "Lidera la gestión comercial, el seguimiento de oportunidades y el cierre de acuerdos con enfoque en crecimiento sostenible.",
      en: "Leads commercial management, opportunity follow-up and deal closing with a sustainable growth focus.",
    },
    image: "/images/team/jairo-gomez-sales.png",
    objectPosition: "center",
  },
]

export type AboutCopy = {
  breadcrumbHome: Localized
  breadcrumbAbout: Localized

  hero: {
    eyebrow: Localized
    headline: Localized
    headlineHighlight: LocalizedList
    lead: Localized
    ctaPrimary: Localized
    ctaSecondary: Localized
  }
  history: { label: Localized; title: Localized; highlight: LocalizedList; paragraphs: LocalizedList }
  vision: {
    label: Localized
    title: Localized
    highlight: LocalizedList
    lead: Localized
    pillars: { title: Localized; body: Localized }[]
  }
  team: { label: Localized; title: Localized; highlight: LocalizedList; lead: Localized }
  trust: {
    label: Localized
    title: Localized
    highlight: LocalizedList
    lead: Localized
    points: LocalizedList
  }
  tech: {
    label: Localized
    title: Localized
    highlight: LocalizedList
    paragraphs: LocalizedList
    chips: string[]
  }
  closing: {
    label: Localized
    title: Localized
    highlight: LocalizedList
    lead: Localized
    cta: Localized
  }
}

export const aboutCopy: AboutCopy = {
  breadcrumbHome: { es: "Inicio", en: "Home" },
  breadcrumbAbout: { es: "Sobre nosotros", en: "About us" },

  hero: {
    eyebrow: {
      es: "Agencia de inteligencia artificial y desarrollo a la medida en Colombia",
      en: "Artificial intelligence and custom development agency in Colombia",
    },
    headline: {
      es: "Una fábrica de inteligencia artificial aplicada.",
      en: "A factory of applied artificial intelligence.",
    },
    headlineHighlight: { es: ["inteligencia", "artificial"], en: ["artificial", "intelligence."] },
    lead: {
      es: "Las empresas necesitan algo más que tecnología: necesitan procesos que funcionen sin depender de una persona. Construimos agentes de inteligencia artificial y el software a la medida que los sostiene, conectando estrategia, producto y resultados.",
      en: "Companies need more than technology: they need processes that run without depending on one person. We build artificial intelligence agents and the custom software behind them, connecting strategy, product and results.",
    },
    ctaPrimary: { es: "Hablemos por WhatsApp", en: "Message us on WhatsApp" },
    ctaSecondary: { es: "Ver servicios", en: "See services" },
  },

  history: {
    label: { es: "Nuestra esencia", en: "Our essence" },
    title: { es: "Cómo empezó todo.", en: "How it all started." },
    highlight: { es: ["empezó"], en: ["started."] },
    paragraphs: {
      es: [
        "Todo comenzó con una idea clara: las personas y las empresas necesitan socios tecnológicos capaces de evolucionar al ritmo del mercado y convertir los retos en oportunidades reales.",
        "Así nació Codifikai, con la intención de crear software, automatizaciones y soluciones digitales que no solo resuelvan una necesidad puntual, sino que fortalezcan la visión de negocio de cada cliente.",
        "Nuestro enfoque combina estrategia, diseño y tecnología para construir experiencias modernas, funcionales y preparadas para escalar.",
      ],
      en: [
        "It all started with a clear idea: people and companies need technology partners able to evolve at the pace of the market and turn challenges into real opportunities.",
        "That's how Codifikai was born, meaning to create software, automations and digital solutions that don't just solve one specific need, but strengthen each client's business vision.",
        "Our approach combines strategy, design and technology to build modern, functional experiences ready to scale.",
      ],
    },
  },

  vision: {
    label: { es: "Nuestra visión", en: "Our vision" },
    title: {
      es: "Tecnología que va más allá de lo funcional.",
      en: "Technology that goes beyond the functional.",
    },
    highlight: { es: ["funcional."], en: ["functional."] },
    lead: {
      es: "Construimos soluciones con mentalidad de crecimiento, enfoque empresarial y una estética capaz de transmitir innovación, confianza y nivel profesional.",
      en: "We build solutions with a growth mindset, a business focus and an aesthetic that conveys innovation, trust and professional standing.",
    },
    pillars: [
      {
        title: { es: "Innovación estratégica", en: "Strategic innovation" },
        body: {
          es: "La tecnología se elige por el problema que resuelve, no por lo novedosa que suene.",
          en: "Technology is chosen for the problem it solves, not for how novel it sounds.",
        },
      },
      {
        title: { es: "Experiencias premium", en: "Premium experiences" },
        body: {
          es: "El acabado visual comunica el nivel de la empresa antes de que alguien lea una línea.",
          en: "Visual finish communicates a company's level before anyone reads a line.",
        },
      },
      {
        title: { es: "Soluciones escalables", en: "Scalable solutions" },
        body: {
          es: "Lo que construimos tiene que seguir funcionando cuando el negocio crezca, no romperse.",
          en: "What we build has to keep working as the business grows, not break.",
        },
      },
    ],
  },

  team: {
    label: { es: "Liderazgo fundador", en: "Founding leadership" },
    title: {
      es: "El liderazgo que convierte visión en resultados.",
      en: "The leadership that turns vision into results.",
    },
    highlight: { es: ["resultados."], en: ["results."] },
    lead: {
      es: "Un equipo pequeño y directo. Hablas con quien diseña, construye y responde por el proyecto.",
      en: "A small, direct team. You talk to the people who design, build and answer for the project.",
    },
  },

  trust: {
    label: { es: "Por qué elegirnos", en: "Why choose us" },
    title: { es: "Experiencia de confianza.", en: "Experience you can trust." },
    highlight: { es: ["confianza."], en: ["trust."] },
    lead: {
      es: "Más de una década de experiencia nos respalda. Hemos ayudado a empresas de todos los tamaños a transformar sus operaciones con inteligencia artificial.",
      en: "Over a decade of experience backs us. We've helped companies of every size transform their operations with artificial intelligence.",
    },
    points: {
      es: [
        "Hablas con quien construye, no con un intermediario",
        "El código y los accesos quedan a tu nombre",
        "Cada caso publicado tiene su sitio en vivo, abierto a inspección",
        "Trabajamos con empresas dentro y fuera de Colombia",
      ],
      en: [
        "You talk to the people who build, not to a middleman",
        "The code and the credentials end up in your name",
        "Every published case has a live site, open to inspection",
        "We work with companies inside and outside Colombia",
      ],
    },
  },

  tech: {
    label: { es: "Capacidad tecnológica", en: "Technical capability" },
    title: { es: "La tecnología se elige, no se hereda.", en: "Technology is chosen, not inherited." },
    highlight: { es: ["elige,"], en: ["chosen,"] },
    paragraphs: {
      es: [
        "Combinamos herramientas consolidadas del ecosistema digital con tecnologías modernas orientadas a rendimiento, seguridad y escalabilidad.",
        "Elegimos las tecnologías de cada proyecto según su contexto, la madurez técnica y los objetivos del negocio. Eso permite construir soluciones más sólidas, más mantenibles y mejor preparadas para crecer.",
      ],
      en: [
        "We combine proven tools from the digital ecosystem with modern technologies focused on performance, security and scalability.",
        "We choose each stack based on project context, technical maturity and business goals. That produces solutions that are sturdier, easier to maintain and better prepared to grow.",
      ],
    },
    chips: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "HubSpot",
      "Salesforce",
      "Zapier / Make",
      "WhatsApp API",
    ],
  },

  closing: {
    label: { es: "Cierre estratégico", en: "Next step" },
    title: {
      es: "Cuéntanos qué quieres construir.",
      en: "Tell us what you want to build.",
    },
    highlight: { es: ["construir."], en: ["build."] },
    lead: {
      es: "Un mensaje corto basta para saber si podemos ayudarte y por dónde empezaría el trabajo.",
      en: "A short message is enough to tell whether we can help and where the work would start.",
    },
    cta: { es: "Escríbenos por WhatsApp", en: "Message us on WhatsApp" },
  },
}
