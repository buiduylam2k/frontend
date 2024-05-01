import type { Metadata } from "next"
import Blogs from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs",
  }
}

export default Blogs
