"use client"

import CommonTemplate from "@/components/common-template"
import Link from "@/components/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserHoverCard from "@/components/user-hover-card"
import { useGetPostService } from "@/services/api/services/post"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useQuery } from "@tanstack/react-query"
import { postsQueryKeys } from "../queries/posts-queries"
import formatDateRelativeToNow from "@/services/helpers/format-date-relative-to-now"
import useAuth from "@/services/auth/use-auth"
import EdiableJs from "@/components/editable-js"

import { RoleEnum } from "@/services/api/types/role"
import { useEffect, useState } from "react"
import { getUserFullname } from "@/services/helpers/get-user-fullname"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCreateMetricService } from "@/services/api/services/metric"
import { MetricEnum } from "@/services/api/types/metric"

type Props = {
  params: { language: string; slug: string }
}

export default function PostDetail({ params }: Props) {
  const { slug } = params
  const fetchGetPost = useGetPostService()
  const { user } = useAuth()
  const [showAnswer, setShowAnser] = useState(false)
  const fetchCreateMetric = useCreateMetricService()

  const { data } = useQuery({
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
  const fullName = getUserFullname(user)
  const commentLen = data?.comments?.length ?? 0

  const isAdmin = user?.role?.id === RoleEnum.ADMIN

  useEffect(() => {
    if (data) {
      fetchCreateMetric({
        name: data.title,
        originId: data.id.toString(),
        type: MetricEnum.POST_VIEW,
      })
    }
  }, [data, fetchCreateMetric])

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
            <Button onClick={() => setShowAnser(!showAnswer)} className="mt-5">
              Xem hướng dẫn giải
            </Button>
            <div
              className={cn(showAnswer ? "opacity-100" : "opacity-0", "mt-5")}
            >
              <EdiableJs initialValue={data?.answer} preview />
            </div>
          </div>
        </div>
      </div>
    </CommonTemplate>
  )
}
