import type { Metadata } from "next"
import ConfirmEmail from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Xác nhận email",
  }
}

export default ConfirmEmail
