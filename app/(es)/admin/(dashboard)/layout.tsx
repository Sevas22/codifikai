import Link from "next/link"
import { BarChart3, FileText, Lightbulb, LogOut } from "lucide-react"

import { signOutAction } from "@/lib/admin/auth-actions"

const NAV = [
  { href: "/admin", label: "Contenido", icon: FileText },
  { href: "/admin/topics", label: "Temas", icon: Lightbulb },
  { href: "/admin/analytics", label: "Posicionamiento", icon: BarChart3 },
] as const

/**
 * Carcasa del panel.
 *
 * `admin-shell` define su propia paleta: sigue siendo oscuro —es una
 * herramienta de trabajo— pero con los colores de marca en vez del cian
 * suelto que tenía antes.
 */
export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell min-h-screen">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[--admin-bg]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/admin" className="admin-eyebrow !text-[--admin-accent]">
              Codifikai · Admin
            </Link>
            <nav className="flex items-center gap-1">
              {NAV.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-ghost"
            >
              Ver el sitio
            </Link>
            <form action={signOutAction}>
              <button type="submit" className="admin-btn-ghost">
                <LogOut className="h-3.5 w-3.5" aria-hidden />
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  )
}
