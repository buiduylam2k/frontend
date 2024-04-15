import { Tag } from "./Tag"
import { User } from "./user"

export type Post = {
  id: number | string

  title: string
  content: string
  views: number
  slug: string

  author: User
  tags: Tag[]
  comments: string[]

  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
}
