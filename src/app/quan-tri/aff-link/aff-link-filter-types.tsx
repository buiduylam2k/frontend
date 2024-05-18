import { AffLink } from "@/services/api/types/aff-link"
import { SortEnum } from "@/services/api/types/sort-type"

export type AffLinkFilterType = {}

export type AffLinkSortType = {
  orderBy: keyof AffLink
  order: SortEnum
}
