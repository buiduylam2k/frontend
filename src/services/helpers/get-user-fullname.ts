import { User } from "../api/types/user"

export const getUserFullname = (user?: User | null) => {
  return `${user?.firstName || ""} ${user?.lastName || ""}`
}
