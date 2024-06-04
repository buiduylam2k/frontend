import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { createQueryKeys } from "@/services/react-query/query-key-factory"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useGetPostsService } from "@/services/api/services/post"
import { PostFilterType } from "../../quan-tri/hoi-dap/post-filter-types"
import { SortEnum } from "@/services/api/types/sort-type"

export const postsQueryKeys = createQueryKeys(["posts"], {
  details: (id: string) => ({
    key: [id],
  }),
  list: () => ({
    key: [],
    sub: {
      by: ({ filters }: { filters: PostFilterType | undefined }) => ({
        key: [filters],
      }),
    },
  }),
})

interface IUsePostListQuery {
  filters?: PostFilterType | undefined
  limit?: number
}

export const usePostListQuery = ({
  limit,
  filters,
}: IUsePostListQuery = {}) => {
  const fetch = useGetPostsService()

  const query = useInfiniteQuery({
    queryKey: postsQueryKeys.list().sub.by({ filters }).key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: limit ?? 10,
          filters,
          sort: [
            {
              order: SortEnum.DESC,
              orderBy: "updatedAt",
            },
          ],
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
