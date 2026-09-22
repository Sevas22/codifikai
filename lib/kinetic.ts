/**
 * Titulares "cinéticos": mayúsculas apretadas, una línea por golpe y cada
 * línea con su propio tratamiento. Viven en `lib` porque el texto de cada
 * línea es contenido (se define junto al resto del copy), no presentación.
 *
 * - `solid`: color del texto.
 * - `outline`: solo el contorno de la letra, en el color del texto.
 * - `outline-accent`: el contorno en el color de acento de marca.
 * - `gradient`: degradado de marca animado (violeta → magenta → cian).
 */
export type KineticTone = "solid" | "outline" | "outline-accent" | "gradient"

export type KineticLine = { text: string; tone?: KineticTone }

export type LocalizedKinetic = { es: KineticLine[]; en: KineticLine[] }

/** El texto plano del titular, para metadatos o lectores que no ven líneas. */
export function kineticText(lines: KineticLine[]): string {
  return lines.map((line) => line.text).join(" ")
}
