import { User } from "./user"

export type Tag = {
  id: number | string
  name: string
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  author: User
  type: TagEnum
  isActiveNav: boolean
}

export const TagEnum = {
  Class: "class",
  Blog: "blog",
  // Post: "post",
  // Home: "home",
} as const

export type TagEnum = (typeof TagEnum)[keyof typeof TagEnum]

export type TGroupTags = Partial<Record<TagEnum, Array<Tag>>>
