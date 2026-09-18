/**
 * Catálogo de servicios — fuente única.
 *
 * Lo consumen el panel desplegable de la navegación, el carrusel de la
 * portada, las subpáginas `/services/[slug]`, el sitemap y `llms.txt`, así que
 * añadir o reordenar un servicio aquí los actualiza todos a la vez.
 *
 * Procedencia del texto: las descripciones de desarrollo web, desarrollo a la
 * medida y marketing parten de las que el sitio ya publicaba en
 * `servicesPreview` (low code, software y SEO). Automatización con IA resume lo
 * que ya describe la portada. "Diseño de marca" es el único servicio nuevo.
 *
 * Regla heredada del commit 9f65cd3: nada de cifras, precios, plazos ni
 * testimonios inventados. El contenido describe el servicio, no promete
 * resultados que nadie pueda verificar.
 */

export type ServiceLang = "es" | "en"

type Localized = { es: string; en: string }
type LocalizedList = { es: string[]; en: string[] }
type ServiceFaq = { q: Localized; a: Localized }

/**
 * Nivel de posicionamiento del servicio.
 *
 * Codifikai es ante todo una agencia de inteligencia artificial. Los niveles
 * existen para que esa jerarquía no dependa de acordarse del orden a mano:
 * - "ai": el núcleo, lo que nos define y con lo que queremos que nos encuentren.
 * - "build": el desarrollo a la medida con el que se construye esa IA.
 * - "tech": servicios tecnológicos que la rodean y la hacen visible.
 */
export type ServiceTier = "ai" | "build" | "tech"

export type Service = {
  id: string
  tier: ServiceTier
  /** Segmento de URL: /services/<slug>. En inglés, como el resto de rutas. */
  slug: string
  /** Se muestra como "01", "02"… y define el orden. */
  order: number
  title: Localized
  /** Una línea para la tarjeta del menú. */
  short: Localized
  /** Párrafo para el carrusel de la portada. */
  body: Localized

  /* --- Solo subpágina --- */
  /** Etiqueta corta sobre el titular de la subpágina. */
  eyebrow: Localized
  /** Titular propio de la subpágina; puede diferir del nombre del servicio. */
  headline: Localized
  /** Palabras del titular que se pintan con el color de marca. */
  headlineHighlight: LocalizedList
  /** Entradilla de la subpágina. */
  lead: Localized
  /** Qué incluye el servicio. */
  includes: LocalizedList
  /** Para quién es: señales de que este servicio encaja. */
  forWho: LocalizedList
  /** Entregables concretos al cerrar. */
  deliverables: LocalizedList
  faqs: ServiceFaq[]
  seo: { title: Localized; description: Localized; keywords: LocalizedList }
}

