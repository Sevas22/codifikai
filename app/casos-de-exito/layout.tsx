import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Casos de éxito",
  description:
    "Proyectos entregados por Codifikai: desarrollo web, e-commerce, salud digital, industria y comercio internacional. Portafolio de clientes y resultados.",
  keywords: [
    "portafolio desarrollo web",
    "casos éxito software",
    "proyectos tecnología Colombia",
  ],
  alternates: {
    canonical: "/casos-de-exito",
  },
  openGraph: {
    title: "Casos de éxito | Codifikai",
    description:
      "Proyectos reales: plataformas web, comercio y soluciones digitales para empresas en varios sectores.",
    url: "/casos-de-exito",
  },
}

export default function CasosDeExitoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
