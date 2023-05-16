import { graphql } from "@/generated"

export const DASBOARD_BASIC_QUERY = graphql(`
  query DashboardBasicQuery($runningAvg: String!) {
    dashboardBasic(runningAvg: $runningAvg) {
      dashboard {
        sentences {
          id
          overview
          numberCreativeHours
          rating
          createdAt
          text {
            content
          }
        }
        words {
          count
          hide
          word {
            text {
              content
            }
            mentions {
              id
              overview
              numberCreativeHours
              rating
              createdAt
            }
          }
        }
      }
    }
  }
`)
