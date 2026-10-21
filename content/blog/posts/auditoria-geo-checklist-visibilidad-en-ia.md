---
title: "Auditoría GEO: checklist para medir tu visibilidad en IA"
description: "Cómo auditar tu visibilidad en ChatGPT, Gemini y Perplexity: panel mensual de preguntas, checklist técnico y plantilla de registro para empresas de Colombia."
date: "2026-10-21"
department: "Colombia"
city: "Colombia"
pillar: "seo-geo"
keywords:
  - "auditoría GEO"
  - "medir visibilidad en IA"
  - "cómo saber si ChatGPT menciona mi empresa"
  - "checklist GEO"
  - "auditoría de visibilidad en asistentes de IA"
author: "Equipo Codifikai"
draft: true
---

Una auditoría GEO tiene dos partes: un **panel mensual de preguntas** que mide cómo te presentan hoy ChatGPT, Gemini y Perplexity, y un **checklist técnico** que revisa si tu sitio y tu identidad son fáciles de encontrar y de citar. Puedes hacer la primera versión tú mismo en una tarde, sin herramientas de pago, y repetirla cada mes para ver la tendencia.

## El problema: no existe un panel oficial de "menciones en IA"

Con Google tienes Search Console. Con los asistentes de IA no hay un informe equivalente que diga cuántas veces te mencionaron. Incluso en Google, el tráfico que llega desde sus funciones de IA se incluye dentro del tipo de búsqueda "Web" del informe de rendimiento, según su [guía oficial](https://developers.google.com/search/docs/appearance/ai-features), y no se separa.

Por eso la medición es manual y constante. No es sofisticada, pero es honesta: observas lo mismo que vería un cliente. Esta guía complementa el artículo sobre [cómo aparecer en ChatGPT, Gemini y Perplexity](/blog/como-aparecer-en-chatgpt-gemini-perplexity).

## ¿Cómo se arma un panel de preguntas?

Un panel es una lista fija de preguntas reales de tus clientes. Mezcla cuatro tipos:

1. **Descubrimiento:** "¿qué empresa me recomiendas para automatizar mi atención por WhatsApp en Colombia?"
2. **Comparación:** "¿qué diferencia hay entre un chatbot y un agente de IA para una pyme?"
3. **Problema:** "¿cómo hago para que mi negocio aparezca en Google Maps?"
4. **Marca:** "¿qué es [tu empresa] y qué servicios ofrece?" y "¿es confiable [tu empresa]?"

Con 10 o 15 preguntas basta. Incluye tu ciudad o tu sector en varias, porque así buscan tus clientes locales.

### Cómo consultarlas para que el resultado sea comparable

- **Mismo texto cada vez.** Si cambias la pregunta, cambias la medición.
- **Misma configuración.** Anota si el asistente tenía la búsqueda web activada, porque cambia de dónde saca la información.
- **Sesión limpia.** El historial y la ubicación pueden modificar la respuesta. Usa una ventana sin sesión iniciada o un perfil aparte.
- **Repite dos o tres veces.** Las respuestas de la IA varían entre intentos. Lo que importa es lo que se repite.
- **Misma fecha cada mes.** Facilita comparar.

### Qué registrar

Una hoja de cálculo con estas columnas es suficiente:

| Pregunta | Asistente | Fecha | ¿Apareces? | Cómo te describe | Fuentes que cita | Competidores mencionados |
|---|---|---|---|---|---|---|
| (texto exacto) | ChatGPT / Gemini / Perplexity | AAAA-MM-DD | Sí / No / Parcial | (frase literal) | (dominios) | (nombres) |

La columna más valiosa es **"Fuentes que cita"**. Te dice de dónde saca la información el asistente, y por tanto dónde tienes que estar.

## ¿Qué revisa el checklist técnico?

Revisa cinco bloques. Marca cada ítem con 0 (no existe), 1 (parcial) o 2 (completo).

### 1. Acceso de los rastreadores

- Tu `robots.txt` permite OAI-SearchBot (búsqueda de ChatGPT) y PerplexityBot.
- Tu firewall o CDN no bloquea esos rastreadores por defecto.
- Tus páginas responden con código 200 y no tienen `noindex` por error.

### 2. Indexación en Google

- Search Console muestra tus páginas clave como indexadas.
- Tienes un sitemap enviado y actualizado.
- La herramienta de inspección de URL confirma que Google ve el contenido principal.

### 3. Contenido

- Cada página abre con la respuesta directa.
- Hay encabezados en forma de pregunta y listas o tablas donde corresponde.
- Los datos técnicos o legales llevan su fuente.
- Las fechas de actualización reflejan cambios reales.

### 4. Identidad de la empresa

- Existe una página "Quiénes somos" completa y con personas reales.
- Nombre, dirección, teléfono y descripción coinciden en tu web, tu ficha de Google y tus redes.
- Tu ficha de Google Business Profile está verificada y al día.
- Los [datos estructurados](/blog/datos-estructurados-schema-org-para-empresas) de tipo `Organization` están implementados y coinciden con lo visible.

### 5. Evidencia y menciones

- Los artículos tienen autor con nombre.
- Hay casos o proyectos documentados con permiso del cliente.
- Existen menciones en directorios del sector, cámaras de comercio, medios o aliados.
- Tienes reseñas reales y las respondes.

La puntuación sirve para priorizar, no es un estándar de la industria. Un ítem en 0 en acceso de rastreadores, por ejemplo, merece atención antes que uno en 1 en reseñas.

## ¿Cómo interpretar lo que encuentras?

| Lo que ves | Qué suele indicar | Qué hacer primero |
|---|---|---|
| No apareces y no se cita ninguna fuente tuya | Falta de contenido claro o de identidad definida | Mejorar las páginas de servicio y la página "Quiénes somos" |
| Apareces con datos incorrectos | Información inconsistente entre tus fuentes | Unificar tus datos en web, ficha y directorios |
| Aparece un competidor y tú no | Tiene menciones o contenido que el asistente prefiere | Revisar qué fuentes cita y trabajar presencia allí |
| Apareces en un asistente y en otro no | Posible bloqueo de un rastreador | Revisar `robots.txt` y firewall |
| Apareces, pero sin contexto útil | El contenido no tiene una respuesta citable | Reescribir con la respuesta primero y datos con fuente |

## ¿Cómo convertirlo en un plan?

Con cada hallazgo, escribe cuatro cosas: **qué viste, la evidencia, la acción y quién la hace**. Prioriza por impacto y esfuerzo: los cambios baratos de acceso y de datos inconsistentes suelen ir primero; el contenido nuevo y las menciones externas toman más tiempo.

## ¿Cada cuánto repetirla?

- **El panel de preguntas, cada mes.** Es lo que muestra la tendencia.
- **El checklist técnico, cada trimestre** y siempre que cambies de sitio web, de hosting o de proveedor de seguridad.

## ¿Qué errores arruinan una auditoría?

- Medir una sola vez y sacar conclusiones.
- Cambiar las preguntas entre meses.
- Evaluar solo un asistente.
- Confiar en un "puntaje GEO" que no explica su metodología.
- Medir sin actuar: una auditoría sin plan es solo un informe.

## Preguntas frecuentes

### ¿Necesito una herramienta de pago para auditar mi visibilidad en IA?

No para empezar. Un panel de preguntas y una hoja de cálculo ya te dan la tendencia. Las herramientas pueden ahorrar tiempo cuando manejas muchas preguntas, pero revisa que expliquen cómo miden.

### ¿Cuántas preguntas debe tener el panel?

Entre 10 y 15 suelen bastar para una empresa. Lo importante es que representen cómo pregunta tu cliente real y que no cambien de un mes a otro.

### ¿Por qué la respuesta cambia cada vez que pregunto?

Los modelos generan cada respuesta de nuevo y pueden variar según la sesión, la ubicación y si buscan en la web. Por eso se repite la consulta y se mira lo que persiste, no un resultado aislado.

### ¿Puedo ver cuánto tráfico me llega desde ChatGPT o Perplexity?

Parcialmente. En tu herramienta de analítica puedes revisar las visitas cuyo origen sea el dominio de un asistente. No es una medición completa, pero sirve como señal complementaria.

### ¿Qué hago si no aparezco en ninguna pregunta?

Es el punto de partida más común. Empieza por el acceso de rastreadores, la identidad y las páginas de servicio. La [guía de SEO, GEO y AEO](/blog/seo-geo-aeo-que-son-y-como-se-complementan) explica el orden de trabajo.

## Resumen

- La auditoría GEO combina un panel mensual de preguntas con un checklist técnico trimestral.
- Usa las mismas preguntas, la misma configuración y varias repeticiones para poder comparar.
- La columna de fuentes citadas te dice dónde necesitas presencia.
- Puntúa cada ítem del checklist de 0 a 2 solo para priorizar.
- Sin plan de acción, una auditoría no cambia nada.

En Codifikai hacemos esta auditoría como primer paso del servicio de [posicionamiento SEO, GEO y AEO](/services/seo-geo). Si prefieres que la revisemos contigo, escríbenos.
