"use client"

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const AUTH_REFRESH_URL = API_URL + "/v1/auth/refresh"
export const AUTH_ME_URL = API_URL + "/v1/auth/me"
export const AUTH_LOGOUT_URL = API_URL + "/v1/auth/logout"

export const UPLOAD_URL = API_URL + "/v1/files/upload"
export const GET_FILES_URL = API_URL + "/v1/files"

export const BLOGS_URL = API_URL + "/v1/blogs"

export const TAGS_URL = API_URL + "/v1/tags"

export const POSTS_URL = API_URL + "/v1/posts"

export const COMMENTS_URL = API_URL + "/v1/comments"

export const AFF_LINK_URL = API_URL + "/v1/aff-link"

export const GLOBAL_SEARCH_URL = API_URL + "/v1/global-search"

export const METRICS_URL = API_URL + "/v1/metrics"
