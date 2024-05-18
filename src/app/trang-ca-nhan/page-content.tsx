"use client"
import useAuth from "@/services/auth/use-auth"
import withPageRequiredAuth from "@/services/auth/with-page-required-auth"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Profile() {
  const { user } = useAuth()

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`

  return (
    <div className="mt-10">
      <div className="gap-4 flex flex-1 items-center justify-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.photo?.path} alt={fullName} />
          <AvatarFallback>{fullName.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{fullName}</h3>
        </div>
      </div>
    </div>
  )
}

export default withPageRequiredAuth(Profile)
