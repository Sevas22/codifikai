import { CONTACT_EMAIL, PHONE_TEL_HREF } from "@/lib/contact"
import { getSiteUrl, siteName, socialProfileUrls } from "@/lib/site"

function scriptJsonLd(data: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Organization + WebSite para rich results y Knowledge Graph. */
export function JsonLdRoot() {
  const url = getSiteUrl()
  const logoUrl = `${url}/icon`

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url,
    logo: logoUrl,
    image: logoUrl,
    email: CONTACT_EMAIL,
    telephone: PHONE_TEL_HREF.replace(/^tel:/, ""),
    sameAs: [...socialProfileUrls],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: CONTACT_EMAIL,
        telephone: PHONE_TEL_HREF.replace(/^tel:/, ""),
        areaServed: ["CO", "LATAM"],
        availableLanguage: ["Spanish", "English"],
      },
    ],
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url,
    publisher: { "@type": "Organization", name: siteName, url },
    inLanguage: ["es-CO", "en"],
  }

  return (
    <>
      {scriptJsonLd(organization)}
      {scriptJsonLd(website)}
    </>
  )
}
