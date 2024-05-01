import { useTranslation } from "@/services/i18n/client"
import Link from "../link"

export default function AdminNavigation() {
  return (
    <div className="grow sm:hidden md:flex px-6 gap-5">
      <Link href={"/"}>Trang chủ</Link>
      <Link href={"/quan-tri/nguoi-dung"}>Người dùng</Link>
      <Link href={"/quan-tri/blogs"}>Blogs</Link>
      <Link href={"/quan-tri/bai-viet"}>Bài viết</Link>
      <Link href={"/quan-tri/cau-hinh"}>Cấu hình</Link>
    </div>
  )
}
