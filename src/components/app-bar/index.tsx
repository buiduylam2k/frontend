"use client"
import useAuth from "@/services/auth/use-auth"
import Link from "@/components/link"

import MenuUser from "./menu-user"
import AdminNavigation from "./admin-navigation"
import useAuthActions from "@/services/auth/use-auth-actions"
import Image from "next/image"
import logo from "@/app/icon.svg"
import isAdmin from "@/services/helpers/is-admin"
import { MegaMenu } from "../mega-menu"
import CommandMenu, { CMDMenuRef } from "../cmd-menu"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"
import { useRef } from "react"
import { siteConfig } from "@/conf/site"

function ResponsiveAppBar() {
  const { user } = useAuth()
  const { logOut } = useAuthActions()
  const ref = useRef<CMDMenuRef>(null)

  const _isAdmin = isAdmin(user)
  return (
    <div>
      <div className="bg-primary w-full">
        <div className="px-10 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt={"logo"}
              width={32}
              height={32}
              className="rounded-sm"
            />
            <Link href="/">
              <span className="text-3xl font-semibold md:flex font-concert-one">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {_isAdmin ? <AdminNavigation /> : <CommandMenu ref={ref} />}

          <div className="flex items-center gap-3">
            {!_isAdmin && (
              <Button
                onClick={() => ref.current?.open()}
                variant="ghost"
                size="icon"
                className="flex md:hidden"
              >
                <SearchIcon className="h-4 w-4" />
              </Button>
            )}
            <MenuUser logOut={logOut} user={user} />
          </div>
        </div>
      </div>

      {!_isAdmin && <MegaMenu />}
    </div>
  )
}
export default ResponsiveAppBar
