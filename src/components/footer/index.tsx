export default function Footer() {
  return (
    <footer className="bg-white rounded-lg  shadow dark:bg-gray-900 fixed z-50 w-full bottom-0">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              My App
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/blogs" className="hover:underline me-4 md:me-6">
                Blogs
              </a>
            </li>
            <li>
              <a href="/bai-viet" className="hover:underline me-4 md:me-6">
                Bài viết
              </a>
            </li>
            <li>
              <a href="/chinh-sach" className="hover:underline me-4 md:me-6">
                Chính sách
              </a>
            </li>
            <li>
              <a href="/lien-he" className="hover:underline">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
