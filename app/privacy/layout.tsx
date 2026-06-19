import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CodifikAI processes personal data: purposes, legal bases, data subject rights, and contact information.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | CodifikAI",
    description: "Personal data processing, legal bases, and data subject rights.",
    url: "/privacy",
  },
}

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children
}
