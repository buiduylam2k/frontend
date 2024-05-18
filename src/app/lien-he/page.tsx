import type { Metadata } from "next"
import Contact from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Liên hệ",
  }
}

export default Contact
