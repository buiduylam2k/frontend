import type { Metadata } from "next"
import SignUp from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Đăng ký tài khoản mới",
  }
}

export default SignUp
