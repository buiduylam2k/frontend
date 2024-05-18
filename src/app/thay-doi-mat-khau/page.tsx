import type { Metadata } from "next"
import PasswordChange from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Thay đổi mật khẩu",
  }
}

export default PasswordChange
