import { Tag } from "./tag"
import { User } from "./user"

export type Blog = {
  id: number | string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  views: number
  author: User
  tags: Tag[]
  slug: string
  banner: string
}
