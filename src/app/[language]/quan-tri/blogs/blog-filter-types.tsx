import { Blog } from "@/services/api/types/blog"
import { SortEnum } from "@/services/api/types/sort-type"

export type BlogFilterType = {
  tagIds?: string[]
}

export type BlogSortType = {
  orderBy: keyof Blog
  order: SortEnum
}
