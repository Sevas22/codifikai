---
title: "Datos estructurados para empresas: qué marcar y validar"
description: "Qué son los datos estructurados de schema.org, qué tipos marcar en el sitio de una empresa, ejemplos en JSON-LD y cómo validarlos para SEO y GEO."
date: "2026-10-21"
department: "Colombia"
city: "Colombia"
pillar: "seo-geo"
keywords:
  - "datos estructurados para empresas"
  - "schema.org JSON-LD"
  - "schema Organization"
  - "marcado schema SEO"
  - "datos estructurados GEO"
author: "Equipo Codifikai"
draft: true
---

Los **datos estructurados** son un bloque de código, normalmente en formato JSON-LD, que describe tu página con el vocabulario de schema.org: quién es la empresa, qué servicio ofrece, quién escribió un artículo. No cambian lo que ve la persona, pero le dan a buscadores y asistentes de IA una descripción sin ambigüedades. Funcionan cuando coinciden con lo que está visible en la página, y no sustituyen un buen contenido.

## El problema: una máquina lee tu web sin contexto

Una persona entiende en segundos que "Calle 10 #5-20, Facatativá" es una dirección y que "Lun-Vie 8 a 5" es un horario. Para una máquina es texto. Puede deducirlo, pero puede equivocarse, sobre todo si tu empresa aparece escrita de tres maneras distintas en tres sitios.

Los datos estructurados reducen esa ambigüedad. Dicen explícitamente: esto es el nombre de la organización, esto es su sitio oficial, estas son sus redes. Es una parte del trabajo de [SEO, GEO y AEO](/blog/seo-geo-aeo-que-son-y-como-se-complementan), la que ayuda a que tu **identidad** sea clara.

## ¿Para qué sirven y para qué no?

Sirven para:

- **Dejar clara la identidad de tu empresa** y sus servicios.
- **Habilitar resultados enriquecidos** de Google en los tipos que aún los soportan, como artículos, productos o rutas de navegación.
- **Reducir malentendidos** entre tu web y otras fuentes.

No sirven para:

