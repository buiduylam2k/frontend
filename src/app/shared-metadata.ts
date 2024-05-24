import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

export const openGraphImage = { images: ["https://cossin.vn/logo.png"] }

export const defaultOpenGraph: OpenGraph = {
  type: "website",
  url: "https://cossin.vn",
  title: "Cos Sin",
  description:
    "Cos Sin là 1 trang web các kiến thức bổ ích dành cho lứa tuổi học sinh, sinh viên.",
  siteName: "Cos Sin",
  ...openGraphImage,
}
