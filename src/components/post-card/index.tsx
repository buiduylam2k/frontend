"use client"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "../link"
import { Post } from "@/services/api/types/post"
import UserHoverCard from "../user-hover-card"
import formatDateRelativeToNow from "@/services/helpers/format-date-relative-to-now"
import EdiableJs from "../editable-js"

interface IPostCard extends Post {}

export default function PostCard(props: IPostCard) {
  const { content, createdAt, author, id, slug } = props

  const fullName = `${author?.firstName || ""} ${author?.lastName || ""}`

  return (
    <Link key={id} href={`/hoi-dap/${slug}`}>
      <div className="cursor-pointer border-b pb-4">
        <div className="flex items-start space-x-3">
          <UserHoverCard user={author}>
            <Avatar>
              <AvatarImage src={author?.photo?.path} alt={fullName} />
              <AvatarFallback>{fullName.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </UserHoverCard>

          <div>
            <UserHoverCard user={author}>
              <Link href={"/"}>{fullName}</Link>
            </UserHoverCard>

            <div className="font-semibold text-purple-600">
              {formatDateRelativeToNow(createdAt)}
            </div>
          </div>
        </div>
        <div className="mt-4 line-clamp-3">
          <EdiableJs preview initialValue={content} />
        </div>
      </div>
    </Link>
  )
}
