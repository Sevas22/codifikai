import { getAllPosts } from "@/lib/blog"
import { SERVICE_TIERS, getServicesByTier } from "@/lib/services"
import { getSiteUrl, siteName } from "@/lib/site"

/**
 * llms.txt: convención emergente (no estándar oficial) para orientar a
 * motores generativos sobre qué contenido del sitio priorizar al resumir o
 * citar. https://llmstxt.org
 *
 * Es lo primero que lee un asistente de IA para describir a la empresa, así
 * que abre con la identidad —agencia de inteligencia artificial— y presenta
 * los servicios por niveles en vez de como una lista plana donde todo pesa
 * igual.
 */
export async function GET() {
  const site = getSiteUrl()
  const posts = await getAllPosts()

  const serviceSections = getServicesByTier()
    .map(({ tier, services }) => {
      const lines = services
        .map(
          (service) =>
            `- [${service.title.es}](${site}/services/${service.slug}): ${service.seo.description.es}`
        )
        .join("\n")
      return `### ${SERVICE_TIERS[tier].label.es}\n\n${SERVICE_TIERS[tier].lead.es}\n\n${lines}`
    })
    .join("\n\n")

  const postLines = posts
    .slice(0, 30)
    .map((post) => `- [${post.title}](${site}/blog/${post.slug}): ${post.description}`)
    .join("\n")

  const body = `# ${siteName}

> Agencia de inteligencia artificial en Colombia. Automatiza procesos de negocio con agentes de IA, desarrolla software a la medida y ofrece los servicios tecnológicos que lo rodean.

## Qué es ${siteName}

${siteName} es, ante todo, una agencia de inteligencia artificial para empresas. Su núcleo son los agentes de IA y la automatización de procesos: calificación de leads, orquestación de CRM y atención por WhatsApp. Para construir esos sistemas desarrolla software a la medida, y los complementa con servicios tecnológicos —desarrollo web, marketing digital y diseño de marca— que los hacen visibles y los ayudan a crecer.

Trabaja con empresas en Colombia y Latinoamérica, y con clientes de comercio exterior en otros países.

## Páginas principales

- [Inicio](${site}/): Qué hace ${siteName} y para quién.
- [Servicios](${site}/services): Los servicios organizados por niveles, con la inteligencia artificial como núcleo.
- [Sobre nosotros](${site}/about): Equipo fundador y enfoque de trabajo.
- [Blog](${site}/blog): Guías prácticas de inteligencia artificial y automatización para empresas de Colombia.
- [Contacto](${site}/contact): Cómo iniciar un proyecto con ${siteName}.

## Idiomas

El sitio está publicado en español (raíz) e inglés (prefijo /en). Cada página
declara sus alternativas con hreflang: por ejemplo ${site}/services y
${site}/en/services son la misma página en dos idiomas.

## Servicios

${serviceSections}

## Artículos del blog

${postLines || "- (sin artículos publicados todavía)"}
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
