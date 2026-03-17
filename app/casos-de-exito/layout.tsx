import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Casos de Éxito | Codifikai",
  description:
    "Proyectos entregados por Codifikai: Mercaderus Trading, venextrading, Jibala Trading, MusheTrading, Agencia Contraste, TH Global, Logysan. Desarrollo web, e-commerce, salud digital y logística.",
}

export default function CasosDeExitoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
