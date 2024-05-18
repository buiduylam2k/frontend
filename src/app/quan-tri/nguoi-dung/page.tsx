import type { Metadata } from "next"
import Users from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quản trị người dùng",
  }
}

export default Users
