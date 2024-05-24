import Link from "../link"
import { clientNav } from "./nav-item"

export default function ClientNavigation() {
  return (
    <div className="grow hidden md:flex px-6 gap-12 justify-center">
      {clientNav.map((n) => (
        <Link key={n.path} href={n.path}>
          <span className="text-sm font-semibold leading-6 text-gray-900">
            {n.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
