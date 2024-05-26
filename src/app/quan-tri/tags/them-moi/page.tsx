import type { Metadata } from "next"
import CreateTag from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Thêm mới thẻ",
  }
}

export default CreateTag
