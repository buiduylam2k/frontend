import { RoleEnum } from "../api/types/role"
const map: Record<RoleEnum | "default", string> = {
  [RoleEnum.ADMIN]: "admin",
  [RoleEnum.USER]: "user",
  default: "unknown",
}

function getRoleName(roleEnum?: RoleEnum) {
  return map[roleEnum || "default"]
}

export default getRoleName
