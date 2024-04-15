"use client"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "../link"
import { Post } from "@/services/api/types/post"
import formatDate from "@/services/helpers/format-date"
import UserHoverCard from "../user-hover-card"

interface IPostCard extends Post {}

export default function PostCard(props: IPostCard) {
  const { content, createdAt, author, id } = props

  const fullName = `${author?.firstName || ""} ${author?.lastName || ""}`

  return (
    <Link key={id} href={`/posts/${id}`}>
      <div className="cursor-pointer">
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
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
        <div className="mt-2">{content}</div>
      </div>
    </Link>
  )
}
