import { graphql } from "@/generated"

export const DASBOARD_QUERY = graphql(`
  query DashboardQuery($runningAvg: String!) {
    dashboard(runningAvg: $runningAvg) {
      dashboard {
        dashboardMetrics {
          daysOfUse
          avgHours
          countNegOne
          countNegTwo
          countZero
          countPlusOne
          countPlusTwo
          overviews
        }
        rawData {
          id
          overview
          numberCreativeHours
          rating
          user
          createdAt
        }
      }
    }
  }
`)
