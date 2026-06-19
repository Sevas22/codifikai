import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Company",
  description:
    "Meet CodifikAI: team, technology stack, and vision. Enterprise AI systems, automation, and software built for scalable operations.",
  keywords: [
    "AI company",
    "enterprise automation",
    "CodifikAI team",
    "software development",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Company | CodifikAI",
    description:
      "Team, technology stack, and values: digital solutions powered by artificial intelligence.",
    url: "/about",
  },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
