import type { Metadata } from "next"
import CreateAffLink from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Thêm mới aff link",
  }
}

export default CreateAffLink
