import type { Metadata } from "next"
import Posts from "./page-content"
import { openGraphImage } from "@/app/shared-metadata"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cos Sin | Bài viết",
    openGraph: {
      ...openGraphImage,
      description:
        "Các bài viết về học tập hữu ích cho các bạn học sinh, sinh viên!",
    },
  }
}

export default Posts
