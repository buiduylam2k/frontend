"use client"

import CommonTemplate from "@/components/common-template"
import { useGetBlogService } from "@/services/api/services/blogs"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useQuery } from "@tanstack/react-query"
import { blogsQueryKeys } from "../queries/blogs-queries"

type Props = {
  params: { language: string; slug: string }
}

export default function BlogDetail({ params }: Props) {
  const fetchGetBlog = useGetBlogService()
  const { slug } = params

  const { data } = useQuery({
    queryKey: blogsQueryKeys.details(slug).key,
    queryFn: async ({ signal }) => {
      const { data, status } = await fetchGetBlog(
        {
          slug: slug,
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

  return (
    <CommonTemplate>
      <div className="mt-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {data?.title}
        </h1>
        <div
          className="mt-10 ck-content"
          dangerouslySetInnerHTML={{
            __html: data?.content ?? "",
          }}
        ></div>
      </div>
    </CommonTemplate>
  )
}
