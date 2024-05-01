import type { Metadata } from "next"
import ForgotPassword from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quên mật khẩu",
  }
}

export default ForgotPassword
