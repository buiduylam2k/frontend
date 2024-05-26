import type { Metadata } from "next"
import EditTag from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Chỉnh sửa thẻ`,
  }
}

export default EditTag
