import type { Metadata } from "next"
import CreatePost from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Thêm mới bài viết",
  }
}

export default CreatePost
