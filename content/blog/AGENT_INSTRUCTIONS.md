# Instrucciones para redactar un artículo de blog

Guía para cualquier persona o agente que redacte un artículo en `content/blog/`. El blog existe para
**posicionar a Codifikai como referencia en tres temas**: SEO/GEO/AEO, agentes de IA y automatización con IA,
dirigido a empresas de Colombia. No es un blog de volumen. La estrategia completa está en
[`STRATEGY.md`](./STRATEGY.md); el calendario, en [`TOPICS.md`](./TOPICS.md).

## Flujo de trabajo (borrador + aprobación humana — obligatorio)

1. Elegir el primer tema en estado `pendiente` de [`TOPICS.md`](./TOPICS.md) y leer su fila en `STRATEGY.md`.
2. Crear una rama nueva (no escribir sobre `main`).
3. Redactar en `content/blog/posts/<slug-en-minusculas-con-guiones>.md` con `draft: true`.
4. Actualizar el estado del tema en `TOPICS.md` a `en revisión`.
5. Abrir un Pull Request. **Nunca publicar (`draft: false`) ni hacer merge sin aprobación humana explícita.**
6. Quien revisa verifica los datos y añade al menos un elemento de experiencia propia (ver más abajo).
7. Con la aprobación, `draft: false` y estado `publicado` en `TOPICS.md`.

## Frontmatter (ver `lib/blog.ts`)

```yaml
---
title: "Título (30-60 caracteres, con la consulta principal al inicio)"
description: "Meta descripción de 120-155 caracteres con intención de búsqueda clara"
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD"        # opcional: solo si el texto cambió de verdad
department: "Colombia"        # "Colombia" | "Cundinamarca" | "Boyacá"
city: "Colombia"              # o la ciudad/zona concreta
pillar: "seo-geo"             # "seo-geo" | "agentes-ia" | "automatizacion"
keywords:
  - "consulta principal"
  - "2-4 consultas secundarias"
author: "Equipo Codifikai"
draft: true
---
```

## Reglas de contenido

- **Idioma:** español de Colombia, tuteo. El blog no se traduce.
- **Extensión:** artículo pilar, 1.800-2.200 palabras; artículo de apoyo, 1.200-1.700. Más corto solo si responde completo.
- **Apertura:** el primer párrafo responde la pregunta del título en menos de 400 caracteres.
- **Estructura:** `##` con el problema real del lector; secciones `##` (varias como pregunta: "¿Qué es…?", "¿Cómo…?");
  listas, y tabla cuando se comparan opciones; `## Preguntas frecuentes` (cada pregunta un `###` con respuesta de un
  párrafo); `## Resumen` con 3-5 puntos y el siguiente paso.
- **Frases cortas** (promedio de 22 palabras o menos) e **ideas clave en negrita**.
- **Prohibido inventar datos:** ni estadísticas, ni encuestas, ni cifras de clientes, ni nombres de empresas reales,
  ni testimonios, ni precios. Si hace falta un dato duro, se cita con su fuente o se omite. Los ejemplos hipotéticos
  se anuncian como tales ("ejemplo ilustrativo") y no llevan cifras.
- **Fuentes:** al menos una fuente externa verificable por artículo (documentación oficial, investigación
  publicada, normas). Solo enlaces cuya URL se haya comprobado. Se atribuye cada afirmación técnica a quien la hace
  ("según la documentación de Google…").
- **Sin promesas:** nada de "posicionamiento garantizado" ni "aparecerás en ChatGPT". Se explica qué se controla y qué no.
- **Enlaces internos:** el artículo de apoyo enlaza a su pilar en el primer tercio, a uno o dos artículos hermanos y a
  la página de su servicio (`/services/seo-geo`, `/services/ai-agents`, `/services/ai-automation`). Solo a artículos que
  existan. Texto del enlace descriptivo.
- **Tono:** directo y práctico; cada sección entrega algo accionable. Sin superlativos vacíos ("líder",
  "revolucionario", "innovador").
- **Autopromoción:** el artículo debe servir aunque el lector no contrate a Codifikai. La marca se menciona en el
  cierre en una frase, y como mucho una vez más si aporta contexto real.
- **Localización:** nombrar la zona objetivo con naturalidad al menos 2-3 veces en el cuerpo.

## Experiencia propia (lo agrega quien revisa)

Antes de publicar, añadir un elemento de primera mano: un aprendizaje de un proyecto real (con permiso del
cliente), una captura propia, una decisión técnica explicada. Si el texto se redactó con ayuda de IA, una persona
lo revisa y lo aprueba antes de publicarlo.

## Después de escribir

- El `slug` no choca con uno existente en `content/blog/posts/`.
- `date` es la fecha real de creación (no futura). `updated` solo si hubo una revisión real.
- Todos los enlaces internos apuntan a artículos o páginas que existen.
- El tema quedó marcado en `TOPICS.md`.
