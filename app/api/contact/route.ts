import { NextResponse } from "next/server"
import { z } from "zod"

import { DEFAULT_CONTACT_EMAIL } from "@/lib/contact"

export const runtime = "nodejs"

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
  // Honeypot: debe llegar vacío. Si trae valor, es un bot.
  website: z.string().max(0).optional().or(z.literal("")),
})

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 422 })
  }

  const { website, name, email, company, budget, message } = parsed.data

  // Honeypot relleno → fingimos éxito para no dar pistas al bot.
  if (website) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const apiKey = process.env.RESEND_API_KEY
  // Sin `CONTACT_TO_EMAIL` configurada, los leads caen al correo del negocio
  // en vez de perderse: antes esta ruta devolvía 503 y el formulario no
  // entregaba a ninguna parte.
  const to =
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    DEFAULT_CONTACT_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || "Codifikai Web <onboarding@resend.dev>"

  // La clave de Resend no tiene respaldo posible: sin ella no hay forma de
  // enviar nada, y el formulario muestra su salida a WhatsApp y correo.
  if (!apiKey) {
    console.error(
      "[contact] Falta RESEND_API_KEY en el entorno: no se puede enviar el correo. " +
        `El destino configurado sería ${to}.`
    )
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }

  const rows: Array<[string, string]> = [
    ["Nombre", name],
    ["Correo", email],
    ["Empresa", company || "—"],
    ["Presupuesto", budget || "—"],
    ["Mensaje", message],
  ]

  const html = `<h2>Nuevo lead desde codifikai.com</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">${label}</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(
        value
      )}</td></tr>`
  )
  .join("\n")}
</table>`

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n")

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Nuevo lead: ${name}${company ? ` — ${company}` : ""}`,
        html,
        text,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error("[contact] Error de Resend:", res.status, detail)
      return NextResponse.json({ error: "send_failed" }, { status: 502 })
    }
  } catch (err) {
    console.error("[contact] Error de red enviando el correo:", err)
    return NextResponse.json({ error: "send_failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
