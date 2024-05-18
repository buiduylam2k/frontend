"use client"
import Image from "next/image"
import Link from "../link"
import logo from "@/app/icon.svg"

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg  shadow dark:bg-gray-900 fixed z-50 w-full bottom-0">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Image
              src={logo}
              alt={"logo"}
              width={32}
              height={32}
              className="rounded-sm"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Cos Sin
            </span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li className="hover:underline me-4 md:me-6">
              <Link href="/blogs">Blogs</Link>
            </li>
            <li className="hover:underline me-4 md:me-6">
              <Link href="/hoi-dap">Hỏi đáp</Link>
            </li>
            <li className="hover:underline me-4 md:me-6">
              <Link href="/#">Chính sách</Link>
            </li>
            <li className="hover:underline me-4 md:me-6">
              <Link href="/lien-he">Liên hệ</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
