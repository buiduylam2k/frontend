import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { createQueryKeys } from "@/services/react-query/query-key-factory"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useGetBlogsService } from "@/services/api/services/blog"
import { AffLinkFilterType, AffLinkSortType } from "../aff-link-filter-types"
import { useGetAffLinksService } from "@/services/api/services/aff-link"

export const affLinksQueryKeys = createQueryKeys(["aff-links"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: AffLinkFilterType | undefined
        sort?: AffLinkSortType | undefined
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

interface IUseAffLinkListQuery {
  filter?: AffLinkFilterType | undefined
  sort?: AffLinkSortType | undefined
  limit?: number
}

export const useAffLinkListQuery = ({
  sort,
  filter,
  limit,
}: IUseAffLinkListQuery = {}) => {
  const fetch = useGetAffLinksService()

  const query = useInfiniteQuery({
    queryKey: affLinksQueryKeys.list().sub.by({ sort, filter }).key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: limit ?? 10,
          filters: filter,
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
