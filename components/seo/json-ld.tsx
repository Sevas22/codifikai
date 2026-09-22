import { CONTACT_EMAIL, PHONE_TEL_HREF } from "@/lib/contact"
import { SERVICE_TIERS, getServicesByTier } from "@/lib/services"
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
    // Es la frase con la que un buscador —o un asistente de IA— describe a la
    // empresa. Antes decía "empresa de desarrollo de software e IA": software
    // primero. Ahora la identidad va delante y el resto la acompaña.
    description:
      "Agencia de inteligencia artificial en Colombia. Automatiza procesos de negocio con agentes de IA, desarrolla software a la medida y ofrece los servicios tecnológicos que lo rodean: desarrollo web, marketing digital y diseño de marca.",
    slogan: "Agencia de inteligencia artificial para empresas",
    // Ordenado por peso: primero lo que nos define.
    knowsAbout: [
      "inteligencia artificial para empresas",
      "agentes de IA",
      "automatización de procesos con inteligencia artificial",
      "automatización de CRM",
      "desarrollo de software a la medida",
      "desarrollo web",
      "marketing digital y SEO",
      "diseño de marca",
    ],
    // El catálogo en tres niveles, en el mismo orden que el sitio: la IA como
    // núcleo y el resto como servicios que la construyen y la hacen crecer.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Codifikai",
      itemListElement: getServicesByTier().map(({ tier, services }) => ({
        "@type": "OfferCatalog",
        name: SERVICE_TIERS[tier].label.es,
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title.es,
            url: `${url}/services/${service.slug}`,
          },
        })),
      })),
    },
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
