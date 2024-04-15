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
import { useTranslation } from "@/services/i18n/client"
import MobileMenu from "./mobile-menu"
import { User } from "@/services/api/types/user"

interface IMenuUser {
  user: User | null
  logOut: () => Promise<void>
}

export default function MenuUser(props: IMenuUser) {
  const { logOut, user } = props

  const { t } = useTranslation("common")

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
                        alt={user?.firstName + " " + user?.lastName}
                      />
                      <AvatarFallback>
                        {user?.firstName?.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Menu Profile</p>
                </TooltipContent>
              </Tooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {user?.firstName + " " + user?.lastName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/profile">{t("common:navigation.profile")}</Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={logOut} className="cursor-pointer">
                {t("common:navigation.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="grow-0 hidden md:flex gap-4">
          <Button asChild>
            <Link href="/sign-in">{t("common:navigation.signIn")}</Link>
          </Button>

          <Button variant="secondary">
            <Link href="/sign-up">{t("common:navigation.signUp")}</Link>
          </Button>
        </div>
      )}
      <MobileMenu logOut={logOut} user={user} />
    </div>
  )
}
