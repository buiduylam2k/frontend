import { RoleEnum } from "../api/types/role"
import { User } from "../api/types/user"
import isUser from "./is-user"

function isAdmin(payload?: User | null): boolean
function isAdmin(payload?: RoleEnum | null): boolean
function isAdmin(payload?: User | RoleEnum | null): boolean {
  if (typeof payload === "string") {
    // Payload is a string, likely representing a role ID
    return payload === RoleEnum.ADMIN // Direct comparison for string role
  } else if (isUser(payload)) {
    // Payload is a User object, check role property
    return payload.role?.id === RoleEnum.ADMIN
  } else {
    // This branch should be unreachable if User and RoleEnum are the only possibilities for payload
    console.warn("Unexpected payload type for isAdmin")
    return false
  }
}

export default isAdmin
