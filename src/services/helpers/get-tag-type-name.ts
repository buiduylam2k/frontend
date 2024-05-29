import { TagEnum } from "../api/types/tags"

function getTagTypeName(type: TagEnum) {
  return {
    [TagEnum.Post]: "Hỏi đáp",
    [TagEnum.Class]: "Lớp",
    [TagEnum.Blog]: "Đề thi thử",
    [TagEnum.Home]: "Trang chủ",
  }[type]
}

export default getTagTypeName
