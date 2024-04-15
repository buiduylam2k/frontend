"use client"

import CommentItem from "@/components/comments/comment-item"
import CommentForm from "@/components/comments/form"
import CommonTemplate from "@/components/common-template"
import Link from "@/components/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserHoverCard from "@/components/user-hover-card"
import { useGetPostService } from "@/services/api/services/post"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import formatDate from "@/services/helpers/format-date"
import { useQuery } from "@tanstack/react-query"
import { postsQueryKeys } from "../queries/posts-queries"

type Props = {
  params: { language: string; id: string }
}

export default function PostDetail({ params }: Props) {
  const fetchGetPost = useGetPostService()
  const { id } = params

  const { data } = useQuery({
    queryKey: postsQueryKeys.details(id).key,
    queryFn: async ({ signal }) => {
      const { data, status } = await fetchGetPost(
        {
          id,
        },
        {
          signal,
        }
      )

      if (status === HTTP_CODES_ENUM.OK) {
        return data
      }
    },
  })

  const author = data?.author
  const fullName = `${author?.firstName || ""} ${author?.lastName || ""}`
  const commentLen = data?.comments?.length ?? 0

  return (
    <CommonTemplate>
      <div className="mt-10">
        {/* HEADER */}

        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {data?.title}
        </h1>

        <div className="flex items-start space-x-3 mt-10">
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
              {formatDate(data?.createdAt)}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div
          className="mt-4 ck-content"
          dangerouslySetInnerHTML={{
            __html: data?.content ?? "",
          }}
        />

        {/* COMMENTS */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold">
            Bình luận {commentLen ? `(${commentLen})` : ""}
          </h4>

          <div className="mt-5">
            <CommentForm />
            {[...new Array(10)].map((_, i) => (
              <CommentItem key={i} />
            ))}
          </div>
        </div>
      </div>
    </CommonTemplate>
  )
}
