import type { Metadata } from "next"
import HomePage from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Trang chủ",
  }
}

export default HomePage
