"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, CheckCircle2, AlertTriangle, MessageCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
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
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-accent/30 bg-background/60 p-10 text-center backdrop-blur-xl">
        <CheckCircle2 className="mb-5 h-12 w-12 text-accent" />
        <h3
          className="mb-3 text-2xl font-bold heading-brand-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("contactPage.successTitle")}
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t("contactPage.successDesc")}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-border/50 bg-background/60 p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{t("contactPage.name")}</Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder={t("contactPage.namePlaceholder")}
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("contactPage.email")}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("contactPage.emailPlaceholder")}
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">{t("contactPage.company")}</Label>
            <Input
              id="company"
              autoComplete="organization"
              placeholder={t("contactPage.companyPlaceholder")}
              {...register("company")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">{t("contactPage.budget")}</Label>
            <select
              id="budget"
              defaultValue=""
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
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
          <Label htmlFor="message">{t("contactPage.message")}</Label>
          <Textarea
            id="message"
            rows={5}
            placeholder={t("contactPage.messagePlaceholder")}
            aria-invalid={!!errors.message}
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
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-destructive">
              <AlertTriangle className="h-4 w-4" />
              {t("contactPage.errorTitle")}
            </div>
            <p className="mb-3 text-sm text-muted-foreground">{t("contactPage.errorDesc")}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={MAILTO_CONTACT}
                className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
              >
                <Mail className="h-4 w-4" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="cta"
          size="cta"
          disabled={status === "submitting"}
          className="group w-full"
        >
          {status === "submitting" ? t("contactPage.submitting") : t("contactPage.submit")}
          {status !== "submitting" && (
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </Button>
      </div>
    </form>
  )
}
