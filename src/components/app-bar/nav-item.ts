interface ILinkItem {
  name: string
  path: string
}

export const adminNav: Array<ILinkItem> = [
  {
    name: "Người dùng",
    path: "/quan-tri/nguoi-dung",
  },
  {
    name: "Blogs",
    path: "/quan-tri/blogs",
  },
  {
    name: "Hỏi đáp",
    path: "/quan-tri/hoi-dap",
  },
  {
    name: "Thẻ",
    path: "/quan-tri/tags",
  },
  {
    name: "Aff Link",
    path: "/quan-tri/aff-link",
  },
]

export const clientNav: Array<ILinkItem> = [
  {
    name: "Trang chủ",
    path: "/",
  },
  {
    name: "Blogs",
    path: "/blogs",
  },
  {
    name: "Hỏi đáp",
    path: "/hoi-dap",
  },
  {
    name: "Liên hệ",
    path: "/lien-he",
  },
]
