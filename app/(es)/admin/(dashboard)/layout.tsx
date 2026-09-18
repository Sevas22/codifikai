import Link from "next/link"
import { signOutAction } from "@/lib/admin/auth-actions"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Codifikai · Admin
            </span>
            <nav className="flex items-center gap-4 text-sm text-white/70">
              <Link href="/admin" className="transition-colors hover:text-white">
                Posts
              </Link>
              <Link href="/admin/topics" className="transition-colors hover:text-white">
                Temas
              </Link>
              <Link href="/admin/analytics" className="transition-colors hover:text-white">
                Analytics
              </Link>
            </nav>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  )
}
