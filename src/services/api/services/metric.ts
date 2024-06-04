import { useCallback } from "react"
import useFetch from "../use-fetch"
import { METRICS_URL } from "../config"
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response"
import { RequestConfigType } from "./types/request-config"
import { Metric, MetricOverview } from "../types/metric"

export type CreateMetricRequest = Pick<Metric, "name" | "type" | "originId">

export type CreateMetricResponse = Metric

export function useCreateMetricService() {
  const fetch = useFetch()

  return useCallback(
    (data: CreateMetricRequest, requestConfig?: RequestConfigType) => {
      return fetch(METRICS_URL, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreateMetricResponse>)
    },
    [fetch]
  )
}

export type MetricOverviewRequest = {}
export type MetricOverviewResponse = MetricOverview

export function useGetMetricOverviewService() {
  const fetch = useFetch()

  return useCallback(
    (data: MetricOverviewRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${METRICS_URL}/overview`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<MetricOverviewResponse>)
    },
    [fetch]
  )
}
