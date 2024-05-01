import { Post } from "./post"
import { User } from "./user"

export type Comment = {
  id: number | string

  content: string

  author: User
  post: Post

  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
}
