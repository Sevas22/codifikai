"use client"

import { useCallback } from "react"

import { useLanguage } from "@/components/providers/language-provider"
import { localePath } from "@/lib/i18n"

/**
 * Construye rutas internas en el idioma de la página actual.
 *
 * Sin esto, un enlace escrito como `/services` sacaría al visitante de la
 * versión en inglés y lo devolvería a la española a mitad de navegación.
 *
 *   const path = useLocalePath()
 *   <Link href={path("/services")}>  // "/services" o "/en/services"
 */
export function useLocalePath() {
  const { language } = useLanguage()
  return useCallback((path: string) => localePath(language, path), [language])
}
