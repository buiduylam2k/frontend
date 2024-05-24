import { User } from "../api/types/user"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUser(obj: any): obj is User {
  return obj && typeof obj === "object" && "id" in obj && "email" in obj
}

export default isUser
