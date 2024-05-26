import type { Metadata } from "next"
import Posts from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hỏi đáp",
    description:
      "Các bài viết về học tập hữu ích cho các bạn học sinh, sinh viên!",
  }
}

export default Posts
