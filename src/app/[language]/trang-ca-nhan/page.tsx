import type { Metadata } from "next"
import Profile from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Trang cá nhân",
  }
}

export default Profile
