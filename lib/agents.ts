/**
 * Catálogo de agentes de IA (/services/ai-agents).
 *
 * Fase 1: se cotizan por WhatsApp. Aquí no hay precios a propósito: el sitio
 * no publica cifras que nadie haya definido. Cuando existan precios y pago en
 * línea, se agregan como campo opcional del agente.
 *
 * Los textos de "qué hace" y "qué conecta" son un primer borrador: describen
 * la función de cada agente, no resultados garantizados. Hay que validarlos
 * con lo que cada agente hace en producción antes de darlos por definitivos.
 */

import type { Localized, LocalizedList } from "@/lib/services"

export type Agent = {
  id: string
  /** Nombre de marca: igual en español e inglés. */
  name: string
  tagline: Localized
  description: Localized
  /** Qué hace, en cuatro líneas concretas. */
  does: LocalizedList
  /** Con qué se conecta. */
  connects: LocalizedList
  image: string
  /** Color del agente, el de su mascota. */
  accent: string
}

export const AGENTS: Agent[] = [
  {
    id: "atencion",
    name: "AI Atención",
    tagline: {
      es: "Responde a tus clientes por chat, a la hora que escriban.",
      en: "Replies to your customers on chat, whenever they write.",
    },
    description: {
      es: "Contesta las preguntas que tu equipo repite todos los días —precios, horarios, ubicación, disponibilidad— con información real de tu negocio, y pasa a una persona lo que necesita criterio.",
      en: "Answers the questions your team repeats every day — prices, hours, location, availability — with real information from your business, and hands over to a person whatever needs judgement.",
    },
    does: {
      es: [
        "Responde preguntas frecuentes con los datos de tu negocio",
        "Entiende mensajes escritos con las palabras del cliente",
        "Recoge los datos del cliente y los registra",
        "Pasa la conversación a una persona, con resumen, cuando hace falta",
      ],
      en: [
        "Answers frequent questions using your business data",
        "Understands messages written in the customer's own words",
        "Collects customer details and records them",
        "Hands the conversation to a person, with a summary, when needed",
      ],
    },
    connects: {
      es: ["WhatsApp Business", "Redes sociales", "Tu CRM"],
      en: ["WhatsApp Business", "Social media", "Your CRM"],
    },
    image: "/images/agents/ai-atencion.webp",
    accent: "#8b5cf6",
  },
  {
    id: "ventas",
    name: "AI Ventas",
    tagline: {
      es: "Acompaña a cada interesado hasta que está listo para comprar.",
      en: "Guides every lead until they're ready to buy.",
    },
    description: {
      es: "Atiende a quien pregunta por tus productos o servicios, entiende qué necesita y le hace seguimiento. Tu equipo comercial entra cuando la persona está lista para hablar.",
      en: "Talks to anyone asking about your products or services, understands what they need and follows up. Your sales team steps in when the person is ready to talk.",
    },
    does: {
      es: [
        "Califica a cada interesado: qué necesita, para cuándo y con qué presupuesto aproximado",
        "Responde las dudas y objeciones más comunes",
        "Hace seguimiento a quien pidió información y no volvió a escribir",
        "Registra la oportunidad y avisa a tu equipo cuando está lista",
      ],
      en: [
        "Qualifies every lead: what they need, by when and a rough budget",
        "Answers the most common questions and objections",
        "Follows up with anyone who asked for information and went quiet",
        "Records the opportunity and alerts your team when it's ready",
      ],
    },
    connects: {
      es: ["WhatsApp Business", "Tu CRM", "Hojas de cálculo"],
      en: ["WhatsApp Business", "Your CRM", "Spreadsheets"],
    },
    image: "/images/agents/ai-ventas.webp",
    accent: "#38bdf8",
  },
  {
    id: "agenda",
    name: "AI Agenda",
    tagline: {
      es: "Agenda, confirma y recuerda citas sin coordinarlas a mano.",
      en: "Books, confirms and reminds appointments without manual coordination.",
    },
    description: {
      es: "Ofrece los horarios disponibles según tu calendario y deja la cita agendada desde el mismo chat. Confirma y recuerda para que nadie se olvide.",
      en: "Offers the available slots from your calendar and books the appointment right in the chat. It confirms and reminds so nobody forgets.",
    },
    does: {
      es: [
        "Muestra los horarios disponibles según tu calendario",
        "Agenda, reprograma y cancela citas por chat",
        "Envía confirmaciones y recordatorios",
        "Evita cruces y dobles reservas",
      ],
      en: [
        "Shows the available slots from your calendar",
        "Books, reschedules and cancels appointments by chat",
        "Sends confirmations and reminders",
        "Avoids clashes and double bookings",
      ],
    },
    connects: {
      es: ["Tu calendario", "WhatsApp Business", "Tu sistema de reservas"],
      en: ["Your calendar", "WhatsApp Business", "Your booking system"],
    },
    image: "/images/agents/ai-agenda.webp",
    accent: "#22d3ee",
  },
  {
    id: "cobranza",
    name: "AI Cobranza",
    tagline: {
      es: "Recuerda los pagos pendientes con un trato amable y ordenado.",
      en: "Reminds pending payments in a friendly, orderly way.",
    },
    description: {
      es: "Da seguimiento a las facturas por vencer y vencidas con mensajes claros y cordiales, y deja a tu equipo solo los casos que requieren una conversación.",
      en: "Follows up on invoices coming due and overdue with clear, courteous messages, leaving your team only the cases that need a conversation.",
    },
    does: {
      es: [
        "Envía recordatorios antes y después del vencimiento, en los horarios y con la frecuencia que configures",
        "Comparte los datos o el enlace de pago",
        "Registra las promesas de pago y las vuelve a recordar",
        "Pasa a una persona los casos que piden negociar",
      ],
      en: [
        "Sends reminders before and after the due date, at the times and frequency you set",
        "Shares the payment details or link",
        "Records payment promises and reminds again",
        "Hands cases that call for negotiation to a person",
      ],
    },
    connects: {
      es: ["WhatsApp Business", "Tu software de facturación o contabilidad", "Hojas de cálculo"],
      en: ["WhatsApp Business", "Your invoicing or accounting software", "Spreadsheets"],
    },
    image: "/images/agents/ai-cobranza.webp",
    accent: "#d9a400",
  },
  {
    id: "pedidos",
    name: "AI Pedidos",
    tagline: {
      es: "Dice en qué va cada pedido, sin que el cliente tenga que insistir.",
      en: "Tells customers where each order stands, without them having to ask twice.",
    },
    description: {
      es: "Responde «¿cómo va mi pedido?» con el estado real, avisa cada cambio y recibe pedidos por chat. Tu equipo se dedica a preparar y despachar, no a contestar el mismo mensaje.",
      en: "Answers \"where is my order?\" with the real status, notifies every change and takes orders by chat. Your team focuses on preparing and shipping, not on replying to the same message.",
    },
    does: {
      es: [
        "Informa el estado real de cada pedido",
        "Avisa los cambios: confirmado, en preparación, despachado y entregado",
        "Toma pedidos por chat y los registra",
        "Pasa a una persona los reclamos y las novedades",
      ],
      en: [
        "Reports the real status of each order",
        "Notifies changes: confirmed, being prepared, shipped and delivered",
        "Takes orders by chat and records them",
        "Hands complaints and incidents to a person",
      ],
    },
    connects: {
      es: ["WhatsApp Business", "Tu tienda en línea o sistema de pedidos", "Hojas de cálculo"],
      en: ["WhatsApp Business", "Your online store or order system", "Spreadsheets"],
    },
    image: "/images/agents/ai-pedidos.webp",
    accent: "#4f46e5",
  },
  {
    id: "inventarios",
    name: "AI Inventarios",
    tagline: {
      es: "Vigila tu stock y te avisa antes de que algo se agote.",
      en: "Watches your stock and warns you before something runs out.",
    },
    description: {
      es: "Lleva el control de las existencias, alerta cuando un producto baja del mínimo que defines y mantiene ordenados los movimientos, para que no vendas lo que no tienes ni te quedes sin lo que más sale.",
      en: "Keeps track of stock, alerts you when a product falls below the minimum you set and keeps movements in order, so you don't sell what you don't have or run out of what sells most.",
    },
    does: {
      es: [
        "Consulta las existencias disponibles al atender a un cliente",
        "Alerta cuando un producto baja del mínimo que defines",
        "Sugiere reposición según el movimiento reciente",
        "Registra entradas y salidas para que los conteos cuadren",
      ],
      en: [
        "Checks available stock when serving a customer",
        "Alerts you when a product falls below the minimum you set",
        "Suggests restocking based on recent movement",
        "Records stock in and out so the counts add up",
      ],
    },
    connects: {
      es: ["Tu sistema de inventario u hojas de cálculo", "WhatsApp Business", "Tu tienda en línea"],
      en: ["Your inventory system or spreadsheets", "WhatsApp Business", "Your online store"],
    },
    image: "/images/agents/ai-inventarios.webp",
    accent: "#2563eb",
  },
]
