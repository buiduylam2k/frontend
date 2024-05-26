import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { createQueryKeys } from "@/services/react-query/query-key-factory"
import { useInfiniteQuery } from "@tanstack/react-query"
import { TagsFilterType, TagsSortType } from "../tags-filter-types"
import { useGetTagsService } from "@/services/api/services/tag"

export const tagsQueryKeys = createQueryKeys(["tags"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: TagsFilterType | undefined
        sort?: TagsSortType | undefined
      }) => ({
        key: [sort, filter],
      }),
    },
  }),

  details: (id: string) => ({
    key: [id],
  }),
})

interface IUseTagsListQuery {
  filter?: TagsFilterType | undefined
  sort?: TagsSortType | undefined
  limit?: number
}

export const useTagListQuery = ({
  sort,
  filter,
  limit,
}: IUseTagsListQuery = {}) => {
  const fetch = useGetTagsService()

  const query = useInfiniteQuery({
    queryKey: tagsQueryKeys.list().sub.by({ sort, filter }).key,
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
