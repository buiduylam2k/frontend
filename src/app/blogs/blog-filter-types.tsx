import { Blog } from "@/services/api/types/blog"
import { SortEnum } from "@/services/api/types/sort-type"

export type BlogFilterType = {
  tag: string
}

export type BlogSortType = {
  orderBy: keyof Blog
  order: SortEnum
}
