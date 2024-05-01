import { User } from "../api/types/user"

export const getUserFullname = (user: User) => {
  return `${user.firstName || ""} ${user.lastName || ""}`
}
