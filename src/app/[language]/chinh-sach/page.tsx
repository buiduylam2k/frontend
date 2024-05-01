import type { Metadata } from "next"
import Policy from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chính sách",
  }
}

export default Policy
