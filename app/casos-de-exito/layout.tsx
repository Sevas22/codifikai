import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "CodifikAI case studies: live enterprise platforms for global trade, logistics, marketplaces, and growth operations.",
  keywords: [
    "case studies",
    "enterprise software",
    "AI automation portfolio",
    "web platform delivery",
  ],
  alternates: {
    canonical: "/casos-de-exito",
  },
  openGraph: {
    title: "Case Studies | CodifikAI",
    description:
      "Real production platforms: web, commerce, and digital solutions for enterprise clients.",
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
