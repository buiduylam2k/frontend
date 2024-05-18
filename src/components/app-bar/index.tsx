"use client"
import useAuth from "@/services/auth/use-auth"
import Link from "@/components/link"
import { RoleEnum } from "@/services/api/types/role"

import MenuUser from "./menu-user"
import AdminNavigation from "./admin-navigation"
import ClientNavigation from "./client-navigation"
import useAuthActions from "@/services/auth/use-auth-actions"
import Image from "next/image"
import logo from "@/app/icon.svg"

function ResponsiveAppBar() {
  const { user } = useAuth()
  const { logOut } = useAuthActions()

  return (
    <div className="bg-primary fixed z-50 w-full top-0">
      <div className="px-10 py-2 flex items-center justify-between gap-2">
        <Image
          src={logo}
          alt={"logo"}
          width={32}
          height={32}
          className="rounded-sm"
        />
        <Link href="/">
          <span className="text-3xl font-semibold md:flex">Cos Sin</span>
        </Link>

        <div className="flex md:hidden grow"></div>

        {!!user?.role && [RoleEnum.ADMIN].includes(user?.role?.id) ? (
          <AdminNavigation />
        ) : (
          <ClientNavigation />
        )}

        <MenuUser logOut={logOut} user={user} />
      </div>
    </div>
  )
}
export default ResponsiveAppBar
