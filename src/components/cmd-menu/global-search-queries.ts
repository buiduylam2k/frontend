import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { createQueryKeys } from "@/services/react-query/query-key-factory"
import { useInfiniteQuery } from "@tanstack/react-query"
import { SortEnum } from "@/services/api/types/sort-type"
import { GlobalSearch } from "@/services/api/types/global-search"
import { useGetGlobalSearchService } from "@/services/api/services/global-search"

export type GlobalSearchFilterType = {
  name?: string
}

export type GlobalSearchSortType = {
  orderBy: keyof GlobalSearch
  order: SortEnum
}

export const GlobalSearchQueryKeys = createQueryKeys(["global-search"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filters,
      }: {
        filters: GlobalSearchFilterType | undefined
        sort?: GlobalSearchSortType | undefined
      }) => ({
        key: [sort, filters],
      }),
    },
  }),
})

interface IUseGlobalSearchListQuery {
  filters?: GlobalSearchFilterType | undefined
  sort?: GlobalSearchSortType | undefined
  limit?: number
}

export const useGlobalSearchListQuery = ({
  limit,
  filters,
}: IUseGlobalSearchListQuery = {}) => {
  const fetch = useGetGlobalSearchService()

  const query = useInfiniteQuery({
    queryKey: GlobalSearchQueryKeys.list().sub.by({
      filters,
    }).key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: limit ?? 10,
          filters,
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
    enabled: !!filters?.name?.trim(),
    gcTime: 0,
  })

  return query
}
