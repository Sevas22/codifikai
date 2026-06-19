import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Enterprise AI infrastructure: sales systems, workflow automation, AI operations, and scalable business systems built for modern teams.",
  keywords: [
    "enterprise AI",
    "intelligent automation",
    "AI sales systems",
    "custom software",
    "business automation",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Solutions | CodifikAI",
    description:
      "AI systems, automation, and enterprise workflows designed to accelerate business growth.",
    url: "/services",
  },
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children
}
