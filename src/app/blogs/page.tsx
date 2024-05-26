import type { Metadata } from "next"
import Blogs from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs",
    description:
      "Các bài viết blogs học tập hữu ích cho các bạn học sinh, sinh viên!",
  }
}

export default Blogs
