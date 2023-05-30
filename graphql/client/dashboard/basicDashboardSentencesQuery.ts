import { graphql } from "@/generated"

export const BASIC_DASBOARD_SENTENCES_QUERY = graphql(`
  query BasicDashboardSentences($runningAvg: String!) {
    basicDashboardSentences(runningAvg: $runningAvg) {
      sentences {
        id
        overview
        numberCreativeHours
        rating
        createdAt
        user
        text {
          content
        }
      }
    }
  }
`)
