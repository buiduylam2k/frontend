import type { Metadata } from "next"
import DisplaySetting from "./page-content"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cấu hình hiển thị",
  }
}

export default DisplaySetting
