import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { createQueryKeys } from "@/services/react-query/query-key-factory"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useGetBlogsService } from "@/services/api/services/blog"
import { BlogFilterType, BlogSortType } from "../blog-filter-types"

export const blogsQueryKeys = createQueryKeys(["blogs"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: BlogFilterType | undefined
        sort?: BlogSortType | undefined
      }) => ({
        key: [sort, filter],
      }),
    },
  }),

  news: () => ({
    key: [],
  }),

  details: (id: string) => ({
    key: [id],
  }),
})

interface IUseBlogListQuery {
  filter?: BlogFilterType | undefined
  sort?: BlogSortType | undefined
  limit?: number
}

export const useBlogListQuery = ({ limit }: IUseBlogListQuery = {}) => {
  const fetch = useGetBlogsService()

  const query = useInfiniteQuery({
    queryKey: blogsQueryKeys.list().key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: limit ?? 10,
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
