import { isSupabaseConfigured } from "@/lib/supabase/server"
import { listTopics } from "@/lib/admin/topics"
import { TopicsBoard } from "@/components/admin/topics-board"

export const dynamic = "force-dynamic"

export default async function AdminTopicsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <p className="rounded-md border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
        Falta configurar Supabase para activar el banco de temas.
      </p>
    )
  }

  const topics = await listTopics()

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Banco de temas</h1>
      <TopicsBoard topics={topics} />
    </div>
  )
}
