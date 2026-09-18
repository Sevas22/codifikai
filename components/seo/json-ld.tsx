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
    // Identidad estable: las demás páginas referencian este @id en vez de
    // repetir la organización. Sin él, cada página declara una entidad
    // distinta y el buscador no las une en una sola ficha.
    "@id": `${url}#organization`,
    name: siteName,
    alternateName: "CodifikAI",
    url,
    logo: logoUrl,
    image: logoUrl,
    description:
      "Empresa de desarrollo de software e inteligencia artificial aplicada: sistemas de IA empresarial, automatización de procesos y plataformas web a medida.",
    slogan: "Enterprise AI Systems & Automation",
    knowsAbout: [
      "desarrollo de software a medida",
      "inteligencia artificial empresarial",
      "automatización de procesos",
      "desarrollo web",
      "SEO",
    ],
    email: CONTACT_EMAIL,
    telephone: PHONE_TEL_HREF.replace(/^tel:/, ""),
    // Solo el país: es el dato de ubicación que el sitio publica de verdad.
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
    },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
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
    "@id": `${url}#website`,
    name: siteName,
    url,
    publisher: { "@id": `${url}#organization` },
    inLanguage: ["es-CO", "en"],
  }

  return (
    <>
      {scriptJsonLd(organization)}
      {scriptJsonLd(website)}
    </>
  )
}
