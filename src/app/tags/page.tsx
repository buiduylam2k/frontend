import type { Metadata } from "next"
import Tags from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Thẻ",
  }
}

export default Tags
