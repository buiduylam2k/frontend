import type { Metadata } from "next"
import SignIn from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Đăng nhập",
  }
}

export default SignIn
