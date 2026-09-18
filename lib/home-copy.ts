/**
 * Copy del home rediseñado (ES/EN).
 *
 * Vive aparte del diccionario global de `language-provider` para que el
 * rediseño sea autocontenido y reversible: ninguna clave de aquí pisa a las
 * que usan el resto de páginas.
 *
 * Regla heredada del commit 9f65cd3: aquí no se inventan cifras ni
 * testimonios. Las métricas que aparecen son las que el sitio ya afirmaba,
 * y el conteo de proyectos se calcula desde `successCases`.
 */

export type HomeLang = "es" | "en"

type Metric = { value: string; label: string; note: string }
type Step = { title: string; body: string }
type Faq = { q: string; a: string }

export type HomeCopy = {
  hero: {
    kicker: string
    titleLead: string
    titleEmphasis: string
    titleTail: string
    lead: string
    ctaPrimary: string
    ctaSecondary: string
    scrollCue: string
    marquee: string[]
    /** Palabras del titular que se pintan con el color de marca. */
    highlight: string[]
  }
  ui: { carousel: string; previous: string; next: string }
  numbers: {
    label: string
    title: string
    lead: string
    metrics: Metric[]
    casesLabel: string
    casesNote: string
  }
  capabilities: { label: string; title: string; lead: string; cardCta: string }
  process: { label: string; title: string; lead: string; steps: Step[] }
  work: {
    label: string
    title: string
    lead: string
    viewCase: string
    allCases: string
    liveSite: string
  }
  stack: {
    label: string
    title: string
    lead: string
    integrationsLabel: string
    integrations: string[]
    industriesLabel: string
    industries: string[]
  }
  team: { label: string; title: string; lead: string; viewProfile: string }
  faq: { label: string; title: string; items: Faq[] }
  closing: {
    label: string
    title: string
    lead: string
    ctaPrimary: string
    ctaSecondary: string
    reassurance: string[]
  }
  /**
   * Palabras que se pintan con el color de marca en cada titular de sección.
   * Van aparte del texto para no partir las cadenas traducibles en trozos.
   */
  highlights: Record<
    "numbers" | "capabilities" | "process" | "work" | "stack" | "team" | "faq" | "closing",
    string[]
  >
  indexLabel: string
  sectionIndex: string[]
}

