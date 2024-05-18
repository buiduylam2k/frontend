import { useCallback } from "react"
import useFetch from "../use-fetch"
import { AFF_LINK_URL } from "../config"
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response"
import { InfinityPaginationType } from "../types/infinity-pagination"
import { SortEnum } from "../types/sort-type"
import { RequestConfigType } from "./types/request-config"
import { AffLink } from "../types/aff-link"

export type AffLinksRequest = {
  page: number
  limit: number
  filters?: {}
  sort?: Array<{
    orderBy: keyof AffLink
    order: SortEnum
  }>
}

export type AffLinksResponse = InfinityPaginationType<AffLink>

export function useGetAffLinksService() {
  const fetch = useFetch()

  return useCallback(
    (data: AffLinksRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(AFF_LINK_URL)
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
      }).then(wrapperFetchJsonResponse<AffLinksResponse>)
    },
    [fetch]
  )
}

export type AffLinkPostRequest = Pick<AffLink, "link" | "time">

export type AffLinkPostResponse = AffLink

export function usePostAffLinkService() {
  const fetch = useFetch()

  return useCallback(
    (data: AffLinkPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(AFF_LINK_URL, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AffLinkPostResponse>)
    },
    [fetch]
  )
}

export type AffLinkPatchRequest = {
  id: AffLink["id"]
  data: Partial<Pick<AffLink, "link" | "time" | "isActive">>
}

export type AffLinkPatchResponse = AffLink

export function usePatchAffLinkService() {
  const fetch = useFetch()

  return useCallback(
    (data: AffLinkPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${AFF_LINK_URL}/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AffLinkPatchResponse>)
    },
    [fetch]
  )
}

export type AffLinkDetailRequest = {
  id: AffLink["id"]
}

export type AffLinkDetailResponse = AffLink

export function useGetAffLinkService() {
  const fetch = useFetch()

  return useCallback(
    (data: AffLinkDetailRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${AFF_LINK_URL}/${data.id}/detail`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AffLinkPatchResponse>)
    },
    [fetch]
  )
}

export function useGetAffLinkActiveService() {
  const fetch = useFetch()

  return useCallback(
    (requestConfig?: RequestConfigType) => {
      return fetch(`${AFF_LINK_URL}/active`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AffLinkPatchResponse>)
    },
    [fetch]
  )
}

export type AffLinkDeleteRequest = {
  id: AffLink["id"]
}

export type AffLinkDeleteResponse = undefined

export function useDeleteAffLinkService() {
  const fetch = useFetch()

  return useCallback(
    (data: AffLinkDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${AFF_LINK_URL}/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AffLinkDeleteResponse>)
    },
    [fetch]
  )
}
