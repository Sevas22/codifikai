"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { useActionState } from "react"
import {
  savePostAction,
  publishPostAction,
  unpublishPostAction,
  deletePostAction,
  generateForEditorAction,
  improveCheckAction,
  type SaveState,
  type GenerateState,
  type ImproveCheckState,
} from "@/lib/admin/post-editor-actions"
import { uploadImageAction } from "@/lib/admin/image-actions"
import { scoreSeo } from "@/lib/seo-score"
import { scoreGeo } from "@/lib/geo-score"
import { slugify } from "@/lib/admin/slugify"
import { ScorePanel } from "@/components/admin/score-panel"
import { ImpactPanel } from "@/components/admin/impact-panel"
import type { AdminBlogPost } from "@/lib/admin/posts"
import type { BlogDepartment } from "@/lib/blog"

const initialSaveState: SaveState = {}
const initialGenerateState: GenerateState = {}
const initialImproveState: ImproveCheckState = {}

type Prefill = { topic: string; city: string; department: BlogDepartment; keyword: string }
type ContentMode = "ai" | "upload" | "manual"

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim()
}

async function uploadFile(file: File): Promise<{ url?: string; error?: string }> {
  const formData = new FormData()
  formData.set("file", file)
  return uploadImageAction({}, formData)
}

