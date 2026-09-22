"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"

import { EdSection, Reveal, WordReveal } from "@/components/home/ed-primitives"
import { ParticleField } from "@/components/home/particle-field"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/components/providers/language-provider"
import type { BlogPostMeta } from "@/lib/blog"
import { WHATSAPP_URL } from "@/lib/contact"
import { BLOG_LOCALE, blogPostPath } from "@/lib/blog-paths"
import { cn } from "@/lib/utils"
import { useLocalePath } from "@/hooks/use-locale-path"

const LABELS = {
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbBlog: "Blog",
    eyebrow: "Blog de inteligencia artificial para empresas",
    headline: "Lo que aprendemos, en abierto.",
    highlight: ["abierto"],
    lead: "Guías prácticas de inteligencia artificial, automatización y presencia digital para empresas de Colombia. Sin humo y sin tecnicismos innecesarios.",
    featured: "Destacado",
    all: "Todos",
    read: "Leer artículo",
    inSpanish: "",
    empty: "Todavía no hay artículos publicados. Vuelve pronto.",
    ctaTitle: "¿Prefieres que lo veamos sobre tu caso?",
    cta: "Escríbenos por WhatsApp",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbBlog: "Blog",
    eyebrow: "Artificial intelligence blog for businesses",
    headline: "What we learn, in the open.",
    highlight: ["open."],
    lead: "Practical guides on artificial intelligence, automation and digital presence for companies in Colombia. No smoke, no needless jargon. Articles are written in Spanish.",
    featured: "Featured",
    all: "All",
    read: "Read article",
    inSpanish: "In Spanish",
    empty: "No articles published yet. Check back soon.",
    ctaTitle: "Rather look at your own case?",
    cta: "Message us on WhatsApp",
  },
} as const

