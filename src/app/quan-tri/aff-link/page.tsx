import type { Metadata } from "next"
import AffLink from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quản trị link",
  }
}

export default AffLink
