import type { Metadata } from "next"
import CreateBlog from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Thêm mới blog",
  }
}

export default CreateBlog