const es: HomeCopy = {
  hero: {
    kicker: "Sistemas de IA · Automatización · Workflows enterprise",
    titleLead: "Construimos los sistemas",
    titleEmphasis: "que operan",
    titleTail: "el negocio por ti.",
    lead: "Codifikai diseña sistemas de IA, infraestructura de automatización y workflows enterprise que reducen fricción operativa y aceleran el crecimiento.",
    ctaPrimary: "Hablemos por WhatsApp",
    ctaSecondary: "Ver el trabajo",
    scrollCue: "Desliza para explorar",
    marquee: [
      "Sistemas de IA",
      "Orquestación CRM",
      "Comercio global",
      "Logística",
      "Automatización",
      "B2B SaaS",
      "Workflows",
      "Integraciones",
    ],
    highlight: ["sistemas", "negocio"],
  },
  ui: {
    carousel: "Servicios, desliza o arrastra",
    previous: "Anterior",
    next: "Siguiente",
  },
  numbers: {
    label: "En cifras",
    title: "Lo que deja el trabajo.",
    lead: "Las mismas cifras que sostenemos en cada conversación comercial, sin adornos.",
    metrics: [
      { value: "150+", label: "Sistemas desplegados", note: "En producción, no en demo" },
      { value: "50+", label: "Equipos enterprise", note: "Operando sobre lo que construimos" },
      { value: "4.2x", label: "ROI promedio", note: "En proyectos de automatización" },
    ],
    casesLabel: "Casos publicados",
    casesNote: "Todos con sitio en vivo y verificable",
  },
  capabilities: {
    label: "Servicios",
    title: "Soluciones digitales para crecer con estrategia.",
    lead: "Cinco frentes que cubrimos de punta a punta: del sitio que vende a los sistemas que operan por dentro.",
    cardCta: "Hablar de esto",
  },
  process: {
    label: "Cómo lo hacemos",
    title: "De la estrategia a sistemas en producción.",
    lead: "Cuatro fases por las que pasa todo proyecto. Sin sorpresas en el medio.",
    steps: [
      {
        title: "Discovery y mapeo de sistemas",
        body: "Mapeamos operaciones, cuellos de botella y oportunidades de automatización.",
      },
      {
        title: "Arquitectura de workflows",
        body: "Diseñamos workflows inteligentes, flujos de datos y responsabilidades de agentes IA.",
      },
      {
        title: "Build e integración",
        body: "Desplegamos sistemas listos para producción conectados a CRM y herramientas.",
      },
      {
        title: "Escala y optimización",
        body: "Monitoreamos performance, conversión y ampliamos la cobertura de automatización.",
      },
    ],
  },
  work: {
    label: "El trabajo",
    title: "Sistemas que ya están en vivo.",
    lead: "Marketplaces, telemedicina, logística y comercio exterior. Cada uno con su sitio público, abierto a inspección.",
    viewCase: "Ver caso",
    allCases: "Ver todos los casos",
    liveSite: "Sitio en vivo",
  },
  stack: {
    label: "Sobre qué corre",
    title: "Se conecta con lo que ya usas.",
    lead: "No reemplazamos tu stack: lo orquestamos.",
    integrationsLabel: "Integraciones",
    integrations: ["HubSpot", "Salesforce", "Zapier / Make", "WhatsApp API", "APIs personalizadas"],
    industriesLabel: "Industrias",
    industries: ["Comercio global", "Logística", "B2B SaaS", "Servicios enterprise"],
  },
  team: {
    label: "El equipo",
    title: "Quién responde cuando escribes.",
    lead: "Un equipo pequeño y directo. Hablas con quien diseña y construye el sistema.",
    viewProfile: "Ver perfil",
  },
  faq: {
    label: "Antes de escribir",
    title: "Lo que suelen preguntarnos.",
    items: [
      {
        q: "¿Qué hace exactamente Codifikai?",
        a: "Diseñamos y desplegamos sistemas de IA e infraestructura de automatización para operaciones de empresa: calificación de leads, orquestación de CRM, flujos entre áreas y capas de decisión sobre los datos que ya generas.",
      },
      {
        q: "¿Trabajan con empresas fuera de Colombia?",
        a: "Sí. Buena parte de los casos publicados son de comercio exterior y trabajo remoto con equipos en otros países: marketplaces, exportación y trading internacional.",
      },
      {
        q: "¿Hay que cambiar las herramientas que ya usamos?",
        a: "No. El punto de partida es tu stack actual. Nos integramos con CRM, mensajería y APIs propias, y construimos la capa de automatización encima.",
      },
      {
        q: "¿Cómo arranca un proyecto?",
        a: "Con una llamada estratégica para mapear operaciones y cuellos de botella. De ahí sale la arquitectura de workflows y el alcance concreto antes de escribir una línea de código.",
      },
      {
        q: "¿Puedo ver el trabajo antes de decidir?",
        a: "Sí, y es lo que recomendamos. Todos los casos de la sección de trabajo tienen su sitio público en vivo: entra, navégalos y juzga por ti.",
      },
    ],
  },
  closing: {
    label: "Siguiente paso",
    title: "Cuéntanos qué se está rompiendo en tu operación.",
    lead: "Un mensaje corto basta para saber si hay algo que automatizar y cuánto valdría la pena.",
    ctaPrimary: "Escríbenos por WhatsApp",
    ctaSecondary: "Ver todas las formas de contacto",
    reassurance: ["Sin costo", "Sin compromiso", "Respuesta el mismo día hábil"],
  },
  highlights: {
    numbers: ["trabajo"],
    capabilities: ["estrategia"],
    process: ["producción"],
    work: ["vivo"],
    stack: ["conecta"],
    team: ["responde"],
    faq: ["preguntarnos"],
    closing: ["rompiendo"],
  },
  indexLabel: "En esta página",
  sectionIndex: [
    "Inicio",
    "Cifras",
    "Servicios",
    "Cómo lo hacemos",
    "El trabajo",
    "Stack",
    "Equipo",
    "Preguntas",
    "Contacto",
  ],
}

