/**
 * Catálogo de servicios — fuente única.
 *
 * Lo consumen el panel desplegable de la navegación y el carrusel de la
 * portada, así que añadir o reordenar un servicio aquí los actualiza a la vez.
 *
 * Procedencia del texto: las descripciones de desarrollo web, desarrollo a la
 * medida y marketing vienen de las que el sitio ya publicaba en
 * `servicesPreview` (low code, software y SEO), resumidas para caber en una
 * tarjeta. Automatización con IA resume lo que ya describe la portada.
 * "Diseño de marca" es el único servicio nuevo: el cliente confirmó que lo
 * ofrecen, pero su descripción está redactada de cero y conviene revisarla.
 */

export type Service = {
  id: string
  /** Se muestra como "01", "02"… y define el orden. */
  order: number
  title: { es: string; en: string }
  /** Una línea para la tarjeta del menú. */
  short: { es: string; en: string }
  /** Párrafo para el carrusel de la portada. */
  body: { es: string; en: string }
}

export const SERVICES: Service[] = [
  {
    id: "web",
    order: 1,
    title: { es: "Desarrollo web", en: "Web development" },
    short: {
      es: "Una web lista para vender, no solo para verse bien.",
      en: "A site built to sell, not just to look good.",
    },
    body: {
      es: "Sitios y aplicaciones web rápidas y bien estructuradas, para empresas que necesitan lanzar y optimizar con velocidad sin sacrificar la calidad visual.",
      en: "Fast, well-structured sites and web apps for companies that need to launch and optimise quickly without giving up visual quality.",
    },
  },
  {
    id: "custom-software",
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
  },
  {
    id: "ai-automation",
    order: 3,
    title: { es: "Automatización con IA", en: "AI automation" },
    short: {
      es: "Que el trabajo repetitivo deje de ocupar a tu equipo.",
      en: "Take repetitive work off your team's hands.",
    },
    body: {
      es: "Agentes de IA, orquestación de CRM y workflows que califican leads, enrutan casos y manejan excepciones sin intervención manual.",
      en: "AI agents, CRM orchestration and workflows that qualify leads, route cases and handle exceptions without manual work.",
    },
  },
  {
    id: "marketing",
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
  },
  {
    id: "branding",
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
  },
]

/** Texto de cabecera del panel de servicios de la navegación. */
export const SERVICES_MENU_INTRO = {
  label: { es: "Nuestros servicios", en: "Our services" },
  title: {
    es: "Soluciones digitales para crecer con estrategia.",
    en: "Digital solutions to grow with a strategy.",
  },
  cta: { es: "Ver todos los servicios", en: "See all services" },
} as const
