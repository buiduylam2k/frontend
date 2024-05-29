import { Tag } from "@/services/api/types/tags"
import { SortEnum } from "@/services/api/types/sort-type"

export type TagsFilterType = {}

export type TagsSortType = {
  orderBy: keyof Tag
  order: SortEnum
}
