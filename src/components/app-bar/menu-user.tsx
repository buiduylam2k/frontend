import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "../link"
import MobileMenu from "./mobile-menu"
import { User } from "@/services/api/types/user"
import { getUserFullname } from "@/services/helpers/get-user-fullname"

interface IMenuUser {
  user: User | null
  logOut: () => Promise<void>
}

export default function MenuUser(props: IMenuUser) {
  const { logOut, user } = props

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <div className="grow-0 hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon">
                    <Avatar>
                      <AvatarImage
                        src={user.photo?.path}
                        alt={getUserFullname(user)}
                      />
                      <AvatarFallback>
                        {user?.firstName?.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Trang cá nhân</p>
                </TooltipContent>
              </Tooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{getUserFullname(user)}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/trang-ca-nhan">Trang cá nhân</Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={logOut} className="cursor-pointer">
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="grow-0 hidden md:flex gap-4">
          <Button variant="secondary">
            <Link href="/dang-nhap">Đăng nhập</Link>
          </Button>
        </div>
      )}
      <MobileMenu logOut={logOut} user={user} />
    </div>
  )
}
