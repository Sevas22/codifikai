/**
 * Enlace único de contacto por WhatsApp, con mensaje previo ya redactado.
 *
 * Es la fuente única: todos los cierres de negocio del sitio (botón flotante,
 * navegación, CTAs de sección, footer) importan esta constante, así que
 * cambiar el número o el mensaje aquí los actualiza todos.
 */
export const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=573124162175&text=!Buen%20dia%20estoy%20interesado%20en%20tener%20mas%20informacion%20de%20sus%20servicios!" as const

/**
 * Correo público de contacto. Por defecto usa el de dominio si está configurado
 * en `NEXT_PUBLIC_CONTACT_EMAIL`; si no, cae al correo actual para no romper nada.
 * Para proyectar marca enterprise, define un correo de dominio (ej. hola@codifikai.com).
 */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "codifikai@gmail.com"

export const MAILTO_CONTACT = `mailto:${CONTACT_EMAIL}`

/** Texto legible para mostrar el teléfono en la UI */
export const PHONE_DISPLAY = "+57 312 416 2175" as const

/** URI para enlaces tel: (E.164) */
export const PHONE_TEL_HREF = "tel:+573124162175" as const

/**
 * URL del calendario para agendar reunión (Cal.com o Calendly).
 * Configúrala en `NEXT_PUBLIC_BOOKING_URL`. Si está vacía, la página de contacto
 * muestra una alternativa por WhatsApp/correo en lugar del calendario embebido.
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || ""
