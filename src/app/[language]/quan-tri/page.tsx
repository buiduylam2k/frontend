import type { Metadata } from "next"
import AdminPanel from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quản trị",
  }
}

export default AdminPanel
