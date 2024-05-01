import { Tag } from "./Tag"
import { Comment } from "./comment"
import { User } from "./user"

export type Post = {
  id: number | string

  title: string
  content: string
  views: number
  slug: string

  author: User
  tags: Tag[]
  comments: Comment[]

  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
}
