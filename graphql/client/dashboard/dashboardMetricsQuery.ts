import { graphql } from "@/generated"

export const DASBOARD_METRICS_QUERY = graphql(`
  query DashboardMetricsQuery($runningAvg: String!) {
    dashboardMetrics(runningAvg: $runningAvg) {
      dashboardMetrics {
        daysOfUse
        avgHours
        ratings {
          countNegOne
          countNegTwo
          countZero
          countPlusOne
          countPlusTwo
        }
      }
    }
  }
`)
