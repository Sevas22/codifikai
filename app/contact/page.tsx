import { ContactView } from "@/components/contact/contact-view"
import { Footer } from "@/components/sections/footer"
import { CONTACT_EMAIL, PHONE_DISPLAY } from "@/lib/contact"
import { getSiteUrl, siteName } from "@/lib/site"

/**
 * Contacto — rediseño 2026.
 *
 * El formulario conserva su lógica (validación, honeypot, envío a
 * `/api/contact` y salida a WhatsApp si falla); solo cambia la presentación.
 */
function ContactJsonLd() {
  const site = getSiteUrl()
  const url = `${site}/contact`

  const graph = [
    {
      "@type": "ContactPage",
      "@id": `${url}#page`,
      url,
      name: `Contacto | ${siteName}`,
    },
    {
      // Los datos de contacto en schema permiten que un buscador —o un
      // asistente de IA— responda "¿cómo contacto a Codifikai?" con el dato.
      "@type": "Organization",
      "@id": `${site}#organization`,
      name: siteName,
      url: site,
      email: CONTACT_EMAIL,
      telephone: PHONE_DISPLAY,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
          telephone: PHONE_DISPLAY,
          availableLanguage: ["es", "en"],
          areaServed: ["CO", "LATAM"],
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site },
        { "@type": "ListItem", position: 2, name: "Contacto", item: url },
      ],
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  )
}

export default function ContactPage() {
  return (
    <>
      <ContactJsonLd />
      <main className="relative min-h-screen overflow-x-hidden">
        <ContactView />
        {/* Fuera de ed-light-scope: el footer tiene colores oscuros fijos. */}
        <Footer />
      </main>
    </>
  )
}
