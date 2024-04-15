import { Tag } from "./Tag"
import { User } from "./user"

export type Comment = {
  id: number | string

  content: string
  banner: string
  views: number

  author: User
  tags: Tag[]
  comments: string[]

  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
}
