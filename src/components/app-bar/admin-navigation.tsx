import Link from "../link"

export default function AdminNavigation() {
  return (
    <div className="grow sm:hidden md:flex px-6 gap-12 justify-center">
      <Link href={"/"}>
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Trang chủ
        </span>
      </Link>
      <Link href={"/quan-tri/nguoi-dung"}>
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Người dùng
        </span>
      </Link>
      <Link href={"/quan-tri/blogs"}>
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Blogs
        </span>
      </Link>
      <Link href={"/quan-tri/hoi-dap"}>
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Hỏi đáp
        </span>
      </Link>
      <Link href={"/quan-tri/aff-link"}>
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Aff link
        </span>
      </Link>
    </div>
  )
}
