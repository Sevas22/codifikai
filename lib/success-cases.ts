/** Imagen de marca en `/images/partners/` — mostrar con fondo blanco y `object-contain`. */
export function isLogoPosterPath(src: string) {
  return src.startsWith("/images/partners/")
}

export type CaseFilter =
  | "all"
  | "ai-systems"
  | "logistics"
  | "commerce"
  | "saas"
  | "automation"
  | "enterprise"
  | "marketplaces"

export type CaseMetric = {
  value: string
  labelEn: string
  labelEs: string
}

export type SuccessCase = {
  id: string
  title: string
  subtitle: string
  description: string
  descriptionEs: string
  problemEn: string
  problemEs: string
  url: string
  image: string
  category: string
  tags: string[]
  filters: Exclude<CaseFilter, "all">[]
  metrics: CaseMetric[]
  /** Bento: tarjeta protagonista en el grid */
  featured?: boolean
  embedSitePreview?: boolean
}

export const CASE_FILTERS: CaseFilter[] = [
  "all",
  "ai-systems",
  "logistics",
  "commerce",
  "saas",
  "automation",
  "enterprise",
  "marketplaces",
]

/** Misma lista que la página Casos de éxito (portfolio real). */
export const successCases: SuccessCase[] = [
  {
    id: "venextrading",
    title: "venextrading",
    subtitle: "Venezuelan Marketplace",
    description:
      "Marketplace connecting sellers and buyers with quality products. Sourcing, quality control, and logistics for international trade.",
    descriptionEs:
      "Marketplace que conecta vendedores y compradores con productos de calidad. Sourcing, control de calidad y logística para comercio internacional.",
    problemEn: "Fragmented vendor onboarding and low conversion on mobile.",
    problemEs: "Onboarding de vendedores fragmentado y baja conversión en móvil.",
    url: "https://www.venextrading.shop/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    category: "Marketplace",
    tags: ["Next.js", "React", "E-commerce", "UI/UX"],
    filters: ["marketplaces", "commerce", "enterprise"],
    metrics: [
      { value: "+42%", labelEn: "Lead conversion", labelEs: "Conversión de leads" },
      { value: "-38%", labelEn: "Response time", labelEs: "Tiempo de respuesta" },
      { value: "+68%", labelEn: "Operational speed", labelEs: "Velocidad operativa" },
    ],
    featured: true,
  },
  {
    id: "th-global",
    title: "TH Global",
    subtitle: "Telehealth · Teleradiology",
    description:
      "Teleradiology platform revolutionizing diagnostics with advanced technology. National and international tele radiology, cardiology, and nuclear medicine.",
    descriptionEs:
      "Plataforma de teleradiología que revoluciona los diagnósticos con tecnología avanzada. Presencia nacional e internacional.",
    problemEn: "Complex clinical workflows without a unified digital experience.",
    problemEs: "Flujos clínicos complejos sin una experiencia digital unificada.",
    url: "https://thglobal.com.co/",
    image: "/images/cases/thglobal.png",
    category: "Health · SaaS",
    tags: ["Next.js", "React", "TypeScript", "SEO"],
    filters: ["saas", "ai-systems", "enterprise"],
    metrics: [
      { value: "+55%", labelEn: "Platform efficiency", labelEs: "Eficiencia de plataforma" },
      { value: "99.9%", labelEn: "Uptime", labelEs: "Disponibilidad" },
      { value: "+34%", labelEn: "User engagement", labelEs: "Engagement de usuarios" },
    ],
    featured: true,
  },
  {
    id: "contraste",
    title: "Agencia Contraste",
    subtitle: "BTL Experiential · Brand Activations",
    description:
      "Corporate website for a marketing agency. Modern design with fluid animations and optimized user experience.",
    descriptionEs:
      "Sitio web corporativo para agencia de marketing. Diseño moderno con animaciones fluidas y UX optimizada.",
    problemEn: "Brand perception did not match the quality of their activations.",
    problemEs: "La percepción de marca no reflejaba la calidad de sus activaciones.",
    url: "https://www.contrasteagencia.com/",
    image: "/images/cases/contrasteagencia.png",
    category: "Brand Experience",
    tags: ["React", "Next.js", "Tailwind CSS", "Motion"],
    filters: ["saas", "enterprise"],
    metrics: [
      { value: "+48%", labelEn: "Inbound leads", labelEs: "Leads entrantes" },
      { value: "+62%", labelEn: "Session depth", labelEs: "Profundidad de sesión" },
      { value: "-29%", labelEn: "Bounce rate", labelEs: "Tasa de rebote" },
    ],
  },
  {
    id: "logysan",
    title: "Logysan",
    subtitle: "Integrated Logistics Solutions",
    description:
      "Web platform for logistics and transport. Full service management and direct client contact flows.",
    descriptionEs:
      "Plataforma web para logística y transporte. Gestión de servicios y contacto directo con clientes.",
    problemEn: "Manual quoting and disconnected service communication.",
    problemEs: "Cotizaciones manuales y comunicación de servicios desconectada.",
    url: "https://logysan.com.co/",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    category: "Logistics",
    tags: ["Next.js", "React", "TypeScript", "SEO"],
    filters: ["logistics", "automation", "enterprise"],
    metrics: [
      { value: "+71%", labelEn: "Process efficiency", labelEs: "Eficiencia de procesos" },
      { value: "-35%", labelEn: "Quote turnaround", labelEs: "Tiempo de cotización" },
      { value: "+40%", labelEn: "Qualified inquiries", labelEs: "Consultas calificadas" },
    ],
  },
  {
    id: "mercaderus",
    title: "Mercaderus Trading",
    subtitle: "Food Export Logistics",
    description:
      "Food export logistics platform for the US market. Connects suppliers, importers, and distributors.",
    descriptionEs:
      "Plataforma de logística y exportación de alimentos para el mercado estadounidense.",
    problemEn: "Low visibility across export programs and container coordination.",
    problemEs: "Baja visibilidad en programas de exportación y coordinación de contenedores.",
    url: "https://www.mercaderustrading.com/",
    image: "/images/cases/mercaderus.png",
    category: "Commerce · Logistics",
    tags: ["Next.js", "React", "TypeScript", "SEO"],
    filters: ["logistics", "commerce", "enterprise"],
    metrics: [
      { value: "+58%", labelEn: "Pipeline clarity", labelEs: "Claridad de pipeline" },
      { value: "+44%", labelEn: "Partner onboarding", labelEs: "Onboarding de partners" },
      { value: "-31%", labelEn: "Operational friction", labelEs: "Fricción operativa" },
    ],
  },
  {
    id: "jibal-americas",
    title: "Jibala Trading",
    subtitle: "Middle East Trade & Supply",
    description:
      "Trade firm focused on Gulf markets. Premium sourcing, FCL/LCL programs, and logistics for UAE, Saudi Arabia, and Qatar.",
    descriptionEs:
      "Empresa de comercio enfocada en mercados del Golfo. Sourcing premium y coordinación logística.",
    problemEn: "Global buyers lacked trust signals and structured service paths.",
    problemEs: "Compradores globales sin señales de confianza ni rutas de servicio claras.",
    url: "https://www.jibalamericastrading.com/",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    category: "Global Trade",
    tags: ["Next.js", "React", "Tailwind", "SEO"],
    filters: ["commerce", "enterprise"],
    metrics: [
      { value: "+52%", labelEn: "International inquiries", labelEs: "Consultas internacionales" },
      { value: "+37%", labelEn: "SEO visibility", labelEs: "Visibilidad SEO" },
      { value: "+45%", labelEn: "Time on site", labelEs: "Tiempo en sitio" },
    ],
  },
  {
    id: "mushe-trading",
    title: "MusheTrading",
    subtitle: "China-Focused Export & Sourcing",
    description:
      "Export and sourcing solutions for the Chinese market. Compliance-ready logistics for importers and platforms.",
    descriptionEs:
      "Soluciones de exportación y sourcing para el mercado chino con cumplimiento normativo.",
    problemEn: "Complex offer needed clearer positioning for B2B buyers.",
    problemEs: "Oferta compleja sin posicionamiento claro para compradores B2B.",
    url: "https://mushetrading.vercel.app/",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
    category: "Export · China",
    tags: ["Next.js", "React", "Vercel", "TypeScript"],
    filters: ["commerce", "enterprise", "automation"],
    metrics: [
      { value: "+46%", labelEn: "B2B lead quality", labelEs: "Calidad de leads B2B" },
      { value: "+39%", labelEn: "Content engagement", labelEs: "Engagement de contenido" },
      { value: "-27%", labelEn: "Sales cycle steps", labelEs: "Pasos del ciclo de venta" },
    ],
  },
  {
    id: "jin-global",
    title: "Jin Global Trading",
    subtitle: "Imports & Exports",
    description:
      "Strategic integrator for LATAM SMEs: imports, international trade, financing, and logistics to US, EU, Middle East, and Asia.",
    descriptionEs:
      "Integrador estratégico para pymes LATAM: importaciones, comercio internacional y logística.",
    problemEn: "Multi-market services were hard to scan for enterprise buyers.",
    problemEs: "Servicios multi-mercado difíciles de escanear para compradores enterprise.",
    url: "https://jinglobaltrading.com/",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80",
    category: "Global Trade",
    tags: ["Next.js", "React", "International Trade", "SEO"],
    filters: ["commerce", "enterprise"],
    metrics: [
      { value: "+63%", labelEn: "Enterprise inquiries", labelEs: "Consultas enterprise" },
      { value: "+41%", labelEn: "Service discovery", labelEs: "Descubrimiento de servicios" },
      { value: "+36%", labelEn: "Regional reach", labelEs: "Alcance regional" },
    ],
  },
  {
    id: "fibraca",
    title: "Fibraca",
    subtitle: "FRP Industrial Solutions",
    description:
      "Corporate site and store for FRP products: bars, mesh, profiles, grating, piping, and solar mounting.",
    descriptionEs:
      "Sitio corporativo y tienda para productos PRFV: barras, mallas, perfiles y montaje solar.",
    problemEn: "Technical catalog was difficult to navigate for distributors.",
    problemEs: "Catálogo técnico difícil de navegar para distribuidores.",
    url: "https://www.fibraca.com/",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    category: "Industrial · Commerce",
    tags: ["Next.js", "React", "E-commerce", "SEO"],
    filters: ["commerce", "enterprise"],
    metrics: [
      { value: "+49%", labelEn: "Product discovery", labelEs: "Descubrimiento de producto" },
      { value: "+33%", labelEn: "Quote requests", labelEs: "Solicitudes de cotización" },
      { value: "-22%", labelEn: "Support overhead", labelEs: "Carga de soporte" },
    ],
  },
  {
    id: "trader-marketer",
    title: "Trader Marketer",
    subtitle: "Export Trading Company",
    description:
      "Export trading platform connecting LATAM suppliers with international buyers across multiple industries.",
    descriptionEs:
      "Plataforma de export trading que conecta proveedores latinoamericanos con compradores internacionales.",
    problemEn: "Segmented offerings reduced clarity for global procurement teams.",
    problemEs: "Ofertas segmentadas reducían claridad para equipos de compras globales.",
    url: "https://www.tradermarketer.online/",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80",
    category: "B2B Trade",
    tags: ["Next.js", "React", "Trading", "SEO"],
    filters: ["commerce", "enterprise", "automation"],
    metrics: [
      { value: "+54%", labelEn: "Procurement engagement", labelEs: "Engagement de compras" },
      { value: "+47%", labelEn: "Cross-border leads", labelEs: "Leads cross-border" },
      { value: "+38%", labelEn: "Automation coverage", labelEs: "Cobertura de automatización" },
    ],
  },
]
