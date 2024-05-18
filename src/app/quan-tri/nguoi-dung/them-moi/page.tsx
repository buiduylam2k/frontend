import type { Metadata } from "next"
import CreateUser from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Thêm mới người dùng",
  }
}

export default CreateUser
