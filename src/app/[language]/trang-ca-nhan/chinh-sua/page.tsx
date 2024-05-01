import type { Metadata } from "next"
import EditProfile from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chỉnh sửa",
  }
}

export default EditProfile