export const SERVICES: Service[] = [
  {
    id: "ai-automation",
    tier: "ai",
    slug: "ai-automation",
    order: 1,
    title: { es: "Automatización con IA", en: "AI automation" },
    short: {
      es: "Que el trabajo repetitivo deje de ocupar a tu equipo.",
      en: "Take repetitive work off your team's hands.",
    },
    body: {
      es: "Agentes de IA, orquestación de CRM y workflows que califican leads, enrutan casos y manejan excepciones sin intervención manual.",
      en: "AI agents, CRM orchestration and workflows that qualify leads, route cases and handle exceptions without manual work.",
    },
    eyebrow: { es: "Automatización con IA", en: "AI automation" },
    headline: {
      es: "El trabajo repetitivo no necesita a tu mejor gente.",
      en: "Repetitive work doesn't need your best people.",
    },
    headlineHighlight: { es: ["repetitivo"], en: ["Repetitive"] },
    lead: {
      es: "Responder lo mismo cien veces, pasar datos de un sistema a otro, revisar si alguien contestó: es trabajo que consume horas y no requiere criterio. Eso es lo que automatizamos primero.",
      en: "Answering the same thing a hundred times, moving data between systems, checking whether anyone replied: work that eats hours and needs no judgement. That's what we automate first.",
    },
    includes: {
      es: [
        "Mapeo de los procesos que más horas consumen hoy",
        "Agentes de IA para calificar leads y responder consultas frecuentes",
        "Orquestación del CRM: creación, enrutamiento y seguimiento de casos",
        "Conexión con WhatsApp, correo y las herramientas que ya usas",
        "Manejo de excepciones: qué pasa cuando la automatización no sabe",
        "Panel para ver qué se automatizó y qué quedó pendiente",
      ],
      en: [
        "Mapping the processes that eat the most hours today",
        "AI agents to qualify leads and answer frequent questions",
        "CRM orchestration: case creation, routing and follow-up",
        "Connection to WhatsApp, email and the tools you already use",
        "Exception handling: what happens when automation doesn't know",
        "A dashboard showing what was automated and what is still pending",
      ],
    },
    forWho: {
      es: [
        "Tu equipo responde las mismas preguntas todos los días",
        "Los leads se enfrían porque nadie alcanza a contestar a tiempo",
        "Alguien copia datos de un sistema a otro a mano",
      ],
      en: [
        "Your team answers the same questions every day",
        "Leads go cold because nobody replies in time",
        "Someone copies data between systems by hand",
      ],
    },
    deliverables: {
      es: [
        "Workflows en producción, conectados a tus herramientas",
        "Reglas de escalamiento a una persona cuando hace falta",
        "Documentación de qué hace cada automatización y cómo apagarla",
      ],
      en: [
        "Live workflows wired into your tools",
        "Escalation rules to a human when needed",
        "Documentation of what each automation does and how to switch it off",
      ],
    },
    faqs: [
      {
        q: {
          es: "¿La IA va a responderle a mis clientes sin supervisión?",
          en: "Will the AI reply to my clients unsupervised?",
        },
        a: {
          es: "Solo hasta donde tú decidas. Se define qué puede resolver sola y en qué punto escala a una persona. El objetivo es quitar volumen repetitivo, no dejar conversaciones importantes sin criterio humano.",
          en: "Only as far as you decide. We define what it can resolve on its own and the point where it escalates to a person. The goal is to remove repetitive volume, not to leave important conversations without human judgement.",
        },
      },
      {
        q: {
          es: "¿Por dónde se empieza?",
          en: "Where does it start?",
        },
        a: {
          es: "Por mapear qué procesos consumen más horas hoy. De ahí sale el orden: primero lo que más tiempo libera con menos riesgo.",
          en: "By mapping which processes consume the most hours today. That sets the order: first what frees the most time with the least risk.",
        },
      },
      {
        q: {
          es: "¿Y si la automatización se equivoca?",
          en: "What if the automation gets it wrong?",
        },
        a: {
          es: "Parte del diseño es el manejo de excepciones: cuando el sistema no sabe, deriva a una persona en vez de improvisar. Y queda registro de cada caso para ajustar las reglas.",
          en: "Exception handling is part of the design: when the system doesn't know, it hands off to a person instead of improvising. Every case is logged so the rules can be tuned.",
        },
      },
    ],
    seo: {
      title: {
        es: "Automatización de procesos con inteligencia artificial | Codifikai",
        en: "Business process automation with AI | Codifikai",
      },
      description: {
        es: "Agentes de IA y workflows que califican leads, orquestan tu CRM y responden por WhatsApp. Automatiza el trabajo repetitivo sin perder el criterio humano.",
        en: "AI agents and workflows that qualify leads, orchestrate your CRM and reply over WhatsApp. Automate repetitive work without losing human judgement.",
      },
      keywords: {
        es: [
          "automatización con inteligencia artificial",
          "agentes de IA para empresas",
          "automatización de procesos",
          "IA para ventas",
          "automatización WhatsApp",
        ],
        en: [
          "AI automation",
          "AI agents for business",
          "process automation",
          "AI for sales",
          "WhatsApp automation",
        ],
      },
    },
  },

  {
    id: "custom-software",
    tier: "build",
    slug: "custom-software",
    order: 2,
    title: { es: "Desarrollo a la medida", en: "Custom software" },
    short: {
      es: "Sistemas hechos para tu operación real.",
      en: "Systems built around how you actually operate.",
    },
    body: {
      es: "Plataformas, sistemas y productos a medida con arquitectura sólida y enfoque escalable, alineados con los procesos reales de tu negocio.",
      en: "Bespoke platforms, systems and products with solid architecture and a scalable approach, aligned with how your business actually runs.",
    },
    eyebrow: { es: "Desarrollo a la medida", en: "Custom software" },
    headline: {
      es: "Cuando la herramienta genérica ya no alcanza.",
      en: "When the off-the-shelf tool stops being enough.",
    },
    headlineHighlight: { es: ["alcanza."], en: ["enough."] },
    lead: {
      es: "Llega un punto en que el equipo trabaja para la herramienta en vez de al revés: hojas de cálculo paralelas, datos que se copian a mano, procesos que solo una persona sabe hacer. Ahí empieza el software a medida.",
      en: "There's a point where the team works for the tool instead of the other way round: parallel spreadsheets, data copied by hand, processes only one person knows. That's where custom software starts.",
    },
    includes: {
      es: [
        "Mapeo del proceso real antes de escribir código",
        "Arquitectura pensada para crecer, no solo para arrancar",
        "Integración con el CRM, el ERP y las herramientas que ya usas",
        "Control de accesos y roles por tipo de usuario",
        "Migración de los datos que hoy viven en hojas de cálculo",
        "Documentación técnica para que otro equipo pueda continuar",
      ],
      en: [
        "Mapping the real process before writing any code",
        "Architecture built to grow, not just to launch",
        "Integration with the CRM, ERP and tools you already use",
        "Access control and roles per user type",
        "Migration of the data currently living in spreadsheets",
        "Technical documentation so another team could pick it up",
      ],
    },
    forWho: {
      es: [
        "Tu operación depende de hojas de cálculo que nadie más entiende",
        "Pagas varias herramientas que no se hablan entre sí",
        "Un proceso clave se detiene cuando falta una persona concreta",
      ],
      en: [
        "Your operation depends on spreadsheets nobody else understands",
        "You pay for several tools that don't talk to each other",
        "A key process stops when one specific person is away",
      ],
    },
    deliverables: {
      es: [
        "Sistema desplegado y conectado a tus herramientas actuales",
        "Documentación técnica y de uso",
        "Código fuente y accesos a la infraestructura",
      ],
      en: [
        "A deployed system wired into your current tools",
        "Technical and usage documentation",
        "Source code and infrastructure credentials",
      ],
    },
    faqs: [
      {
        q: {
          es: "¿Tenemos que dejar las herramientas que ya usamos?",
          en: "Do we have to drop the tools we already use?",
        },
        a: {
          es: "No. El punto de partida es tu stack actual. Nos integramos con tu CRM, tu mensajería y tus APIs, y construimos encima solo lo que falta.",
          en: "No. Your current stack is the starting point. We integrate with your CRM, your messaging and your APIs, and only build what's missing on top.",
        },
      },
      {
        q: {
          es: "¿Qué pasa con los datos que tenemos en Excel?",
          en: "What about the data we have in spreadsheets?",
        },
        a: {
          es: "Se migran. Parte del trabajo es limpiar y trasladar esa información al sistema nuevo, para que nadie tenga que mantener dos fuentes en paralelo.",
          en: "It gets migrated. Part of the work is cleaning and moving that information into the new system, so nobody has to maintain two sources in parallel.",
        },
      },
      {
        q: {
          es: "¿Qué pasa si mañana quieren cambiar de proveedor?",
          en: "What if we want to switch providers later?",
        },
        a: {
          es: "Entregamos código fuente, accesos y documentación técnica. Está pensado justamente para que otro equipo pueda continuar sin rehacerlo desde cero.",
          en: "We hand over source code, credentials and technical documentation — specifically so another team could continue without starting over.",
        },
      },
    ],
    seo: {
      title: {
        es: "Desarrollo de software a la medida para empresas | Codifikai",
        en: "Custom software development for companies | Codifikai",
      },
      description: {
        es: "Desarrollo de software a la medida: las plataformas sobre las que corre la inteligencia artificial de tu empresa, integradas con tu CRM. Código propio y documentación incluida.",
        en: "Custom software development: the platforms your company's artificial intelligence runs on, integrated with your CRM. Your own code and documentation included.",
      },
      keywords: {
        es: [
          "software a la medida",
          "desarrollo de software empresarial",
          "sistemas a medida Colombia",
          "integración CRM",
          "plataforma interna",
        ],
        en: [
          "custom software",
          "enterprise software development",
          "bespoke systems",
          "CRM integration",
          "internal platform",
        ],
      },
    },
  },

  {
    id: "web",
    tier: "tech",
    slug: "web-development",
    order: 3,
    title: { es: "Desarrollo web", en: "Web development" },
    short: {
      es: "Una web lista para vender, no solo para verse bien.",
      en: "A site built to sell, not just to look good.",
    },
    body: {
      es: "Sitios y aplicaciones web rápidas y bien estructuradas, para empresas que necesitan lanzar y optimizar con velocidad sin sacrificar la calidad visual.",
      en: "Fast, well-structured sites and web apps for companies that need to launch and optimise quickly without giving up visual quality.",
    },
    eyebrow: { es: "Desarrollo web", en: "Web development" },
    headline: {
      es: "Una web que trabaja para tu negocio.",
      en: "A website that works for your business.",
    },
    headlineHighlight: { es: ["trabaja"], en: ["works"] },
    lead: {
      es: "La mayoría de sitios corporativos son folletos caros: se ven bien y no producen nada. Construimos sitios rápidos, medibles y pensados desde el primer boceto para que el visitante haga algo.",
      en: "Most corporate sites are expensive brochures: they look fine and produce nothing. We build fast, measurable sites designed from the first sketch to get the visitor to act.",
    },
    includes: {
      es: [
        "Diseño a medida, sin plantillas recicladas",
        "Optimización de velocidad de carga y Core Web Vitals",
        "SEO técnico desde la base: metadatos, datos estructurados y sitemap",
        "Adaptación real a móvil, no solo un diseño encogido",
        "Formularios y canales de contacto conectados a donde tú los lees",
        "Panel para que edites contenido sin depender de nosotros",
      ],
      en: [
        "Custom design, no recycled templates",
        "Load-speed and Core Web Vitals optimisation",
        "Technical SEO from the ground up: metadata, structured data and sitemap",
        "Genuine mobile adaptation, not a shrunken desktop layout",
        "Forms and contact channels wired to where you actually read them",
        "An admin panel so you can edit content without depending on us",
      ],
    },
    forWho: {
      es: [
        "Tu sitio actual es lento o se ve desactualizado frente a la competencia",
        "Recibes visitas pero casi nadie te escribe",
        "Necesitas publicar contenido sin pedirle permiso a un proveedor",
      ],
      en: [
        "Your current site is slow or looks dated next to competitors",
        "You get visits but almost nobody writes to you",
        "You need to publish content without asking a vendor for permission",
      ],
    },
    deliverables: {
      es: [
        "Sitio en producción con dominio y certificado configurados",
        "Código fuente entregado, sin quedar atado a nosotros",
        "Guía breve para publicar y editar contenido",
      ],
      en: [
        "A live site with domain and certificate configured",
        "Source code handed over — you are not locked in",
        "A short guide for publishing and editing content",
      ],
    },
    faqs: [
      {
        q: {
          es: "¿Puedo editar la web yo mismo después?",
          en: "Can I edit the site myself afterwards?",
        },
        a: {
          es: "Sí. Entregamos un panel para publicar y editar contenido, y una guía breve para usarlo. No necesitas escribirnos para cambiar un texto o subir un artículo.",
          en: "Yes. We hand over an admin panel to publish and edit content, plus a short guide. You don't need to write to us to change a line of text or publish an article.",
        },
      },
      {
        q: {
          es: "¿Qué pasa con el sitio que ya tengo?",
          en: "What happens to the site I already have?",
        },
        a: {
          es: "Lo revisamos antes de decidir nada. A veces conviene rehacerlo y otras veces basta con corregir velocidad, estructura y SEO técnico sobre lo que ya existe. Te decimos cuál de los dos casos es el tuyo.",
          en: "We review it before deciding anything. Sometimes a rebuild is the right call; sometimes fixing speed, structure and technical SEO on what exists is enough. We tell you which case you're in.",
        },
      },
      {
        q: {
          es: "¿El código queda a mi nombre?",
          en: "Do I own the code?",
        },
        a: {
          es: "Sí. Te entregamos el código fuente y los accesos. Si mañana quieres seguir con otro equipo, puedes hacerlo sin pedirnos nada.",
          en: "Yes. You get the source code and the credentials. If you want to continue with another team tomorrow, you can, without asking us for anything.",
        },
      },
    ],
    seo: {
      title: {
        es: "Desarrollo web profesional para empresas | Codifikai",
        en: "Professional web development for companies | Codifikai",
      },
      description: {
        es: "Diseño y desarrollo de páginas web rápidas, optimizadas para SEO y pensadas para convertir visitas en clientes. Código propio, sin plantillas ni ataduras.",
        en: "Design and development of fast websites, optimised for SEO and built to turn visits into clients. Your own code, no templates and no lock-in.",
      },
      keywords: {
        es: [
          "desarrollo web",
          "diseño de páginas web",
          "desarrollo web Colombia",
          "página web para empresas",
          "web optimizada SEO",
        ],
        en: [
          "web development",
          "website design",
          "custom website",
          "business website",
          "SEO optimised website",
        ],
      },
    },
  },

  {
    id: "marketing",
    tier: "tech",
    slug: "digital-marketing",
    order: 4,
    title: { es: "Marketing digital", en: "Digital marketing" },
    short: {
      es: "Que te encuentren los que ya te están buscando.",
      en: "Get found by the people already looking.",
    },
    body: {
      es: "Estrategias de posicionamiento y visibilidad digital para atraer tráfico de calidad, fortalecer tu presencia online y generar oportunidades comerciales sostenibles.",
      en: "Search positioning and digital visibility strategies that bring in quality traffic, strengthen your presence and generate sustainable commercial opportunities.",
    },
    eyebrow: { es: "Marketing digital", en: "Digital marketing" },
    headline: {
      es: "Ya te están buscando. La pregunta es si te encuentran.",
      en: "They're already searching. The question is whether they find you.",
    },
    headlineHighlight: { es: ["encuentran."], en: ["find"] },
    lead: {
      es: "Hay gente escribiendo en Google exactamente lo que tú vendes. Si en esa búsqueda aparece tu competencia y no tú, el problema no es el producto: es la visibilidad.",
      en: "People are typing into Google exactly what you sell. If your competitor shows up in that search and you don't, the problem isn't the product — it's visibility.",
    },
    includes: {
      es: [
        "Investigación de las búsquedas que usa tu cliente real",
        "SEO técnico: velocidad, estructura, datos estructurados e indexación",
        "SEO local para que aparezcas en tu zona y en Google Maps",
        "Contenido orientado a las preguntas que la gente ya hace",
        "Optimización para buscadores con IA, que citan fuentes en vez de listar enlaces",
        "Medición con datos reales de Search Console y Analytics",
      ],
      en: [
        "Research into the searches your real client actually uses",
        "Technical SEO: speed, structure, structured data and indexing",
        "Local SEO so you appear in your area and on Google Maps",
        "Content aimed at the questions people are already asking",
        "Optimisation for AI search engines, which cite sources instead of listing links",
        "Measurement with real Search Console and Analytics data",
      ],
    },
    forWho: {
      es: [
        "Tu competencia aparece primero en búsquedas que deberías ganar",
        "Dependes de referidos y no llega nadie nuevo por internet",
        "Inviertes en anuncios pero paras la inversión y desaparece todo",
      ],
      en: [
        "Competitors rank first on searches you should be winning",
        "You depend on referrals and nobody new arrives online",
        "You spend on ads, but the moment you stop, everything disappears",
      ],
    },
    deliverables: {
      es: [
        "Correcciones de SEO técnico aplicadas sobre el sitio",
        "Plan de contenidos con las búsquedas priorizadas",
        "Tablero de posicionamiento con datos de Google",
      ],
      en: [
        "Technical SEO fixes applied to the site",
        "A content plan with prioritised searches",
        "A positioning dashboard fed by Google data",
      ],
    },
    faqs: [
      {
        q: {
          es: "¿En cuánto tiempo se ven resultados?",
          en: "How long until results show?",
        },
        a: {
          es: "El SEO no es inmediato y desconfía de quien te prometa una fecha exacta: depende de la competencia de tu sector y del estado actual del sitio. Lo que sí hacemos desde el principio es medir, para que veas el avance con datos y no con promesas.",
          en: "SEO isn't immediate, and be wary of anyone promising an exact date: it depends on your sector's competition and the current state of the site. What we do from day one is measure, so you see progress in data rather than promises.",
        },
      },
      {
        q: {
          es: "¿Esto reemplaza la pauta publicitaria?",
          en: "Does this replace paid ads?",
        },
        a: {
          es: "No, son cosas distintas. La pauta trae tráfico mientras pagas; el posicionamiento construye visibilidad que se queda. Lo sano suele ser combinar ambas, no elegir una.",
          en: "No, they're different things. Ads bring traffic while you pay; positioning builds visibility that stays. The healthy approach is usually to combine both rather than pick one.",
        },
      },
      {
        q: {
          es: "¿Qué es eso de optimizar para buscadores con IA?",
          en: "What does optimising for AI search engines mean?",
        },
        a: {
          es: "Cada vez más gente pregunta directamente a asistentes de IA en vez de revisar diez enlaces. Esos sistemas citan fuentes concretas, así que el contenido se estructura para poder ser citado: respuestas claras, datos verificables y marcado técnico que la máquina entienda.",
          en: "More people now ask AI assistants directly instead of scanning ten links. Those systems cite specific sources, so content is structured to be citable: clear answers, verifiable data and technical markup a machine can parse.",
        },
      },
    ],
    seo: {
      title: {
        es: "Marketing digital y posicionamiento SEO para empresas | Codifikai",
        en: "Digital marketing and SEO positioning for companies | Codifikai",
      },
      description: {
        es: "SEO técnico, SEO local y contenido orientado a lo que tu cliente busca. Medición con datos reales de Google, no con promesas de posiciones.",
        en: "Technical SEO, local SEO and content aimed at what your client searches for. Measured with real Google data, not promises of rankings.",
      },
      keywords: {
        es: [
          "marketing digital",
          "posicionamiento SEO",
          "agencia SEO Colombia",
          "SEO local",
          "visibilidad en Google",
        ],
        en: [
          "digital marketing",
          "SEO positioning",
          "SEO agency",
          "local SEO",
          "Google visibility",
        ],
      },
    },
  },

  {
    id: "branding",
    tier: "tech",
    slug: "brand-design",
    order: 5,
    title: { es: "Diseño de marca", en: "Brand design" },
    short: {
      es: "Que tu empresa se vea al nivel de lo que vende.",
      en: "Look the part of what you actually sell.",
    },
    body: {
      es: "Identidad visual coherente —logo, color, tipografía y aplicaciones— para que la marca sostenga el mismo nivel en cada punto de contacto.",
      en: "A coherent visual identity — logo, colour, type and applications — so the brand holds the same level at every touchpoint.",
    },
    eyebrow: { es: "Diseño de marca", en: "Brand design" },
    headline: {
      es: "Tu marca dice algo antes de que hables.",
      en: "Your brand says something before you speak.",
    },
    headlineHighlight: { es: ["antes"], en: ["before"] },
    lead: {
      es: "Un logo distinto en cada documento, colores que cambian según quién diseñe, una propuesta comercial que no se parece a tu web. Esa incoherencia cuesta credibilidad justo cuando más la necesitas.",
      en: "A different logo on every document, colours that shift depending on who designs them, a proposal that looks nothing like your website. That inconsistency costs credibility exactly when you need it most.",
    },
    includes: {
      es: [
        "Logo y sus versiones para cada uso y tamaño",
        "Paleta de color con criterios de contraste y accesibilidad",
        "Sistema tipográfico y jerarquías definidas",
        "Aplicaciones: papelería, presentaciones y perfiles sociales",
        "Manual de marca con reglas de uso y errores frecuentes",
        "Archivos editables y en los formatos que necesita cada canal",
      ],
      en: [
        "A logo with versions for every use and size",
        "A colour palette with contrast and accessibility criteria",
        "A type system with defined hierarchies",
        "Applications: stationery, presentations and social profiles",
        "A brand manual with usage rules and common mistakes",
        "Editable files in the formats each channel needs",
      ],
    },
    forWho: {
      es: [
        "Cada persona del equipo usa una versión distinta del logo",
        "Tu marca se ve más pequeña de lo que realmente es la empresa",
        "Vas a lanzar algo nuevo y no quieres improvisar la imagen",
      ],
      en: [
        "Everyone on the team uses a different version of the logo",
        "Your brand looks smaller than the company actually is",
        "You're launching something new and don't want to improvise the image",
      ],
    },
    deliverables: {
      es: [
        "Paquete de logo en todos los formatos y versiones",
        "Manual de marca en PDF",
        "Archivos fuente editables",
      ],
      en: [
        "A logo package in every format and version",
        "A brand manual as a PDF",
        "Editable source files",
      ],
    },
    faqs: [
      {
        q: {
          es: "¿Hay que cambiar el logo por completo?",
          en: "Do we have to change the logo completely?",
        },
        a: {
          es: "No necesariamente. A veces el logo funciona y lo que falta es el sistema alrededor: color, tipografía y reglas de uso. Se revisa antes de proponer un rediseño.",
          en: "Not necessarily. Sometimes the logo works and what's missing is the system around it: colour, type and usage rules. We review it before proposing a redesign.",
        },
      },
      {
        q: {
          es: "¿Recibimos los archivos editables?",
          en: "Do we get the editable files?",
        },
        a: {
          es: "Sí, los archivos fuente y las exportaciones en los formatos que pide cada canal. La marca es tuya, no queda dependiendo de nuestro computador.",
          en: "Yes — source files and exports in the formats each channel needs. The brand is yours; it doesn't stay locked on our machine.",
        },
      },
      {
        q: {
          es: "¿Sirve si ya tenemos la web hecha?",
          en: "Is it useful if the site is already built?",
        },
        a: {
          es: "Sí. De hecho es frecuente al revés: la identidad se define y después se aplica al sitio existente, a las presentaciones y a los perfiles, para que todo hable el mismo idioma.",
          en: "Yes. In fact it often runs the other way: the identity is defined and then applied to the existing site, decks and profiles so everything speaks the same language.",
        },
      },
    ],
    seo: {
      title: {
        es: "Diseño de marca e identidad visual para empresas | Codifikai",
        en: "Brand design and visual identity for companies | Codifikai",
      },
      description: {
        es: "Logo, paleta, tipografía y manual de marca para que tu empresa se vea coherente en cada punto de contacto. Archivos editables incluidos.",
        en: "Logo, palette, type and a brand manual so your company looks coherent at every touchpoint. Editable files included.",
      },
      keywords: {
        es: [
          "diseño de marca",
          "identidad visual",
          "branding para empresas",
          "manual de marca",
          "diseño de logo",
        ],
        en: [
          "brand design",
          "visual identity",
          "branding for companies",
          "brand manual",
          "logo design",
        ],
      },
    },
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug)
}

