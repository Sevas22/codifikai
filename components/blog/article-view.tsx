"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Clock, MapPin } from "lucide-react"

import { EdSection, Reveal, SectionHeading } from "@/components/home/ed-primitives"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/components/providers/language-provider"
import type { TocEntry } from "@/lib/blog-toc"
import type { BlogPost, BlogPostMeta } from "@/lib/blog"
import { WHATSAPP_URL } from "@/lib/contact"
import { useLocalePath } from "@/hooks/use-locale-path"

const LABELS = {
  es: {
    back: "Volver al blog",
    onThisPage: "En este artículo",
    minutes: "min de lectura",
    related: "Sigue leyendo",
    ctaTitle: "¿Tu empresa está en esta situación?",
    ctaLead:
      "Si algo de lo que leíste te suena a tu operación, cuéntanoslo. Te decimos sin rodeos si hay algo que se pueda automatizar.",
    cta: "Escríbenos por WhatsApp",
    updated: "Actualizado",
  },
  en: {
    back: "Back to the blog",
    onThisPage: "In this article",
    minutes: "min read",
    related: "Keep reading",
    ctaTitle: "Is your company in this situation?",
    ctaLead:
      "If any of this sounds like your operation, tell us. We'll tell you straight whether there's something worth automating.",
    cta: "Message us on WhatsApp",
    updated: "Updated",
  },
} as const

function formatDate(date: string, language: "es" | "en") {
  return new Date(date).toLocaleDateString(language === "es" ? "es-CO" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * Barra de progreso de lectura.
 *
 * Se calcula sobre el alto del artículo, no sobre el del documento: con el
 * pie de página y los artículos relacionados debajo, medir el documento entero
 * hace que la barra nunca llegue al final del texto.
 */
function ReadingProgress({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const update = () => {
      const el = targetRef.current
      if (!el) return
      const start = el.offsetTop
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) {
        setProgress(window.scrollY > start ? 1 : 0)
        return
      }
      const ratio = (window.scrollY - start) / total
      setProgress(Math.min(1, Math.max(0, ratio)))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [targetRef])

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-ed-punch transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

/** Índice lateral con la sección activa resaltada. */
function ArticleToc({ toc, title }: { toc: TocEntry[]; title: string }) {
  const [active, setActive] = React.useState<string>(toc[0]?.id ?? "")

  React.useEffect(() => {
    const headings = toc
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit?.target.id) setActive(hit.target.id)
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    )
    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [toc])

  if (toc.length < 2) return null

  return (
    <nav aria-label={title} className="hidden lg:block">
      <div className="sticky top-32">
        <p className="ed-label border-b border-ed-rule pb-3">{title}</p>
        <ul className="mt-4 space-y-1">
          {toc.map((entry) => {
            const isActive = active === entry.id
            return (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "block border-l-2 py-1.5 text-[0.8125rem] leading-snug transition-colors duration-300",
                    entry.level === 3 ? "pl-7" : "pl-4",
                    isActive
                      ? "border-ed-accent text-ed-ink"
                      : "border-ed-rule text-ed-ink-faint hover:border-ed-ink-faint hover:text-ed-ink-soft",
                  ].join(" ")}
                >
                  {entry.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export function ArticleView({
  post,
  html,
  toc,
  readingMinutes,
  related,
}: {
  post: BlogPost
  html: string
  toc: TocEntry[]
  readingMinutes: number
  related: BlogPostMeta[]
}) {
  const { language } = useLanguage()
  const labels = LABELS[language] ?? LABELS.es
  const path = useLocalePath()
  const articleRef = React.useRef<HTMLElement>(null)
  // Solo se anuncia la actualización cuando de verdad difiere de la publicación.
  const wasUpdated = new Date(post.updatedAt) > new Date(post.date)

  return (
    <div className="ed-light-scope relative bg-ed-canvas text-ed-ink">
      <Navigation />
      <ReadingProgress targetRef={articleRef} />

      <article ref={articleRef}>
        {/* ------------------------------------------------------------ Cabecera */}
        <header className="ed-grain relative isolate overflow-hidden pt-36 pb-14 sm:pt-40">
          <div className="ed-columns pointer-events-none absolute inset-0 -z-20" aria-hidden />
          <div
            className="pointer-events-none absolute -z-20 left-[-8%] top-[-12%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-violet)_16%,transparent),transparent_68%)] blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)]">
            <div className="max-w-[46rem]">
            <Link
              href={path("/blog")}
              className="ed-label inline-flex items-center gap-2 transition-colors hover:text-ed-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              {labels.back}
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="ed-label inline-flex items-center gap-2 rounded-full border border-ed-rule bg-ed-canvas-raised px-3.5 py-1.5 text-ed-accent">
                <MapPin className="h-3 w-3" aria-hidden />
                {post.city || post.department}
              </span>
              <span className="ed-label inline-flex items-center gap-2">
                <Clock className="h-3 w-3" aria-hidden />
                {readingMinutes} {labels.minutes}
              </span>
            </div>

            <h1 className="ed-display mt-7 text-[clamp(2rem,5vw,3.5rem)] text-ed-ink">
              {post.title}
            </h1>

            <p className="mt-6 text-pretty text-[1.0625rem] leading-relaxed text-ed-ink-soft sm:text-lg">
              {post.description}
            </p>

            <div className="ed-label mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ed-rule pt-6">
              <span className="text-ed-ink">{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date, language)}</time>
              {wasUpdated ? (
                <>
                  <span aria-hidden>·</span>
                  <time dateTime={post.updatedAt}>
                    {labels.updated} {formatDate(post.updatedAt, language)}
                  </time>
                </>
              ) : null}
            </div>
            </div>
          </div>
        </header>

        {/* -------------------------------------------------------------- Portada */}
        {post.coverImage ? (
          <div className="mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-ed border border-ed-rule bg-ed-canvas-raised">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        ) : null}

        {/* --------------------------------------------------------------- Cuerpo */}
        <div className="mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)] py-16 sm:py-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-20">
            <div
              className="blog-prose max-w-[46rem]"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <ArticleToc toc={toc} title={labels.onThisPage} />
          </div>
        </div>
      </article>

      {/* --------------------------------------------------------------- Cierre */}
      <EdSection id="article-cta" tone="dark" className="ed-grain relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_16%,transparent),transparent_65%)] blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-[44rem] text-center">
          <h2 className="ed-display text-[clamp(1.75rem,4vw,2.75rem)] text-ed-ink">
            {labels.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-pretty text-[0.9375rem] leading-relaxed text-ed-ink-soft sm:text-base">
            {labels.ctaLead}
          </p>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ed-punch-btn group mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold tracking-tight"
          >
            {labels.cta}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </EdSection>

      {/* -------------------------------------------------------- Relacionados */}
      {related.length > 0 ? (
        <EdSection id="related" className="ed-columns">
          <SectionHeading index={1} label={labels.related} title={labels.related} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08} y={20}>
                <Link
                  href={path(`/blog/${item.slug}`)}
                  className="ed-card ed-card-lift group flex h-full flex-col p-6"
                >
                  <span className="ed-label inline-flex items-center gap-2 text-ed-accent">
                    <MapPin className="h-3 w-3" aria-hidden />
                    {item.city || item.department}
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-semibold leading-snug tracking-tight text-ed-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[0.875rem] leading-relaxed text-ed-ink-soft">
                    {item.description}
                  </p>
                  <ArrowUpRight
                    className="mt-auto h-4 w-4 translate-y-2 pt-0 text-ed-ink-faint opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-ed-punch group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </EdSection>
      ) : null}
    </div>
  )
}
