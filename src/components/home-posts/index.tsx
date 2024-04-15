"use client"
import { useQuery } from "@tanstack/react-query"
import { SortEnum } from "@/services/api/types/sort-type"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import PostCard from "../post-card"
import { useGetPostsService } from "@/services/api/services/post"
import { postsQueryKeys } from "@/app/[language]/posts/queries/posts-queries"

export default function HomePosts() {
  const fetchGetPosts = useGetPostsService()

  const { data } = useQuery({
    queryKey: postsQueryKeys.lists().key,
    queryFn: async ({ signal }) => {
      const { data, status } = await fetchGetPosts(
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
      <ul className="flex flex-col gap-10">
        {data?.map((item) => (
          <li key={item.id}>
            <PostCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