/** Los demás servicios, para el bloque de enlaces cruzados al final. */
export function getRelatedServices(slug: string): Service[] {
  return SERVICES.filter((service) => service.slug !== slug)
}

/**
 * Los tres niveles de posicionamiento, con su nombre visible y su promesa.
 *
 * Se muestran en el panel, en el índice de servicios y en cada subpágina: así
 * cualquier punto de entrada deja claro que la IA es el núcleo y el resto
 * existe para construirla y hacerla crecer.
 */
export const SERVICE_TIERS: Record<
  ServiceTier,
  { label: Localized; short: Localized; lead: Localized }
> = {
  ai: {
    label: { es: "Núcleo · Inteligencia artificial", en: "Core · Artificial intelligence" },
    short: { es: "Núcleo IA", en: "AI core" },
    lead: {
      es: "Lo que nos define. Agentes y automatizaciones que se hacen cargo del trabajo repetitivo de la operación.",
      en: "What defines us. AI agents and automations that take over the repetitive work in your operation.",
    },
  },
  build: {
    label: { es: "Desarrollo a la medida", en: "Custom development" },
    short: { es: "Desarrollo", en: "Development" },
    lead: {
      es: "El software con el que se construye esa inteligencia, hecho para tu operación real y no para una plantilla.",
      en: "The software that intelligence is built on, made for how you actually operate rather than a template.",
    },
  },
  tech: {
    label: { es: "Servicios tecnológicos", en: "Technology services" },
    short: { es: "Tecnología", en: "Technology" },
    lead: {
      es: "Lo que rodea al sistema y lo hace visible: presencia web, posicionamiento y marca.",
      en: "What surrounds the system and makes it visible: web presence, search positioning and brand.",
    },
  },
}

