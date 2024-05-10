import type { Metadata } from "next"
import Posts from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quản trị bài viết",
  }
}

export default Posts
