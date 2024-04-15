import { User } from "./user"

export type Tag = {
  id: number | string
  name: string
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  author: User
}
