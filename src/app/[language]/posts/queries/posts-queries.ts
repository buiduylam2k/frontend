import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { createQueryKeys } from "@/services/react-query/query-key-factory"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useGetPostsService } from "@/services/api/services/post"

export const postsQueryKeys = createQueryKeys(["posts"], {
  details: (id: string) => ({
    key: [id],
  }),
  lists: () => ({
    key: [],
  }),
})

export const usePostListQuery = () => {
  const fetch = useGetPostsService()

  const query = useInfiniteQuery({
    queryKey: postsQueryKeys.lists().key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
        },
        {
          signal,
        }
      )

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data: data.data,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        }
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage
    },
    gcTime: 0,
  })

  return query
}
