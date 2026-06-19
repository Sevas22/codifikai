import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "General terms of use for the CodifikAI website and services.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | CodifikAI",
    description: "Terms of use for the site and service engagement.",
    url: "/terms",
  },
}

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children
}