- **Garantizar apariciones.** Según la [documentación de Google sobre funciones de IA](https://developers.google.com/search/docs/appearance/ai-features), no hay un marcado especial para aparecer en AI Overviews ni en el Modo IA.
- **Compensar contenido pobre.** El marcado describe la página; no la mejora.
- **Mostrar información que la página no muestra.** Google pide que los datos estructurados coincidan con el texto visible.

Hay un cambio reciente que conviene conocer: Google dejó de mostrar el resultado enriquecido de preguntas frecuentes (FAQ) en mayo de 2026. El tipo [FAQPage](https://schema.org/FAQPage) sigue siendo válido en schema.org, pero no esperes ver desplegables en Google por usarlo.

## ¿Qué tipos de datos estructurados conviene marcar?

Estos son los más útiles para el sitio de una empresa de servicios:

| Tipo | Qué describe | Dónde va |
|---|---|---|
| [Organization](https://schema.org/Organization) | Nombre, sitio oficial, logo, redes, contacto | Toda la web (o la portada) |
| [LocalBusiness](https://schema.org/LocalBusiness) | Dirección, horario, teléfono, zona de servicio | Páginas de contacto y de cada sede |
| [Service](https://schema.org/Service) | Un servicio, quién lo presta y dónde | Cada página de servicio |
| BlogPosting o Article | Título, fecha, fecha de actualización, autor | Cada artículo |
| BreadcrumbList | La ruta de navegación de la página | Páginas internas |
| FAQPage | Preguntas y respuestas visibles | Páginas con una sección de preguntas |

Usa `LocalBusiness` solo si tienes una ubicación real que atiende público o una zona de servicio definida. Si no, `Organization` es suficiente.

## Ejemplo: Organization

Los datos del ejemplo son ficticios. Cámbialos por los tuyos, que deben coincidir con tu web y tu ficha de Google.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.ejemplo.com.co/#organization",
  "name": "Empresa Ejemplo S.A.S.",
  "url": "https://www.ejemplo.com.co/",
  "logo": "https://www.ejemplo.com.co/logo.png",
  "description": "Qué hace la empresa, en una frase, igual que en tu web.",
  "sameAs": [
    "https://www.linkedin.com/company/empresa-ejemplo",
    "https://www.instagram.com/empresa.ejemplo"
  ]
}
```

La propiedad `sameAs` enlaza tus perfiles oficiales. Ayuda a un sistema a entender que esos perfiles y tu web son la misma organización.

## Ejemplo: Service

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Automatización de procesos con IA",
  "description": "Descripción clara del servicio, la misma que ve el visitante.",
  "provider": { "@id": "https://www.ejemplo.com.co/#organization" },
  "areaServed": { "@type": "Country", "name": "Colombia" }
}
```

Fíjate en `provider`: apunta al `@id` de la organización. Así los dos bloques se conectan en vez de quedar sueltos.

## ¿Cómo se implementan?

Google [recomienda JSON-LD](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) frente a otros formatos. Se coloca dentro de una etiqueta `<script type="application/ld+json">` en la página. Hay tres caminos:

1. **Con un plugin de SEO,** si usas WordPress. Los más usados generan `Organization`, `Article` y `BreadcrumbList`. Revisa que los datos sean los tuyos y no los valores por defecto.
2. **A mano en el código,** si tu sitio es a medida. Es lo más flexible y lo que conviene cuando hay varias páginas de servicio.
3. **Con una plantilla** que genere el marcado a partir del contenido de cada página. Evita desajustes entre lo visible y lo marcado.

## ¿Cómo validarlos?

- **[Schema Markup Validator](https://validator.schema.org/):** comprueba que el marcado sea válido según schema.org, sin importar si Google lo usa.
- **[Prueba de resultados enriquecidos](https://search.google.com/test/rich-results):** indica si tu página es elegible para los resultados enriquecidos que Google soporta.
- **Search Console:** los informes de mejoras muestran errores y advertencias a escala de sitio, una vez Google rastrea las páginas.

Valida después de cada cambio de plantilla, no solo al implementar.

## ¿Qué errores son más frecuentes?

- **Marcar lo que no se ve.** Si el marcado dice una cosa y la página otra, Google puede ignorarlo.
- **Inventar reseñas o calificaciones.** Marcar reseñas falsas o escritas por la propia empresa va contra las directrices y puede costarte caro.
- **Copiar el marcado de otra empresa** y olvidar cambiar los datos.
- **Dejar datos desactualizados:** un teléfono viejo o una dirección anterior.
- **Esperar resultados enriquecidos de FAQ** que Google ya no muestra.
- **Implementar y no validar.**

## Preguntas frecuentes

### ¿Los datos estructurados mejoran mi posición en Google?

No directamente. Ayudan a que Google entienda mejor tu contenido y habilitan resultados enriquecidos en algunos casos, pero no son un factor mágico de posición. Su valor está en la claridad.

### ¿Necesito datos estructurados para aparecer en ChatGPT o Perplexity?

No es un requisito oficial. Ayudan a que las máquinas interpreten tu identidad sin ambigüedad, pero el contenido claro, la consistencia de tus datos y que los rastreadores puedan entrar pesan más.

### ¿JSON-LD o microdatos?

JSON-LD. Google lo recomienda por ser más fácil de mantener, porque vive separado del HTML visible.

### ¿Puedo marcar mis reseñas de clientes?

Solo si son reseñas reales, visibles en la página y que cumplan las directrices de Google. No marques reseñas que escribió tu empresa sobre sí misma ni inventes calificaciones.

### ¿Con qué frecuencia debo revisarlos?

Cada vez que cambies datos de la empresa o la plantilla del sitio, y como mínimo una vez al trimestre en Search Console. Una dirección o un teléfono viejos en el marcado generan inconsistencias.

## Resumen

- Los datos estructurados describen tu página para las máquinas, con el vocabulario de schema.org.
- Deben coincidir con el contenido visible. No marques lo que la página no muestra.
- Prioriza `Organization`, `Service`, `Article` y `BreadcrumbList`; usa `LocalBusiness` si tienes ubicación real.
- Google recomienda JSON-LD y ya no muestra el resultado enriquecido de FAQ.
- Valida con el Schema Markup Validator y la Prueba de resultados enriquecidos después de cada cambio.

En Codifikai implementamos los datos estructurados como parte del servicio de [posicionamiento SEO, GEO y AEO](/services/seo-geo), conectados con el contenido de cada página. Si quieres que revisemos los de tu sitio, escríbenos.
