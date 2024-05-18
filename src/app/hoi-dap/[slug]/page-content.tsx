"use client"

import CommentItem from "@/components/comments/comment-item"
import CommentForm from "@/components/comments/form"
import CommonTemplate from "@/components/common-template"
import Link from "@/components/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserHoverCard from "@/components/user-hover-card"
import {
  useDeleteCommentPostService,
  useGetPostService,
} from "@/services/api/services/post"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useQuery } from "@tanstack/react-query"
import { postsQueryKeys } from "../queries/posts-queries"
import formatDateRelativeToNow from "@/services/helpers/format-date-relative-to-now"
import useAuth from "@/services/auth/use-auth"
import EdiableJs from "@/components/editable-js"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { RoleEnum } from "@/services/api/types/role"

type Props = {
  params: { language: string; slug: string }
}

export default function PostDetail({ params }: Props) {
  const { slug } = params
  const fetchGetPost = useGetPostService()
  const deleteComment = useDeleteCommentPostService()
  const { user } = useAuth()

  const { data, refetch } = useQuery({
    queryKey: postsQueryKeys.details(slug).key,
    queryFn: async ({ signal }) => {
      const { data, status } = await fetchGetPost(
        {
          slug,
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

  const handleDeleteComment = async (cmtId: string | number) => {
    if (data?.id) {
      await deleteComment({
        cmtId,
        id: data.id,
      })
      refetch()
    }
  }

  const isAdmin = user?.role?.id === RoleEnum.ADMIN

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
              {formatDateRelativeToNow(data?.createdAt)}
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="mt-4">
          <EdiableJs initialValue={data?.content ?? ""} preview />
        </div>

        {/* COMMENTS */}
        <div className="mt-4">
          {data?.id && isAdmin && (
            <h4 className="text-lg font-semibold">
              Giải đáp {commentLen ? `(${commentLen})` : ""}
            </h4>
          )}

          <div>
            {data?.id && isAdmin && (
              <CommentForm refresh={refetch} slug={data.slug} />
            )}
            {!!data?.comments?.length && (
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Giải đáp</AccordionTrigger>
                  <AccordionContent>
                    {data?.comments.map((item) => (
                      <CommentItem
                        key={item.id}
                        isHaveActions={!!user && item.author.id === user?.id}
                        onDelete={() => handleDeleteComment(item.id)}
                        {...item}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </CommonTemplate>
  )
}