/** Servicios agrupados por nivel, en orden de posicionamiento. */
export function getServicesByTier(): { tier: ServiceTier; services: Service[] }[] {
  const order: ServiceTier[] = ["ai", "build", "tech"]
  return order.map((tier) => ({
    tier,
    services: SERVICES.filter((service) => service.tier === tier),
  }))
}

/** Texto de cabecera del panel de servicios de la navegación. */
export const SERVICES_MENU_INTRO = {
  label: { es: "Agencia de inteligencia artificial", en: "Artificial intelligence agency" },
  title: {
    es: "IA que opera tu negocio, y todo lo que la sostiene.",
    en: "AI that runs your business, and everything that holds it up.",
  },
  cta: { es: "Ver todos los servicios", en: "See all services" },
} as const

/** Etiquetas compartidas por las subpáginas de servicio. */
export const SERVICE_PAGE_LABELS = {
  breadcrumbHome: { es: "Inicio", en: "Home" },
  breadcrumbServices: { es: "Servicios", en: "Services" },
  includes: { es: "Qué incluye", en: "What's included" },
  forWho: { es: "Esto es para ti si…", en: "This is for you if…" },
  deliverables: { es: "Qué recibes al final", en: "What you get at the end" },
  faq: { es: "Preguntas frecuentes", en: "Frequent questions" },
  related: { es: "Otros servicios", en: "Other services" },
  ctaTitle: {
    es: "¿Te suena a lo que necesitas?",
    en: "Sound like what you need?",
  },
  ctaLead: {
    es: "Cuéntanos el caso por WhatsApp y te decimos si esto encaja, sin rodeos.",
    en: "Tell us the case over WhatsApp and we'll tell you straight whether this fits.",
  },
  ctaPrimary: { es: "Escríbenos por WhatsApp", en: "Message us on WhatsApp" },
  ctaSecondary: { es: "Ver todos los servicios", en: "See all services" },
} as const
