import type { Metadata } from "next"
import Tags from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quản trị thẻ",
  }
}

export default Tags
