import { LoginForm } from "@/components/admin/login-form"
import { isSupabaseConfigured } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default function AdminLoginPage() {
  const configured = isSupabaseConfigured()

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Codifikai
        </p>
        <h1 className="mt-2 text-xl font-semibold">Panel de contenido</h1>

        {configured ? (
          <div className="mt-6">
            <LoginForm />
          </div>
        ) : (
          <p className="mt-6 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
            Falta configurar Supabase (NEXT_PUBLIC_SUPABASE_URL y
            NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local) antes de poder
            iniciar sesión.
          </p>
        )}
      </div>
    </main>
  )
}
