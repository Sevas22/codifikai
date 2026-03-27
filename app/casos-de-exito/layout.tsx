import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Casos de Éxito | Codifikai",
  description:
    "Proyectos entregados por Codifikai: Fibraca, Trader Marketer, Mercaderus Trading, venextrading, Jibala Trading, MusheTrading, Agencia Contraste, TH Global, Logysan, Jin Global Trading. Desarrollo web, e-commerce, salud digital, industria y comercio internacional.",
}

export default function CasosDeExitoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
