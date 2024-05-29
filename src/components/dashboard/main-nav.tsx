import { cn } from "@/lib/utils"
import Link from "../link"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/examples/dashboard">Overview</Link>
      <Link href="/examples/dashboard">Customers</Link>
      <Link href="/examples/dashboard">Products</Link>
      <Link href="/examples/dashboard">Settings</Link>
    </nav>
  )
}
