export type Metric = {
  id: number | string

  type: MetricEnum
  name: string
  originId: string

  createdAt: Date
  updatedAt: Date
}

export const MetricEnum = {
  POST_VIEW: "post_view",
  BLOG_VIEW: "blog_view",
} as const

export type MetricEnum = (typeof MetricEnum)[keyof typeof MetricEnum]

export type TotalOverview = {
  user: number
  post: number
  blog: number
  tag: number
}

export type BaseMetric = {
  id: string
  name: string
  value: string
}

export type TotalMetric = {
  post: BaseMetric[]
  blog: BaseMetric[]
}

export type MetricOverview = {
  overview: TotalOverview
  metric: TotalMetric
}
