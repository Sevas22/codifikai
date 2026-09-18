import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = dirname(fileURLToPath(import.meta.url))

// Imágenes de portada subidas desde el admin viven en Supabase Storage —
// next/image necesita el hostname explícito o las bloquea.
function supabaseImageHostname() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return null
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}
const supabaseHostname = supabaseImageHostname()

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      ...(supabaseHostname
        ? [
            {
              protocol: "https",
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
  async redirects() {
    return [
      {
        source: "/casos-de-exito",
        destination: "/services#cases",
        permanent: true,
      },
      // Los artículos se publican solo en español (lib/blog-paths.ts). Estas
      // URLs existieron con el texto sin traducir; se redirigen para no
      // dejar enlaces rotos ni contenido duplicado.
      {
        source: "/en/blog/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