export function PostEditor({ post, prefill }: { post: AdminBlogPost | null; prefill?: Prefill }) {
  const [title, setTitle] = useState(post?.title ?? "")
  const [description, setDescription] = useState(post?.description ?? "")
  const [content, setContent] = useState(post?.content ?? "")
  const [city, setCity] = useState(post?.city ?? prefill?.city ?? "")
  const [department, setDepartment] = useState(post?.department ?? prefill?.department ?? "Cundinamarca")
  const [keyword, setKeyword] = useState(post?.keyword ?? prefill?.keyword ?? "")
  const [keywordsText, setKeywordsText] = useState((post?.keywords ?? []).join(", "))
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "")
  const [genTopic, setGenTopic] = useState(prefill?.topic ?? "")
  const [contentMode, setContentMode] = useState<ContentMode>("ai")
  const [uploadFileName, setUploadFileName] = useState("")
  const [pendingCheckId, setPendingCheckId] = useState<string>()

  const [coverUploadError, setCoverUploadError] = useState<string>()
  const [contentUploadError, setContentUploadError] = useState<string>()
  const [isCoverUploading, startCoverUpload] = useTransition()
  const [isContentUploading, startContentUpload] = useTransition()

  const [saveState, saveAction, isSaving] = useActionState(savePostAction, initialSaveState)
  const [generateState, generateAction, isGenerating] = useActionState(
    generateForEditorAction,
    initialGenerateState
  )
  const [improveState, improveAction, isImproving] = useActionState(
    improveCheckAction,
    initialImproveState
  )

  useEffect(() => {
    if (generateState.draft) {
      setTitle(generateState.draft.title)
      setDescription(generateState.draft.description)
      setContent(generateState.draft.content)
      setKeywordsText(generateState.draft.keywords.join(", "))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateState.draft])

  useEffect(() => {
    if (improveState.result) {
      setTitle(improveState.result.title)
      setDescription(improveState.result.description)
      setContent(improveState.result.content)
    }
    setPendingCheckId(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [improveState.result, improveState.error])

  const slug = post?.slug ?? slugify(title)

  const seoResult = useMemo(
    () => scoreSeo({ title, description, keyword, content, slug }),
    [title, description, keyword, content, slug]
  )
  const geoResult = useMemo(() => scoreGeo({ content, city }), [content, city])

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      const raw = String(reader.result ?? "")
      setContent(stripFrontmatter(raw))
      if (!title) {
        const guessedTitle = file.name.replace(/\.(md|mdx|txt)$/i, "").replace(/[-_]/g, " ")
        setTitle(guessedTitle)
      }
    }
    reader.readAsText(file)
  }

  function handleCoverImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    setCoverUploadError(undefined)
    startCoverUpload(async () => {
      const result = await uploadFile(file)
      if (result.url) setCoverImage(result.url)
      else setCoverUploadError(result.error ?? "No se pudo subir la imagen.")
    })
  }

  function handleContentImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    setContentUploadError(undefined)
    startContentUpload(async () => {
      const result = await uploadFile(file)
      if (result.url) {
        setContent((prev) => `${prev}${prev.endsWith("\n") ? "" : "\n"}\n![](${result.url})\n`)
      } else {
        setContentUploadError(result.error ?? "No se pudo subir la imagen.")
      }
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <form action={saveAction} className="space-y-4">
        <input type="hidden" name="id" value={post?.id ?? ""} />

        {post && (
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                post.status === "published"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {post.status === "published" ? "Publicado" : "Borrador"}
            </span>
            {post.status === "published" && post.publishedAt && (
              <span className="text-xs text-white/40">
                desde {new Date(post.publishedAt).toLocaleDateString("es-CO")}
              </span>
            )}
          </div>
        )}

        {!post && (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex gap-1 rounded-lg bg-black/40 p-1">
              {(
                [
                  { id: "ai", label: "Generar con IA" },
                  { id: "upload", label: "Subir archivo" },
                  { id: "manual", label: "Escribir manual" },
                ] as { id: ContentMode; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setContentMode(tab.id)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    contentMode === tab.id
                      ? "bg-cyan-400 text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {contentMode === "ai" && (
              <div className="mt-3">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={genTopic}
                    onChange={(e) => setGenTopic(e.target.value)}
                    name="genTopic"
                    placeholder="Tema del artículo"
                    className="flex-1 rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
                  />
                  <button
                    type="submit"
                    formAction={generateAction}
                    disabled={isGenerating}
                    className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-300 disabled:opacity-50"
                  >
                    {isGenerating ? "Generando…" : "Generar con IA"}
                  </button>
                </div>
                {generateState.error && (
                  <p className="mt-2 text-xs text-red-300">{generateState.error}</p>
                )}
                <p className="mt-2 text-[11px] text-white/40">
                  Completa ciudad, departamento y palabra clave abajo antes de generar; la IA los usa como contexto.
                </p>
              </div>
            )}

            {contentMode === "upload" && (
              <div className="mt-3">
                <input
                  type="file"
                  accept=".md,.mdx,.txt"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-white/60 file:mr-3 file:rounded-md file:border-0 file:bg-cyan-400 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-black hover:file:bg-cyan-300"
                />
                {uploadFileName && (
                  <p className="mt-2 text-[11px] text-white/40">
                    Cargado: {uploadFileName} — revisa el contenido abajo y completa título/descripción.
                  </p>
                )}
              </div>
            )}

            {contentMode === "manual" && (
              <p className="mt-3 text-xs text-white/50">
                Escribe o pega el artículo directamente en los campos de abajo.
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-white/80">Título</label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80">Meta descripción</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80">Ciudad/zona</label>
            <input
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80">Departamento</label>
            <select
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value as typeof department)}
              className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
            >
              <option value="Cundinamarca">Cundinamarca</option>
              <option value="Boyacá">Boyacá</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80">Palabra clave principal</label>
          <input
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80">
            Keywords secundarias (separadas por coma)
          </label>
          <input
            name="keywords"
            value={keywordsText}
            onChange={(e) => setKeywordsText(e.target.value)}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80">Imagen de portada</label>
          <div className="mt-1 flex gap-2">
            <input
              name="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="URL o sube un archivo →"
              className="flex-1 rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
            />
            <label className="flex shrink-0 cursor-pointer items-center rounded-md border border-white/15 px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/5">
              {isCoverUploading ? "Subiendo…" : "Subir imagen"}
              <input
                type="file"
                accept="image/*"
                disabled={isCoverUploading}
                onChange={handleCoverImagePick}
                className="hidden"
              />
            </label>
          </div>
          {coverUploadError && <p className="mt-1 text-xs text-red-300">{coverUploadError}</p>}
          {coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverImage}
              alt=""
              className="mt-2 h-24 w-40 rounded-md border border-white/10 object-cover"
            />
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-white/80">Contenido (Markdown)</label>
            <label className="cursor-pointer text-xs font-medium text-cyan-400 hover:underline">
              {isContentUploading ? "Subiendo imagen…" : "+ Insertar imagen"}
              <input
                type="file"
                accept="image/*"
                disabled={isContentUploading}
                onChange={handleContentImagePick}
                className="hidden"
              />
            </label>
          </div>
          {contentUploadError && <p className="mt-1 text-xs text-red-300">{contentUploadError}</p>}
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 font-mono text-xs leading-relaxed text-white outline-none focus:border-cyan-400/60"
          />
        </div>

        {saveState.error && (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {saveState.error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-50"
          >
            {isSaving ? "Guardando…" : "Guardar borrador"}
          </button>

          {post && (
            <>
              {post.status === "published" ? (
                <button
                  type="submit"
                  formAction={unpublishPostAction.bind(null, post.id)}
                  className="rounded-md border border-amber-400/30 px-4 py-2 text-sm font-medium text-amber-300 transition-colors hover:bg-amber-400/10"
                >
                  Pasar a borrador
                </button>
              ) : (
                <button
                  type="submit"
                  formAction={publishPostAction.bind(null, post.id)}
                  className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
                >
                  Publicar
                </button>
              )}
              <button
                type="submit"
                formAction={deletePostAction.bind(null, post.id)}
                className="ml-auto rounded-md border border-red-500/30 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      </form>

      <form action={improveAction} className="space-y-4">
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="description" value={description} />
        <input type="hidden" name="content" value={content} />
        <input type="hidden" name="keyword" value={keyword} />
        <input type="hidden" name="city" value={city} />

        <ImpactPanel
          seoScore={seoResult.score}
          geoScore={geoResult.score}
          seoChecks={seoResult.checks}
          geoChecks={geoResult.checks}
        />
        <ScorePanel
          title="SEO"
          score={seoResult.score}
          checks={seoResult.checks}
          area="SEO"
          improveAction={improveAction}
          isImproving={isImproving}
          pendingCheckId={pendingCheckId}
          onImproveClick={setPendingCheckId}
        />
        <ScorePanel
          title="GEO (IA)"
          score={geoResult.score}
          checks={geoResult.checks}
          area="GEO"
          improveAction={improveAction}
          isImproving={isImproving}
          pendingCheckId={pendingCheckId}
          onImproveClick={setPendingCheckId}
        />
        {improveState.error && (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {improveState.error}
          </p>
        )}
      </form>
    </div>
  )
}