function formatDate(date: string, language: "es" | "en") {
  return new Date(date).toLocaleDateString(language === "es" ? "es-CO" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function PostCard({
  post,
  language,
  readLabel,
  languageNote,
  featured = false,
}: {
  post: BlogPostMeta
  language: "es" | "en"
  readLabel: string
  languageNote: string
  featured?: boolean
}) {
  const foreign = language !== BLOG_LOCALE

  return (
    <Link
      href={blogPostPath(post.slug)}
      hrefLang={foreign ? BLOG_LOCALE : undefined}
      className={cn(
        "ed-card ed-card-lift group flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ed-accent",
        featured && "sm:col-span-2 sm:flex-row"
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-ed-canvas-sunken",
          featured ? "aspect-[16/10] sm:aspect-auto sm:w-[52%]" : "aspect-[16/10] w-full"
        )}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes={featured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          // Sin portada, un degradado de marca en vez de un hueco gris.
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklch,var(--brand-violet)_28%,transparent),transparent_70%)]"
            aria-hidden
          />
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-6", featured && "sm:p-9")}>
        <span className="flex flex-wrap items-center justify-between gap-2">
          <span className="ed-label inline-flex items-center gap-2 text-ed-accent">
            <MapPin className="h-3 w-3" aria-hidden />
            {post.city || post.department}
          </span>
          {foreign ? (
            <span className="ed-label rounded-full border border-ed-rule px-2.5 py-1 text-[0.5625rem]">
              {languageNote}
            </span>
          ) : null}
        </span>

        <h2
          lang={foreign ? BLOG_LOCALE : undefined}
          className={cn(
            "mt-4 font-semibold leading-snug tracking-tight text-ed-ink",
            featured ? "text-[1.375rem] sm:text-[1.75rem]" : "text-[1.0625rem]"
          )}
        >
          {post.title}
        </h2>

        <p
          lang={foreign ? BLOG_LOCALE : undefined}
          className={cn(
            "mt-3 flex-1 leading-relaxed text-ed-ink-soft",
            featured ? "text-[0.9375rem] line-clamp-4" : "text-[0.875rem] line-clamp-3"
          )}
        >
          {post.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-ed-rule pt-4">
          <time dateTime={post.date} className="ed-label">
            {formatDate(post.date, language)}
          </time>
          <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ed-ink transition-colors group-hover:text-ed-punch">
            {readLabel}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function BlogIndexView({ posts }: { posts: BlogPostMeta[] }) {
  const path = useLocalePath()
  const { language } = useLanguage()
  const labels = LABELS[language] ?? LABELS.es
  const [place, setPlace] = React.useState<string>("__all")

  // Filtro por ciudad o departamento: el blog es local y esa es la forma
  // natural de buscar en él.
  const places = React.useMemo(() => {
    const set = new Set<string>()
    posts.forEach((post) => set.add(post.city || post.department))
    return [...set].sort((a, b) => a.localeCompare(b, "es"))
  }, [posts])

  const visible = React.useMemo(
    () => (place === "__all" ? posts : posts.filter((p) => (p.city || p.department) === place)),
    [posts, place]
  )

  const [featured, ...rest] = visible

  return (
    <div className="ed-light-scope relative bg-ed-canvas text-ed-ink">
      <Navigation />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="ed-grain relative isolate overflow-hidden pt-36 pb-12 sm:pt-40">
        <div className="ed-columns pointer-events-none absolute inset-0 -z-20" aria-hidden />
        <div
          className="pointer-events-none absolute -z-20 right-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-violet)_18%,transparent),transparent_68%)] blur-3xl"
          aria-hidden
        />
        <ParticleField className="pointer-events-none absolute inset-0 -z-10" density={3} />

        <div className="relative mx-auto w-full max-w-[80rem] px-[var(--ed-gutter)]">
          <nav aria-label="breadcrumb">
            <ol className="ed-label flex flex-wrap items-center gap-2">
              <li>
                <Link href={path("/")} className="transition-colors hover:text-ed-accent">
                  {labels.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ed-ink">{labels.breadcrumbBlog}</li>
            </ol>
          </nav>

          <div className="mt-9 max-w-[46rem]">
            <h1 className="text-ed-ink">
              <span className="ed-label inline-flex items-center gap-3 rounded-full border border-ed-rule bg-ed-canvas-raised/80 px-4 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-ed-punch" aria-hidden />
                {labels.eyebrow}
              </span>
              <span className="ed-display mt-8 block text-[clamp(2.25rem,6vw,4.75rem)]">
              <WordReveal text={labels.headline} accentWords={[...labels.highlight]} />
              </span>
            </h1>

            <Reveal delay={0.15} y={18}>
              <p className="mt-7 max-w-[52ch] text-pretty text-base leading-relaxed text-ed-ink-soft sm:text-lg">
                {labels.lead}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Listado */}
      <EdSection id="posts" className="!pt-4">
        {places.length > 1 ? (
          <Reveal y={14} className="mb-10 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setPlace("__all")}
              aria-pressed={place === "__all"}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[0.8125rem] font-semibold tracking-tight transition-colors duration-300",
                place === "__all"
                  ? "border-ed-punch bg-ed-punch text-white"
                  : "border-ed-rule-strong text-ed-ink hover:border-ed-accent hover:text-ed-accent"
              )}
            >
              {labels.all}
            </button>
            {places.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPlace(item)}
                aria-pressed={place === item}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[0.8125rem] font-semibold tracking-tight transition-colors duration-300",
                  place === item
                    ? "border-ed-punch bg-ed-punch text-white"
                    : "border-ed-rule-strong text-ed-ink hover:border-ed-accent hover:text-ed-accent"
                )}
              >
                {item}
              </button>
            ))}
          </Reveal>
        ) : null}

        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured ? (
              <Reveal y={24} className="sm:col-span-2 lg:col-span-3">
                <PostCard
                  post={featured}
                  language={language}
                  readLabel={labels.read}
                  languageNote={labels.inSpanish}
                  featured
                />
              </Reveal>
            ) : null}
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08} y={22}>
                <PostCard
                  post={post}
                  language={language}
                  readLabel={labels.read}
                  languageNote={labels.inSpanish}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-[0.9375rem] text-ed-ink-soft">{labels.empty}</p>
        )}
      </EdSection>

      {/* --------------------------------------------------------------- Cierre */}
      <EdSection id="contact" tone="dark" className="ed-grain relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-magenta)_16%,transparent),transparent_65%)] blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-[44rem] text-center">
          <h2 className="ed-display text-[clamp(1.75rem,4vw,2.75rem)] text-ed-ink">
            {labels.ctaTitle}
          </h2>
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
    </div>
  )
}
