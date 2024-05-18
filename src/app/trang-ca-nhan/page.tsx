import type { Metadata } from "next"
import Profile from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cos Sin | Trang cá nhân",
  }
}

export default Profile