const en: HomeCopy = {
  hero: {
    kicker: "AI systems · Automation · Enterprise workflows",
    titleLead: "We build the systems",
    titleEmphasis: "that run",
    titleTail: "the business for you.",
    lead: "Codifikai designs AI systems, automation infrastructure and enterprise workflows that cut operational friction and accelerate growth.",
    ctaPrimary: "Message us on WhatsApp",
    ctaSecondary: "See the work",
    scrollCue: "Scroll to explore",
    marquee: [
      "AI systems",
      "CRM orchestration",
      "Global commerce",
      "Logistics",
      "Automation",
      "B2B SaaS",
      "Workflows",
      "Integrations",
    ],
    highlight: ["systems", "business"],
  },
  ui: {
    carousel: "Services, swipe or drag",
    previous: "Previous",
    next: "Next",
  },
  numbers: {
    label: "By the numbers",
    title: "What the work leaves behind.",
    lead: "The same figures we stand behind in every commercial conversation, with nothing dressed up.",
    metrics: [
      { value: "150+", label: "Systems deployed", note: "In production, not in demo" },
      { value: "50+", label: "Enterprise teams", note: "Running on what we built" },
      { value: "4.2x", label: "Average ROI", note: "Across automation projects" },
    ],
    casesLabel: "Published cases",
    casesNote: "Every one with a live, checkable site",
  },
  capabilities: {
    label: "Services",
    title: "Digital solutions to grow with a strategy.",
    lead: "Five fronts we cover end to end: from the site that sells to the systems running things underneath.",
    cardCta: "Talk about this",
  },
  process: {
    label: "How we work",
    title: "From strategy to systems in production.",
    lead: "Four phases every project runs through. No surprises in between.",
    steps: [
      {
        title: "Discovery and system mapping",
        body: "We map operations, bottlenecks and automation opportunities.",
      },
      {
        title: "Workflow architecture",
        body: "We design intelligent workflows, data flows and AI agent responsibilities.",
      },
      {
        title: "Build and integration",
        body: "We ship production-ready systems wired into your CRM and tools.",
      },
      {
        title: "Scale and optimisation",
        body: "We monitor performance and conversion, and widen automation coverage.",
      },
    ],
  },
  work: {
    label: "The work",
    title: "Systems already live.",
    lead: "Marketplaces, telehealth, logistics and cross-border trade, each with a public site that is open to inspection.",
    viewCase: "View case",
    allCases: "View all cases",
    liveSite: "Live site",
  },
  stack: {
    label: "What it runs on",
    title: "It plugs into what you already use.",
    lead: "We do not replace your stack. We orchestrate it.",
    integrationsLabel: "Integrations",
    integrations: ["HubSpot", "Salesforce", "Zapier / Make", "WhatsApp API", "Custom APIs"],
    industriesLabel: "Industries",
    industries: ["Global commerce", "Logistics", "B2B SaaS", "Enterprise services"],
  },
  team: {
    label: "The team",
    title: "Who answers when you write.",
    lead: "A small, direct team. You talk to the people who design and build the system.",
    viewProfile: "View profile",
  },
  faq: {
    label: "Before you write",
    title: "What people usually ask.",
    items: [
      {
        q: "What exactly does Codifikai do?",
        a: "We design and deploy AI systems and automation infrastructure for enterprise operations: lead qualification, CRM orchestration, cross-team flows and decision layers over the data you already generate.",
      },
      {
        q: "Do you work with companies outside Colombia?",
        a: "Yes. A good share of our published cases are cross-border trade projects, working remotely with teams in other countries: marketplaces, export and international trading.",
      },
      {
        q: "Do we have to replace the tools we already use?",
        a: "No. Your current stack is the starting point. We integrate with your CRM, messaging and custom APIs, and build the automation layer on top.",
      },
      {
        q: "How does a project start?",
        a: "With a strategy call to map operations and bottlenecks. That produces the workflow architecture and a concrete scope before a single line of code is written.",
      },
      {
        q: "Can I see the work before deciding?",
        a: "Yes, and we recommend it. Every case in the work section has a live public site: open them, click around and judge for yourself.",
      },
    ],
  },
  closing: {
    label: "Next step",
    title: "Tell us what is breaking in your operation.",
    lead: "A short message is enough to tell whether there is something worth automating, and what it would be worth.",
    ctaPrimary: "Message us on WhatsApp",
    ctaSecondary: "See all the ways to reach us",
    reassurance: ["No cost", "No commitment", "Same business-day reply"],
  },
  highlights: {
    numbers: ["work"],
    capabilities: ["strategy"],
    process: ["production"],
    work: ["live"],
    stack: ["plugs"],
    team: ["answers"],
    faq: ["ask"],
    closing: ["breaking"],
  },
  indexLabel: "On this page",
  sectionIndex: [
    "Top",
    "Numbers",
    "Services",
    "How we work",
    "The work",
    "Stack",
    "Team",
    "FAQ",
    "Contact",
  ],
}

export const homeCopy: Record<HomeLang, HomeCopy> = { es, en }

/** Ids de sección: alimentan el índice lateral y los anclajes del scroll. */
export const HOME_SECTION_IDS = [
  "top",
  "numbers",
  "capabilities",
  "process",
  "work",
  "stack",
  "team",
  "faq",
  "contact",
] as const

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number]
