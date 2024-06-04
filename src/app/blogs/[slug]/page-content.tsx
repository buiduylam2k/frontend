"use client"

import CommonTemplate from "@/components/common-template"
import { useGetBlogService } from "@/services/api/services/blog"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useQuery } from "@tanstack/react-query"
import { blogsQueryKeys } from "../queries/blogs-queries"
import { useEffect } from "react"
import EdiableJs from "@/components/editable-js"
import { useCreateMetricService } from "@/services/api/services/metric"
import { MetricEnum } from "@/services/api/types/metric"

type Props = {
  params: { language: string; slug: string }
}

export default function BlogDetail({ params }: Props) {
  const fetchGetBlog = useGetBlogService()
  const fetchCreateMetric = useCreateMetricService()
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

  useEffect(() => {
    if (data) {
      fetchCreateMetric({
        name: data.title,
        originId: data.id.toString(),
        type: MetricEnum.BLOG_VIEW,
      })
    }
  }, [data, fetchCreateMetric])

  return (
    <CommonTemplate>
      <div className="mt-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {data?.title}
        </h1>
        <div className="mt-10">
          <EdiableJs preview initialValue={data?.content ?? ""} />
        </div>
      </div>
    </CommonTemplate>
  )
}
