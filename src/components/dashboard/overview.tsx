"use client"

import { BaseMetric } from "@/services/api/types/metric"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface IOverviewProps {
  data: BaseMetric[]
}

export function Overview(props: IOverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={props.data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val: string) =>
            val.length >= 10 ? `${val.slice(0, 10)}...` : val
          }
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey="value"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Tooltip
          wrapperClassName="fill-primary"
          cursor={false}
          contentStyle={{
            maxWidth: 500,
          }}
          labelStyle={{
            textWrap: "wrap",
          }}
          formatter={(value) => [value, "Lượt truy cập"]}
          // separator=""
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
