import { TagEnum } from "../api/types/tag"

function getTagTypeName(type: TagEnum) {
  return {
    [TagEnum.Post]: "Hỏi đáp",
    [TagEnum.Class]: "Lớp",
    [TagEnum.Blog]: "Đề thi thử",
  }[type]
}

export default getTagTypeName
