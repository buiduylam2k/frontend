import { useCallback } from "react"
import useFetch from "../use-fetch"
import { POSTS_URL } from "../config"
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response"
import { InfinityPaginationType } from "../types/infinity-pagination"
import { SortEnum } from "../types/sort-type"
import { RequestConfigType } from "./types/request-config"
import { Post } from "../types/post"

export type PostsRequest = {
  page: number
  limit: number
  filters?: {}
  sort?: Array<{
    orderBy: keyof Post
    order: SortEnum
  }>
}

export type PostsResponse = InfinityPaginationType<Post>

export function useGetPostsService() {
  const fetch = useFetch()

  return useCallback(
    (data: PostsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(POSTS_URL)
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
      }).then(wrapperFetchJsonResponse<PostsResponse>)
    },
    [fetch]
  )
}

export type PostRequest = {
  slug: string
}

export type PostResponse = Post

export function useGetPostService() {
  const fetch = useFetch()

  return useCallback(
    (data: PostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${POSTS_URL}/${data.slug}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PostResponse>)
    },
    [fetch]
  )
}

export type CreatePostRequest = Pick<Post, "content"> & {
  tags: string[]
}

export type CreatePostResponse = Post

export function useCreatePostService() {
  const fetch = useFetch()

  return useCallback(
    (data: CreatePostRequest, requestConfig?: RequestConfigType) => {
      return fetch(POSTS_URL, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreatePostResponse>)
    },
    [fetch]
  )
}

export type PostPatchRequest = {
  slug: Post["slug"]
  data: Partial<Pick<Post, "content">>
}

export type PostPatchResponse = Post

export function usePatchPostService() {
  const fetch = useFetch()

  return useCallback(
    (data: PostPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${POSTS_URL}/${data.slug}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PostPatchResponse>)
    },
    [fetch]
  )
}

export type PostDeleteRequest = {
  id: Post["id"]
}

export type PostDeleteResponse = undefined

export function useDeletePostService() {
  const fetch = useFetch()

  return useCallback(
    (data: PostDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${POSTS_URL}/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PostDeleteResponse>)
    },
    [fetch]
  )
}

export type AddCommentPostRequest = {
  content: string
  id: string | number
}

export function useAddCommentPostService() {
  const fetch = useFetch()

  return useCallback(
    (data: AddCommentPostRequest, requestConfig?: RequestConfigType) => {
      const { id, content } = data
      return fetch(`${POSTS_URL}/${id}/add-comment`, {
        method: "POST",
        body: JSON.stringify({ content }),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<undefined>)
    },
    [fetch]
  )
}

export type DeleteCommentPostRequest = {
  cmtId: string | number
  id: string | number
}

export function useDeleteCommentPostService() {
  const fetch = useFetch()

  return useCallback(
    (data: DeleteCommentPostRequest, requestConfig?: RequestConfigType) => {
      const { cmtId, id } = data
      return fetch(`${POSTS_URL}/${id}/delete-comment/${cmtId}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<undefined>)
    },
    [fetch]
  )
}
