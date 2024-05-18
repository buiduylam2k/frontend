import Link from "../link"

export default function ClientNavigation() {
  return (
    <div className="grow hidden md:flex px-6 gap-12 justify-center">
      <Link href={"/"}>
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Trang chủ
        </span>
      </Link>

      <Link href={"/blogs"}>
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Blogs
        </span>
      </Link>

      <Link href={"/hoi-dap"}>
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Hỏi đáp
        </span>
      </Link>

      <Link href={"/lien-he"}>
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Liên hệ
        </span>
      </Link>
    </div>
  )
}
