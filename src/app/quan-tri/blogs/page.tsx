import type { Metadata } from "next"
import Blogs from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quản trị blogs",
  }
}

export default Blogs
