import { LogOutIcon, MenuIcon } from "lucide-react"
import { Button } from "../ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "../ui/sheet"
import Link from "../link"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { User } from "@/services/api/types/user"
import isAdmin from "@/services/helpers/is-admin"
import { adminNav, clientNav } from "./nav-item"

interface IMobileMenu {
  user: User | null
  logOut: () => Promise<void>
}

export default function MobileMenu(props: IMobileMenu) {
  const { logOut, user } = props

  const navs = isAdmin(user) ? adminNav : clientNav

  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger>
          <Button size={"icon"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col justify-between">
          <div className="grow flex flex-col px-6 gap-5">
            {navs.map((n) => (
              <Button
                key={n.path}
                variant={"ghost"}
                asChild
                className={
                  n.path === "/"
                    ? "text-base font-semibold text-left"
                    : "text-base"
                }
              >
                <Link href={n.path}>{n.name}</Link>
              </Button>
            ))}
          </div>

          <SheetFooter>
            {user ? (
              <div className="flex flex-1 items-center justify-between">
                <SheetClose asChild>
                  <Button variant={"outline"} className="gap-2 h-12" asChild>
                    <Link href="/trang-ca-nhan">
                      <Avatar>
                        <AvatarImage
                          src={user.photo?.path}
                          alt={user?.firstName + " " + user?.lastName}
                        />
                        <AvatarFallback>
                          {user?.firstName?.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      {user?.firstName + " " + user?.lastName}
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant={"ghost"} size="icon" onClick={logOut}>
                    <LogOutIcon />
                  </Button>
                </SheetClose>
              </div>
            ) : (
              <div className="flex-1 flex gap-4">
                <Button className="w-full" variant="secondary">
                  <Link href="/dang-nhap">Đăng nhập</Link>
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
