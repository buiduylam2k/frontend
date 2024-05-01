import { PropsWithChildren } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { User } from "@/services/api/types/user"
import formatDateRelativeToNow from "@/services/helpers/format-date-relative-to-now"

interface UserHoverCardProps extends PropsWithChildren {
  user?: User
}

export default function UserHoverCard(props: UserHoverCardProps) {
  const { children, user } = props
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`

  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="w-48">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={user?.photo?.path} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">{fullName}</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Tham gia vào {formatDateRelativeToNow(user?.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
