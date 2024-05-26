import { siteConfig } from "@/conf/site"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

export const webName = "Cos Sin"

export const openGraphImage = { images: ["https://cossin.vn/logo.png"] }

export const defaultOpenGraph: OpenGraph = {
  type: "website",
  locale: "vi_VN",
  url: siteConfig.url,
  title: siteConfig.name,
  description: siteConfig.description,
  siteName: siteConfig.name,
  images: [
    {
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: siteConfig.name,
    },
  ],
}
