"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AlertTriangle, ArrowRight, CheckCircle2, Mail, MessageCircle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/providers/language-provider"
import { CONTACT_EMAIL, MAILTO_CONTACT, WHATSAPP_URL } from "@/lib/contact"

const BUDGET_KEYS = [
  "contactPage.budget.small",
  "contactPage.budget.mid",
  "contactPage.budget.large",
  "contactPage.budget.enterprise",
  "contactPage.budget.undecided",
] as const

type Status = "idle" | "submitting" | "success" | "error"

/**
 * Formulario de contacto.
 *
 * El rediseño solo cambia la presentación: validación, honeypot, envío a
 * `/api/contact` y la salida de emergencia a WhatsApp o correo cuando el envío
 * falla se conservan tal cual estaban.
 */
export function ContactForm() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<Status>("idle")

  const schema = z.object({
    name: z.string().trim().min(1, t("contactPage.required")),
    email: z.string().trim().email(t("contactPage.emailInvalid")),
    company: z.string().trim().optional(),
    budget: z.string().optional(),
    message: z.string().trim().min(1, t("contactPage.required")),
    website: z.string().optional(),
  })

  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("request_failed")
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        className="ed-card flex h-full flex-col items-center justify-center p-10 text-center"
        // Se anuncia a lectores de pantalla: el formulario desaparece y sin
        // esto el cambio pasaría inadvertido.
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mb-5 h-12 w-12 text-ed-punch" aria-hidden />
        <h3 className="ed-display text-[1.75rem] text-ed-ink">
          {t("contactPage.successTitle")}
        </h3>
        <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-ed-ink-soft">
          {t("contactPage.successDesc")}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="ed-card p-6 sm:p-8">
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="ed-label">
              {t("contactPage.name")}
            </Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder={t("contactPage.namePlaceholder")}
              aria-invalid={!!errors.name}
              className="h-12 rounded-xl border-ed-rule-strong bg-ed-canvas text-ed-ink"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="ed-label">
              {t("contactPage.email")}
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("contactPage.emailPlaceholder")}
              aria-invalid={!!errors.email}
              className="h-12 rounded-xl border-ed-rule-strong bg-ed-canvas text-ed-ink"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company" className="ed-label">
              {t("contactPage.company")}
            </Label>
            <Input
              id="company"
              autoComplete="organization"
              placeholder={t("contactPage.companyPlaceholder")}
              className="h-12 rounded-xl border-ed-rule-strong bg-ed-canvas text-ed-ink"
              {...register("company")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="ed-label">
              {t("contactPage.budget")}
            </Label>
            <select
              id="budget"
              defaultValue=""
              className="h-12 w-full rounded-xl border border-ed-rule-strong bg-ed-canvas px-3 text-sm text-ed-ink outline-none transition-colors focus-visible:border-ed-accent focus-visible:ring-[3px] focus-visible:ring-ed-accent/30"
              {...register("budget")}
            >
              <option value="" disabled>
                {t("contactPage.budget.unset")}
              </option>
              {BUDGET_KEYS.map((key) => (
                <option key={key} value={t(key)}>
                  {t(key)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="ed-label">
            {t("contactPage.message")}
          </Label>
          <Textarea
            id="message"
            rows={5}
            placeholder={t("contactPage.messagePlaceholder")}
            aria-invalid={!!errors.message}
            className="rounded-xl border-ed-rule-strong bg-ed-canvas text-ed-ink"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        {/* Honeypot anti-spam: oculto a usuarios, los bots tienden a rellenarlo. */}
        <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden>
          <label htmlFor="website">No rellenar</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {status === "error" && (
          <div
            className="rounded-xl border border-destructive/30 bg-destructive/10 p-4"
            role="alert"
          >
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-destructive">
              <AlertTriangle className="h-4 w-4" aria-hidden />
              {t("contactPage.errorTitle")}
            </div>
            <p className="mb-3 text-sm text-ed-ink-soft">{t("contactPage.errorDesc")}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-ed-punch hover:underline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </a>
              <a
                href={MAILTO_CONTACT}
                className="inline-flex items-center gap-1.5 font-semibold text-ed-accent hover:underline"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="ed-punch-btn group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? t("contactPage.submitting") : t("contactPage.submit")}
          {status !== "submitting" && (
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          )}
        </button>
      </div>
    </form>
  )
}
