import { Tag } from "./tags"
import { Comment } from "./comment"
import { User } from "./user"

export type Post = {
  id: number | string

  title: string
  content: string
  views: number
  slug: string
  banner: string

  author: User
  tag: Tag
  comments: Comment[]

  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  answer: string
}
