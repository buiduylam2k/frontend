import type { Metadata } from "next"
import Settings from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cấu hình",
  }
}

export default Settings
