import { useCallback } from "react"
import useFetch from "../use-fetch"
import { GLOBAL_SEARCH_URL } from "../config"
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response"
import { InfinityPaginationType } from "../types/infinity-pagination"
import { SortEnum } from "../types/sort-type"
import { RequestConfigType } from "./types/request-config"
import { GlobalSearch } from "../types/global-search"

export type GlobalSearchRequest = {
  page: number
  limit: number
  filters?: {
    name?: string
  }
  sort?: Array<{
    orderBy: keyof GlobalSearch
    order: SortEnum
  }>
}

export type GlobalSearchResponse = InfinityPaginationType<GlobalSearch>

export function useGetGlobalSearchService() {
  const fetch = useFetch()

  return useCallback(
    (data: GlobalSearchRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(GLOBAL_SEARCH_URL)
      requestUrl.searchParams.append("page", data.page.toString())
      requestUrl.searchParams.append("limit", data.limit.toString())

      if (data.filters) {
        requestUrl.searchParams.append("filters", JSON.stringify(data.filters))
      }
      if (data.sort) {
        requestUrl.searchParams.append("sort", JSON.stringify(data.sort))
      }

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GlobalSearchResponse>)
    },
    [fetch]
  )
}
