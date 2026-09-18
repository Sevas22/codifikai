"use client"

import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import type { BlogPostMeta } from "@/lib/blog"
import { blogPostPath } from "@/lib/blog-paths"

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function BlogCard({ post, index = 0 }: { post: BlogPostMeta; index?: number }) {
  return (
    <FadeIn delay={Math.min(index, 6) * 0.05}>
      <Link
        href={blogPostPath(post.slug)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black transition-all duration-300 hover:border-accent/30 hover:-translate-y-1"
      >
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-gradient-to-br from-accent/15 via-black to-black">
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-accent/25" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-accent/90">
            <MapPin className="h-3.5 w-3.5" />
            {post.city || post.department}
          </div>
          <h2 className="mt-4 text-lg font-semibold leading-snug text-foreground md:text-xl">
            {post.title}
          </h2>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {post.description}
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
            <time dateTime={post.date} className="text-xs text-muted-foreground/80">
              {formatDate(post.date)}
            </time>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
              Leer artículo
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
  )
}
