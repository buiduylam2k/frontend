"use client"
import BlogCard from "../blog-card"
import { useGetBlogsService } from "@/services/api/services/blogs"
import { useQuery } from "@tanstack/react-query"
import { SortEnum } from "@/services/api/types/sort-type"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { blogsQueryKeys } from "@/app/[language]/blogs/queries/blogs-queries"

export default function NewBlogs() {
  const fetchGetBlogs = useGetBlogsService()

  const { data } = useQuery({
    queryKey: blogsQueryKeys.news().key,
    queryFn: async ({ signal }) => {
      const { data, status } = await fetchGetBlogs(
        {
          page: 1,
          limit: 10,
          sort: [
            {
              order: SortEnum.DESC,
              orderBy: "createdAt",
            },
          ],
        },
        {
          signal,
        }
      )

      if (status === HTTP_CODES_ENUM.OK) {
        return data.data
      }
    },
  })

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold tracking-tight">
        Bài viết mới nhất
      </h3>

      <ul className="mt-5 flex flex-col gap-10">
        {data?.map((item, i) => (
          <li key={i}>
            <BlogCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
