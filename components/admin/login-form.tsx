"use client"

import { useActionState } from "react"
import { signInAction, type LoginState } from "@/lib/admin/auth-actions"

const initialState: LoginState = {}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInAction, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/80">Correo</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80">Contraseña</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
        />
      </div>

      {state.error && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 disabled:opacity-50"
      >
        {isPending ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  )
}
