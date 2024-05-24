import type { Metadata } from "next"
import EditAffLink from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Chỉnh sửa aff link`,
  }
}

export default EditAffLink
