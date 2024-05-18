import type { Metadata } from "next"
import Blogs from "./page-content"
import { openGraphImage } from "@/app/shared-metadata"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cos Sin | Blogs",
    description:
      "Các bài viết blogs học tập hữu ích cho các bạn học sinh, sinh viên!",
    openGraph: {
      ...openGraphImage,
    },
  }
}

export default Blogs
