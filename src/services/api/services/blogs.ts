import { useCallback } from "react"
import useFetch from "../use-fetch"
import { BLOGS_URL } from "../config"
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response"
import { InfinityPaginationType } from "../types/infinity-pagination"
import { SortEnum } from "../types/sort-type"
import { RequestConfigType } from "./types/request-config"
import { Blog } from "../types/blog"

export type BlogsRequest = {
  page: number
  limit: number
  filters?: {}
  sort?: Array<{
    orderBy: keyof Blog
    order: SortEnum
  }>
}

export type BlogsResponse = InfinityPaginationType<Blog>

export function useGetBlogsService() {
  const fetch = useFetch()

  return useCallback(
    (data: BlogsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(BLOGS_URL)
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
      }).then(wrapperFetchJsonResponse<BlogsResponse>)
    },
    [fetch]
  )
}

export type BlogRequest = {
  slug: Blog["slug"]
}

export type BlogResponse = Blog

export function useGetBlogService() {
  const fetch = useFetch()

  return useCallback(
    (data: BlogRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${BLOGS_URL}/${data.slug}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<BlogResponse>)
    },
    [fetch]
  )
}

export type BlogPostRequest = Pick<Blog, "title" | "content" | "tags">

export type BlogPostResponse = Blog

export function usePostBlogService() {
  const fetch = useFetch()

  return useCallback(
    (data: BlogPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(BLOGS_URL, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<BlogPostResponse>)
    },
    [fetch]
  )
}

export type BlogPatchRequest = {
  id: Blog["id"]
  data: Partial<Pick<Blog, "title" | "content">>
}

export type BlogPatchResponse = Blog

export function usePatchBlogService() {
  const fetch = useFetch()

  return useCallback(
    (data: BlogPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(BLOGS_URL, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<BlogPatchResponse>)
    },
    [fetch]
  )
}

export type BlogsDeleteRequest = {
  id: Blog["id"]
}

export type BlogsDeleteResponse = undefined

export function useDeletePostsService() {
  const fetch = useFetch()

  return useCallback(
    (data: BlogsDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${BLOGS_URL}/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<BlogsDeleteResponse>)
    },
    [fetch]
  )
}
