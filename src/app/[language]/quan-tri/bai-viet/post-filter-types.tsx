import { Post } from "@/services/api/types/post"
import { SortEnum } from "@/services/api/types/sort-type"

export type PostFilterType = {
  tagIds?: string[]
}

export type BlogSortType = {
  orderBy: keyof Post
  order: SortEnum
}
