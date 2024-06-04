import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Overview } from "./overview"
import { StickyNote, TagIcon, Users } from "lucide-react"
import { useGetMetricOverviewService } from "@/services/api/services/metric"
import { useQuery } from "@tanstack/react-query"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"

export function DashboardPage() {
  const fetchMetricOverview = useGetMetricOverviewService()

  const { data } = useQuery({
    queryKey: ["metric-overview"],
    queryFn: async ({ signal }) => {
      const { data, status } = await fetchMetricOverview(
        {},
        {
          signal,
        }
      )

      if (status === HTTP_CODES_ENUM.OK) {
        return data
      }
    },
  })

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>

          <div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Người dùng
                  </CardTitle>
                  <Users />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.overview.user || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Số lượng người dùng có trong hệ thống.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Bài viết
                  </CardTitle>
                  <StickyNote />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.overview.post || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tổng số lượng bài viết có trong hệ thống.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blogs</CardTitle>
                  <StickyNote />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.overview.blog || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tổng số lượng bài blogs có trong hệ thống.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Thẻ</CardTitle>
                  <TagIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.overview.tag || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tổng số lượng thẻ có trong hệ thống.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 mt-5">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Lượt truy cập hỏi đáp</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview data={data?.metric.post || []} />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Lượt truy cập blogs</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview data={data?.metric.blog || []} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
