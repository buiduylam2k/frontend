import { useCallback } from "react"
import useFetch from "../use-fetch"
import { TAGS_URL } from "../config"
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response"
import { InfinityPaginationType } from "../types/infinity-pagination"
import { SortEnum } from "../types/sort-type"
import { RequestConfigType } from "./types/request-config"
import { Tag } from "../types/tag"

export type TagsRequest = {
  page: number
  limit: number
  filters?: {}
  sort?: Array<{
    orderBy: keyof Tag
    order: SortEnum
  }>
}

export type TagsResponse = InfinityPaginationType<Tag>

export function useGetTagsService() {
  const fetch = useFetch()

  return useCallback(
    (data: TagsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(TAGS_URL)
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
      }).then(wrapperFetchJsonResponse<TagsResponse>)
    },
    [fetch]
  )
}

export type TagRequest = {
  id: Tag["id"]
}

export type TagResponse = Tag

export function useGetTagService() {
  const fetch = useFetch()

  return useCallback(
    (data: TagRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${TAGS_URL}/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<TagResponse>)
    },
    [fetch]
  )
}

export type TagPostRequest = Pick<Tag, "name">

export type TagPostResponse = Tag

export function usePostTagService() {
  const fetch = useFetch()

  return useCallback(
    (data: TagPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(TAGS_URL, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<TagPostResponse>)
    },
    [fetch]
  )
}

export type TagPatchRequest = {
  id: Tag["id"]
  data: Partial<Pick<Tag, "name" | "isActiveNav" | "type">>
}

export type TagPatchResponse = Tag

export function usePatchTagService() {
  const fetch = useFetch()

  return useCallback(
    (data: TagPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${TAGS_URL}/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<TagPatchResponse>)
    },
    [fetch]
  )
}

export type TagDeleteRequest = {
  id: Tag["id"]
}

export type TagDeleteResponse = undefined

export function useDeleteTagService() {
  const fetch = useFetch()

  return useCallback(
    (data: TagDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${TAGS_URL}/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<TagDeleteResponse>)
    },
    [fetch]
  )
}
