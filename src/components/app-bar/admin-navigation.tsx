import Link from "../link"
import { adminNav } from "./nav-item"

export default function AdminNavigation() {
  return (
    <div className="grow hidden md:flex px-6 gap-12 justify-center">
      {adminNav.map((n) => (
        <Link key={n.path} href={n.path}>
          <span className="text-sm font-semibold leading-6 text-gray-900">
            {n.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
