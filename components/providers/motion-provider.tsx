"use client"

/**
 * Carga de framer-motion en su versión liviana.
 *
 * `motion.*` arrastra todas las funciones de la librería a cada página. Con
 * `LazyMotion` y los componentes `m.*` solo viajan las que usa el sitio
 * (animaciones, entrada en pantalla, hover y salida). `strict` hace que un
 * `motion.*` que se cuele falle de forma visible en desarrollo, en vez de
 * volver a cargar la librería completa sin que nadie lo note.
 */

import { LazyMotion, domAnimation } from "framer-motion"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
